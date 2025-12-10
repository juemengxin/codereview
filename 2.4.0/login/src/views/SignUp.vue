<i18n>
{
  "en": {},
  "zh-Hans": {
    "remember-disclaimer": "阅读并同意",
    "document-title": "注册金姆ID"
  },
  "zh-Hant": {}
}
</i18n>
<template>
  <div class="sign-up">
    <div class="top-row">
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
          <jm-input  type="text" @blur="mobileBlur" v-model="mobile" :placeholder="$t('mobile-placeholder')"></jm-input>
        </div>
        <div class="item">
          <div class="icon">
            <div class="icon-img">
              <img src="../assets/app/icon-login_duanxin.svg" alt="">
            </div>
          </div>
          <jm-input  type="number" v-model="mvc" :placeholder="$t('mvc-placeholder')" :maxlength="6"></jm-input>
          <div class="mvc" @click="sendSmsNotification" :style="{color: timeoutNum === 60 ? '#CF9155' : '#999999'}">
            {{timeoutNum === 60 ? $t('mvc-button-text') :  $t('mvc-button-wait', {time: timeoutNum})}}
          </div>
        </div>
      </div>
      <div class="button" @click="signUp">
        <img class="next" src="../assets/app/fonts/next.svg" alt="">
      </div>
    </div>
    <div class="bottom-row">
      <input id="inputId" class="agree-input" type="checkbox" v-model="isAgree" value="agree"><label class="label-input" for="inputId"></label>
      {{$t('remember-disclaimer')}}<span @click="routerPush('disclaimer')">{{$t('disclaimer')}}</span>
    </div>
  </div>
</template>
<script>
import { ApiNotification, ApiUser } from '../api'
import JmInput from '../components/JmInput'
import JS from '../js'
export default {
  name: 'sign-up',
  data () {
    return {
      areaCode: '+86',
      isPull: false, // 国码弹窗是否显示
      mobile: '',
      mvc: '',
      serialNumber: '',
      timeoutNum: 60,
      timeout: '',
      signUpClickIn: true,
      mvcClickIn: true,
      isAgree: false,
      agree: true
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
        navigationBarTitle: 'registrationJinmuId'
      })
    }).catch(() => {})
    t.$store.state.loading = false
    if (t.$route.query.id) {
      t.selectedSignUpId = parseInt(t.$route.query.id)
    }
  },
  destroyed () {
  },
  methods: {
    selectAreaCode (item) {
      this.areaCode = item.key
      this.isPull = false
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
            notification.sendSmsNotification('sign_up', t.mobile, t.areaCode, t.$i18n.locale).then((res) => {
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
    privacyPromise () {
      const t = this
      return new Promise((resolve, reject) => {
        t.$store.dispatch('popMessage', {
          type: 'app',
          text: '请勾选隐私协议'
        })
      })
    },
    signUp () {
      const t = this
      if (t.isAgree) {
        const user = new ApiUser(t.$store.state.authorization)
        t.phonePromise().then(() => {
          t.mvcPromise().then(() => {
            if (t.signUpClickIn) {
              t.signUpClickIn = false
              user.validatePhoneVerificationCode(t.mvc, t.mobile, t.serialNumber, t.areaCode).then((res) => {
                t.$store.state.signUpMobile = t.mobile
                t.$store.state.signUpVerificationNumber = res.data.verification_number
                t.$store.state.signUpAreaCode = t.areaCode
                t.signUpClickIn = true
                t.$store.state.loading = true
                t.$router.push({ name: 'user-info' })
              }).catch(() => {
                t.signUpClickIn = true
              })
            }
          })
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
  .sign-up {
    min-height: 100vh;
    padding: 0 calc(15 / 375 * 100vw);
  }
  .landscape .sign-up {
    padding: 0 calc(20 / 375 * 100vw);
  }
  .inputs .item {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #E8E8E8;
    border-radius: 5px;
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
  .inputs .item .icon .icon-img {
    width: calc(18 / 375 * 100vw);
  }
  .landscape .inputs .item .icon .icon-img {
    width: calc(18 / 375 * 100vh);
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
  }
  .bottom-row span {
    color: #CF9155;
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
