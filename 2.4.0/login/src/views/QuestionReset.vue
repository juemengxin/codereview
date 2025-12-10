<i18n>
{
  "en": {},
  "zh-Hans": {
    "step-one-subtitle": "1.验证账号",
    "step-two-subtitle": "2.验证问题",
    "step-three-subtitle": "3.重置密码",
    "new-password": "新密码",
    "confirm-password": "确认密码",
    "password-placeholder": "8-20个字符，同时包含数字和字母",
    "confirm-password-placeholder": "请再次输入密码",
    "count-one": "当前账号 {name} ",
    "count-two": "，请重置密码",
    "select-one": "请选择一项填写",
    "safe-question": "问题 ",
    "answer-empty": "问题 {index} 不能为空",
    "answer-error": "问题 {index} 答案不正确",
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
        <div class="item" :style="{backgroundColor: stepId===2 ? '#CF9155' : '#999999'}"></div>
      </div>
      <div class="text">
        <div :style="{color: stepId===0 ? '#CF9155' : '#666666'}">{{$t('step-one-subtitle')}}</div>
        <div :style="{color: stepId===1 ? '#CF9155' : '#666666'}">{{$t('step-two-subtitle')}}</div>
        <div :style="{color: stepId===2 ? '#CF9155' : '#666666'}">{{$t('step-three-subtitle')}}</div>
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
          <jm-input type="text" @blur="mobileBlur" v-model="mobile" :placeholder="$t('mobile-placeholder')"></jm-input>
        </div>
      </div>
      <div class="button" @click="ValidateUsernameOrPhone">
        <img class="next" src="../assets/app/fonts/next.svg" alt="">
      </div>
    </div>
    <div class="top-row"  v-if="stepId===1">
      <div class="inputs">
        <div class="item password answer" v-for="(item, index) in questionList" :key="index">
          <div class="questions">
            <div class="question">
              {{$t('safe-question')}}{{index+1}}.<span>{{item.question}}</span>
            </div>
            <jm-input iClass="input_password" type="text" @blur="answerBlur(item)" v-model="item.answer" :placeholder="$t('question-placeholder')" :maxlength="15"></jm-input>
          </div>
        </div>
      </div>
      <div class="button" @click="ValidateSecureQuestionBeforeModifyPassword">
        <img class="next" src="../assets/app/fonts/next.svg" alt="">
      </div>
    </div>
    <div class="top-row"  v-if="stepId===2">
      <div class="inputs">
        <div class="count">
          <div class="i">
            <img src="../assets/app/icon-info.svg" alt="">
          </div>
          <div>{{$t('count-one', { name:  type === 'phone' ? '手机号' : '用户名' })}}<span>{{type === 'phone' ? mobile.slice(0, 4)+'****'+mobile.slice(8, 11) : username}}</span>{{$t('count-two')}}</div>
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
      <div class="button" @click="ResetPasswordViaSecureQuestion">
        <img class="save" src="../assets/app/fonts/save.svg" alt="">
      </div>
    </div>
  </div>
</template>
<script>
import { ApiUser } from '../api'
import JmInput from '../components/JmInput'
import JS from '../js'
export default {
  name: 'question-reset',
  data () {
    return {
      type: '',
      stepId: 0,
      areaCode: '+86',
      mobile: '',
      isPull: false, // 国码弹窗是否显示
      username: '',
      question: [],
      questionList: [
        {
          question_key: '',
          question: '',
          answer: ''
        },
        {
          question_key: '',
          question: '',
          answer: ''
        },
        {
          question_key: '',
          question: '',
          answer: ''
        }
      ],
      password: '',
      confirmPassword: '',
      validateusernameClickIn: true,
      validateClickIn: true,
      setClickIn: true,
      secureQuestions: []
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
    mobileBlur () {
      const t = this
      if (t.mobile !== '') {
        t.phonePromise()
      }
    },
    answerBlur (item) {
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
    nextStep () {
      this.stepId++
      if (this.stepId > 2) {
        this.$router.push({ name: 'sign-in' })
      }
    },
    ValidateUsernameOrPhone () {
      const t = this
      t.phonePromise().then(() => {
        if (t.validateusernameClickIn) {
          t.validateusernameClickIn = false
          const user = new ApiUser(t.$store.state.authorization)
          user.ValidateUsernameOrPhone('phone', '', t.mobile, t.areaCode).then((res) => {
            t.GetCurrentSecureQuestionList('phone', '', t.mobile, t.areaCode)
          }).catch(() => {
            t.validateusernameClickIn = true
          })
        }
      })
    },
    GetCurrentSecureQuestionList () {
      const t = this
      const user = new ApiUser(t.$store.state.authorization)
      let type = ''
      let username = ''
      let mobile = ''
      let areaCode = ''
      if (t.mobile !== '') {
        type = 'phone'
        t.type = 'phone'
        username = ''
        mobile = t.mobile
        areaCode = t.areaCode
      } else {
        type = 'username'
        t.type = 'username'
        username = t.username
        mobile = ''
        areaCode = ''
      }
      user.GetCurrentSecureQuestionList(type, username, mobile, areaCode).then((res) => {
        t.validateusernameClickIn = true
        t.nextStep()
        t.questionList = []
        res.data.forEach((ele) => {
          t.questionList.push({
            question: ele.question,
            question_key: ele.key,
            answer: ''
          })
        })
      }).catch(() => {
        t.validateusernameClickIn = true
      })
    },
    ValidateSecureQuestionBeforeModifyPassword () {
      const t = this
      t.questionList.forEach((ele) => {
        if (ele.answer !== '') {
          ele.answerError = false
          ele.success = true
        } else {
          ele.success = false
          ele.answerError = true
          ele.answerStatusText = t.$t('answer-question')
        }
      })
      if (t.questionList[0].answer === '') {
        t.$store.dispatch('popMessage', {
          type: 'app',
          text: t.$t('answer-empty', { index: 1 })
        })
      } else if (t.questionList[1].answer === '') {
        t.$store.dispatch('popMessage', {
          type: 'app',
          text: t.$t('answer-empty', { index: 2 })
        })
      } else if (t.questionList[2].answer === '') {
        t.$store.dispatch('popMessage', {
          type: 'app',
          text: t.$t('answer-empty', { index: 3 })
        })
      } else {
        const user = new ApiUser(t.$store.state.authorization)
        t.secureQuestions = []
        t.questionList.forEach((ele) => {
          t.secureQuestions.push({
            question_key: ele.question_key,
            answer: ele.answer
          })
        })
        let type = ''
        let username = ''
        let mobile = ''
        let areaCode = ''
        if (t.mobile !== '') {
          type = 'phone'
          username = ''
          mobile = t.mobile
          areaCode = t.areaCode
        } else {
          type = 'username'
          username = t.username
          mobile = ''
          areaCode = ''
        }
        if (t.validateClickIn) {
          t.validateClickIn = false
          user.ValidateSecureQuestionBeforeModifyPassword(type, username, mobile, areaCode, t.secureQuestions).then((res) => {
            t.validateClickIn = true
            if (res.data.result) {
              t.questionList.forEach((ele) => {
                ele.question_key = ''
                ele.question = ''
                ele.answer = ''
              })
              t.nextStep()
            } else {
              if (res.data.wrong_question_keys.indexOf(t.questionList[0].question_key) >= 0) {
                t.$store.dispatch('popMessage', {
                  type: 'app',
                  text: t.$t('answer-error', { index: 1 })
                })
              } else if (res.data.wrong_question_keys.indexOf(t.questionList[1].question_key) >= 0) {
                t.$store.dispatch('popMessage', {
                  type: 'app',
                  text: t.$t('answer-error', { index: 2 })
                })
              } else if (res.data.wrong_question_keys.indexOf(t.questionList[2].question_key) >= 0) {
                t.$store.dispatch('popMessage', {
                  type: 'app',
                  text: t.$t('answer-error', { index: 3 })
                })
              } else {}
            }
          }).catch(() => {
            t.validateClickIn = true
          })
        }
      }
    },
    ResetPasswordViaSecureQuestion () {
      const t = this
      t.passwordPromise().then(() => {
        t.confirmPasswordPromise().then(() => {
          const user = new ApiUser(t.$store.state.authorization)
          let type = ''
          let username = ''
          let mobile = ''
          let areaCode = ''
          if (t.mobile !== '') {
            type = 'phone'
            username = ''
            mobile = t.mobile
            areaCode = t.areaCode
          } else {
            type = 'username'
            username = t.username
            mobile = ''
            areaCode = ''
          }
          if (t.setClickIn) {
            t.setClickIn = false
            user.ResetPasswordViaSecureQuestion(type, username, mobile, areaCode, t.confirmPassword, t.secureQuestions).then(() => {
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
  .inputs .item.password {
    background-color: #F5F5F5;
  }
  .inputs .item.answer + .item.answer {
    margin-top: 0;
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
    color: #999999;
  }
  .landscape .count {
    font-size: calc(12 / 375 * 100vh);
    padding: 0 calc(15 / 375 * 100vh);
    height: calc(33 / 375 * 100vh);
  }
  .count .i {
    width: calc(15 / 375 * 100vw);
    margin-right: calc(10 / 375 * 100vw);
  }
  .landscape .count .i {
    width: calc(15 / 375 * 100vh);
    margin-right: calc(10 / 375 * 100vh);
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
  .inputs .item .input {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
  .button {
    margin-top: calc(50 / 375 * 100vw);
  }
  .landscape .button {
    margin-top: calc(40 / 375 * 100vh);
  }
  .questions {
    width: 100%;
    text-align: left;
    font-size: calc(12 / 375 * 100vw);
  }
  .landscape .questions {
    font-size: calc(12 / 375 * 100vh);
  }
  .question {
    display: flex;
    align-items: center;
    height: calc(50 / 375 * 100vw);
  }
  .landscape .question {
    height: calc(50 / 375 * 100vh);
  }
</style>
