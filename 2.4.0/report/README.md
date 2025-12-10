# 健康报告

## 安装环境
```nginx
安装brew：/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
安装node：brew install node
安装依赖：npm install
```
> 一体机上显示页面
> 微信公众号页面

## 项目安装插件
```
vue-router vue路由
vuex 状态管理
axios http请求插件
moment 时间插件
dsbridge app交互插件
```

## 开发环境
```
运行
DIST=app ENV=dev npm run dev 金姆健康app 开发环境
DIST=app ENV=test npm run dev 金姆健康app 测试环境
DIST=app ENV=staging npm run dev 金姆健康app 预发布环境
DIST=app ENV=prod npm run dev 金姆健康app 正式环境
```

```
打包
DIST=app ENV=dev npm run build 金姆健康app 开发环境
DIST=app ENV=test npm run build 金姆健康app 测试环境
DIST=app ENV=staging npm run build 金姆健康app 预发布环境
DIST=app ENV=prod npm run build 金姆健康app 正式环境
```


# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

