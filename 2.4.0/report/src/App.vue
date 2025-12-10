<template>
  <div id="app" :class="{ landscape: $store.state.landscape }">
    <router-view v-if="goView" />
    <msg-popup v-if="$store.state.msgIsPop"></msg-popup>
    <loading></loading>
  </div>
</template>

<script>
import MsgPopup from './components/MsgPopup' // pop
import Loading from './components/Loading' // loading
import { ApiJML } from './api'
export default {
  name: 'App',
  data() {
    return {
      goView: false, // @type{boolean} 页面展示前准备工作是否做好，必要数据是否已经赋值
      signInKey: '', // @type{string} 用户名/邮箱/电话号码
      registerType: '', // @type{string} 注册类型，支持以下字符串值
      passwordHash: '', // @type{string} 密码 SHA256 encoded
      account: '', // @type{string} 一体机账号
      password: '', // @type{string} 一体机密码
      machineUuid: '' // @type{string} 一体机机器唯一标识
    }
  },
  mounted() {
    const t = this
    t.windowWidthChange()
    window.onresize = t.windowWidthChange
    t.$store.state.isLoading = true

    // 判断是否是：帮助中心一级、二级；健康百科一级、二级；通用iframe页面
    t.$route.matched.forEach(element => {
      if (
        element.name === 'helpinfo' ||
        element.name === 'healthinfo' ||
        element.name === 'entrydetails' ||
        element.name === 'entry-html'
      ) {
        t.goView = true
      }
    })
    if (t.$route.name === 'analysisreport' && t.$route.query.instance) {
      t.goView = true
    }
    // 判断是否分享页面以及是否带有token值
    if (t.$route.name === 'analysisreport' && t.$route.query.token) {
      switch (process.env.DIST) {
        case 'app':
          break
        case 'jml':
          t.$store.state.isJinmuL = true
          break
        default:
          t.$store.state.isWx = true
          break
      }
      t.goView = true
      t.$router
        .push({ name: 'analysisreport', query: t.$route.query })
        .catch(() => {})
    } else {
      switch (process.env.DIST) {
        case 'app':
          t.appLogin()
          break
        case 'jml':
          t.$store.state.isJinmuL = true
          t.appLogin()
          break
        default:
          t.$store.state.isWx = true
          t.wxLogin()
          break
      }
    }
  },
  methods: {
    /**
     * 监听屏幕宽度
     */
    windowWidthChange() {
      if (window.orientation === 0) {
        this.$store.state.landscape = false
        this.$store.state.windowWidth = window.innerWidth
      } else {
        this.$store.state.landscape = true
        this.$store.state.windowWidth = window.innerHeight
      }
    },
    /**
     *  微信 入口
     */
    wxLogin() {
      const t = this
      t.goView = true
    },
    /**
     *  金姆健康app 入口 TODO
     */
    appLogin() {
      const t = this
      const dsBridge = require('dsbridge') // 引入 交互插件
      // t.$store.state.userId = 139615
      // t.$store.state.xAccessToken = 'a3ad72ce-e34c-4764-92c5-ce8d73d80849'
      // t.$store.state.clientId = 'jm-10005'
      // t.$store.state.secretKeyHash = '02111590b5493c9cfe76a4491c64d83f20b97f83748c3179d1bc0b797167e93e'
      // t.$store.state.seed = 'ggwn'
      // t.goView = true

      /**
       *
       * 注册 setAppVersion 被动获取app版本号
       * @param {string} appVersion app版本号
       */
      dsBridge.registerAsyn('setAppVersion', appVersion => {
        t.$store.state.appVersion = appVersion
      })
      if (t.$store.state.isJinmuL) {
        /**
         *
         *  注册 getUserInfo JML打开页面可以调用
         *  @param {string} clientId 客户端ID
         *  @param {string} secretKeyHash 经过 SHA256 签名的 App 授权密钥
         *  @param {string} seed 随机种子。四个可读ASCII字符，例如：a#B9
         *  @param {string} account 账户
         *  @param {string} machineUuid 一体机机器唯一标识
         *  @param {string} password 密码
         *  @param {integer} userId 用户ID
         */
        dsBridge.registerAsyn(
          'getUserInfo',
          (
            clientId,
            secretKeyHash,
            seed,
            account,
            machineUuid,
            password,
            userId
          ) => {
            if (
              clientId === '' ||
              secretKeyHash === '' ||
              account === '' ||
              machineUuid === '' ||
              password === '' ||
              userId === ''
            ) {
              t.$store.dispatch('popmsg', {
                msg: '未获取到用户信息'
              })
            } else {
              t.account = account
              t.machineUuid = machineUuid
              t.password = password
              t.$store.state.userId = parseInt(userId)
              t.getJMLClientAuth(clientId, secretKeyHash, seed)
            }
          }
        )
      } else {
        /**
         *
         *  注册 getUserInfo app打开页面可以调用
         *  @param {string} clientId 客户端ID
         *  @param {string} secretKeyHash 经过 SHA256 签名的 App 授权密钥
         *  @param {string} seed 随机种子。四个可读ASCII字符，例如：a#B9
         *  @param {string} registerType 注册类型，支持以下字符串值
         *  @param {string} passwordHash 密码 SHA256 encoded
         *  @param {integer} userId 用户ID
         */
        dsBridge.registerAsyn(
          'getUserInfo',
          (clientId, secretKeyHash, seed, token, userId) => {
            if (
              clientId === '' ||
              secretKeyHash === '' ||
              token === '' ||
              userId === ''
            ) {
              t.$store.dispatch('popmsg', {
                msg: '未获取到用户信息'
              })
            } else {
              t.$store.state.userId = parseInt(userId)
              t.$store.state.xAccessToken = token
              t.$store.state.clientId = clientId
              t.$store.state.secretKeyHash = secretKeyHash
              t.$store.state.seed = seed
              t.goView = true
            }
          }
        )
      }
    },
    /**
     *
     *  一体机客户端授权
     *  @param {string} clientId 客户端ID
     *  @param {string} secretKeyHash 经过 SHA256 签名的 App 授权密钥
     *  @param {string} seed 随机种子。四个可读ASCII字符，例如：a#B9
     */
    getJMLClientAuth(clientId, secretKeyHash, seed) {
      const t = this
      const JML = new ApiJML()
      JML.clientAuth(clientId, secretKeyHash, seed).then(res => {
        t.$store.state.authorization = res.data.authorization
        t.getJMLSignIn()
      })
    },
    /**
     *  一体机登录
     */
    getJMLSignIn() {
      const t = this
      const JML = new ApiJML(t.$store.state.authorization)
      JML.signIn(t.account, t.password, t.machineUuid).then(res => {
        t.$store.state.xAccessToken = res.data.access_token
        t.goView = true
      })
    }
  },
  components: {
    MsgPopup,
    Loading
  }
}
</script>

<style>
html,
body {
  margin: 0;
}
img {
  display: block;
  width: 100%;
}
#app {
  font-weight: 300;
  color: #333;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
.landscape {
  -webkit-text-size-adjust: 100%;
  -webkit-text-size-adjust: none;
}
</style>
