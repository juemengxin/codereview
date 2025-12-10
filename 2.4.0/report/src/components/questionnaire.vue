<template>
  <div class="questionnaire">
    <div
      class="headerBg"
      :style="{ backgroundImage: 'url(' + headerImg + ')' }"
    >
      <div class="appTabbar" v-if="$store.state.isJinmuL"></div>
      <div class="prompt">
        <div class="img"><img src="../assets/android/bell.svg" alt="" /></div>

        <div class="text">
          为了让您获得更准确的检测结果，请选择最符合您当前的身体状态。
        </div>
      </div>
      <div class="question">
        <div class="top">
          <div class="list">
            <div class="choices">
              <div class="choice">
                <img
                  class="icon"
                  src="../assets/questionnaire/QC0001.svg"
                  alt=""
                  @click="choosanswerItem('QC0001')"
                />
                <img
                  v-if="is_selected.is_sport"
                  src="../assets/questionnaire/icon_selected.svg"
                  alt=""
                  class="selected"
                />
                <div class="name">运动</div>
              </div>
              <div class="choice">
                <img
                  class="icon"
                  src="../assets/questionnaire/QC0002.svg"
                  alt=""
                  @click="choosanswerItem('QC0002')"
                />
                <img
                  v-if="is_selected.is_drink"
                  src="../assets/questionnaire/icon_selected.svg"
                  alt=""
                  class="selected"
                />
                <div class="name">饮酒</div>
              </div>
              <div class="choice">
                <img
                  class="icon"
                  src="../assets/questionnaire/QC0007.svg"
                  alt=""
                  @click="choosanswerItem('QC0007')"
                />
                <img
                  v-if="is_selected.is_virus"
                  src="../assets/questionnaire/icon_selected.svg"
                  alt=""
                  class="selected"
                />
                <div class="name">
                  病毒<span class="annotation">（感冒、腹泻、鼻炎等等）</span>
                </div>
              </div>
            </div>
            <div v-if="question.key === 'Q0053'" class="line"></div>
            <div v-if="question.key === 'Q0053'" class="choices">
              <div class="choice">
                <img
                  class="icon"
                  src="../assets/questionnaire/QC0009.svg"
                  alt=""
                  @click="choosanswerItem('QC0009')"
                />
                <img
                  v-if="is_selected.is_menstruation"
                  src="../assets/questionnaire/icon_selected.svg"
                  alt=""
                  class="selected"
                />
                <div class="name">生理期</div>
              </div>
              <div class="choice">
                <img
                  class="icon"
                  src="../assets/questionnaire/QC0012.svg"
                  alt=""
                  @click="choosanswerItem('QC0012')"
                />
                <img
                  v-if="is_selected.is_lactation"
                  src="../assets/questionnaire/icon_selected.svg"
                  alt=""
                  class="selected"
                />
                <div class="name">哺乳期</div>
              </div>
              <div class="choice">
                <img
                  class="icon"
                  src="../assets/questionnaire/QC0010.svg"
                  alt=""
                  @click="choosanswerItem('QC0010')"
                />
                <img
                  v-if="is_selected.is_ovulation"
                  src="../assets/questionnaire/icon_selected.svg"
                  alt=""
                  class="selected"
                />
                <div class="name">排卵期</div>
              </div>
              <div class="choice">
                <img
                  class="icon"
                  src="../assets/questionnaire/QC0011.svg"
                  alt=""
                  @click="choosanswerItem('QC0011')"
                />
                <img
                  v-if="is_selected.is_pregnancy"
                  src="../assets/questionnaire/icon_selected.svg"
                  alt=""
                  class="selected"
                />
                <div class="name">怀孕</div>
              </div>
            </div>
            <div class="line"></div>
            <div class="choices">
              <div class="choice">
                <img
                  class="icon"
                  src="../assets/questionnaire/QC0193.svg"
                  alt=""
                  @click="
                    choosanswerItem(
                      question.key === 'Q0053' ? 'QC0193' : 'QC0194'
                    )
                  "
                />
                <img
                  v-if="is_selected.is_congratulations"
                  src="../assets/questionnaire/icon_selected.svg"
                  alt=""
                  class="selected"
                />
                <div class="name">都没有</div>
              </div>
            </div>
          </div>
        </div>
        <div class="btn">
          <div
            class="next"
            :style="{ backgroundImage: 'url(' + btnImg + ')' }"
            @click="nextClick"
          >
            <img class="button" src="../assets/fonts/next.svg" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import btnImg from '../assets/btn.png'
import itemOnImg from '../assets/button-1.png'
import itemOffImg from '../assets/button-2.png'
import headerImg from '../assets/bg.png'
import chooseSvg from '../assets/android/choose.svg'
import noChooseSvg from '../assets/android/nochoose.svg'
import { ApiOwner, ApiJML } from '../api' // api
export default {
  name: 'questionnaire', // 问答页面
  data() {
    return {
      headerImg,
      btnImg,
      itemOnImg,
      itemOffImg,
      chooseSvg, // 选中svg图标
      noChooseSvg, // 未选中svg图标
      recordId: 0, //  @type {integer} 测量流水号
      cid: 0, //  @type {integer} 测量流水号
      analysisSession: '', // @type {string} 智能分析会话信息（如果有问询需要在后续请求中填写该字段）
      answers: [], // @type {Array.Object}
      question: {
        key: 'Q0054'
      }, // @type {Object} 问题详情
      answerValues: '', // 回答
      questionType: '',
      questionAnswers: {},
      questions: [], // 所有问题
      module: '', // 当前模块
      is_selected: {
        // 是否选中
        is_sport: false, // 运动
        is_drink: false, // 喝酒
        is_virus: false, // 病毒
        is_lactation: false, // 哺乳
        is_menstruation: false, // 生理
        is_ovulation: false, // 排卵
        is_pregnancy: false, // 怀孕
        is_congratulations: false // 都没有
      }
    }
  },
  mounted() {
    const t = this
    t.$store.state.isLoading = true
    // 根据url获取 recordId
    t.recordId = parseInt(t.$route.query.record_id) // 测量流水号
    if (t.$store.state.isJinmuL) {
      t.getJMLRecordQuestion(false)
    } else {
      t.$store.dispatch('getAppClientAuth').then(res => {
        t.$store.state.authorization = res.data.authorization
        t.getAppRecordV2Question()
      })
    }
    t.$store.dispatch('changeTitle', '健康问答')
    // APP获取H5路由
    t.$store.dispatch('invokeBridgeMethod', {
      name: 'interfaceMethod',
      data: 'questionnaire'
    })
  },
  destroyed() {},
  methods: {
    /**
     *
     *  选择答案
     *
     *
     */
    choosanswerItem(answer) {
      if (answer !== '') {
        this.answerValues = answer
      }
      this.setSelectFalse()
      switch (answer) {
        case 'QC0001':
          this.is_selected.is_sport = true
          break
        case 'QC0002':
          this.is_selected.is_drink = true
          break
        case 'QC0007':
          this.is_selected.is_virus = true
          break
        case 'QC0009':
          this.is_selected.is_menstruation = true
          break
        case 'QC0010':
          this.is_selected.is_ovulation = true
          break
        case 'QC0011':
          this.is_selected.is_pregnancy = true
          break
        case 'QC0012':
          this.is_selected.is_lactation = true
          break
        case 'QC0193':
          this.is_selected.is_congratulations = true
          break
        case 'QC0194':
          this.is_selected.is_congratulations = true
          break
        default:
          this.setSelectFalse()
          break
      }
    },
    setSelectFalse() {
      const t = this
      t.is_selected.is_sport = false // 运动
      t.is_selected.is_drink = false // 喝酒
      t.is_selected.is_virus = false // 病毒
      t.is_selected.is_lactation = false // 哺乳
      t.is_selected.is_menstruation = false // 生理
      t.is_selected.is_ovulation = false // 排卵
      t.is_selected.is_pregnancy = false // 怀孕
      t.is_selected.is_congratulations = false // 都没有
    },
    /**
     *
     *  下方继续按钮方法
     *
     */
    nextClick() {
      const t = this
      if (t.answerValues !== '') {
        t.$store.state.isLoading = true
        const answers =
          t.questionAnswers[t.module] == null ? [] : t.questionAnswers[t.module]
        answers.push({
          question_key: t.question.key,
          answer_keys: [t.answerValues]
        })
        t.questionAnswers[t.module] = answers
        // 问过的问题直接删除，清空答案
        t.questions.splice(0, 1)
        t.answerValues = ''
        t.setSelectFalse()
        if (t.questions.length > 0) {
          t.question = t.questions[0]
          t.$store.state.isLoading = false
        } else {
          t.getAppRecordV2Question()
        }
        t.answeredQuestion = false
      } else {
        t.$store.dispatch('popmsg', {
          msg: '请选择答案'
        })
      }
    },
    /**
     *
     *  获取 金姆健康app智能分析问题及答案
     *  @param {Boolean} value 是否刷新倒计时
     *
     */
    getAppRecordV2Question() {
      const t = this
      const owner = new ApiOwner(
        t.$store.state.authorization,
        t.$store.state.xAccessToken
      )
      owner
        .submitRecordV2Analyze(
          t.recordId.toString(),
          'zh-Hans',
          t.questionAnswers
        )
        .then(res => {
          // 判断分析报告是否异常
          if (res.data.report_content.measurement_judgment.enabled) {
            // 判断 金姆健康app 是否定义 measurementException事件
            res.data.report_content.measurement_judgment.lookups.forEach(
              ele => {
                t.$store.dispatch('invokeBridgeMethod', {
                  name: 'measurementException',
                  data: ele.content
                })
              }
            )
          }
          t.$store.state.isLoading = false
          const questions = res.data.ask_questions
          if (questions !== null) {
            Object.keys(questions).forEach(key => {
              const question = questions[key]
              question.forEach(q => {
                q.module = key
                t.questions.push(q)
              })
            })
            t.showQuestion = true
            t.question = t.questions[0]
            t.module = t.question.module
          } else {
            t.$router.replace({
              name: 'analysisreport',
              query: { record_id: t.recordId }
            })
          }
        })
    },
    /**
     *
     *  获取 一体机智能分析问题及答案
     *   @param {Boolean} value 是否刷新倒计时
     *
     */
    getJMLRecordQuestion(value) {
      const t = this
      const JML = new ApiJML(
        t.$store.state.authorization,
        t.$store.state.xAccessToken
      )
      JML.submitRecordAnalyze(
        t.recordId,
        t.cid,
        t.analysisSession,
        t.answers,
        t.$store.state.userId
      ).then(res => {
        // 调用微信检测
        if (!t.$store.state.isWx) {
          // 判断分析报告是否异常
          if (res.data.analysis_report.content.measurement_tips.length > 0) {
            t.$store.dispatch('popmsg', {
              msg: res.data.analysis_report.content.measurement_tips[0].content
            })
            // 判断 金姆健康app 是否定义 measurementException事件
            t.$store.dispatch('invokeBridgeMethod', {
              name: 'measurementException',
              data: res.data.analysis_report.content.measurement_tips[0].content
            })
          } else {
            if (value) {
              // 判断 金姆健康app 是否定义 resetCountdown事件
              t.$store.dispatch('invokeBridgeMethod', {
                name: 'resetCountdown',
                data: res.data.analysis_done,
                callback: () => {
                  if (res.data.analysis_done) {
                    console.log('刷新倒计时') // 一体机刷新倒计时成功console.log
                  } else {
                    console.log('刷新倒计时且导航栏跟换') // 一体机刷新倒计时且导航栏跟换成功console.log
                  }
                }
              })
            }
          }
        }
        t.answerValues = []
        t.question = {}
        t.analysisSession = res.data.analysis_session
        if (!res.data.analysis_done) {
          t.$store.state.isLoading = false
          t.question = res.data.questionnaire.questions[0]
        } else {
          t.$router.push({ name: 'analysisreport', query: t.$route.query }) // 跳转分析报告页面
        }
      })
    }
  }
}
</script>

<style scoped>
.questionnaire {
  font-family: PingFang-SC-Regular, Sans-serif;
}
.appTabbar {
  height: calc(100vw / 1080 * 186);
}
.headerBg {
  height: calc(100vw / 1080 * 600);
  background-repeat: no-repeat;
  min-height: calc(100vw / 1080 * 600);
  text-align: center;
  background-size: 100% calc(100vw / 1080 * 600);
  padding: 0 calc(100vw / 1080 * 44);
  padding-top: calc(100vw / 1080 * 44);
}
.prompt .img {
  display: flex;
  align-items: center;
  height: calc(100vw / 1080 * 75);
}
.prompt .img img {
  width: calc(100vw / 1080 * 48);
  height: calc(100vw / 1080 * 48);
}
.prompt {
  display: flex;
  justify-content: center;
  align-items: flex-start;
}
.prompt .text {
  color: #fff;
  font-size: calc(100vw / 1080 * 46);
  display: inline-block;
  width: calc(100vw / 1080 * 778);
  line-height: calc(100vw / 1080 * 78);
}
.question {
  margin-top: calc(100vw / 1080 * 82);
  margin-bottom: calc(-100vw / 1080 * 100);
  background-color: #f5f5f5;
  border-radius: calc(100vw / 1080 * 14);
  box-sizing: border-box;
  position: relative;
}
.question .choices {
  padding-left: calc(40vw / 1080 * 80);
  margin: calc(40vh / 1080 * 80) 0;
  text-align: left;
}
.question .choice {
  display: inline-block;
  text-align: center;
}
.question .choice .name {
  font-size: 15px;
  margin: 0 auto;
  margin-top: 5px;
}
.question .choice .annotation {
  margin-left: -10px;
  display: block;
  position: fixed;
  color: #999;
  font-size: 13px;
}
.question .choices .icon {
  width: calc(170vw / 1080 * 85);
  margin: 0 calc(40vw / 1080 * 80);
  display: inline;
}
.question .choice .selected {
  width: calc(50vw / 1080 * 85);
  float: right;
  z-index: 99;
}
.question .line {
  margin: 0 calc(100vw / 1080 * 85);
  height: 1px;
  background-image: linear-gradient(
    to right,
    #999 0%,
    #999 50%,
    transparent 50%
  );
  background-size: 15px 1px;
  background-repeat: repeat-x;
}
.question .top {
  /* padding: 0 calc(100vw / 1080 * 85); */
  height: calc(100vw / 750 * 920);
}
.question .top .list {
  padding: calc(100vw / 1080 * 30) 0;
}
.question .top .item + .item {
  margin-top: calc(100vw / 750 * 30);
}
.question .top .item .img {
  position: absolute;
  z-index: 2;
  right: calc(100vw / 1080 * 22);
  top: calc(100vw / 1080 * 33);
  bottom: calc(100vw / 1080 * 33);
  display: inline-block;
  width: calc(100vw / 1080 * 49);
  height: calc(100vw / 1080 * 49);
}
.question .bottom {
  background-color: #fff;
  margin-bottom: calc(-100vw / 1080 * 30);
  display: inline-block;
  width: calc(100vw / 1080 * 992 / 18);
  height: calc(100vw / 1080 * 30);
  border-bottom-left-radius: calc(100vw / 1080 * 992 / 18);
  border-bottom-right-radius: calc(100vw / 1080 * 992 / 18);
}
.btn {
  position: absolute;
  left: 0;
  right: 0;
  z-index: 3;
  bottom: calc(-100vw / 1080 * 64);
}
.btn .next {
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(100vw / 750 * 610);
  height: calc(100vw / 750 * 80);
  background-size: 100% 100%;
  color: #fff;
  font-size: calc(100vw / 750 * 34);
  margin: 0 auto;
}
.btn .next .button {
  width: calc(51 / 375 * 100vw);
  margin: 0 auto;
}
</style>
