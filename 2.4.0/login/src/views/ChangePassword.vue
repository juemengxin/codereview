<i18n>
{
  "en": {},
  "zh-Hans": {
    "title": "您可以选择修改密码，修改完成后，即可使用<span style='color: #CF9155;'>手机号和此密码</span>登录；若您直接跳过当前步骤不修改密码，您仍可使用<span style='color: #CF9155;'>手机号和原来的密码</span>登录。",
    "password-placeholder": "8-20位，同时包含数字和字母",
    "set-password": "设置密码",
    "confirm-password": "确认密码",
    "document-title": "修改密码"
  },
  "zh-Hant": {}
}
</i18n>
<template>
  <div class="change-password">
    <div class="title" v-html="$t('title')">
    </div>
    <div class="top-row">
      <div class="inputs">
        <div class="item">
          <div class="left">
            <span class="app-color">*</span>{{$t('set-password')}}
          </div>
          <jm-input iClass="input_password" type="password" @blur="passwordBlur" v-model="password" :placeholder="$t('password-placeholder')" :maxlength="20"></jm-input>
        </div>
        <div class="item">
          <div class="left">
            <span class="app-color">*</span>{{$t('confirm-password')}}
          </div>
          <jm-input iClass="input_password" type="password" @blur="confirmPasswordBlur" v-model="confirmPassword" :placeholder="$t('confirm-password-placeholder')" :maxlength="20"></jm-input>
        </div>
      </div>
      <div class="button" @click="changePassword">
        <img class="affirm" src="../assets/app/fonts/affirm.svg" alt="">
      </div>
    </div>
  </div>
</template>
<script>
import { ApiUser, ApiSignIn } from '../api'
import JmInput from '../components/JmInput'
import JS from '../js'
export default {
  name: 'change-password',
  data () {
    return {
      password: '',
      confirmPassword: '',
      changeClickIn: true
    }
  },
  watch: {
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
        navigationBarTitle: 'changePassword'
      })
    }).catch(() => {})
    if (t.$store.state.xAccessToken !== '') {
      if (t.$store.state.userId !== '') {
        if (t.$store.state.oldHashedPassword !== '') {
          if (t.$store.state.oldPasswordSeed !== '') {
            t.$store.state.loading = false
          } else {
            t.routerPush('sign-in')
          }
        } else {
          t.routerPush('sign-in')
        }
      } else {
        t.routerPush('sign-in')
      }
    } else {
      t.routerPush('sign-in')
    }
  },
  destroyed () {
  },
  methods: {
    routerPush (name) {
      this.$router.push({ name: name })
    },
    passwordPromise () {
      const t = this
      return new Promise((resolve, reject) => {
        if (JS.validatePassword(t.password)) {
          resolve()
        } else {
          t.$store.dispatch('popMessage', {
            type: 'app',
            text: t.$t('password-format-error')
          })
        }
      })
    },
    confirmPasswordPromise () {
      const t = this
      return new Promise((resolve, reject) => {
        if (t.password === t.confirmPassword) {
          resolve()
        } else {
          t.$store.dispatch('popMessage', {
            type: 'app',
            text: t.$t('inconsistent-password')
          })
        }
      })
    },
    passwordBlur () {
      const t = this
      if (t.password !== '') {
        t.passwordPromise()
      }
    },
    confirmPasswordBlur () {
      const t = this
      if (t.confirmPassword !== '') {
        if (t.password === '') {
          t.$store.dispatch('popMessage', {
            type: 'app',
            text: t.$t('password-format-error')
          })
        } else {
          t.passwordPromise().then(() => {
            t.confirmPasswordPromise()
          })
        }
      }
    },
    signIn () {
      const t = this
      const signIn = new ApiSignIn(t.$store.state.authorization)
      const sha256 = require('sha-256-js')
      let method = ''
      let machine = ''
      let seed = JS.generateSeed()
      const MobileDetect = require('mobile-detect')
      const md = new MobileDetect(navigator.userAgent)
      machine = md.mobile()
      method = 'username_password'
      signIn.signIn(method, t.$store.state.oldUsername, '', '', sha256(t.confirmPassword + seed), seed, '', '', machine).then((res) => {
        t.$store.dispatch('invokeBridgeMethod', 'setCookie').then((dsBridge) => {
          dsBridge.call('setCookie', {
            phone: '',
            phone_password: '',
            isRemember: false
          })
        }).catch(() => {})
        t.$store.dispatch('invokeBridgeMethod', 'getSignInUserInfo').then((dsBridge) => {
          dsBridge.call('getSignInUserInfo', {
            token: res.data.access_token,
            userId: parseInt(res.data.user_id)
          })
        }).catch(() => {
          t.changeClickIn = true
        })
      }).catch(() => {
        t.changeClickIn = true
      })
    },
    changePassword () {
      const t = this
      t.passwordPromise().then(() => {
        t.confirmPasswordPromise().then(() => {
          if (t.changeClickIn) {
            t.changeClickIn = false
            const user = new ApiUser(t.$store.state.authorization, t.$store.state.xAccessToken)
            user.userModifyPassword(t.$store.state.userId, t.$store.state.oldHashedPassword, t.confirmPassword, t.$store.state.oldPasswordSeed).then(() => {
              t.signIn()
            }).catch(() => {
              t.changeClickIn = true
            })
          }
        })
      })
    }
  },
  components: {
    JmInput
  }
}
</script>
<style scoped>
  .change-password {
    min-height: 100vh;
    padding: 0 calc(15 / 375 * 100vw);
  }
  .landscape .change-password {
    padding: 0 calc(20 / 375 * 100vh);
  }
  .title {
    padding: calc(20 / 375 * 100vw) 0;
    color: #666666;
    text-align: left;
    font-size: calc(14 / 375 * 100vw);
  }
  .landscape .title {
    padding: calc(20 / 375 * 100vh) 0;
    font-size: calc(14 / 375 * 100vh);
  }
  .inputs .item {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  input {
    background-color: rgba(255, 255, 255, 0);
    color: #333333;
    font-size: calc(16 / 375 * 100vw);
    height: calc(44 / 375 * 100vw);
    text-align: right;
  }
  .landscape input {
    font-size: calc(16 / 375 * 100vh);
    height: calc(44 / 375 * 100vh);
  }
  input::placeholder {
    color: #E8E8E8;
    font-size: calc(16 / 375 * 100vw);
    text-align: right;
  }
  .landscape input::placeholder {
    font-size: calc(16 / 375 * 100vh);
  }
  .left {
    text-align: left;
    font-size: calc(14 / 375 * 100vw);
    padding-right: calc(10 / 375 * 100vw);
    width: calc(73 / 375 * 100vw);
    min-width: calc(73 / 375 * 100vw);
  }
  .landscape .left {
    font-size: calc(14 / 375 * 100vh);
    padding-right: calc(10 / 375 * 100vh);
    width: calc(73 / 375 * 100vh);
    min-width: calc(73 / 375 * 100vh);
  }
  .inputs .item .icon {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: calc(16 / 375 * 100vw);
    font-weight: 700;
    width: calc(73 / 375 * 100vw);
    min-width: calc(73 / 375 * 100vw);
    position: relative;
  }
  .landscape .inputs .item .icon {
    font-size: calc(16 / 375 * 100vh);
    width: calc(73 / 375 * 100vh);
    min-width: calc(73 / 375 * 100vh);
  }
  .inputs .item .icon input {
    font-weight: 700;
    padding-left: calc(15 / 375 * 100vw);
  }
  .landscape .inputs .item .icon input {
    padding-left: calc(15 / 375 * 100vh);
  }
  .inputs .item .line {
    height: calc(20 / 375 * 100vw);
    width: 1px;
    margin-right: calc(12 / 375 * 100vw);
    background-color: #dddddd;
  }
  .landscape .inputs .item .line {
    height: calc(20 / 375 * 100vh);
    margin-right: calc(12 / 375 * 100vh);
  }
  .inputs .item .mvc {
    text-align: center;
    font-size: calc(15 / 375 * 100vw);
    min-width: calc(120 / 375 * 100vw);
    color: #CF9155;
  }
  .landscape .inputs .item .mvc {
    font-size: calc(15 / 375 * 100vh);
    min-width: calc(120 / 375 * 100vh);
  }
  .inputs .item .icon .i {
    position: absolute;
    right: calc(5 / 375 * 100vw);
    top: calc(20 / 375 * 100vw);
    width: calc(9 / 375 * 100vw);
  }
  .landscape .inputs .item .icon .i {
    right: calc(5 / 375 * 100vh);
    top: calc(20 / 375 * 100vh);
    width: calc(9 / 375 * 100vh);
  }
  .button {
    margin-top: calc(60 / 375 * 100vw);
  }
  .landscape .button {
    margin-top: calc(40 / 375 * 100vh);
  }
  .bottom-row {
    height: calc(50 / 375 * 100vw);
    font-size: calc(12 / 375 * 100vw);
    color: #999999;
  }
  .landscape .bottom-row {
    height: calc(50 / 375 * 100vh);
    font-size: calc(12 / 375 * 100vh);
  }
  .bottom-row span {
    color: #CF9155;
  }
</style>
