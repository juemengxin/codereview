<i18n>
{
  "en": {},
  "zh-Hans": {
    "step-one-subtitle": "1.验证手机号",
    "step-two-subtitle": "2.重置密码",
    "new-password": "新密码",
    "confirm-password": "确认密码",
    "password-placeholder": "8-20个字符，同时包含数字和字母",
    "confirm-password-placeholder": "请再次输入密码",
    "count-one": "当前账号 手机号 ",
    "count-two": "，请重置密码",
    "document-title": "重置密码"
  },
  "zh-Hant": {}
}
</i18n>
<template>
  <div class="mobile-reset">
    <div class="title">
      <div class="row">
        <div class="item" :style="{backgroundColor: stepId===0 ? '#CF9155' : '#999999'}"></div>
        <div class="item" :style="{backgroundColor: stepId===1 ? '#CF9155' : '#999999'}"></div>
      </div>
      <div class="text">
        <div :style="{color: stepId===0 ? '#CF9155' : '#666666'}">{{$t('step-one-subtitle')}}</div>
        <div :style="{color: stepId===1 ? '#CF9155' : '#666666'}">{{$t('step-two-subtitle')}}</div>
      </div>
    </div>
    <div class="top-row"  v-if="stepId===0">
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
          <jm-input  type="number" @blur="mobileBlur" v-model="mobile" :placeholder="$t('mobile-placeholder')"></jm-input>
        </div>
        <div class="item">
          <div class="icon">
            <div class="icon-img">
              <img src="../assets/app/icon-login_duanxin.svg" alt="">
            </div>
          </div>
          <jm-input type="number" v-model="mvc" :placeholder="$t('mvc-placeholder')" :maxlength="6"></jm-input>
          <div class="mvc" @click="sendSmsNotification" :style="{color: timeoutNum === 60 ? '#CF9155' : '#999999'}">
            {{timeoutNum === 60 ? $t('mvc-button-text') :  $t('mvc-button-wait', {time: timeoutNum})}}
          </div>
        </div>
      </div>
      <div class="button" @click="validateSigninPhone">
        <img class="next" src="../assets/app/fonts/next.svg" alt="">
      </div>
    </div>
    <div class="top-row"  v-if="stepId===1">
      <div class="inputs">
        <div class="count">
          <div class="i">
            <img src="../assets/app/icon-info.svg" alt="">
          </div>
          <div>{{$t('count-one')}}<span>{{mobile.slice(0, 4)+'****'+mobile.slice(8, 11)}}</span>{{$t('count-two')}}</div>
        </div>
        <div class="item password">
          <div class="icon">
            {{$t('new-password')}}
          </div>
          <jm-input iClass="input_password" type="password" @blur="passwordBlur" v-model="password" :placeholder="$t('password-placeholder')" :maxlength="20"></jm-input>
        </div>
        <div class="item password">
          <div class="icon">
            {{$t('confirm-password')}}
          </div>
          <jm-input iClass="input_password" type="password" @blur="confirmPasswordBlur" v-model="confirmPassword" :placeholder="$t('confirm-password-placeholder')" :maxlength="20"></jm-input>
        </div>
      </div>
      <div class="button" @click="setPassword">
        <img class="save" src="../assets/app/fonts/save.svg" alt="">
      </div>
    </div>
  </div>
</template>
<script>
import { ApiUser, ApiNotification } from '../api'
import JmInput from '../components/JmInput'
import JS from '../js'
export default {
  name: 'mobile-reset',
  data () {
    return {
      stepId: 0,
      areaCode: '+86',
      mobile: '',
      mvc: '',
      isPull: false, // 国码弹窗是否显示
      serialNumber: '',
      timeoutNum: 60,
      timeout: '',
      password: '',
      confirmPassword: '',
      mvcClickIn: true,
      validateClickIn: true,
      setClickIn: true
    }
  },
  watch: {
    areaCode (val) {
      const t = this
      t.mobileBlur()
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
    selectAreaCode (item) {
      this.areaCode = item.key
      this.isPull = false
    },
    nextStep () {
      this.stepId++
      if (this.stepId > 1) {
        this.$router.push({ name: 'sign-in' })
      }
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
            notification.sendSmsNotification('reset_password', t.mobile, t.areaCode, t.$i18n.locale).then((res) => {
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
    validateSigninPhone () {
      const t = this
      t.phonePromise().then(() => {
        t.mvcPromise().then(() => {
          if (t.validateClickIn) {
            t.validateClickIn = false
            const user = new ApiUser(t.$store.state.authorization)
            user.validateSigninPhone(t.$store.state.userId, t.mvc, t.mobile, t.serialNumber, t.areaCode, 'reset_password').then((res) => {
              t.verificationNumber = res.data.verification_number
              t.$store.state.userId = res.data.user_id.toString()
              t.nextStep()
              t.validateClickIn = true
            }).catch(() => {
              t.validateClickIn = true
            })
          }
        })
      })
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
    setPassword () {
      const t = this
      t.passwordPromise().then(() => {
        t.confirmPasswordPromise().then(() => {
          if (t.setClickIn) {
            t.setClickIn = false
            const user = new ApiUser(t.$store.state.authorization)
            user.userResetPasswordViaVC(t.$store.state.userId, t.confirmPassword, t.verificationNumber, 'phone').then(() => {
              t.nextStep()
              t.setClickIn = true
            }).catch(() => {
              t.setClickIn = true
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
  .mobile-reset {
    min-height: 100vh;
    padding: 0 calc(15 / 375 * 100vw);
  }
  .landscape .mobile-reset {
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
  .title .row {
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #dddddd;
    height: calc(5 / 375 * 100vw);
    border-radius: 3px;
  }
  .landscape .title .row {
    height: calc(5 / 375 * 100vh);
  }
  .title .row .item {
    background-color: #999999;
    width: calc(11 / 375 * 100vw);
    height: calc(11 / 375 * 100vw);
    border-radius: 50%;
  }
  .landscape .title .row .item {
    width: calc(11 / 375 * 100vh);
    height: calc(11 / 375 * 100vh);
  }
  .title .text {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding-top: calc(15 / 375 * 100vw);
  }
  .landscape .title .text {
    padding-top: calc(15 / 375 * 100vh);
  }
  .title .text div {
    padding-right: calc(16 / 375 * 100vw);
  }
  .landscape .title .text div {
    padding-right: calc(16 / 375 * 100vh);
  }
  .inputs .item {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #E8E8E8;
    border-radius: 5px;
  }
  .inputs .item.password {
    background-color: #F5F5F5;
  }
  .input {
    background-color: rgba(255, 255, 255, 0);
    color: #CF9155;
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
    align-items: center;
    justify-content: center;
    font-size: calc(14 / 375 * 100vw);
    font-weight: 700;
    width: calc(73 / 375 * 100vw);
    min-width: calc(73 / 375 * 100vw);
    position: relative;
  }
  .landscape .inputs .item .icon {
    font-size: calc(14 / 375 * 100vh);
    width: calc(73 / 375 * 100vh);
    min-width: calc(73 / 375 * 100vh);
  }
  .inputs .item.password .icon {
    justify-content: flex-start;
  }
  .inputs .item .icon .icon-img {
    width: calc(18 / 375 * 100vw);
  }
  .landscape .inputs .item .icon .icon-img {
    width: calc(18 / 375 * 100vh);
  }
  .inputs .count {
    height: calc(45 / 375 * 100vw);
    padding: 0;
    color: #666666;
  }
  .landscape .inputs .count {
    height: calc(45 / 375 * 100vh);
  }
  .count {
    display: flex;
    align-items: center;
    font-size: calc(12 / 375 * 100vw);
    padding: 0 calc(15 / 375 * 100vw);
    height: calc(33 / 375 * 100vw);
  }
  .landscape .count {
    font-size: calc(12 / 375 * 100vh);
    padding: 0 calc(15 / 375 * 100vh);
    height: calc(33 / 375 * 100vh);
  }
  .count .i {
    width: calc(15 / 375 * 100vw);
    margin-right: calc(10 / 375 * 100vw);;
  }
  .landscape .count .i {
    width: calc(15 / 375 * 100vh);
    margin-right: calc(10 / 375 * 100vh);;
  }
  .count span {
    color: #CF9155;
    font-weight: 700;
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
    text-align: left;
    font-size: calc(14 / 375 * 100vw);
    min-width: calc(120 / 375 * 100vw);
  }
  .landscape .inputs .item .mvc {
    font-size: calc(14 / 375 * 100vh);
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
  .inputs .item .input {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
  .button {
    margin-top: calc(60 / 375 * 100vw);
  }
  .landscape .button {
    margin-top: calc(40 / 375 * 100vh);
  }
</style>
