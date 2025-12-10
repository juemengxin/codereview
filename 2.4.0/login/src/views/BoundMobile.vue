<i18n>
{
  "en": {},
  "zh-Hans": {
    "title": "为了您能更好的管理金姆 ID，请<span>老账号购买人</span>完成手机绑定。绑定手机后，您可以使用<span>手机号和原始密码</span>登录，<span>原有账号不再做登录使用</span>。如需修改手机号，请登录金姆 ID 官方网站进行修改。",
    "document-title": "绑定手机"
  },
  "zh-Hant": {}
}
</i18n>
<template>
  <div class="bound-mobile">
    <div class="title" v-html="$t('title')">
    </div>
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
          <jm-input type="number" @blur="mobileBlur" v-model="mobile" :placeholder="$t('mobile-placeholder')"></jm-input>
        </div>
        <div class="item">
          <div class="icon">
            <div class="icon-img">
              <img src="../assets/app/icon-login_duanxin.svg" alt="">
            </div>
          </div>
          <jm-input type="number" v-model="mvc" :placeholder="$t('mvc-placeholder')" :maxlength="6"></jm-input>
          <div class="mvc" @click="sendSmsNotification" :style="{color: timeoutNum === 60 ? '#CF9155' : '#999999'}">
            {{timeoutNum === 60 ? $t('mvc-button-text') : $t('mvc-button-wait', {time: timeoutNum})}}
          </div>
        </div>
      </div>
      <div class="button" @click="setPhone">
        <img class="bind" src="../assets/app/fonts/bind.svg" alt="">
      </div>
    </div>
  </div>
</template>
<script>
import { ApiNotification, ApiUser } from '../api'
import JmInput from '../components/JmInput'
import JS from '../js'
export default {
  name: 'bound-mobile',
  data () {
    return {
      areaCode: '+86',
      isPull: false, // 国码弹窗是否显示
      mobile: '',
      mvc: '',
      serialNumber: '',
      timeoutNum: 60,
      timeout: '',
      setPhoneClickIn: true,
      mvcClickIn: true
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
        navigationBarTitle: 'boundPhone'
      })
    }).catch(() => {})
    if (t.$store.state.xAccessToken !== '') {
      if (t.$store.state.userId !== '') {
        t.$store.state.loading = false
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
      const notification = new ApiNotification(t.$store.state.authorization, t.$store.state.xAccessToken)
      t.phonePromise().then(() => {
        if (t.mvcClickIn) {
          if (t.timeoutNum === 60) {
            t.mvcClickIn = false
            notification.sendSmsNotification('set_phone', t.mobile, t.areaCode, t.$i18n.locale, false, parseInt(t.$store.state.userId)).then((res) => {
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
    setPhone () {
      const t = this
      const user = new ApiUser(t.$store.state.authorization, t.$store.state.xAccessToken)
      t.phonePromise().then(() => {
        t.mvcPromise().then(() => {
          if (t.setPhoneClickIn) {
            t.setPhoneClickIn = false
            user.setSigninPhone(t.$store.state.userId, t.mvc, t.mobile, t.serialNumber, t.areaCode).then((res) => {
              t.$router.push({ name: 'change-password' })
              t.setPhoneClickIn = true
            }).catch(() => {
              t.setPhoneClickIn = true
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
<style>
  .title span {
    color: #CF9155;
  }
</style>
<style scoped>
  .bound-mobile {
    min-height: 100vh;
    padding: 0 calc(15 / 375 * 100vw);
  }
  .landscape .bound-mobile {
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
</style>
