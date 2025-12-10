<i18n>
{
  "en": {},
  "zh-Hans": {
    "retrieve-password": "重置密码",
    "tips": "温馨提示",
    "text": "由于您没有进行过账号绑定，无法自行重置密码如需重置密码，请联系客服。",
    "contact-us": "联系客服",
    "document-title": "重置密码"
  },
  "zh-Hant": {}
}
</i18n>
<template>
  <div class="none-reset">
    <div class="icon">
      <img src="../assets/app/icon-contact.svg" alt="">
    </div>
    <div class="title">
      <div class="line"></div>
      <div class="tips">{{$t('tips')}}</div>
      <div class="line"></div>
    </div>
    <div class="text">
      {{$t('text')}}
    </div>
    <div class="button" @click="contactUs">
     <img class="contact-us" src="../assets/app/fonts/contact-us.svg" alt="">
    </div>
  </div>
</template>
<script>
export default {
  name: 'none-reset',
  data () {
    return {
      stepId: 0,
      email: '',
      evc: '',
      password: '',
      confirmPassword: ''
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
    contactUs () {
      const t = this
      t.$store.dispatch('invokeBridgeMethod', 'showRetrieveUserInfoDialog').then((dsBridge) => {
        dsBridge.call('showRetrieveUserInfoDialog', {
          contactTelephone: '400-928-3900',
          retrieveType: 'retrievePassword'
        })
      }).catch(() => {})
    }
  },
  components: {
  }
}
</script>
<style scoped>
  .none-reset {
    background-color: #ffffff;
    min-height: 100vh;
    padding: 0 calc(15 / 375 * 100vw);
  }
  .landscape .none-reset {
    padding: 0 calc(20 / 375 * 100vh);
  }
  .icon {
    width: calc(94 / 375 * 100vw);
    margin: 0 auto;
    padding: calc(40 / 375 * 100vw) 0;
  }
  .landscape .icon {
    width: calc(94 / 375 * 100vh);
    padding: calc(40 / 375 * 100vh) 0;
  }
  .title {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: calc(18 / 375 * 100vw);
  }
  .landscape .title {
    font-size: calc(18 / 375 * 100vh);
  }
  .title .line {
    width: calc(120 / 375 * 100vw);
    background-color: #999999;
    height: 1px;
  }
  .landscape .title .line {
    width: calc(120 / 375 * 100vh);
  }
  .title .tips {
    margin: 0 calc(10 / 375 * 100vw);
  }
  .landscape .title .tips {
    margin: 0 calc(10 / 375 * 100vh);
  }
  .text {
    font-size: calc(15 / 375 * 100vw);
    line-height: calc(28 / 375 * 100vw);
    text-align: left;
    padding: 0 calc(20 / 375 * 100vw);
    padding-top: calc(30 / 375 * 100vw);
    padding-bottom: calc(50 / 375 * 100vw);
  }
  .landscape .text {
    text-align: center;
    font-size: calc(15 / 375 * 100vh);
    line-height: calc(28 / 375 * 100vh);
    padding: 0 calc(20 / 375 * 100vh);
    padding-top: calc(30 / 375 * 100vh);
    padding-bottom: calc(50 / 375 * 100vh);
  }
</style>
