from appium import webdriver as appium_webdriver
from appium.webdriver.common.appiumby import AppiumBy
from selenium.webdriver import ActionChains
from selenium.common.exceptions import TimeoutException, NoSuchElementException, WebDriverException
import time
import logging
import json
import os
from models.database import db
from models.app_models import AppTestCase, AppTestStep, AppTestResult
from services.mobile_page_objects import MobilePageFactory, MobileBasePage

logger = logging.getLogger(__name__)

class AppTestExecutor:
    def __init__(self):
        self.driver = None
        self.current_page = None
        self.screenshots = []
        self.step_results = []
    
    def execute(self, test_case_id, environment='test'):
        """执行APP测试用例"""
        start_time = time.time()
        
        try:
            test_case = AppTestCase.query.get(test_case_id)
            if not test_case:
                raise ValueError(f"APP测试用例 {test_case_id} 不存在")
            
            logger.info(f"开始执行APP测试用例: {test_case.name}")
            
            # 初始化Appium驱动
            self._setup_driver(test_case)
            
            # 获取测试步骤
            steps = AppTestStep.query.filter_by(
                test_case_id=test_case.id
            ).order_by(AppTestStep.step_order).all()
            
            # 执行测试步骤
            overall_result = self._execute_steps(test_case, steps, environment)
            
            # 保存测试结果
            result = self._save_test_result(
                test_case_id, overall_result, time.time() - start_time
            )
            
            return result
            
        except Exception as e:
            logger.error(f"APP测试执行异常: {str(e)}")
            return self._save_error_result(test_case_id, str(e), time.time() - start_time)
        
        finally:
            if self.driver:
                try:
                    self.driver.quit()
                except:
                    pass
    
    def _setup_driver(self, test_case):
        """设置Appium驱动"""
        capabilities = {
            'platformName': test_case.platform_name,
            'platformVersion': test_case.platform_version,
            'deviceName': test_case.device_name,
            'automationName': test_case.automation_name,
            'newCommandTimeout': test_case.timeout,
            'autoGrantPermissions': True,
            'autoAcceptAlerts': True,
            'unicodeKeyboard': True,
            'resetKeyboard': True
        }
        
        # 添加应用相关能力
        if test_case.app_path:
            if test_case.app_path.startswith(('http://', 'https://')):
                capabilities['app'] = test_case.app_path
            else:
                capabilities['app'] = os.path.abspath(test_case.app_path)
        
        if test_case.app_package:
            capabilities['appPackage'] = test_case.app_package
        if test_case.app_activity:
            capabilities['appActivity'] = test_case.app_activity
        
        if test_case.udid:
            capabilities['udid'] = test_case.udid
        
        # 添加额外的能力配置
        if test_case.capabilities:
            try:
                extra_capabilities = json.loads(test_case.capabilities)
                capabilities.update(extra_capabilities)
            except json.JSONDecodeError as e:
                logger.warning(f"解析额外能力配置失败: {str(e)}")
        
        logger.info(f"连接Appium服务器: {test_case.appium_server}")
        logger.info(f"能力配置: {json.dumps(capabilities, indent=2)}")
        
        self.driver = appium_webdriver.Remote(
            command_executor=test_case.appium_server,
            desired_capabilities=capabilities
        )
        
        # 设置隐式等待
        self.driver.implicitly_wait(test_case.timeout)
    
    def _execute_steps(self, test_case, steps, environment):
        """执行测试步骤"""
        self.step_results = []
        
        try:
            for step in steps:
                step_result = self._execute_single_step(step, environment)
                self.step_results.append(step_result)
                
                # 如果必需步骤失败，停止执行
                if step.required and step_result['status'] == 'failed':
                    break
                
                # 步骤执行后等待
                if step.wait_time > 0:
                    time.sleep(step.wait_time)
            
            # 判断整体结果
            failed_steps = [r for r in self.step_results if r['status'] == 'failed']
            overall_status = 'passed' if not failed_steps else 'failed'
            
            return {
                'status': overall_status,
                'step_results': self.step_results
            }
            
        except Exception as e:
            logger.error(f"执行测试步骤时发生错误: {str(e)}")
            return {
                'status': 'error',
                'error_message': str(e),
                'step_results': self.step_results
            }
    
    def _execute_single_step(self, step, environment):
        """执行单个测试步骤"""
        step_start_time = time.time()
        
        try:
            logger.info(f"执行步骤 {step.step_order}: {step.action} - {step.description}")
            
            # 创建基础页面对象
            if not self.current_page:
                self.current_page = MobileBasePage(self.driver, timeout=30)
            
            result = {
                'step_id': step.id,
                'step_order': step.step_order,
                'action': step.action,
                'description': step.description,
                'status': 'passed',
                'execution_time': 0,
                'details': ''
            }
            
            # 解析定位器
            locator = step.get_locator()
            
            # 执行步骤动作
            if step.action == 'launch_app':
                self.driver.launch_app()
                result['details'] = "启动应用"
                
            elif step.action == 'close_app':
                self.driver.close_app()
                result['details'] = "关闭应用"
                
            elif step.action == 'background_app':
                duration = int(step.element_value or 5)
                self.driver.background_app(duration)
                result['details'] = f"应用后台运行 {duration} 秒"
                
            elif step.action == 'tap':
                element = self.current_page.find_clickable_element(locator)
                element.click()
                result['details'] = f"点击元素: {locator}"
                
            elif step.action == 'input':
                element = self.current_page.find_element(locator)
                value = self._replace_variables(step.element_value or '', environment)
                element.clear()
                element.send_keys(value)
                result['details'] = f"在元素 {locator} 输入: {value}"
                
            elif step.action == 'clear':
                element = self.current_page.find_element(locator)
                element.clear()
                result['details'] = f"清空元素: {locator}"
                
            elif step.action == 'swipe':
                direction = step.element_value or 'up'
                self.current_page.swipe(direction)
                result['details'] = f"向{direction}滑动"
                
            elif step.action == 'scroll_to':
                text = step.element_value or ''
                if text:
                    self.driver.find_element(AppiumBy.ANDROID_UIAUTOMATOR, 
                                           f'new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text("{text}"))')
                    result['details'] = f"滚动到文本: {text}"
                
            elif step.action == 'tap_by_coordinates':
                coords = step.element_value.split(',')
                if len(coords) == 2:
                    x, y = int(coords[0]), int(coords[1])
                    self.current_page.tap(x, y)
                    result['details'] = f"点击坐标: ({x}, {y})"
                
            elif step.action == 'long_press':
                element = self.current_page.find_element(locator)
                action = ActionChains(self.driver)
                action.long_press(element).perform()
                result['details'] = f"长按元素: {locator}"
                
            elif step.action == 'hide_keyboard':
                self.current_page.hide_keyboard()
                result['details'] = "隐藏键盘"
                
            elif step.action == 'wait':
                time.sleep(int(step.element_value or 0))
                result['details'] = f"等待 {step.element_value} 秒"
                
            elif step.action == 'execute_script':
                script = step.element_value or ''
                result_value = self.driver.execute_script(script)
                result['details'] = f"执行脚本: {script}, 结果: {result_value}"
                
            elif step.action == 'get_page_source':
                source = self.current_page.get_page_source()
                result['details'] = f"获取页面源码，长度: {len(source)}"
                
            else:
                raise ValueError(f"不支持的步骤动作: {step.action}")
            
            # 执行验证
            if step.validation_type and step.validation_value:
                validation_result = self._perform_validation(step)
                if not validation_result['passed']:
                    result['status'] = 'failed'
                    result['validation_error'] = validation_result['error']
                    result['details'] += f" | 验证失败: {validation_result['error']}"
            
            # 截图
            if step.screenshot:
                screenshot_data = self._take_screenshot(step.step_order)
                if screenshot_data:
                    result['screenshot'] = screenshot_data
            
            result['execution_time'] = time.time() - step_start_time
            return result
            
        except Exception as e:
            logger.error(f"步骤 {step.step_order} 执行失败: {str(e)}")
            return {
                'step_id': step.id,
                'step_order': step.step_order,
                'action': step.action,
                'description': step.description,
                'status': 'failed',
                'execution_time': time.time() - step_start_time,
                'error_message': str(e),
                'details': f"执行失败: {str(e)}"
            }
    
    def _perform_validation(self, step):
        """执行验证"""
        try:
            if step.validation_type == 'text':
                element = self.current_page.find_visible_element(step.get_locator())
                actual_text = element.text
                expected_text = step.validation_value
                passed = actual_text == expected_text
                return {
                    'passed': passed,
                    'error': f"文本验证失败: 期望 '{expected_text}', 实际 '{actual_text}'" if not passed else None
                }
                
            elif step.validation_type == 'attribute':
                element = self.current_page.find_element(step.get_locator())
                attr_name = step.element_value or 'text'
                actual_value = element.get_attribute(attr_name)
                expected_value = step.validation_value
                passed = actual_value == expected_value
                return {
                    'passed': passed,
                    'error': f"属性验证失败: 期望 '{expected_value}', 实际 '{actual_value}'" if not passed else None
                }
                
            elif step.validation_type == 'displayed':
                element = self.current_page.find_element(step.get_locator())
                actual_displayed = element.is_displayed()
                expected_displayed = step.validation_value.lower() == 'true'
                passed = actual_displayed == expected_displayed
                return {
                    'passed': passed,
                    'error': f"显示状态验证失败: 期望 '{expected_displayed}', 实际 '{actual_displayed}'" if not passed else None
                }
                
            elif step.validation_type == 'enabled':
                element = self.current_page.find_element(step.get_locator())
                actual_enabled = element.is_enabled()
                expected_enabled = step.validation_value.lower() == 'true'
                passed = actual_enabled == expected_enabled
                return {
                    'passed': passed,
                    'error': f"启用状态验证失败: 期望 '{expected_enabled}', 实际 '{actual_enabled}'" if not passed else None
                }
                
            elif step.validation_type == 'selected':
                element = self.current_page.find_element(step.get_locator())
                actual_selected = element.is_selected()
                expected_selected = step.validation_value.lower() == 'true'
                passed = actual_selected == expected_selected
                return {
                    'passed': passed,
                    'error': f"选中状态验证失败: 期望 '{expected_selected}', 实际 '{actual_selected}'" if not passed else None
                }
                
            elif step.validation_type == 'element_present':
                try:
                    self.current_page.find_element(step.get_locator())
                    passed = True
                except TimeoutException:
                    passed = False
                return {
                    'passed': passed,
                    'error': f"元素不存在: {step.get_locator()}" if not passed else None
                }
                
            elif step.validation_type == 'element_count':
                locator_type, locator_value = self.current_page._parse_locator(step.get_locator())
                elements = self.driver.find_elements(locator_type, locator_value)
                expected_count = int(step.validation_value)
                actual_count = len(elements)
                passed = actual_count == expected_count
                return {
                    'passed': passed,
                    'error': f"元素数量验证失败: 期望 {expected_count}, 实际 {actual_count}" if not passed else None
                }
                
            else:
                return {
                    'passed': False,
                    'error': f"不支持的验证类型: {step.validation_type}"
                }
                
        except Exception as e:
            return {
                'passed': False,
                'error': f"验证执行失败: {str(e)}"
            }
    
    def _take_screenshot(self, step_order):
        """截图"""
        try:
            screenshot_data = self.current_page.take_screenshot()
            return screenshot_data
            
        except Exception as e:
            logger.error(f"截图失败: {str(e)}")
            return None
    
    def _replace_variables(self, text, environment):
        """替换变量"""
        return text.replace('${env}', environment)
    
    def _save_test_result(self, test_case_id, result, execution_time):
        """保存测试结果"""
        try:
            # 获取设备信息
            device_info = {}
            app_info = {}
            logs = ""
            
            if self.driver:
                try:
                    device_info = self.current_page.get_device_info()
                    logs = self.driver.get_log('logcat') if self.driver.capabilities.get('platformName') == 'Android' else ""
                except:
                    pass
            
            test_result = AppTestResult(
                test_case_id=test_case_id,
                status=result['status'],
                execution_time=execution_time,
                error_message=result.get('error_message'),
                device_info=json.dumps(device_info),
                app_info=json.dumps(app_info),
                screenshots=json.dumps(self.screenshots),
                step_results=json.dumps(result['step_results']),
                logs=json.dumps(logs) if logs else ""
            )
            
            db.session.add(test_result)
            db.session.commit()
            
            return test_result.to_dict()
            
        except Exception as e:
            logger.error(f"保存测试结果失败: {str(e)}")
            db.session.rollback()
            raise
    
    def _save_error_result(self, test_case_id, error_message, execution_time):
        """保存错误结果"""
        try:
            test_result = AppTestResult(
                test_case_id=test_case_id,
                status='error',
                error_message=error_message,
                execution_time=execution_time
            )
            
            db.session.add(test_result)
            db.session.commit()
            
            return test_result.to_dict()
            
        except Exception as e:
            logger.error(f"保存错误结果失败: {str(e)}")
            db.session.rollback()
            return {
                'test_case_id': test_case_id,
                'status': 'error',
                'error_message': str(e)
            }