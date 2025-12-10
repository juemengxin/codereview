import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n'
import axios from 'axios'
import errorJson from './error.json'
const urljoin = require('url-join')
Vue.config.productionTip = false
window.VUE_APP_VERSION = process.env.VUE_APP_VERSION
console.log(process.env.VUE_APP_VERSION) // 输出版本号
// 添加请求拦截器
axios.interceptors.request.use(
  (config) => {
    config.url = urljoin(process.env.VUE_APP_API_URL, config.url) // 根据环境变量拼接环境
    // 'withCredentials' 表示跨域请求时是否需要使用凭证
    config.withCredentials = false
    return config
  },
  (error) => Promise.reject(error)
) // 对请求错误做些什么
// 添加响应拦截器
axios.interceptors.response.use(
  (response) => {
    if (response.data.ok) {
      return response.data
    }
    const errorMsg =
      'code: ' +
      response.data.error.code +
      ' msg: ' +
      errorJson[response.data.error.code]
    store
      .dispatch('invokeBridgeMethod', 'showErrorMsgToast')
      .then((dsBridge) => {
        dsBridge.call('showErrorMsgToast', response.data.error.code)
      })
      .catch(() => {
        store.dispatch('popMessage', {
          type: 'app',
          text: errorJson[response.data.error.code]
        })
      })
    if (
      response.data.error.code === 1000 ||
      response.data.error.code === 1100
    ) {
      window.location.href = window.location.href.split('/#/')[0]
    }
    throw new Error(errorMsg)
  },
  (error) => Promise.reject(error)
) // 对响应错误做些什么

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App)
}).$mount('#app')
