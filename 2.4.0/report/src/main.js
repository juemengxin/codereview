// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from './router'
import store from './store'
const urljoin = require('url-join')
const packageJson = require('../package.json')

Vue.config.productionTip = false
// TODO: 版本管理
window.VUE_APP_VERSION = process.env.DIST + '_' + process.env.ENV + '_' + packageJson.version + '-' + process.env.VERSION
console.log('version: ' + process.env.DIST + '_' + process.env.ENV + '_' + packageJson.version + '-' + process.env.VERSION) // 输出版本号
// 添加请求拦截器
axios.interceptors.request.use(config => {
  // 在发送请求之前做些什么
  if (config.url.indexOf('http') < 0) {
    // TODO: 根据环境变量拼接环境
    config.url = urljoin(process.env.API_URL, config.url) // 根据环境变量拼接环境
  }
  // 'withCredentials' 表示跨域请求时是否需要使用凭证
  config.withCredentials = false
  return config
}, error => Promise.reject(error)) // 对请求错误做些什么
// 添加响应拦截器
axios.interceptors.response.use(response => {
  // 对响应数据做点什么
  if (response.data.ok) {
    return response.data
  }
  /**
  *
  *  根据响应数据error.code 是否是 1200 检测微信用户是否授权
  *  未授权 判断是否有 redirect
  *  有 redirect 就跳转
  */
  if (response.data.error) {
    if (response.data.error.code === 1200) {
      if (response.data.redirect && response.data.redirect !== '') {
        window.location.href = response.data.redirect
      }
    }
    store.dispatch('popmsg', response.data.error) // 调用自定义提示信息弹窗输出错误信息
    throw new Error(response.data)
  }
  if (response.status === 200) {
    return response
  }
}, error => Promise.reject(error)) // 对响应错误做些什么
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
