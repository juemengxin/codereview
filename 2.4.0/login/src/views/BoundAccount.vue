<i18n>
{
  "en": {},
  "zh-Hans": {
    "username-placeholder": "请输入老账号",
    "username-empty": "老账户为空",
    "has-sign-up": "您已注册过金姆ID,可以直接登录",
    "document-title": "绑定账号"
  },
  "zh-Hant": {}
}
</i18n>
<template>
  <div class="bind-account">
    <div class="top-row">
      <div class="inputs">
        <div class="item">
          <jm-input type="text" @blur="usernameBlur" v-model="username" :placeholder="$t('username-placeholder')"></jm-input>
        </div>
        <div class="item">
          <jm-input type="password" @blur="passwordBlur" v-model="password" :placeholder="$t('password-placeholder')" :maxlength="20"></jm-input>
        </div>
      </div>
      <div class="button" @click="boundAccount">
        <img class="next" src="../assets/app/fonts/next.svg" alt="">
      </div>
    </div>
  </div>
</template>
<script>
import { ApiSignIn } from '../api'
import JmInput from '../components/JmInput'
import JS from '../js'
export default {
  name: 'bind-account',
  data () {
    return {
      username: '',
      password: '',
      nextClickIn: true
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
        navigationBarTitle: 'boundAccount'
      })
    }).catch(() => {})
    t.$store.state.loading = false
  },
  destroyed () {
  },
  methods: {
    routerPush (name) {
      this.$router.push({ name: name })
    },
    usernamePromise () {
      const t = this
      return new Promise((resolve, reject) => {
        if (t.username === '') {
          t.$store.dispatch('popMessage', {
            type: 'app',
            text: t.$t('username-empty')
          })
        } else {
          resolve()
        }
      })
    },
    usernameBlur () {
      const t = this
      if (t.username !== '') {
        t.usernamePromise()
      }
    },
    passwordPromise () {
      const t = this
      return new Promise((resolve, reject) => {
        if (t.password === '') {
          t.$store.dispatch('popMessage', {
            type: 'app',
            text: t.$t('password-empty')
          })
        } else {
          resolve()
        }
      })
    },
    passwordBlur () {
      const t = this
      if (t.password !== '') {
        t.passwordPromise()
      }
    },
    boundAccount () {
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
      t.usernamePromise().then(() => {
        t.passwordPromise().then(() => {
          if (t.nextClickIn) {
            t.nextClickIn = false
            signIn.signIn(method, t.username, '', '', sha256(t.password + seed), seed, '', '', machine).then((res) => {
              t.nextClickIn = true
              t.$store.state.xAccessToken = res.data.access_token
              t.$store.state.userId = res.data.user_id.toString()
              t.$store.state.oldHashedPassword = sha256(t.password + seed)
              t.$store.state.oldPasswordSeed = seed
              t.$store.state.oldUsername = t.username
              if (res.data.is_profile_completed) {
                if (res.data.has_set_phone) {
                  t.$store.dispatch('popMessage', {
                    type: 'app',
                    text: t.$t('has-sign-up')
                  })
                  t.$router.push({ name: 'sign-in' })
                } else {
                  t.$router.push({ name: 'bound-mobile' })
                }
              } else {
                t.$store.state.loading = true
                t.$router.push({ name: 'user-info', query: { from: 'bind-account', hasSetPhone: res.data.has_set_phone } })
              }
            }).catch(() => {
              t.nextClickIn = true
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
  .bind-account {
    min-height: 100vh;
    padding: 0 calc(15 / 375 * 100vw);
  }
  .landscape .bind-account {
    padding: 0 calc(20 / 375 * 100vh);
  }
  .inputs .item {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #E8E8E8;
    border-radius: 5px;
    padding-left: calc(15 / 375 * 100vw);
  }
  .landscape .inputs .item {
    padding-left: calc(15 / 375 * 100vh);
  }
  input {
    background-color: rgba(255, 255, 255, 0);
    color: #333333;
    font-size: calc(16 / 375 * 100vw);
    height: calc(44 / 375 * 100vw);
  }
  .landscape input {
    font-size: calc(16 / 375 * 100vh);
    height: calc(44 / 375 * 100vh);
  }
  input::placeholder {
    color: #E8E8E8;
    font-size: calc(16 / 375 * 100vw);
  }
  .landscape input::placeholder {
    font-size: calc(16 / 375 * 100vh);
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
  .top-row {
    padding-top: calc(20 / 375 * 100vw);
    min-height: calc(100vh - (70 / 375 * 100vw));
  }
  .landscape .top-row {
    padding-top: calc(20 / 375 * 100vh);
    min-height: calc(100vh - (70 / 375 * 100vh));
  }
  .bottom-row {
    height: calc(50 / 375 * 100vw);
    font-size: calc(12 / 375 * 100vw);
    color: #999999;
  }
  .landscape .bottom-row {
    height: calc(50 / 375 * 100vh);
    font-size: calc(12 / 375 * 100vh);
    color: #999999;
  }
  .bottom-row span {
    color: #CF9155;
  }
</style>
