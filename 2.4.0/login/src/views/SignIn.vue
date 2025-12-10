<i18n>
{
  "en": {},
  "zh-Hans": {
    "subtitle": "使用手机号<div style='font-size: calc(26 / 375 * 100vw);font-weight: 700;'>登录金姆ID</div>",
    "password-placeholder": "请输入密码",
    "sign-in-mvc": "使用验证码登录",
    "sign-in": "立即登录",
    "sign-up": "注册金姆ID",
    "remember-password": "记住密码",
    "forget-password": "忘记密码?",
    "sign-in-else": "其他登录方式",
    "sign-in-username": "用户名登录(老用户)",
    "remember-disclaimer": "阅读并同意",
    "app-version": "版本号：",
    "sign-in-mobile": "手机号登录",
    "sign-in-password": "使用密码登录",
    "forget-username": "忘记用户名",
    "note": "2019年04月12日之前购买过账号的用户请先注册！"
  },
  "zh-Hant": {}
}
</i18n>
<template>
  <div class="sign-in">
    <div class="title">
      <img src="../assets/app/fonts/login-title.svg" alt="">
    </div>
    <div class="row">
      <div class="left-row">
        <div class="top-row" v-if="selectedSignInId === 0">
          <div class="inputs">
            <div class="item">
              <div class="icon">
                <div class="input" @click="isPull = true">
                  {{areaCode}}
                </div>
                <div class="i">
                  <img src="../assets/app/icon-pull.svg" alt="">
                </div>
                <div class="pull__list_bg" @click="isPull = false" v-if="isPull"></div>
                <transition name="slide-fade">
                  <div class="pull__list" v-if="isPull">
                    <div class="close">
                      <div class="img" @click="isPull = false">
                        <img src="../assets/app/icon-close.svg" alt="">
                      </div>
                    </div>
                    <div class="items">
                      <div class="list-item" v-for="item in $store.state.areaCodeArr" :key="item.value" @click="selectAreaCode(item)">
                        <div>{{item.value}}</div>
                        <div>{{item.key}}</div>
                      </div>
                    </div>
                  </div>
                </transition>
              </div>
              <div class="input">
                <jm-input  type="number" @blur="mobileBlur" v-model="mobile" :placeholder="$t('mobile-placeholder')"></jm-input>
              </div>
            </div>
            <div class="item">
              <div class="icon">
                <div class="duanxin">
                  <img src="../assets/app/icon-login_duanxin.svg" alt="">
                </div>
              </div>
              <div class="input">
                <jm-input  type="number" @blur="mvcBlur" v-model="mvc" :placeholder="$t('mvc-placeholder')" :maxlength="6"></jm-input>
                <div class="mvc" @click="sendSmsNotification" :style="{color: timeoutNum === 60 ? '#CF9155' : '#999999'}">
                  {{timeoutNum === 60 ? $t('mvc-button-text') :  $t('mvc-button-wait', {time: timeoutNum})}}
                </div>
              </div>
            </div>
          </div>
          <div class="mid-row">
          </div>
          <div class="button" @click="signIn" :style="{color: signInClickIn ? '#ffffff' : '#999999'}">
            <img class="signIn" src="../assets/app/fonts/sign-in.svg" alt="">
          </div>
          <div class="mid-else-row">
            <div class="text app-color" @click="routerPush('select-user-type')">
              {{$t('sign-up')}}
            </div>
            <div class="line"></div>
            <div class="text" @click="selectSignIn(2)">
              {{$t('sign-in-password')}}
            </div>
          </div>
        </div>
        <div class="top-row" v-if="selectedSignInId === 2">
          <div class="inputs">
            <div class="item">
              <div class="icon">
                <div class="input" @click="isPull = true">
                  {{areaCode}}
                </div>
                <div class="i">
                  <img src="../assets/app/icon-pull.svg" alt="">
                </div>
                <div class="pull__list_bg" @click="isPull = false" v-if="isPull"></div>
                <transition name="slide-fade">
                  <div class="pull__list" v-if="isPull">
                    <div class="close">
                      <div class="img" @click="isPull = false">
                        <img src="../assets/app/icon-close.svg" alt="">
                      </div>
                    </div>
                    <div class="items">
                      <div class="list-item" v-for="item in $store.state.areaCodeArr" :key="item.value" @click="selectAreaCode(item)">
                        <div>{{item.value}}</div>
                        <div>{{item.key}}</div>
                      </div>
                    </div>
                  </div>
                </transition>
              </div>
              <div class="input">
                <jm-input  type="number" @blur="mobileBlur" v-model="mobile" :placeholder="$t('mobile-placeholder')"></jm-input>
              </div>
            </div>
            <div class="item">
              <div class="icon">
                <div class="password">
                  <img src="../assets/app/icon-password.svg" alt="">
                </div>
              </div>
              <div class="input">
                <jm-input  type="password" @blur="passwordBlur" v-model="password" :placeholder="$t('password-placeholder')" :maxlength="20"></jm-input>
              </div>
            </div>
          </div>
          <div class="mid-row">
            <div class="left">
              <div class="icon checkt">
                <img src="../assets/app/icon-checkt-select.svg" alt="" v-if="isRemember" @click="isRemember=false">
                <img src="../assets/app/icon-checkt.svg" alt="" v-else @click="isRemember=true">
              </div>
              <div class="text" @click="isRemember=!isRemember">
                {{$t('remember-password')}}
              </div>
            </div>
            <div class="right app-color" @click="routerPush('reset-password')">
              {{$t('forget-password')}}
            </div>
          </div>
          <div class="button" @click="signIn" :style="{color: signInClickIn ? '#ffffff' : '#999999'}">
            <img class="signIn" src="../assets/app/fonts/sign-in.svg" alt="">
          </div>
          <div class="mid-else-row">
            <div class="text app-color" @click="routerPush('select-user-type')">
              {{$t('sign-up')}}
            </div>
            <div class="line"></div>
            <div class="text" @click="selectSignIn(0)">
              {{$t('sign-in-mvc')}}
            </div>
          </div>
        </div>
      </div>
      <div class="right-row">
        <div class="note">
          {{$t('note')}}
        </div>
        <div class="bottom-row">
          <div><input class="agree-input" type="checkbox" id="inputId" v-model="agreeValue" value="isAgreeValue"><label class="label-input" for="inputId"></label>{{$t('remember-disclaimer')}}<span @click="routerPush('disclaimer')">{{$t('disclaimer')}}</span></div>
          <div>{{$t('app-version')}}{{$store.state.appVersion}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ApiSignIn, ApiNotification } from '../api'
import JmInput from '../components/JmInput'
import JS from '../js'
export default {
  name: 'sign-in',
  data () {
    return {
      selectedSignInId: 2,
      isRemember: true,
      areaCode: '+86',
      isPull: false, // 国码弹窗是否显示
      mobile: '',
      username: '',
      mvc: '',
      password: '',
      serialNumber: '',
      timeoutNum: 60,
      timeout: '',
      signInClickIn: true,
      mvcClickIn: true,
      agreeValue: false,
      isAgreeValue: true
    }
  },
  watch: {
    areaCode (val) {
      const t = this
      t.mobileBlur()
    },
    isPull (val) {
      if (val) {
        document.body.removeEventListener('touchmove', this.closeTouch)
      } else {
        document.body.addEventListener('touchmove', this.closeTouch, { passive: false })
      }
    }
  },
  computed: {
  },
  beforeMount () {
  },
  mounted () {
    const t = this
    const MobileDetect = require('mobile-detect')
    const md = new MobileDetect(navigator.userAgent)
    if (md.mobile() !== 'iPad') {
      document.body.addEventListener('touchmove', this.closeTouch, { passive: false })
    }
    t.$store.dispatch('invokeBridgeMethod', 'showSignInNavigationBar').then((dsBridge) => {
      dsBridge.call('showSignInNavigationBar', {
        enabledShow: false,
        navigationBarTitle: ''
      })
    }).catch(() => {})
    if (t.$route.query.id) {
      t.selectedSignInId = parseInt(t.$route.query.id)
    }
    t.selectSignIn(t.selectedSignInId)
    t.$store.state.loading = false
  },
  destroyed () {
    document.body.removeEventListener('touchmove', this.closeTouch)
  },
  methods: {
    selectAreaCode (item) {
      this.areaCode = item.key
      this.isPull = false
    },
    closeTouch (e) {
      e.preventDefault()
    },
    selectSignIn (id) {
      const t = this
      t.areaCode = '+86'
      t.mobile = ''
      t.username = ''
      t.mvc = ''
      t.password = ''
      t.selectedSignInId = id
      t.$router.push({ name: 'sign-in', query: { id: id } })
      if (id === 2) {
        t.$store.dispatch('invokeBridgeMethod', 'getCookie').then((dsBridge) => {
          dsBridge.call('getCookie', 'isRemember', (value) => {
            t.isRemember = value
            if (value) {
              dsBridge.call('getCookie', 'phone', (value) => {
                if (value === '') {
                  t.isRemember = false
                }
                t.mobile = value
              })
              dsBridge.call('getCookie', 'phone_password', (value) => {
                if (value === '') {
                  t.isRemember = false
                }
                t.password = value
              })
            }
          })
        }).catch(() => {
          t.isRemember = false
        })
      }
    },
    routerPush (name) {
      this.$router.push({ name: name })
    },
    phonePromise () {
      const t = this
      return new Promise((resolve, reject) => {
        if (t.mobile === '') {
          t.$store.dispatch('popMessage', {
            type: 'app',
            text: t.$t('phone-number-empty')
          })
        } else if (!(JS.validateMobilePhone(t.areaCode, t.mobile))) {
          t.$store.dispatch('popMessage', {
            type: 'app',
            text: t.$t('phone-number-error')
          })
        } else {
          resolve()
        }
      })
    },
    privacyPromise () {
      const t = this
      return new Promise((resolve, reject) => {
        t.$store.dispatch('popMessage', {
          type: 'app',
          text: '请勾选隐私协议'
        })
      })
    },
    mvcPromise () {
      const t = this
      return new Promise((resolve, reject) => {
        if (t.serialNumber === '') {
          t.$store.dispatch('popMessage', {
            type: 'app',
            text: t.$t('mvc-none-click')
          })
        } else {
          if (!(/^\d{6}$/.test(t.mvc))) {
            t.$store.dispatch('popMessage', {
              type: 'app',
              text: t.$t('mvc-error')
            })
          } else {
            resolve()
          }
        }
      })
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
    mvcBlur () {
      const t = this
      if (t.mvc !== '') {
        t.mvcPromise()
      }
    },
    mobileBlur () {
      const t = this
      if (t.mobile !== '') {
        t.phonePromise()
      }
    },
    passwordBlur () {
      const t = this
      if (t.password !== '') {
        t.passwordPromise()
      }
    },
    usernameBlur () {
      const t = this
      if (t.username !== '') {
        t.usernamePromise()
      }
    },
    countdown () {
      const t = this
      if (t.timeoutNum > 0) {
        t.timeoutNum--
        t.timeout = setTimeout(() => {
          t.countdown()
        }, 1000)
      } else {
        t.timeoutNum = 60
        clearTimeout(t.timeout)
      }
    },
    sendSmsNotification () {
      const t = this
      const notification = new ApiNotification(t.$store.state.authorization)
      t.phonePromise().then(() => {
        if (t.mvcClickIn) {
          if (t.timeoutNum === 60) {
            t.mvcClickIn = false
            notification.sendSmsNotification('sign_in', t.mobile, t.areaCode, t.$i18n.locale).then((res) => {
              t.mvcClickIn = true
              if (res.data.acknowledged === false) {
                t.$store.dispatch('popMessage', {
                  type: 'app',
                  text: res.data.message
                })
              } else {
                t.countdown()
                t.serialNumber = res.data.serial_number
              }
            }).catch(() => {
              t.mvcClickIn = true
            })
          }
        }
      })
    },
    signIn () {
      const t = this
      if (t.agreeValue) {
        const signIn = new ApiSignIn(t.$store.state.authorization)
        const sha256 = require('sha-256-js')
        let method = ''
        let machine = ''
        let seed = JS.generateSeed()
        const MobileDetect = require('mobile-detect')
        const md = new MobileDetect(navigator.userAgent)
        machine = md.mobile()
        t.phonePromise().then(() => {
          if (t.selectedSignInId === 0) {
            method = 'phone_mvc'
            t.mvcPromise().then(() => {
              if (t.signInClickIn) {
                t.signInClickIn = false
                signIn.signIn(method, t.username, t.mobile, t.mvc, sha256(t.password + seed), seed, t.serialNumber, t.areaCode, machine).then((res) => {
                  t.signInClickIn = true
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
                  }).catch(() => {})
                }).catch(() => {
                  t.signInClickIn = true
                })
              }
            })
          }
          if (t.selectedSignInId === 2) {
            method = 'phone_password'
            t.passwordPromise().then(() => {
              if (t.signInClickIn) {
                t.signInClickIn = false
                signIn.signIn(method, t.username, t.mobile, t.mvc, sha256(t.password + seed), seed, t.serialNumber, t.areaCode, machine).then((res) => {
                  t.signInClickIn = true
                  t.$store.dispatch('invokeBridgeMethod', 'setCookie').then((dsBridge) => {
                    dsBridge.call('setCookie', {
                      phone: t.mobile,
                      phone_password: t.password,
                      isRemember: t.isRemember
                    })
                  }).catch(() => {})
                  t.$store.dispatch('invokeBridgeMethod', 'getSignInUserInfo').then((dsBridge) => {
                    dsBridge.call('getSignInUserInfo', {
                      token: res.data.access_token,
                      userId: parseInt(res.data.user_id)
                    })
                  }).catch(() => {})
                }).catch(() => {
                  t.signInClickIn = true
                })
              }
            })
          }
        })
      } else {
        t.privacyPromise()
      }
    }
  },
  components: {
    JmInput
  }
}
</script>
<style scoped>
  .sign-in {
    padding: 0 calc(15 / 375 * 100vw);
    box-sizing: border-box;
    min-height: 100vh;
  }
  .landscape .sign-in {
    padding: 0 calc(20 / 375 * 100vh);
  }
  .title {
    padding-bottom: calc(35 / 375 * 100vw);
    padding-top: 10vh;
    width: calc(141 / 375 * 100vw);
    margin: 0 auto;
  }
  .landscape .title {
    padding-bottom: calc(35 / 375 * 100vh);
    padding-top: calc(25 / 375 * 100vh);
    width: calc(141 / 375 * 100vh);
  }
  .landscape .row {
    display: flex;
    justify-content: center;
  }
  .landscape .left-row {
    width: calc(347 / 375 * 100vh);
  }
  .right-row {
    padding-top: calc(60 / 375 * 100vw);
  }
  .landscape .right-row {
    margin-left: calc(25 / 375 * 100vh);
    padding-top: 0;
    width: calc(245 / 375 * 100vh);
  }
  .inputs .item {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #E8E8E8;
    border-radius: 5px
  }
  .input {
    background-color: rgba(255, 255, 255, 0);
    color: #CF9155;
    font-weight: 700;
    font-size: calc(16 / 375 * 100vw);
    height: calc(44 / 375 * 100vw);
  }
  .landscape .input {
    font-size: calc(16 / 375 * 100vh);
    height: calc(44 / 375 * 100vh);
  }
  input::placeholder {
    color: #CF9155;
    font-size: calc(16 / 375 * 100vw);
  }
  .landscape input::placeholder {
    font-size: calc(16 / 375 * 100vh);
  }
  .inputs .item .icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: calc(73 / 375 * 100vw);
    min-width: calc(73 / 375 * 100vw);
    font-weight: 700;
    position: relative;
    border-top-left-radius: 5px;
  }
  .landscape .inputs .item .icon {
    width: calc(73 / 375 * 100vh);
    min-width: calc(73 / 375 * 100vh);
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
  .inputs .item .icon input {
    padding-left: calc(15 / 375 * 100vw);
  }
  .landscape .inputs .item .icon input {
    padding-left: calc(15 / 375 * 100vh);
  }
  .inputs .item .icon .password {
    width: calc(18 / 375 * 100vw);
  }
  .landscape .inputs .item .icon .password {
    width: calc(18 / 375 * 100vh);
  }
  .inputs .item .icon .duanxin {
    width: calc(18 / 375 * 100vw);
  }
  .landscape .inputs .item .icon .duanxin {
    width: calc(18 / 375 * 100vh);
  }
  .inputs .item .icon .username {
    width: calc(25 / 375 * 100vw);
  }
  .landscape .inputs .item .icon .username {
    width: calc(25 / 375 * 100vw);
  }
  .inputs .item .input {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
  .inputs .item .input .mvc {
    text-align: left;
    font-size: calc(14 / 375 * 100vw);
    min-width: calc(120 / 375 * 100vw);
  }
  .landscape .inputs .item .input .mvc {
    font-size: calc(14 / 375 * 100vh);
    min-width: calc(120 / 375 * 100vh);
  }
  .mid-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: calc(14 / 375 * 100vw);
    line-height: calc(14 / 375 * 100vw);
    height: calc(60 / 375 * 100vw);
    padding: 0 calc(20 / 375 * 100vw);
  }
  .landscape .mid-row {
    font-size: calc(14 / 375 * 100vh);
    line-height: calc(14 / 375 * 100vh);
    height: calc(60 / 375 * 100vh);
    padding: 0 calc(20 / 375 * 100vh);
  }
  .mid-else-row {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: calc(14 / 375 * 100vw);
    line-height: calc(14 / 375 * 100vw);
    height: calc(40 / 375 * 100vw);
    padding: 0 calc(20 / 375 * 100vw);
    color: #8F8F8F;
  }
  .landscape .mid-else-row {
    font-size: calc(14 / 375 * 100vh);
    line-height: calc(14 / 375 * 100vh);
    height: calc(40 / 375 * 100vh);
    padding: 0 calc(20 / 375 * 100vh);
  }
  .mid-else-row .line {
    width: 1px;
    height: calc(9 / 375 * 100vw);
    background-color: #8F8F8F;
    margin: 0 calc(13 / 375 * 100vw);
  }
  .landscape .mid-else-row .line {
    height: calc(9 / 375 * 100vh);
    margin: 0 calc(13 / 375 * 100vh);
  }
  .mid-row .left {
    display: flex;
    align-items: flex-end;
  }
  .mid-row .right {
    display: flex;
    align-items: center;
  }
  .mid-row .right .line {
    background-color: #ffffff;
    height:calc(15 / 375 * 100vw);
    width: 1px;
    margin: 0 calc(10 / 375 * 100vw);
  }
  .landscape .mid-row .right .line {
    height:calc(15 / 375 * 100vh);
    margin: 0 calc(10 / 375 * 100vh);
  }
  .mid-row .icon {
    width: calc(11 / 375 * 100vw);
    margin-right: calc(13 / 375 * 100vw);
  }
  .landscape .mid-row .icon {
    width: calc(11 / 375 * 100vh);
    margin-right: calc(13 / 375 * 100vh);
  }
  .mid-row .icon.password {
    width: calc(23 / 375 * 100vw);
    margin-right: calc(10 / 375 * 100vw);
  }
  .landscape .mid-row .icon.password {
    width: calc(23 / 375 * 100vh);
    margin-right: calc(10 / 375 * 100vh);
  }
  .mid-row .icon.checkt {
    width: calc(15 / 375 * 100vw);
    margin-right: calc(6 / 375 * 100vw);
  }
  .landscape .mid-row .icon.checkt {
    width: calc(15 / 375 * 100vh);
    margin-right: calc(6 / 375 * 100vh);
  }
  .else .bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: calc(14 / 375 * 100vw);
  }
  .landscape .else .bar {
    font-size: calc(14 / 375 * 100vh);
  }
  .else .bar .row {
    width: calc(114 / 375 * 100vw);
    height: 1px;
    background-color: #ffffff;
  }
  .landscape .else .bar .row {
    width: calc(114 / 375 * 100vh);
  }
  .else .way {
    padding-bottom: calc(29 / 375 * 100vw);
    font-size: calc(15 / 375 * 100vw);
  }
  .landscape .else .way {
    padding-bottom: calc(29 / 375 * 100vh);
    font-size: calc(15 / 375 * 100vh);
  }
  .else .icon {
    width: calc(32 / 375 * 100vw);
    margin: calc(5 / 375 * 100vw) auto;
  }
  .landscape .else .icon {
    width: calc(32 / 375 * 100vh);
    margin: calc(5 / 375 * 100vh) auto;
  }
  .bottom-row {
    padding-top: 12vh;
    font-size: calc(12 / 375 * 100vw);
    color: #999999;
  }
  .landscape .bottom-row {
    padding-top: calc(38 / 375 * 100vh);
    font-size: calc(12 / 375 * 100vh);
  }
  .bottom-row span {
    color: #CF9155;
  }
  .note {
    border: 2px dashed #CF9155;
    border-radius: 5px;
    padding: calc(16 / 375 * 100vw) calc(60 / 375 * 100vw);
    font-size: calc(16 / 375 * 100vw);
    font-weight: 700;
    color: #666666;
  }
  .landscape .note {
    padding: calc(30 / 375 * 100vh) calc(42 / 375 * 100vh);
    font-size: calc(16 / 375 * 100vh);
  }
  .agree-input {
    display: none;
  }
  .label-input {
    display: inline-block;
    width: calc(12 / 375 * 100vw);
    height: calc(12 / 375 * 100vw);
    border-radius: 2px;
    border: calc(1 / 375 * 100vw) solid #999;
    position: relative;
    margin-right: 3px;
    top: calc(3 / 375 * 100vw);
    cursor: pointer;
  }
  .label-input:before {
      display: inline-block;
      content: " ";
      width: calc(7 / 400 * 100vw);
      border: calc(1 / 200 * 100vw) solid #fff;
      height: calc(1 / 110 * 100vw);
      border-top: none;
      border-right: none;
      transform: rotate(-45deg);
      top: calc(1 / 200 * 100vw);
      left: calc(1 / 250 * 100vw);
      position: absolute;
      opacity: 0;
  }
  .agree-input:checked+.label-input {
      background: #666;
  }
  .agree-input:checked+.label-input::before{
      opacity: 1;
      transform: all 0.5s;
  }
</style>
