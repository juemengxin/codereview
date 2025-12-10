# jinmu-id-web

## 安装环境
```nginx
安装brew：/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
安装node：brew install node
安装依赖：npm install
```
> 包含 @vue/cli 脚手架

## 架构配置

### 前端框架
- vue

### 状态管理
- vuex

### 页面路由
- vue-router

### 代码验证
- eslint-standard

### 单元测试
- jest

### js转换
- babel

### 多语言
- vuei18n

## 命令行

### 运行dev环境

```nginx
npm run serve-dev
```

### 运行test环境

```nginx
npm run serve-testing
```

### 运行staging环境

```nginx
npm run serve-staging
```

### 运行prod环境

```nginx
npm run serve-prod
```

### 打包dev环境

```nginx
npm run build-dev
```

### 打包test环境

```nginx
npm run build-testing
```

### 打包staging环境

```nginx
npm run build-staging
```

### 打包prod环境

```nginx
npm run build-prod
```

## 页面路由及模块

### 首页（index）

- #### NavBar（顶部栏模块）

- #### Bottom（底部栏模块）

### 登录页（sign-in）

- #### NavBar（顶部栏模块）

- #### Bottom（底部栏模块）

- #### JmButton（按钮模块）

- #### JmInput（输入框模块）

### 注册页（sign-up）

- #### NavBar（顶部栏模块）

- #### Bottom（底部栏模块）

- #### JmButton（按钮模块）

- #### JmInput（输入框模块）

### 完善资料页（user-info）

- #### NavBar（顶部栏模块）

- #### Bottom（底部栏模块）

- #### JmButton（按钮模块）

- #### JmInput（输入框模块）

### 个人中心页（personal-center）

- #### NavBar（顶部栏模块）

- #### Bottom（底部栏模块）

- #### JmButton（按钮模块）

- #### JmInput（输入框模块）

### 最近使用的登录设备页（used-device）

- #### NavBar（顶部栏模块）

- #### Bottom（底部栏模块）

### 联系客服页（contact-us）

- #### NavBar（顶部栏模块）

- #### Bottom（底部栏模块）

### 隐私政策页（privacy-terms）

- #### NavBar（顶部栏模块）

- #### Bottom（底部栏模块）

### 重置密码页（reset-password）

- #### NavBar（顶部栏模块）

- #### Bottom（底部栏模块）

### 找回用户名页（retrieve-username）

- #### NavBar（顶部栏模块）

- #### Bottom（底部栏模块）

### 手机重置密码页（mobile-reset）

- #### NavBar（顶部栏模块）

- #### Bottom（底部栏模块）

- #### JmButton（按钮模块）

- #### JmInput（输入框模块）

### 邮箱重置密码页（email-reset）

- #### NavBar（顶部栏模块）

- #### Bottom（底部栏模块）

- #### JmButton（按钮模块）

- #### JmInput（输入框模块）

### 密保重置密码页（question-reset）

- #### NavBar（顶部栏模块）

- #### Bottom（底部栏模块）

- #### JmButton（按钮模块）

- #### JmInput（输入框模块）

### 未绑定密码找回页（none-reset）

- #### NavBar（顶部栏模块）

- #### Bottom（底部栏模块）

- #### JmButton（按钮模块）

### 邮箱找回用户名页（email-retrieve）

- #### NavBar（顶部栏模块）

- #### Bottom（底部栏模块）

- #### JmButton（按钮模块）

- #### JmInput（输入框模块）

### 未绑定用户名找回页（none-retrieve）

- #### NavBar（顶部栏模块）

- #### Bottom（底部栏模块）

- #### JmButton（按钮模块）

## src/assets 静态文件存放规则
根据页面的层级关系创建对应的文件夹
> - index页面 ===> src/assets/index/
> - login页面 ===> src/assets/login/
> - modify-mac页面 ===> src/assets/index/modify-mac/

## CSS 样式表的命名规范
 请切忌以如下方式命名：
```css
.redBox {
  border: 1px solid red;
}
```
 相应的，你可以这样写：
```css
.red-box {
   border: 1px solid red;
}
```
 同时，这也和 CSS 属性名称保持了一致。
```css
// Correct
.some-class {
   font-weight: 10em
}
// Wrong
.some-class {
   fontWeight: 10em
}
```
> - 可以查看一下这个文档：[这些 CSS 命名规范将省下你大把调试时间](https://github.com/xitu/gold-miner/blob/master/TODO/css-naming-conventions-that-will-save-you-hours-of-debugging.md)
> - 原文地址：[CSS Naming Conventions that Will Save You Hours of Debugging](https://medium.freecodecamp.org/css-naming-conventions-that-will-save-you-hours-of-debugging-35cea737d849)

## router.js 路由使用规范
[官方文档](https://router.vuejs.org/guide/)

## store.js 状态管理使用规范
[官方文档](https://vuex.vuejs.org/guide/)
