<template>
<div>
  <div id="app" class="app mobile-phone" :class="{landscape: $store.state.landscape}">
    <jm-message :status="$store.state.messageStatus" :text="$store.state.messageText"></jm-message>
    <div class="loading" v-if="$store.state.loading">
      <div class="circle">
        <div class="circle__item start app-bg-color"></div>
        <div class="circle__item end app-bg-color"></div>
      </div>
    </div>
    <router-view v-if="isShow"/>
  </div>
</div>
</template>

<script>
import JmMessage from './components/JmMessage.vue'
export default {
  name: 'app',
  data () {
    return {
      isShow: false
    }
  },
  computed: {
    versionPrefix () {
      return process.env.VUE_APP_VERSION.slice(0, 1).toUpperCase()
    },
    version () {
      const t = this
      return t.versionPrefix === 'P' ? t.$t('title') : t.$t('title') + ' ' + t.versionPrefix
    }
  },
  beforeMount () {
  },
  mounted () {
    const t = this
    t.windowWidthChange()
    window.onresize = t.windowWidthChange
    t.$store.dispatch('submitClientAuth').then(() => {
      t.isShow = true
    })
    const dsBridge = require('dsbridge') // 引入 交互插件
    dsBridge.registerAsyn('setAppVersion', (appVersion) => {
      t.$store.state.appVersion = appVersion
    })
    dsBridge.register('getWebVersion', () => {
      return process.env.VUE_APP_VERSION
    })
    dsBridge.register('setSignInUserInfo', () => {
      return {
        token: t.$store.state.xAccessToken,
        userId: parseInt(t.$store.state.userId)
      }
    })
    t.$store.dispatch('invokeBridgeMethod', 'getAppVersion').then((dsBridge) => {
      dsBridge.call('getAppVersion', (res) => {
        t.$store.state.appVersion = res
      })
    }).catch(() => {})
    t.$store.dispatch('invokeBridgeMethod', 'setWebVersion').then((dsBridge) => {
      dsBridge.call('setWebVersion', process.env.VUE_APP_VERSION)
    }).catch(() => {})
    t.$i18n.locale = 'zh-Hans'
  },
  destroyed () {
  },
  methods: {
    /**
    * 监听屏幕宽度
    */
    windowWidthChange () {
      if (window.orientation === 90 || window.orientation === -90) {
        this.$store.state.landscape = true
      } else {
        this.$store.state.landscape = false
      }
    }
  },
  components: {
    JmMessage
  }
}
</script>

<style>
html,body {
  margin: 0;
  padding: 0;
  background-color: #F5F5F5;
  user-select: none;
}
img {
  display: block;
  width: 100%;
}
input {
  padding: 0;
  border: none;
  outline: none;
  display: block;
  width: 100%;
  color: #333333;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #333333;
  position: relative;
}
.mobile-phone {
  font-size: calc(16 / 375 * 100vw);
  min-width: 100%;
}
.landscape.mobile-phone {
  font-size: calc(16 / 375 * 100vh);
}
.landscape {
  -webkit-text-size-adjust: 100%;
  -webkit-text-size-adjust: none;
}
.loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 98;
  background-color: rgba(255, 255, 255, 0.5);
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
.mobile-phone .loading {
  min-width: 100%;
}
@keyframes start
  {
    0% {
      transform: scale(1, 1)
    }
    50% {
      transform: scale(0, 0)
    }
    100% {
      transform: scale(1, 1)
    }
  }
@keyframes end
  {
    0% {
      transform: scale(0, 0)
    }
    50% {
      transform: scale(1, 1)
    }
    100% {
      transform: scale(0, 0)
    }
  }
.circle {
  width: 60px;
  height: 60px;
  position: relative;
}
.circle__item {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  opacity: 0.5;
}
.start {
  animation: start 2s infinite;
}
.end {
  animation: end 2s infinite;
}
.app-color {
  color: #CF9155;
}
.app-bg-color {
  background-color: #CF9155;
}
.input_password {
  padding: 0 calc(15 / 375 * 100vw);
  background-color: #E8E8E8;
  border-radius: 5px;
}
.landscape .input_password {
  padding: 0 calc(15 / 375 * 100vh);
}
.pull__list_bg {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9;
  background-color: rgba(0, 0, 0, 0.6);
}
.pull__list {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
  color: #333333;
  font-weight: 400;
}
.pull__list .items {
  background-color: #ffffff;
  padding: 0 calc(15 / 375 * 100vw);
  max-height: 70vh;
  overflow: auto;
}
.landscape .pull__list .items {
  padding: 0 calc(15 / 375 * 100vh);
  max-height: 60vh;
}
.pull__list .items::-webkit-scrollbar {
  width: 4px;
  background-color: #ffffff;
}
.pull__list .items::-webkit-scrollbar-thumb {
  background-color: #CF9155;
  border-radius: 2px;
}
.pull__list .close {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: calc(44 / 375 * 100vw);
  border-bottom: 1px solid #dddddd;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  background-color: #ffffff;
  padding: 0 calc(20 / 375 * 100vw);
}
.landscape .pull__list .close {
  height: calc(44 / 375 * 100vh);
  padding: 0 calc(20 / 375 * 100vh);
}
.pull__list .close .img {
  width: calc(12 / 375 * 100vw);
}
.landscape .pull__list .close .img {
  width: calc(12 / 375 * 100vh);
}
.pull__list .list-item {
  display: flex;
  font-size: calc(15 / 375 * 100vw);
  justify-content: space-between;
  align-items: center;
  height: calc(44 / 375 * 100vw);
  padding: 0 calc(20 / 375 * 100vw);
}
.landscape .pull__list .list-item {
  font-size: calc(15 / 375 * 100vh);
  height: calc(44 / 375 * 100vh);
  padding: 0 calc(20 / 375 * 100vh);
}
.pull__list .list-item + .list-item {
  border-top: 1px solid #dddddd;
}
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s ease;
}
.slide-fade-enter, .slide-fade-leave-to{
  transform: translateY(25vh);
  opacity: 0;
}
.message-enter-active {
  animation: bounce-in .4s;
}
@keyframes bounce-in {
  0% {
    transform: translateY(calc(-124 / 375 * 100vw));
  }
  50% {
    transform: translateY(calc(20 / 375 * 100vw));
  }
  99% {
    transform: translateY(calc(-1 / 375 * 100vw));
  }
}
.button {
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "STKaiti", STKaiti, sans-serif;
  color: #ffffff;
  font-size: calc(20 / 375 * 100vw);
  height: calc(40 / 375 * 100vw);
  background-image: url(./assets/app/btn-bg.png);
  background-size: 100% 100%;
}
.landscape .button {
  font-size: calc(20 / 375 * 100vh);
  height: calc(40 / 375 * 100vh);
  width: calc(347 / 375 * 100vh);
  margin: 0 auto;
}
.button .save {
  width: calc(39 / 375 * 100vw);
  margin: 0 auto;
}
.landscape .button .save {
  width: calc(39 / 375 * 100vh);
}
.button .next {
  width: calc(55 / 375 * 100vw);
  margin: 0 auto;
}
.landscape .button .next {
  width: calc(55 / 375 * 100vh);
}
.button .signIn {
  width: calc(74 / 375 * 100vw);
  margin: 0 auto;
}
.landscape .button .signIn {
  width: calc(74 / 375 * 100vh);
}
.button .bind {
  width: calc(38 / 375 * 100vw);
  margin: 0 auto;
}
.landscape .button .bind {
  width: calc(38 / 375 * 100vh);
}
.button .affirm {
  width: calc(40 / 375 * 100vw);
  margin: 0 auto;
}
.landscape .button .affirm {
  width: calc(40 / 375 * 100vh);
}
.button .contact-us {
  width: calc(79 / 375 * 100vw);
  margin: 0 auto;
}
.landscape .button .contact-us {
  width: calc(79 / 375 * 100vh);
}
.button .go-offficial {
  width: calc(158 / 375 * 100vw);
  margin: 0 auto;
}
.landscape .button .go-offficial {
  width: calc(158 / 375 * 100vh);
}
.inputs .item + .item {
  margin-top: calc(20 / 375 * 100vw);
}
.landscape .inputs .item + .item {
  margin-top: calc(20 / 375 * 100vh);
}
</style>
