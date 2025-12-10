<i18n>
{
  "en": {},
  "zh-Hans": {
    "retrieve-password": "重置密码",
    "password-resetting-method": "请选择以下重置密码的方式",
    "use-mobile": "使用登录手机重置",
    "use-email": "使用安全邮箱重置",
    "use-question": "使用安全问题重置",
    "unbound": "未进行任何绑定",
    "document-title": "重置密码"
  },
  "zh-Hant": {}
}
</i18n>
<template>
  <div class="reset-password">
    <div class="list">
      <div class="item mobile" @click="chooseAWay('mobile-reset')" :style="{borderImageSource: 'url('+borderImg+')'}">
        <div class="left">
          <div class="icon app-bg-color">
            <img src="../assets/app/icon-mobile.svg" alt="">
          </div>
          <div class="text">
            {{$t('use-mobile')}}
          </div>
        </div>
        <div class="push">
          <img src="../assets/app/go-2.svg" alt="">
        </div>
      </div>
      <div class="item email" @click="chooseAWay('email-reset')" :style="{borderImageSource: 'url('+borderImg+')'}">
        <div class="left">
          <div class="icon app-bg-color">
            <img src="../assets/app/icon-email.svg" alt="">
          </div>
          <div class="text">
            {{$t('use-email')}}
          </div>
        </div>
        <div class="push">
          <img src="../assets/app/go-2.svg" alt="">
        </div>
      </div>
      <div class="item question" @click="chooseAWay('question-reset')" :style="{borderImageSource: 'url('+borderImg+')'}">
        <div class="left">
          <div class="icon app-bg-color">
            <img src="../assets/app/icon-vsq.svg" alt="">
          </div>
          <div class="text">
            {{$t('use-question')}}
          </div>
        </div>
        <div class="push">
          <img src="../assets/app/go-2.svg" alt="">
        </div>
      </div>
      <div class="item unbound" @click="chooseAWay('none-reset')" :style="{borderImageSource: 'url('+borderImg+')'}">
        <div class="left">
          <div class="icon app-bg-color">
            <img src="../assets/app/icon-binding.svg" alt="">
          </div>
          <div class="text">
            {{$t('unbound')}}
          </div>
        </div>
        <div class="push">
          <img src="../assets/app/go-2.svg" alt="">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import borderImg from '../assets/app/border-bg.png'
export default {
  name: 'reset-password',
  data () {
    return {
      borderImg
    }
  },
  computed: {
  },
  beforeMount () {
  },
  mounted () {
    const t = this
    t.$store.dispatch('changeTitle', t.$t('document-title'))
    t.$store.dispatch('invokeBridgeMethod', 'showSignInNavigationBar').then((dsBridge) => {
      dsBridge.call('showSignInNavigationBar', {
        enabledShow: true,
        navigationBarTitle: 'resetPassword'
      })
    }).catch(() => {})
    t.$store.state.loading = false
  },
  destroyed () {
  },
  methods: {
    chooseAWay (val) {
      this.$router.push({ name: val })
    }
  },
  components: {
  }
}
</script>
<style scoped>
  .list {
    margin-top: calc(70 / 375 * 100vw);
    padding: 0 calc(15 / 375 * 100vw);
  }
  .landscape .list {
    margin-top: calc(70 / 375 * 100vh);
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }
  .list .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: calc(50 / 375 * 100vw);
    background-color: #ffffff;
    border-image-slice: 26 26;
    border-width: calc(13 / 375 * 100vw);
    border-style: solid;
    border-image-repeat: stretch;
  }
  .landscape .list .item {
    height: calc(49 / 375 * 100vh);
    border-width: calc(13 / 375 * 100vh);
    width: calc(263 / 375 * 100vh);
  }
  .list .item {
    margin: calc(10 / 375 * 100vw) 0;
  }
  .landscape .list .item{
    margin: calc(10 / 375 * 100vh) calc(20 / 375 * 100vh);
  }
  .list .item .left {
    display: flex;
    align-items: center;
  }
  .list .item .left .icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: calc(30 / 375 * 100vw);
    height: calc(30 / 375 * 100vw);
    border-radius: 50%;
    margin-left: calc(15 / 375 * 100vw);
    margin-right: calc(27 / 375 * 100vw);
  }
  .landscape .list .item .left .icon {
    width: calc(30 / 375 * 100vh);
    height: calc(30 / 375 * 100vh);
    margin-left: calc(15 / 375 * 100vh);
    margin-right: calc(27 / 375 * 100vh);
  }
  .mobile .left .icon img {
    width: calc(12 / 375 * 100vw);
  }
  .landscape .mobile .left .icon img {
    width: calc(12 / 375 * 100vh);
  }
  .email .left .icon img {
    width: calc(18 / 375 * 100vw);
  }
  .landscape .email .left .icon img {
    width: calc(18 / 375 * 100vh);
  }
  .question .left .icon img {
    margin-top: 2px;
    margin-right: -2px;
    width: calc(18 / 375 * 100vw);
  }
  .landscape .question .left .icon img {
    width: calc(18 / 375 * 100vh);
  }
  .unbound .left .icon img {
    margin-top: 1px;
    width: calc(17 / 375 * 100vw);
  }
  .landscape .unbound .left .icon img {
    width: calc(17 / 375 * 100vh);
  }
  .list .item .push {
    width: calc(20 / 375 * 100vw);
  }
  .landscape .list .item .push {
    width: calc(20 / 375 * 100vh);
  }
</style>
