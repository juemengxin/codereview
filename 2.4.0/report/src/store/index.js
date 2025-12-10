import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import { ApiOwner, ApiClient } from '../api' // api
const urljoin = require('url-join')
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    analysisReportShow: true, // @type{boolean} 分析报告父页面是否显示
    njExplainsShow: true, // @type{boolean} 女性健康父页面是否显示
    msgIsPop: false, // @type{boolean} 是否弹窗
    msg: '', // @type{string} 弹窗msg
    isLoading: false, // @type{boolean} 是否loading
    isWx: false, // @type{boolean} 是否是微信
    isJinmuL: false, // @type{boolean} 是否是一体机
    authorization: '', // @type{string} Client验证授权信息
    xAccessToken: '', // @type{string} 用户登录 token
    userId: 0, // @type{integer} 用户ID
    clientId: '', // @type{string} 平台Id
    secretKeyHash: '', // @type{string} 秘钥Hash值
    seed: '', // @type{string} 随机数
    remark: '', // @type{string} 备注
    content: '', // @type{string} 女性健康详情
    windowWidth: 0, // 屏幕宽度
    landscape: false, // 手机横屏
    appVersion: '2.3', // @type{string} app版本号
    entryVersion: '' // @type{string} 显示词条版本
  },
  actions: {
    /**
     *
     * 打开自定义消息弹窗
     *
     *  {state} 引用上方 state
     *  @param {Object} val 消息内容
     *  @param {string} val.msg 消息内容文本
     *  @param {Function} val.callback 弹窗消失回调
     */
    popmsg({ state }, val) {
      state.msgIsPop = true
      if (val.msg) {
        state.msg = val.msg
      }
      setTimeout(() => {
        state.msgIsPop = false
        if (val.callback) {
          val.callback()
        }
      }, 1500)
    },
    /**
     *
     *  判断是否在微信浏览器
     *
     */
    isWx({ state }) {
      return new Promise((resolve, reject) => {
        const ua = navigator.userAgent.toLowerCase()
        if (ua.indexOf('micromessenger') >= 0) {
          state.isWx = true
          resolve()
        } else {
          state.isWx = false
          reject(new Error('app'))
        }
      })
    },
    /**
     *
     *  判断是否存在 dsbridge 交互 方法名
     *
     *  @param {Object} val
     *  @param {string} val.name dsbridge 交互 方法名
     *  @param {string} val.data dsbridge 交互 参数
     *  @param {Function} val.callback dsbridge 交互 回调函数
     *  @param {Function} val.errCallback dsbridge  失败回调函数
     */
    invokeBridgeMethod({ state, dispatch }, val) {
      const dsBridge = require('dsbridge') // 引入 交互插件
      if (dsBridge.hasNativeMethod(val.name)) {
        if (val.callback) {
          dsBridge.call(val.name, val.data, val.callback)
        } else if (val.data) {
          dsBridge.call(val.name, val.data)
        } else {
          dsBridge.call(val.name)
        }
      } else {
        if (val.errCallback) {
          val.errCallback()
        }
        console.log('failed to call the missing dsBridge method: ' + val.name) // 不存在 输出提示
      }
    },
    /**
     *
     *  跳转页面
     *
     *  @param {object} obj 地址传参
     */
    webPush({ state, dispatch }, obj) {
      // 判断是否是微信
      if (state.isWx) {
        router.push({ name: obj.name, query: obj.query })
      } else {
        // 判断是app内页面
        const owner = new ApiOwner()
        owner
          .getUrl(
            state.clientId,
            state.secretKeyHash,
            state.seed,
            state.appVersion,
            process.env.ENV
          )
          .then(res => {
            let url = obj.name
            let queryArr = []
            if (obj.query) {
              Object.keys(obj.query).forEach(element => {
                queryArr.push(element + '=' + obj.query[element])
              })
              url = url + '?' + queryArr.join('&')
            }
            dispatch('invokeBridgeMethod', {
              name: 'entryPush',
              data: urljoin(res.data.app_report_url, '#/', encodeURI(url)), // 改变 app交互 entryPush 传参(传整个链接)
              errCallback() {
                router.push({ name: obj.name, query: obj.query })
              }
            })
          })
      }
    },
    /**
     *
     *  判断是否存在词条名称
     *
     *  @param {string} key 词条key
     */
    newEntryPush({ state, dispatch }, key) {
      var env = ''
      if (process.env.ENV !== 'prod') {
        env = '?env=' + process.env.ENV
      }
      // 版本2-2对应词条2-1
      var version = state.entryVersion
      var entryVersion = ''
      if (version !== '') {
        entryVersion = '&version=' + version
        if (entryVersion === '&version=2-2') {
          entryVersion = '&version=2-1'
        }
      }
      dispatch('invokeBridgeMethod', {
        name: 'entryPush',
        data: urljoin(
          'https://go.jinmuhealth.com/e/',
          key + env + entryVersion
        ),
        errCallback() {
          let query = router.history.current.query
          query.src = urljoin(
            'https://go.jinmuhealth.com/e/',
            key + env + entryVersion
          )
          router.push({ name: 'entrydetails', query: query })
        }
      })
    },
    /**
     *
     *  健康百科词条页面跳转
     *
     *  @param {string} key 词条key
     */
    newHealthEntryPush({ state, dispatch }, key) {
      var env = ''
      if (process.env.ENV !== 'prod') {
        env = '?env=' + process.env.ENV
      }
      // 版本2-2对应词条2-1
      var version = '&version=2-4'
      dispatch('invokeBridgeMethod', {
        name: 'entryPush',
        data: urljoin('https://go.jinmuhealth.com/e/', key + env + version),
        errCallback() {
          let query = router.history.current.query
          query.src = urljoin(
            'https://go.jinmuhealth.com/e/',
            key + env + version
          )
          router.push({ name: 'entrydetails', query: query })
        }
      })
    },
    /**
     *
     *  跳转帮助中心详情页
     *
     *  @param {string} url 地址
     */
    helpPush({ state }, url) {
      const owner = new ApiOwner()
      owner
        .getUrl(
          state.clientId,
          state.secretKeyHash,
          state.seed,
          state.appVersion,
          process.env.ENV
        )
        .then(res => {
          let query = router.history.current.query
          query.src = urljoin(res.data.app_faq_url, url)
          router.push({ name: 'entrydetails', query: query })
        })
    },
    /**
     *
     *  改变title
     *
     *  @param {string} title
     */
    changeTitle({ state }, title) {
      switch (process.env.ENV) {
        case 'dev':
          document.title = title + 'D'
          break
        case 'testing':
          document.title = title + 'T'
          break
        case 'staging':
          document.title = title + 'S'
          break
        default:
          document.title = title
          break
      }
    },
    /**
     *
     *  金姆健康app客户端授权
     */
    getAppClientAuth({ state }) {
      const client = new ApiClient()
      return client.clientAuth(state.clientId, state.secretKeyHash, state.seed)
    }
  }
})
