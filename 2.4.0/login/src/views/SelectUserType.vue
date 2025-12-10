<i18n>
{
  "en": {},
  "zh-Hans": {
    "retrieve-password": "重置密码",
    "tips": "温馨提示",
    "text": "由于您没有进行过账号绑定，无法自行重置密码如需重置密码，请联系客服。",
    "contact-us": "联系客服",
    "document-title": "注册金姆ID"
  },
  "zh-Hant": {}
}
</i18n>
<template>
  <div class="select-user-type">
    <div class="item" @click="routerPush('bound-account')" :style="{borderImageSource: 'url('+borderImg+')'}">
      <div class="left app-color">
        我有老账号，现在注册绑定
        <div>2019年04月12日之前购买过账号的用户请选择此项</div>
      </div>
      <div class="right">
        <img src="../assets/app/go-2.svg" alt="">
      </div>
    </div>
    <div class="item" @click="routerPush('sign-up')" :style="{borderImageSource: 'url('+borderImg+')'}">
      <div class="left">
        我没有金姆ID，现在注册
      </div>
      <div class="right">
        <img src="../assets/app/go-2.svg" alt="">
      </div>
    </div>
  </div>
</template>
<script>
import borderImg from '../assets/app/border-bg.png'
export default {
  name: 'select-user-type',
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
        navigationBarTitle: 'registrationJinmuId'
      })
    }).catch(() => {})
    t.$store.state.loading = false
  },
  destroyed () {
  },
  methods: {
    routerPush (name) {
      this.$router.push({ name: name })
    }
  },
  components: {
  }
}
</script>
<style scoped>
.select-user-type {
  padding: calc(60 / 375 * 100vw) calc(25 / 375 * 100vw);
}
.landscape .select-user-type {
  padding: calc(60 / 375 * 100vh) calc(20 / 375 * 100vh);
}
.item {
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: left;
  border-image-slice: 26 26;
  font-size: calc(18 / 375 * 100vw);
  line-height: calc(18 / 375 * 100vw);
  border-width: calc(13 / 375 * 100vw);
  border-style: solid;
  border-image-repeat: stretch;
  padding: calc(13 / 375 * 100vw) calc(0 / 375 * 100vw) calc(13 / 375 * 100vw) calc(15 / 375 * 100vw);
}
.landscape .item {
  border-image-slice: 26 26;
  font-size: calc(18 / 375 * 100vh);
  line-height: calc(18 / 375 * 100vh);
  border-width: calc(13 / 375 * 100vh);
  padding: calc(13 / 375 * 100vh) calc(0 / 375 * 100vh) calc(13 / 375 * 100vh) calc(15 / 375 * 100vh);
}
.item + .item {
  margin-top: calc(20 / 375 * 100vw);
}
.landscape .item + .item {
  margin-top: calc(20 / 375 * 100vh);
}
.item .left div {
  padding-top: calc(5 / 375 * 100vw);
  font-size: calc(12 / 375 * 100vw);
  line-height: calc(15 / 375 * 100vw);
  color: #999999;
}
.landscape .item .left div {
  padding-top: calc(5 / 375 * 100vh);
  font-size: calc(12 / 375 * 100vh);
  line-height: calc(15 / 375 * 100vh);
}
.item .right {
  font-weight: 700;
  width: calc(20 / 375 * 100vw);
  min-width: calc(23 / 375 * 100vw);
  margin-left: calc(12 / 375 * 100vw);
}
.landscape .item .right {
  width: calc(20 / 375 * 100vh);
  min-width: calc(23 / 375 * 100vh);
  margin-left: calc(12 / 375 * 100vh);
}
.icon {
  width: calc(46 / 375 * 100vw);
  min-width: calc(46 / 375 * 100vw);
  margin-right: calc(12 / 375 * 100vw);
}
.landscape .icon {
  width: calc(46 / 375 * 100vh);
  min-width: calc(46 / 375 * 100vh);
  margin-right: calc(12 / 375 * 100vh);
}
</style>
