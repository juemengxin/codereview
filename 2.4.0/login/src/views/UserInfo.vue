<i18n>
{
  "en": {},
  "zh-Hans": {
    "complete-userinfo": "完善资料",
    "basic-information": "基础资料",
    "promise-text": "为了您能更好的享受到金姆的健康服务，请<span style='color: #CF9155;'>老账号购买人</span>完善以下<span style='color: #CF9155;'>必填</span>资料，金姆承诺不会向第三方提供您的隐私信息。",
    "promise-text-new": "为了您能更好的享受到金姆的健康服务，请完善以下<span style='color: #CF9155;'>必填</span>资料，金姆承诺不会向第三方提供您的隐私信息。",
    "set-password": "设置密码",
    "nickname-placeholder": "1-15个字符",
    "password": "密码",
    "password-placeholder": "8-20个字符，同时包含数字和字母",
    "confirm-password": "确认密码",
    "save-text": "完善您的资料，保存后您可以使用手机号密码登录",
    "gender-precautions": "性别设置后不可更改",
    "gender-placeholder": "请选择性别",
    "birthday-placeholder": "请选择生日",
    "height-placeholder": "请选择身高（厘米）",
    "weight-placeholder": "请选择体重（千克）",
    "set-language": "设置您的常用语言",
    "language-title": "设置您的常用语言",
    "language": "语言",
    "language-placeholder": "请选择常用语言",
    "have-read-agreed": "我已阅读并同意",
    "disclaimer-privacy-agreement": "免责条款与隐私协议",
    "save": "保存",
    "document-title": "完善资料"
  },
  "zh-Hant": {}
}
</i18n>
<template>
  <div class="main" :class="{pop: isPull}">
    <div class="title" v-html="$t('promise-text')" v-if="$route.query.from === 'bind-account'"></div>
    <div class="title" v-html="$t('promise-text-new')" v-if="$route.query.from !== 'bind-account'"></div>
    <div class="top-row">
      <div class="inputs" v-if="$route.query.from !== 'bind-account'">
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
      <div class="inputs">
        <div class="item">
          <div class="left">
            <span class="app-color">*</span>{{$t('nickname')}}
          </div>
          <jm-input iClass="input_password" type="text" @blur="nicknameBlur" v-model="nickname" :placeholder="$t('nickname-placeholder')" :maxlength="15"></jm-input>
        </div>
        <div class="item">
          <div class="left">
            <span class="app-color">*</span>{{$t('gender')}}
          </div>
          <div class="right">
            <input type="text" v-model="genderText" @focus="genderFocus" @blur="genderBlur" :readonly="true" :disabled="genderDisabled" :placeholder="$t('gender-placeholder')">
            <div class="icon" v-if="!genderDisabled">
              <img src="../assets/app/icon-pull-copy.svg" alt="">
            </div>
          </div>
        </div>
        <div class="note">
          <div class="left">
            <span class="app-color">*</span>{{$t('gender')}}
          </div>
          <div class="icon">
            <img src="../assets/app/icon-info.svg" alt="">
          </div>
          <div class="text">
            {{$t('gender-precautions')}}
          </div>
        </div>
        <div class="item">
          <div class="left">
            <span class="app-color">*</span>{{$t('birthday')}}
          </div>
          <div class="right">
            <input type="text" v-model="birthdayText" @focus="birthdayFocus" @blur="birthdayBlur" :readonly="true" :placeholder="$t('birthday-placeholder')">
            <div class="icon">
              <img src="../assets/app/icon-pull-copy.svg" alt="">
            </div>
          </div>
        </div>
        <div class="item">
          <div class="left">
            <span class="app-color">*</span>{{$t('height')}}
          </div>
          <div class="right">
            <input type="text" v-model="heightText" @focus="heightFocus" @blur="heightBlur" :readonly="true" :placeholder="$t('height-placeholder')">
            <div class="icon">
              <img src="../assets/app/icon-pull-copy.svg" alt="">
            </div>
          </div>
        </div>
        <div class="item">
          <div class="left">
            <span class="app-color">*</span>{{$t('weight')}}
          </div>
          <div class="right">
            <input type="text" v-model="weightText" @focus="weightFocus" @blur="weightBlur" :readonly="true" :placeholder="$t('weight-placeholder')">
            <div class="icon">
              <img src="../assets/app/icon-pull-copy.svg" alt="">
            </div>
          </div>
        </div>
        <div class="item">
          <div class="left">
            <span class="app-color">*</span>{{$t('language')}}
          </div>
          <div class="right">
            <input type="text" v-model="languageText" @focus="languageFocus" @blur="languageBlur" :readonly="true" :placeholder="$t('language-placeholder')">
            <div class="icon">
              <img src="../assets/app/icon-pull-copy.svg" alt="">
            </div>
          </div>
        </div>
      </div>
      <div class="button" @click="saveUserInfo">
        <img class="save" src="../assets/app/fonts/save.svg" alt="">
      </div>
      <vue-pickers
      :show="genderShow"
      :columns="1"
      :defaultData="genderDefaultData"
      :selectData="genderSelectData"
      @cancel="genderClose"
      @confirm="genderConfirmFn"></vue-pickers>
      <vue-pickers
      :show="birthdayShow"
      :columns="3"
      :link="true"
      :defaultData="birthdayDefaultData"
      :selectData="birthdaySelectData"
      @cancel="birthdayClose"
      @confirm="birthdayConfirmFn"></vue-pickers>
      <vue-pickers
      :show="heightShow"
      :columns="1"
      :defaultData="heightDefaultData"
      :selectData="heightSelectData"
      @cancel="heightClose"
      @confirm="heightConfirmFn"></vue-pickers>
      <vue-pickers
      :show="weightShow"
      :columns="1"
      :defaultData="weightDefaultData"
      :selectData="weightSelectData"
      @cancel="weightClose"
      @confirm="weightConfirmFn"></vue-pickers>
      <vue-pickers
      :show="languageShow"
      :columns="1"
      :defaultData="languageDefaultData"
      :selectData="languageSelectData"
      @cancel="languageClose"
      @confirm="languageConfirmFn"></vue-pickers>
    </div>
  </div>
</template>
<script>
import { ApiUser, ApiLanguage, ApiSignUp } from '../api'
import vuePickers from 'vue-pickers'
import JmInput from '../components/JmInput'
import JS from '../js'
export default {
  name: 'user-info',
  data () {
    return {
      password: '',
      confirmPassword: '',
      nickname: '',
      gender: '',
      genderText: '',
      genderDisabled: false,
      birthday: '',
      birthdayText: '',
      height: '',
      heightText: '',
      weight: '',
      weightText: '',
      language: '',
      languageText: '',
      checked: true,
      languageArr: [],
      saveClickIn: true,
      has_set_user_profile: false,
      has_set_password: false,
      has_set_phone: false,
      genderShow: false,
      genderDefaultData: [],
      genderSelectData: {
        data1: [
          {
            text: '男',
            value: 0
          },
          {
            text: '女',
            value: 1
          }
        ]
      },
      birthdayShow: false,
      birthdayDefaultData: [
        {
          text: '1980',
          value: '1980'
        },
        {
          text: '06',
          value: '198006'
        },
        {
          text: '15',
          value: '19800615'
        }
      ],
      birthdaySelectData: {
        data1: [],
        data2: {},
        data3: {}
      },
      heightShow: false,
      heightDefaultData: [
        {
          text: '170 厘米',
          value: 170
        }
      ],
      heightSelectData: {
        data1: []
      },
      weightShow: false,
      weightDefaultData: [
        {
          text: '50 千克',
          value: 50
        }
      ],
      weightSelectData: {
        data1: []
      },
      languageShow: false,
      languageDefaultData: [],
      languageSelectData: {
        data1: [
          {
            text: '简体中文',
            value: 'zh-Hans'
          }
        ]
      },
      isPull: false
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
        navigationBarTitle: 'perfectInformation'
      })
    }).catch(() => {})
    const moment = require('moment')
    for (let index = 1900; index <= moment().year(); index++) {
      t.birthdaySelectData.data1.push({
        text: index,
        value: index
      })
      let monthArr = []
      let month = 12
      if (index === moment().year()) {
        month = moment().month() + 1
      }
      for (let i = 1; i <= month; i++) {
        let monthText = i < 10 ? '0' + i.toString() : i.toString()
        let monthValue = i < 10 ? index.toString() + '0' + i.toString() : index.toString() + i.toString()
        monthArr.push(
          {
            text: monthText,
            value: monthValue
          }
        )
        let dayArr = []
        let day = moment(index + '-' + monthText, 'YYYY-MM').daysInMonth()
        if (index === moment().year() && i === (moment().month() + 1)) {
          day = moment().date()
        }
        for (let j = 1; j <= day; j++) {
          dayArr.push(
            {
              text: j < 10 ? '0' + j.toString() : j.toString(),
              value: j < 10 ? monthValue + '0' + j.toString() : monthValue + j.toString()
            }
          )
        }
        t.$set(t.birthdaySelectData.data3, monthValue, dayArr)
      }
      t.$set(t.birthdaySelectData.data2, index, monthArr)
    }
    for (let index = 50; index <= 250; index++) {
      t.heightSelectData.data1.push({
        text: index + ' 厘米',
        value: index
      })
    }
    for (let index = 30; index <= 500; index++) {
      t.weightSelectData.data1.push({
        text: index + ' 千克',
        value: index
      })
    }
    if (t.$route.query.from !== 'bind-account') {
      if (t.$store.state.signUpMvc !== '') {
        if (t.$store.state.signUpMobile !== '') {
          if (t.$store.state.signUpSerialNumber !== '') {
            if (t.$store.state.signUpAreaCode !== '') {
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
    } else {
      if (t.$store.state.xAccessToken !== '') {
        if (t.$store.state.userId !== '') {
          t.$store.state.loading = false
        } else {
          t.routerPush('sign-in')
        }
      } else {
        t.routerPush('sign-in')
      }
    }
  },
  destroyed () {
  },
  methods: {
    getResList () {
      const t = this
      const user = new ApiUser()
      user.getResList().then((res) => {
        t.languageArr = []
        res.data.languages.forEach(element => {
          t.languageSelectData.data1.push({
            text: t.$t(element),
            value: element
          })
        })
      })
    },
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
    nicknamePromise () {
      const t = this
      return new Promise((resolve, reject) => {
        if (t.nickname === '') {
          t.$store.dispatch('popMessage', {
            type: 'app',
            text: t.$t('nickname-empty')
          })
        } else if (!/^[0-9A-Za-z\u4e00-\u9fa5]+$/.test(t.nickname.slice(0, 1))) {
          t.$store.dispatch('popMessage', {
            type: 'app',
            text: t.$t('nickname-error')
          })
        } else {
          resolve()
        }
      })
    },
    nicknameBlur () {
      const t = this
      if (t.nickname !== '') {
        t.nicknamePromise()
      }
    },
    genderPromise () {
      const t = this
      return new Promise((resolve, reject) => {
        if (t.gender === '') {
          t.$store.dispatch('popMessage', {
            type: 'app',
            text: t.$t('gender-empty')
          })
        } else {
          resolve()
        }
      })
    },
    genderClose () {
      this.genderShow = false
    },
    genderConfirmFn (val) {
      this.genderShow = false
      this.genderDefaultData = [val.select1]
      this.genderText = val.select1.text
      this.gender = val.select1.value
    },
    genderFocus () {
      this.isPull = true
      this.genderShow = true
    },
    genderBlur () {
      this.isPull = false
      this.genderShow = false
    },
    birthdayPromise () {
      const t = this
      return new Promise((resolve, reject) => {
        if (t.birthday === '') {
          t.$store.dispatch('popMessage', {
            type: 'app',
            text: t.$t('birthday-empty')
          })
        } else {
          resolve()
        }
      })
    },
    birthdayClose () {
      this.birthdayShow = false
    },
    birthdayConfirmFn (val) {
      this.birthdayShow = false
      this.birthdayDefaultData = [val.select1, val.select2, val.select3]
      this.birthdayText = val.select1.text + ' - ' + val.select2.text + ' - ' + val.select3.text
      const moment = require('moment')
      this.birthday = moment.utc(this.birthdayText, 'YYYY - MM - DD').format()
    },
    birthdayFocus () {
      this.isPull = true
      this.birthdayShow = true
    },
    birthdayBlur () {
      this.isPull = false
      this.birthdayShow = false
    },
    heightPromise () {
      const t = this
      return new Promise((resolve, reject) => {
        if (t.height === '') {
          t.$store.dispatch('popMessage', {
            type: 'app',
            text: t.$t('height-empty')
          })
        } else {
          resolve()
        }
      })
    },
    heightClose () {
      this.heightShow = false
    },
    heightConfirmFn (val) {
      this.heightShow = false
      this.heightDefaultData = [val.select1]
      this.heightText = val.select1.text
      this.height = val.select1.value
    },
    heightFocus () {
      this.isPull = true
      this.heightShow = true
    },
    heightBlur () {
      this.isPull = false
      this.heightShow = false
    },
    weightPromise () {
      const t = this
      return new Promise((resolve, reject) => {
        if (t.weight === '') {
          t.$store.dispatch('popMessage', {
            type: 'app',
            text: t.$t('weight-empty')
          })
        } else {
          resolve()
        }
      })
    },
    weightClose () {
      this.weightShow = false
    },
    weightConfirmFn (val) {
      this.weightShow = false
      this.weightDefaultData = [val.select1]
      this.weightText = val.select1.text
      this.weight = val.select1.value
    },
    weightFocus () {
      this.isPull = true
      this.weightShow = true
    },
    weightBlur () {
      this.isPull = false
      this.weightShow = false
    },
    languagePromise () {
      const t = this
      return new Promise((resolve, reject) => {
        if (t.language === '') {
          t.$store.dispatch('popMessage', {
            type: 'app',
            text: t.$t('language-empty')
          })
        } else {
          resolve()
        }
      })
    },
    languageClose () {
      this.languageShow = false
    },
    languageConfirmFn (val) {
      this.languageShow = false
      this.languageDefaultData = [val.select1]
      this.languageText = val.select1.text
      this.language = val.select1.value
    },
    languageFocus () {
      this.isPull = true
      this.languageShow = true
    },
    languageBlur () {
      this.isPull = false
      this.languageShow = false
    },
    signUp () {
      const t = this
      t.passwordPromise().then(() => {
        t.confirmPasswordPromise().then(() => {
          const signUp = new ApiSignUp(t.$store.state.authorization)
          if (t.saveClickIn) {
            t.saveClickIn = false
            let userProfile = {
              nickname: t.nickname,
              birthday: t.birthday,
              gender: t.gender,
              height: t.height,
              weight: t.weight
            }
            signUp.signUpViaMVC(t.$store.state.signUpVerificationNumber, t.$store.state.signUpMobile, t.$store.state.signUpAreaCode, t.confirmPassword, userProfile, t.language).then((res) => {
              const user = new ApiUser(t.$store.state.authorization, res.data.access_token)
              t.$store.state.xAccessToken = res.data.access_token
              t.$store.state.userId = res.data.user_id.toString()
              user.userSelectRegion(res.data.user_id, 0).then((res) => {
                t.$store.dispatch('invokeBridgeMethod', 'setCookie').then((dsBridge) => {
                  dsBridge.call('setCookie', {
                    phone: '',
                    phone_password: '',
                    isRemember: false
                  })
                }).catch(() => {})
                t.$store.dispatch('invokeBridgeMethod', 'getSignInUserInfo').then((dsBridge) => {
                  dsBridge.call('getSignInUserInfo', {
                    token: t.$store.state.xAccessToken,
                    userId: parseInt(t.$store.state.userId)
                  })
                }).catch(() => {
                  t.saveClickIn = true
                })
              }).catch(() => {
                t.saveClickIn = true
              })
            }).catch(() => {
              t.saveClickIn = true
            })
          }
        })
      })
    },
    saveUserInfo () {
      const t = this
      t.nicknamePromise().then(() => {
        t.genderPromise().then(() => {
          t.birthdayPromise().then(() => {
            t.heightPromise().then(() => {
              t.weightPromise().then(() => {
                t.languagePromise().then(() => {
                  if (t.$route.query.from === 'bind-account') {
                    const user = new ApiUser(t.$store.state.authorization, t.$store.state.xAccessToken)
                    const language = new ApiLanguage(t.$store.state.authorization, t.$store.state.xAccessToken)
                    if (t.saveClickIn) {
                      t.saveClickIn = false
                      user.modifyUserProfile(t.$store.state.userId, t.nickname, t.birthday, t.gender, t.height, t.weight).then((res) => {
                        language.setDisplayLanguage(t.$store.state.userId, t.language).then(() => {
                          if (t.$route.query.hasSetPhone) {
                            t.$router.push({ name: 'change-password' })
                          } else {
                            t.$router.push({ name: 'bound-mobile' })
                          }
                          t.saveClickIn = true
                        }).catch(() => {
                          t.saveClickIn = true
                        })
                      }).catch(() => {
                        t.saveClickIn = true
                      })
                    }
                  } else {
                    t.signUp()
                  }
                })
              })
            })
          })
        })
      })
    }
  },
  components: {
    vuePickers,
    JmInput
  }
}
</script>
<style scoped>
  .main {
    padding: 0 calc(15 / 375 * 100vw);
  }
  .landscape .main {
    padding: 0 calc(20 / 375 * 100vh);
  }
  .pop {
    overflow: hidden;
    height: 100vh;
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
  .inputs + .inputs {
    margin-top: calc(20 / 375 * 100vw);
  }
  .landscape .inputs + .inputs {
    margin-top: calc(20 / 375 * 100vh);
  }
  .inputs .item {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  input {
    background-color: rgba(255, 255, 255, 0);
    color: #333333;
    font-size: calc(14 / 375 * 100vw);
    height: calc(45 / 375 * 100vw);
  }
  .landscape input {
    font-size: calc(14 / 375 * 100vh);
    height: calc(45 / 375 * 100vh);
  }
  input::placeholder {
    color: #8F8F8F;
    font-size: calc(14 / 375 * 100vw);
  }
  .landscape input::placeholder {
    font-size: calc(14 / 375 * 100vh);
  }
  .left {
    text-align: left;
    white-space: nowrap;
    font-size: calc(14 / 375 * 100vw);
    padding-right: calc(10 / 375 * 100vw);
  }
  .landscape .left {
    font-size: calc(14 / 375 * 100vh);
    padding-right: calc(10 / 375 * 100vh);
  }
  .right {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    background-color: #E8E8E8;
    border-radius: 5px;
    padding-left: calc(20 / 375 * 100vw);
  }
  .landscape .right {
    padding-left: calc(20 / 375 * 100vh);
  }
  .right .icon {
    width: calc(14 / 375 * 100vw);
    padding-right: calc(15 / 375 * 100vw);
  }
  .landscape .right .icon {
    width: calc(14 / 375 * 100vh);
    padding-right: calc(15 / 375 * 100vh);
  }
  .button {
    margin-top: calc(50 / 375 * 100vw);
  }
  .landscape .button {
    margin-top: calc(40 / 375 * 100vh);
  }
  .top-row {
    padding-bottom: calc(50 / 375 * 100vw);
  }
  .landscape .top-row {
    padding-bottom: calc(50 / 375 * 100vh);
  }
  .note {
    display: flex;
    align-items: center;
    height: calc(40 / 375 * 100vw);
  }
  .landscape .note {
    height: calc(40 / 375 * 100vh);
  }
  .note .left {
    opacity: 0;
  }
  .note .icon {
    width: calc(15 / 375 * 100vw);
    margin-right: calc(8 / 375 * 100vw);
  }
  .landscape .note .icon {
    width: calc(15 / 375 * 100vh);
    margin-right: calc(8 / 375 * 100vh);
  }
  .note .text {
    font-size: calc(13 / 375 * 100vw);
    color: #666666;
  }
  .landscape .note .text {
    font-size: calc(13 / 375 * 100vh);
  }
</style>
