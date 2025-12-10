import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'
import { ApiClient } from './api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    landscape: false, // @type{boolean} 手机横屏
    messageStatus: false, // @type{boolean} 弹窗状态
    messageText: '', // @type{string} 弹窗文字
    messageTimeout: '', // @type{string} 弹窗timeout对象
    closeMessageTime: 2000, // @type{number} 弹窗消失时间
    authorization: '', // @type{string} 登录授权
    xAccessToken: '', // @type{string} token
    userId: '', // @type{string} 用户ID
    inputTimeout: '', // @type{string} 输入框timeout对象
    loading: true, //  @type{boolean} 加载动画状态
    clientAuthTimeout: '', // @type{string} 授权timeout对象
    refreshTime: 150000, // @type{number} 授权刷新时间
    appVersion: '', // @type{string} app版本号
    oldHashedPassword: '',
    oldPasswordSeed: '',
    oldUsername: '',
    signUpMobile: '',
    signUpVerificationNumber: '',
    signUpAreaCode: '',
    areaCodeIsPull: false,
    areaCodeArr: [
      {
        key: '+86',
        value: '中国大陆'
      },
      {
        key: '+852',
        value: '中国香港'
      },
      {
        key: '+853',
        value: '中国澳门'
      },
      {
        key: '+886',
        value: '中国台湾'
      },
      {
        key: '+1',
        value: '美国'
      },
      {
        key: '+1',
        value: '加拿大'
      },
      {
        key: '+44',
        value: '英国'
      },
      {
        key: '+60',
        value: '马来西亚'
      },
      {
        key: '+62',
        value: '印尼'
      },
      {
        key: '+63',
        value: '菲律宾'
      },
      {
        key: '+65',
        value: '新加坡'
      },
      {
        key: '+66',
        value: '泰国'
      },
      {
        key: '+673',
        value: '文莱'
      },
      {
        key: '+81',
        value: '日本'
      },
      {
        key: '+82',
        value: '韩国'
      },
      {
        key: '+84',
        value: '越南'
      },
      {
        key: '+855',
        value: '柬埔寨'
      },
      {
        key: '+856',
        value: '老挝'
      },
      {
        key: '+95',
        value: '缅甸'
      }
    ]
  },
  mutations: {

  },
  actions: {
    /**
     * 顶部弹窗
     *
     * @param {*} { state }
     * @param {object} message 弹窗对象
     */
    popMessage ({ state }, message) {
      clearTimeout(state.messageTimeout)
      state.messageStatus = true
      state.messageText = message.text
      state.messageTimeout = setTimeout(() => {
        state.messageStatus = false
      }, state.closeMessageTime)
    },
    submitClientAuth ({ state, dispatch }) {
      return new Promise((resolve) => {
        const client = new ApiClient()
        let u = navigator.userAgent
        let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1
        let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
        let CLIENT_ID = process.env.VUE_APP_CLIENT_ID
        let SECRET_KEY_HASH = process.env.VUE_APP_SECRET_KEY_HASH
        let SEED = process.env.VUE_APP_SEED
        if (isAndroid) {
          CLIENT_ID = process.env.VUE_APP_ANDROID_CLIENT_ID
          SECRET_KEY_HASH = process.env.VUE_APP_ANDROID_SECRET_KEY_HASH
          SEED = process.env.VUE_APP_ANDROID_SEED
        }
        if (isIOS) {
          CLIENT_ID = process.env.VUE_APP_IOS_CLIENT_ID
          SECRET_KEY_HASH = process.env.VUE_APP_IOS_SECRET_KEY_HASH
          SEED = process.env.VUE_APP_IOS_SEED
        }
        client.submitClientAuth(CLIENT_ID, SECRET_KEY_HASH, SEED).then((res) => {
          state.authorization = res.data.authorization
          clearTimeout(state.clientAuthTimeout)
          state.clientAuthTimeout = setTimeout(() => {
            dispatch('submitClientAuth')
          }, state.refreshTime)
          resolve()
        })
      })
    },
    /**
    *
    *  判断是否存在 dsbridge 交互 方法名
    *
    *  @param {string} name dsbridge 交互 方法名
    */
    invokeBridgeMethod ({ state, dispatch }, name) {
      return new Promise((resolve, reject) => {
        const dsBridge = require('dsbridge') // 引入 交互插件
        if (dsBridge.hasNativeMethod(name)) {
          resolve(dsBridge)
        } else {
          let error = 'failed to call the missing dsBridge method: ' + name
          console.log(error) // 没找到App方法报错
          reject(error)
        }
      })
    },
    signOut ({ state, dispatch }) {
      state.userId = ''
      state.xAccessToken = ''
      dispatch('submitClientAuth')
      router.push({ name: 'sign-in' })
    },
    /**
      *
      *  改变title
      *
      *  @param {string} title
      */
    changeTitle ({ state }, title) {
      if (process.env.VUE_APP_VERSION.indexOf('dev') >= 0) {
        document.title = title + 'D'
      } else if (process.env.VUE_APP_VERSION.indexOf('test') >= 0) {
        document.title = title + 'T'
      } else if (process.env.VUE_APP_VERSION.indexOf('staging') >= 0) {
        document.title = title + 'S'
      } else {
        document.title = title
      }
    }
  }
})
