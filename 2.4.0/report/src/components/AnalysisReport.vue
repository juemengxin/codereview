<template>
  <div>
    <div v-if="$store.state.analysisReportShow">
      <div class="analysisReport" v-if="isPayment && !$store.state.isJinmuL">
        <div class="share" v-if="wxShare" @click="openWxShare">
          <img src="../assets/share.png" alt />
        </div>
        <div class="app-share" v-if="appShare">
          <div class="item">
            <div class="app-img">
              <img src="../assets/logo.png" alt />
            </div>
            <div class="app-text">
              <div>金姆健康</div>
              <div class="subtitle">您的好友都在用</div>
            </div>
          </div>
          <div class="item" @click="appShare = false">
            <div class="app-download" @click="downloadApp">
              <img src="../assets/download.png" alt />
            </div>
            <div class="app-close">
              <img src="../assets/close.svg" alt />
            </div>
          </div>
        </div>
        <div v-if="$store.state.landscape">
          <div
            class="headerBg wxbg"
            id="header"
            :style="{ backgroundImage: 'url(' + headerImg + ')' }"
          >
            <div class="app-share-height" v-if="appShare"></div>
            <div class="landscapeHead" id="landscapeHead">
              <div class="landscapeTap">
                <user-profile
                  :img="reportNickname === '' ? '' : reportHeaderImg"
                  :name="reportNickname"
                  :gender="reportGender"
                  v-if="display_user_profile"
                  :isPayment="isPayment"
                  :openWxShare="openWxShare"
                  :finger="reportFinger"
                ></user-profile>
                <div class="week-month-user" v-else>
                  <div
                    class="header-img"
                    :class="{
                      man: reportGender === 0,
                      woman: reportGender === 1
                    }"
                  >
                    {{ reportNicknameInitial }}
                    <div class="icon">
                      <img
                        src="../assets/man.svg"
                        alt
                        v-if="reportGender === 0"
                      />
                      <img src="../assets/woman.svg" alt v-else />
                    </div>
                  </div>
                  <div class="info">
                    <div class="name">{{ reportNickname }}</div>
                    <div class="birthday">
                      {{ moment(reportBirthday).format('YYYY-MM-DD') }}
                    </div>
                  </div>
                </div>
                <report-id
                  :date="reportDate"
                  :id="reportId"
                  v-if="display_date"
                ></report-id>
                <div class="week-month-date" v-else>
                  {{ moment(startTime).format('YYYY-MM-DD') }} ——
                  {{ moment(endTime).format('YYYY-MM-DD') }}
                </div>
              </div>
              <remark
                :remark="reportRemark"
                :reportShare="reportShare"
                v-if="
                  (display_remark && !reportShare) ||
                    (display_remark && reportRemark !== '' && reportShare)
                "
              ></remark>
              <div class="week-month-note" v-if="display_week_month_note">
                <div class="icon">
                  <img src="../assets/android/icon-info-copy.svg" alt />
                </div>
                <div>根据您最近的测量情况，为您提供以下分析内容</div>
              </div>
            </div>
            <div class="landscapeMainbg">
              <div class="landscapeLeft">
                <nav-bar
                  :navBars="navBars"
                  :selectedId="navSelectedId"
                  v-on:change-selected-id="changeSelectedId"
                  v-on:navBarIsOnTop="navBarIsOnTop"
                  v-if="display_navbar && display_all"
                ></nav-bar>
              </div>
              <div class="landscapeRight">
                <div class="mainbg" v-if="!display_all">
                  <div
                    class="item"
                    v-if="display_measurement_judgment"
                    :style="{
                      borderImageSource: 'url(' + borderColorImg + ')'
                    }"
                  >
                    <measurement-judgment
                      :measurementJudgmentContent="measurementJudgmentContent"
                    >
                    </measurement-judgment>
                  </div>
                </div>
                <div class="mainbg" v-if="display_all">
                  <div
                    class="item"
                    v-if="display_measurement_judgment"
                    :style="{
                      borderImageSource: 'url(' + borderColorImg + ')'
                    }"
                  >
                    <measurement-judgment
                      :measurementJudgmentContent="measurementJudgmentContent"
                    >
                    </measurement-judgment>
                  </div>
                  <div
                    class="item"
                    v-if="display_heart_rate"
                    :style="{ borderImageSource: 'url(' + borderImg + ')' }"
                  >
                    <heart-rate
                      :averageRate="reportAverageRate"
                      :isPayment="isPayment"
                    ></heart-rate>
                    <spo v-if="display_spo" :spo="spo"></spo>
                  </div>
                  <div
                    id="rp"
                    class="item"
                    v-if="display_rp"
                    :style="{ borderImageSource: 'url(' + borderImg + ')' }"
                  >
                    <div class="title">
                      <div class="img">
                        <img src="../assets/analysis-report/rp.svg" alt />
                      </div>
                      <div>风险预估</div>
                    </div>
                    <risk-predictor
                      :riskEstimate="riskEstimate"
                      :riskEstimateTips="riskEstimateTips"
                    ></risk-predictor>
                  </div>
                  <div
                    class="cd item"
                    id="cd"
                    v-if="display_cd_explain"
                    :style="{ borderImageSource: 'url(' + borderImg + ')' }"
                  >
                    <div class="title">
                      <div class="img">
                        <img src="../assets/android/report_tab_cd.svg" alt />
                      </div>
                      <div>体质辨证</div>
                    </div>
                    <cd-explains
                      :explains="reportCdExplains"
                      :notices="reportCdNotices"
                      :displayWeekMonth="display_week_month_note"
                    ></cd-explains>
                  </div>
                  <div
                    class="sd item"
                    id="sd"
                    v-if="display_sd_explain"
                    :style="{ borderImageSource: 'url(' + borderImg + ')' }"
                  >
                    <div class="title">
                      <div class="img">
                        <img src="../assets/android/report_tab_sd.svg" alt />
                      </div>
                      <div>脏腑辨证</div>
                    </div>
                    <sd-explains :explains="reportSdExplains"></sd-explains>
                  </div>
                  <div
                    class="nj item"
                    id="nj"
                    v-if="display_nj_details"
                    :style="{ borderImageSource: 'url(' + borderImg + ')' }"
                  >
                    <div class="title">
                      <div class="img">
                        <img src="../assets/report_icon_woman_2.svg" alt />
                      </div>
                      <div>女性健康</div>
                    </div>
                    <nj-details></nj-details>
                  </div>
                  <div
                    class="ll item"
                    id="ll"
                    v-if="display_physical_therapy_explain"
                    :style="{ borderImageSource: 'url(' + borderImg + ')' }"
                  >
                    <div class="title">
                      <div class="img">
                        <img
                          src="../assets/android/report_tab_factors.svg"
                          alt
                        />
                      </div>
                      <div>理疗指数</div>
                    </div>
                    <tai-chi
                      :yinyang="reportYinYang"
                      :yinzi="reportYinZi"
                    ></tai-chi>
                  </div>
                  <div
                    class="item"
                    v-if="display_stress_state_tips"
                    :style="{ borderImageSource: 'url(' + borderImg + ')' }"
                  >
                    <baby-tips :svTips="svTips" :tips="true"></baby-tips>
                  </div>
                  <div
                    class="item"
                    v-if="display_stress_state"
                    :style="{ borderImageSource: 'url(' + borderImg + ')' }"
                  >
                    <baby-tips
                      :babyTips="reportStressState"
                      :stressState="true"
                    ></baby-tips>
                  </div>
                  <div
                    id="ca"
                    class="item"
                    v-if="display_ca"
                    :style="{ borderImageSource: 'url(' + borderImg + ')' }"
                  >
                    <div class="title">
                      <div class="img">
                        <img src="../assets/analysis-report/ca.svg" alt />
                      </div>
                      <div>调理建议</div>
                    </div>
                    <conditoning-advice
                      :dietaryAdvice="dietaryAdvice"
                      :sportsAdvice="sportsAdvice"
                      :chineseMedicineAdvice="chineseMedicineAdvice"
                      :physicalTherapyAdvice="physicalTherapyAdvice"
                    ></conditoning-advice>
                  </div>
                  <div
                    class="item"
                    v-if="display_partial_data"
                    :style="{ borderImageSource: 'url(' + borderImg + ')' }"
                  >
                    <partial-pulse-wave
                      :partialPulseWave="partialPulseWave"
                    ></partial-pulse-wave>
                  </div>
                  <div
                    class="item"
                    v-if="display_cc_bar_chart"
                    :style="{ borderImageSource: 'url(' + borderImg + ')' }"
                  >
                    <cc-histogram
                      :ccItems="reportCcItems"
                      :isPayment="isPayment"
                    ></cc-histogram>
                  </div>
                </div>
                <div class="bottom">
                  <div class="line"></div>
                  <div>金姆健康</div>
                  <div class="line"></div>
                </div>
                <div class="note">注意：本分析报告内容解读仅供参考</div>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <div
            class="headerBg wxbg"
            id="header"
            :style="{
              position: narBarStatus ? 'fixed' : '',
              top: narBarStatus ? '-' + navBarTop + 'px' : 0,
              backgroundImage: 'url(' + headerImg + ')'
            }"
          >
            <div class="app-share-height" v-if="appShare"></div>
            <report-id
              :date="reportDate"
              :id="reportId"
              v-if="display_date"
            ></report-id>
            <div class="week-month-date" v-else>
              {{ moment(startTime).format('YYYY-MM-DD') }} ——
              {{ moment(endTime).format('YYYY-MM-DD') }}
            </div>
            <user-profile
              :img="reportNickname === '' ? '' : reportHeaderImg"
              :name="reportNickname"
              :gender="reportGender"
              v-if="display_user_profile"
              :isPayment="isPayment"
              :openWxShare="openWxShare"
              :finger="reportFinger"
            ></user-profile>
            <div class="week-month-user" v-else>
              <div
                class="header-img"
                :class="{ man: reportGender === 0, woman: reportGender === 1 }"
              >
                {{ reportNicknameInitial }}
                <div class="icon">
                  <img src="../assets/man.svg" alt v-if="reportGender === 0" />
                  <img src="../assets/woman.svg" alt v-else />
                </div>
              </div>
              <div class="info">
                <div class="name">{{ reportNickname }}</div>
                <div class="birthday">
                  {{ moment(reportBirthday).format('YYYY-MM-DD') }}
                </div>
              </div>
            </div>
            <remark
              :remark="reportRemark"
              :reportShare="reportShare"
              v-if="
                (display_remark && !reportShare) ||
                  (display_remark && reportRemark !== '' && reportShare)
              "
            ></remark>
            <div class="line"></div>
            <div class="week-month-note" v-if="display_week_month_note">
              <div class="icon">
                <img src="../assets/android/icon-info-copy.svg" alt />
              </div>
              <div>根据您最近的测量情况，为您提供以下分析内容</div>
            </div>
            <nav-bar
              :navBars="navBars"
              :selectedId="navSelectedId"
              v-on:change-selected-id="changeSelectedId"
              v-on:navBarIsOnTop="navBarIsOnTop"
              v-if="display_navbar && display_all"
            ></nav-bar>
          </div>
          <div
            :style="{ height: narBarStatus ? headerHeight + 'px' : 0 }"
          ></div>
          <div class="mainbg" v-if="!display_all">
            <div
              class="item"
              v-if="display_measurement_judgment"
              :style="{
                borderImageSource: 'url(' + borderColorImg + ')'
              }"
            >
              <measurement-judgment
                :measurementJudgmentContent="measurementJudgmentContent"
              >
              </measurement-judgment>
            </div>
          </div>
          <div class="mainbg" v-if="display_all">
            <div
              class="item"
              v-if="display_measurement_judgment"
              :style="{ borderImageSource: 'url(' + borderColorImg + ')' }"
            >
              <measurement-judgment
                :measurementJudgmentContent="measurementJudgmentContent"
              >
              </measurement-judgment>
            </div>
            <div
              class="item"
              v-if="display_heart_rate"
              :style="{ borderImageSource: 'url(' + borderImg + ')' }"
            >
              <heart-rate
                :averageRate="reportAverageRate"
                :isPayment="isPayment"
              ></heart-rate>
              <spo v-if="display_spo" :spo="spo"></spo>
            </div>
            <div
              id="rp"
              class="item"
              v-if="display_rp"
              :style="{ borderImageSource: 'url(' + borderImg + ')' }"
            >
              <div class="title">
                <div class="img">
                  <img src="../assets/analysis-report/rp.svg" alt />
                </div>
                <div>风险预估</div>
              </div>
              <risk-predictor
                :riskEstimate="riskEstimate"
                :riskEstimateTips="riskEstimateTips"
              ></risk-predictor>
            </div>
            <div
              class="cd item"
              id="cd"
              v-if="display_cd_explain"
              :style="{ borderImageSource: 'url(' + borderImg + ')' }"
            >
              <div class="title">
                <div class="img">
                  <img src="../assets/android/report_tab_cd.svg" alt />
                </div>
                <div>体质辨证</div>
              </div>
              <cd-explains
                :explains="reportCdExplains"
                :notices="reportCdNotices"
                :displayWeekMonth="display_week_month_note"
              ></cd-explains>
            </div>
            <div
              class="sd item"
              id="sd"
              v-if="display_sd_explain"
              :style="{ borderImageSource: 'url(' + borderImg + ')' }"
            >
              <div class="title">
                <div class="img">
                  <img src="../assets/android/report_tab_sd.svg" alt />
                </div>
                <div>脏腑辨证</div>
              </div>
              <sd-explains :explains="reportSdExplains"></sd-explains>
            </div>
            <div
              class="nj item"
              id="nj"
              v-if="display_nj_details"
              :style="{ borderImageSource: 'url(' + borderImg + ')' }"
            >
              <div class="title">
                <div class="img">
                  <img src="../assets/report_icon_woman_2.svg" alt />
                </div>
                <div>女性健康</div>
              </div>
              <nj-details></nj-details>
            </div>
            <div
              class="ll item"
              id="ll"
              v-if="display_physical_therapy_explain"
              :style="{ borderImageSource: 'url(' + borderImg + ')' }"
            >
              <div class="title">
                <div class="img">
                  <img src="../assets/android/report_tab_factors.svg" alt />
                </div>
                <div>理疗指数</div>
              </div>
              <tai-chi :yinyang="reportYinYang" :yinzi="reportYinZi"></tai-chi>
            </div>
            <div
              class="item"
              v-if="display_stress_state_tips"
              :style="{ borderImageSource: 'url(' + borderImg + ')' }"
            >
              <baby-tips :svTips="svTips" :tips="true"></baby-tips>
            </div>
            <div
              class="item"
              v-if="display_stress_state"
              :style="{ borderImageSource: 'url(' + borderImg + ')' }"
            >
              <baby-tips
                :babyTips="reportStressState"
                :stressState="true"
              ></baby-tips>
            </div>
            <div
              id="ca"
              class="item"
              v-if="display_ca"
              :style="{ borderImageSource: 'url(' + borderImg + ')' }"
            >
              <div class="title">
                <div class="img">
                  <img src="../assets/analysis-report/ca.svg" alt />
                </div>
                <div>调理建议</div>
              </div>
              <conditoning-advice
                :dietaryAdvice="dietaryAdvice"
                :sportsAdvice="sportsAdvice"
                :chineseMedicineAdvice="chineseMedicineAdvice"
                :physicalTherapyAdvice="physicalTherapyAdvice"
              ></conditoning-advice>
            </div>
            <div
              class="item"
              v-if="display_partial_data"
              :style="{ borderImageSource: 'url(' + borderImg + ')' }"
            >
              <partial-pulse-wave
                :partialPulseWave="partialPulseWave"
              ></partial-pulse-wave>
            </div>
            <div
              class="item"
              v-if="display_cc_bar_chart"
              :style="{ borderImageSource: 'url(' + borderImg + ')' }"
            >
              <cc-histogram
                :ccItems="reportCcItems"
                :isPayment="isPayment"
              ></cc-histogram>
            </div>
          </div>
          <div class="bottom">
            <div class="line"></div>
            <div>金姆健康</div>
            <div class="line"></div>
          </div>
          <div class="note">注意：本分析报告内容解读仅供参考</div>
        </div>
        <div class="backToTop" @click="backToTop" v-if="showBackToTop">
          <img src="../assets/android/report_icon_up.svg" alt />
        </div>
      </div>
      <div
        class="analysisReport"
        v-if="$store.state.isWx || $store.state.isJinmuL"
      >
        <div
          class="headerBg"
          :class="$store.state.isJinmuL ? 'app' : 'wx'"
          :style="{ backgroundImage: 'url(' + headerImg + ')' }"
        >
          <div class="appTabbar" v-if="$store.state.isJinmuL"></div>
          <div class="appTabbar onTop" v-if="$store.state.isJinmuL"></div>
          <report-id :date="reportDate" :id="reportId"></report-id>
          <user-profile
            :img="reportHeaderImg"
            :name="reportNickname"
            :gender="reportGender"
            :finger="reportFinger"
          ></user-profile>
          <div class="partialReport" :class="$store.state.isWx ? 'wx' : 'app'">
            <div class="top" v-if="$store.state.isJinmuL">
              <div style="position: relative">
                <img src="../assets/android/reporting_home_label_tip.svg" alt />
                <div class="text">请到微信公众号内查看您的详细报告</div>
              </div>
            </div>
            <cc-abnormal :ccItems="reportCcItems"></cc-abnormal>
            <div class="partialReportText">部分检测结果</div>
            <heart-rate
              :averageRate="reportAverageRate"
              :isPayment="isPayment"
            ></heart-rate>
            <cc-histogram
              :ccItems="reportCcItems"
              :isPayment="isPayment"
            ></cc-histogram>
          </div>
        </div>
        <div class="payment" v-if="$store.state.isWx && !isPayment">
          <div class="moneyInfo">
            <div class="text">金额:</div>
            <div class="money">限时免费</div>
            <div class="oldMoney">￥29.90</div>
          </div>
          <div class="btn" @click="makePayment">查看报告</div>
        </div>
      </div>
    </div>
    <router-view
      :reportQX="reportQX"
      :reportQXMS="reportQXMS"
      :reportMB="reportMB"
      :reportMBMS="reportMBMS"
      :reportFK="reportFK"
      :reportFKMS="reportFKMS"
      :reportJSMS="reportJSMS"
      :reportZG="reportZG"
      :reportZGTS="reportZGTS"
      :reportZGMS="reportZGMS"
      :reportYJ="reportYJ"
      :reportYJMS="reportYJMS"
      :reportSZN="reportSZN"
      :reportSZTS="reportSZTS"
      :reportLB="reportLB"
      :reportLBMS="reportLBMS"
      :reportRX="reportRX"
      :reportRXMS="reportRXMS"
      :reportBC="reportBC"
      :reportBCMS="reportBCMS"
      :reportF100="reportF100"
      :reportF101="reportF101"
      :reportF102="reportF102"
      :reportF105="reportF105"
      :reportF106="reportF106"
      :reportF107="reportF107"
      :reportM0="reportM0"
      :reportM1="reportM1"
      :reportM2="reportM2"
      :reportM3="reportM3"
    />
  </div>
</template>

<script>
import borderImg from '../assets/analysis-report/border-bg.png'
import borderColorImg from '../assets/analysis-report/feng_bg.png'
import headerImg from '../assets/bg.png'
import { ApiOwner, ApiJML, ApiWx } from '../api' // api
import pulseDataSvg from '../assets/android/new/report_tab_pulse_data.svg'
import cdSvg from '../assets/android/new/report_tab_cd.svg'
import factorsSvg from '../assets/android/new/report_tab_factors.svg'
import sdSvg from '../assets/android/new/report_tab_sd.svg'
import njSvg from '../assets/report_icon_woman_1.svg'
import rpSvg from '../assets/analysis-report/rp-nav.svg'
import caSvg from '../assets/analysis-report/ca-nav.svg'
import ReportId from './ReportId' // 事件编号模块
import UserProfile from './UserProfile' // 用户信息模块
import Remark from './Remark' // 备注模块
import BabyTips from './BabyTips' // 金姆宝宝提示
import NavBar from './NavBar' // 导航栏
import CcAbnormal from './CcAbnormal' // 异常经络模块模块
import HeartRate from './HeartRate' // 心率图模块
import Spo from './Spo' // 血氧饱和度模块
import PartialPulseWave from './PartialPulseWave' // 局部脉搏波形图模块
import RiskPredictor from './RiskPredictor' // 风险预估模块
import ConditoningAdvice from './ConditoningAdvice' // 调理建议模块
import CcHistogram from './CcHistogram' // 经络柱状图模块
import CcDetails from './CcDetails' // 经络解读模块
import CdExplains from './CdExplains' // 体质辨证模块
import SdExplains from './SdExplains' // 脏腑辨证模块
import TaiChi from './TaiChi' // 理疗指数模块
import NjDetails from './NjDetails' // 女性健康模块
import MeasurementJudgment from './MeasurementJudgment.vue'
const wx = require('weixin-js-sdk') // 微信jisdk
const urljoin = require('url-join')
const moment = require('moment')
const instanceReport = require('../../static/instanceReport.json')
export default {
  name: 'analysisreport',
  data() {
    return {
      moment, // 时间插件
      borderImg, // 边框背景图
      borderColorImg,
      headerImg, // 顶部背景图
      appShare: false, // 是否是app分析页面
      pulseDataSvg,
      cdSvg,
      sdSvg,
      factorsSvg,
      njSvg,
      rpSvg,
      caSvg,
      navSelectedId: '', // @type{string} 导航栏选择id
      isPayment: false, // @type{boolean} 是否支付购买查看
      display_user_profile: false, // @type{boolean} 用户信息是否显示
      display_remark: false, // @type{boolean} 备注是否显示
      display_navbar: false, // @type{boolean} 导航是否显示
      display_baby_tips: false, // @type{boolean} 宝宝提示是否显示
      display_tags: false, // @type{boolean} 身体状态是否显示
      display_heart_rate: false, // @type{boolean} 心率图是否显示
      display_partial_data: false, // @type{boolean} 波形图是否显示
      display_cc_bar_chart: false, // @type{boolean} 柱状图是否显示
      display_cd_explain: false, // @type{boolean} 体质辨证是否显示
      display_sd_explain: false, // @type{boolean} 脏腑辨证是否显示
      display_nj_details: false, // @type{boolean} 女性健康是否显示
      display_physical_therapy_explain: false, // @type{boolean} 理疗指数是否显示
      display_rp: false, // @type{boolean} 风险预估是否显示
      display_ca: false, // @type{boolean} 调理建议是否显示
      display_date: true, // @type{boolean} 日期是否显示
      display_week_month_note: false, // @type{boolean} 是否显示周报、月报
      display_stress_state: false, // @type{boolean} 应激态判定
      display_stress_state_tips: false, // @type{boolean} 应激态解读判定
      recordId: 0, //  @type {integer} 测量流水号
      analysisSession: '', // @type {string} 智能分析会话信息（如果有问询需要在后续请求中填写该字段）
      reportDate: '', // @param {string <date-time>} 分析报告时间
      reportId: 0, // @param {integer} 分析报告编号
      reportHeaderImg: '', // @param {string} 用户头像
      reportNickname: '', // @param {string} 用户姓名
      reportNicknameInitial: '', // @param {string} 用户姓名首字母
      reportGender: -1, // @param {integer} 用户性别
      reportBirthday: '', // @param {string} 生日
      reportFinger: -1, // @param {integer} 手指
      reportRemark: '', // @param {string} 用户备注
      reportBabyTips: [], //  @param {Array} 金姆宝宝提示
      reportStressState: {}, //  @param {object} 应激状态
      svTips: {}, //  @param {object} 运动和病毒的应激态提示
      reportTags: [], // @param {Array} 身体状态数组
      reportCcItems: [], // @param {Array} 经络数组
      reportMinRate: 0, // @param {integer} 最低心率
      reportAverageRate: 0, // @param {integer} 平均心率
      reportMaxRate: 0, // @param {integer} 最高心率
      riskEstimate: [], // @param {Array} 风险预估
      riskEstimateTips: [], // @param {Array} 风险预估描述
      dietaryAdvice: [], // @param {Array} 食疗建议
      sportsAdvice: [], // @param {Array}  运动建议
      chineseMedicineAdvice: [], // @param {Array} 中药建议
      physicalTherapyAdvice: [], // @param {Array} 理疗建议
      treatmentAdvices: [], // @param {Array}
      partialPulseWave: [], // @param {Array} 脉搏点
      reportCcStrength: [], // @param {Array} 经络解读名称数组
      reportCcExplains: [], // @param {Array} 经络解读详情数组
      reportTipsForWoman: [], // @param {Array} 女性解读数组
      reportQX: [], // @param {Array} 情绪健康指数
      reportQXMS: [], // @param {Array} 情绪健康描述
      reportMB: [], // @param {Array} 面部美肤指数
      reportMBMS: [], // @param {Array} 面部美肤描述
      reportFK: [], // @param {Array} 妇科炎症
      reportFKMS: [], // @param {Array} 妇科炎症描述
      reportJSMS: [], // @param {Array} 激素水平描述
      reportZG: [], // @param {Array} 子宫健康
      reportZGTS: [], // @param {Array} 子宫健康注意
      reportZGMS: [], // @param {Array} 子宫健康描述
      reportYJ: [], // @param {Array} 月经健康
      reportYJMS: [], // @param {Array} 月经健康描述
      reportSZN: [], // @param {integer} 生殖年龄指数
      reportSZTS: [], // @param {Array} 生殖年龄注意
      reportLB: [], // @param {integer} 淋巴健康指数
      reportLBMS: [], // @ param {Array} 淋巴健康描述
      reportRX: [], // @param {integer} 乳腺健康
      reportRXMS: [], // @ param {Array} 乳腺健康描述
      reportBC: [], // @ param {Array} 乳腺癌卵巢癌
      reportBCMS: [], // @ param {Array} 乳腺癌卵巢癌描述
      reportF100: 0, // @param {integer} 子宫健康指数
      reportF101: 0, // @param {integer} 妇科疾病风险指数
      reportF102: 0, // @param {integer} 妇科炎症指数
      reportF105: 0, // @param {integer} 生殖年龄指数
      reportF106: 0, // @param {integer} 激素水平
      reportF107: 0, // @param {integer} 淋巴健康指数
      reportM1: 0, // @param {integer} 月经不调指数
      reportM0: 0, // @param {integer} 月经健康指数
      reportM2: 0, // @param {integer} 痛经指数
      reportM3: 0, // @param {integer} 乳腺健康
      reportUAPrompts: [], // @param {Array} 子宫注意提示
      reportCcNotices: [], // @param {Array} 经络解读注意数组
      reportCdExplains: [], // @param {Array} 经络体质详情数组
      reportCdNotices: [], // @param {Array} 经络体质注意数组
      reportSdExplains: [], // @param {Array} 经络脏腑注意数组
      reportYinYang: [], // @param {Array} 阴阳数组
      reportYinZi: [], // @param {Array} 因子数组
      showBackToTop: false, // @type{boolean} 展示到顶部图标
      scrollTimeOut: false, // @type{boolean} 滚动延迟
      navBars: [], // @param {Array.Object} 导航栏数组
      wxShare: false, // @type{boolean} 微信分享遮罩
      wxTitle: '', // @param {string} 微信分享标题
      wxDesc: '', // @param {string} 微信分享描述
      wxLink: '', // @param {string} 微信分享链接
      wxImgUrl: '', // @param {string} 微信分享图标
      reportShare: false, // @param {string} 报告分析
      headerHeight: 0, // @param {integer} header高度
      navBarTop: 0, // @param {integer} 导航顶部距离
      narBarStatus: false, // @param {boolean} 导航悬浮
      startTime: '', // 周报月报开始时间
      endTime: '', // 周报月报结束时间
      display_spo: false, // 血氧模块是否显示
      spo: 0, // @param {integer} 血氧饱和度
      measurementJudgmentContent: '', // 风判断内容
      display_all: true, // 是否显示除了风判断模块
      display_measurement_judgment: false // 是否显示风判断模块
    }
  },
  mounted() {
    const t = this
    // 监听页面滚动
    window.addEventListener('scroll', t.windowScroll)
    // APP获取H5路由
    t.$store.dispatch('invokeBridgeMethod', {
      name: 'interfaceMethod',
      data: 'analysisreport'
    })
    if (t.$route.query.token || t.$route.query.record_id) {
      t.$store.state.isLoading = true
      // 通用修改title方法
      t.$store.dispatch('changeTitle', '分析报告')
      t.backToTop()
      if (t.$route.query.token) {
        t.reportShare = true
        if (t.$store.state.isWx) {
          t.wxTitle = '我正在用金姆健康检测仪做检查'
          t.wxDesc = '快来和我一起看看吧！'
          t.wxLink = window.location.href
          t.wxImgUrl = urljoin(
            window.location.href.split('app.html')[0],
            'static/share.png'
          )
          t.getJsSdkConfig(true)
          t.getWXShareRecordQuestion(t.$route.query.token)
        } else {
          t.getAPPShareRecordV2Question(t.$route.query.token)
        }
      } else {
        // 根据url获取 recordId 和 cid
        t.recordId = parseInt(t.$route.query.record_id) // 测量流水号
        if (t.$store.state.isWx) {
          t.getWXToken()
          t.getWXRecordQuestion()
        } else {
          if (t.$store.state.isJinmuL) {
            t.getJMLRecordQuestion()
          } else {
            t.$store.dispatch('getAppClientAuth').then(res => {
              t.$store.state.authorization = res.data.authorization
              t.getRecordV2Analyze()
            })
          }
        }
      }
    }
    if (t.$route.query.week) {
      t.$store.dispatch('changeTitle', '周报告')
      t.$store.state.isLoading = true
      t.$store.dispatch('getAppClientAuth').then(res => {
        t.$store.state.authorization = res.data.authorization
        t.display_week_month_note = true
        t.getWeeklyReport()
      })
    }
    if (t.$route.query.month) {
      t.$store.dispatch('changeTitle', '月报告')
      t.$store.state.isLoading = true
      t.$store.dispatch('getAppClientAuth').then(res => {
        t.$store.state.authorization = res.data.authorization
        t.display_week_month_note = true
        t.getMonthlyReport()
      })
    }
    if (t.$route.query.instance) {
      t.$store.dispatch('changeTitle', '示例分析报告')
      t.reportShare = true
      t.getInstanceReport()
    }
  },
  destroyed() {
    switch (process.env.ENV) {
      case 'dev':
        document.title = '金姆健康D'
        break
      case 'test':
        document.title = '金姆健康T'
        break
      case 'staging':
        document.title = '金姆健康S'
        break
      default:
        document.title = '金姆健康'
        break
    }
    const t = this
    // 移除监听
    window.removeEventListener('scroll', t.windowScroll)
  },
  methods: {
    /**
     * 下载APP
     */
    downloadApp() {
      let u = navigator.userAgent
      let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 // android终端
      let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
      if (isiOS) {
        window.location.href =
          'https://itunes.apple.com/cn/app/%E9%87%91%E5%A7%86%E5%81%A5%E5%BA%B7/id1229337337?mt=8'
      }
      if (isAndroid) {
        window.location.href =
          'https://s3.cn-north-1.amazonaws.com.cn/res.jinmuhealth.com/v2/download/apk/jinmu-phone-env_production-release-2.1.0_2193.apk'
      }
    },
    /**
     * navbar 置顶
     */
    navBarIsOnTop(val) {
      this.headerHeight = val.headerHeight
      this.navBarTop = val.navBarTop
      this.narBarStatus = val.narBarStatus
    },
    /**
     *
     *  打开微信分享遮罩
     *
     */
    openWxShare() {
      const t = this
      if (!t.wxShare) {
        t.getWXToken()
        t.wxShare = true
      } else {
        t.wxShare = false
      }
    },
    /**
     *
     *  微信回调config
     *
     */
    getJsSdkConfig(isShow) {
      const t = this
      const wxApi = new ApiWx()
      wxApi.getJsSdkConfig(window.location.href.split('#')[0]).then(res => {
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: res.data.app_id, // 必填，公众号的唯一标识
          timestamp: res.data.timestamp, // 必填，生成签名的时间戳
          nonceStr: res.data.noncestr, // 必填，生成签名的随机串
          signature: res.data.signature, // 必填，签名
          jsApiList: [
            'hideAllNonBaseMenuItem',
            'showAllNonBaseMenuItem',
            'onMenuShareTimeline',
            'onMenuShareAppMessage'
          ] // 必填，需要使用的JS接口列表
        })
        wx.ready(() => {
          // 隐藏所有非基础按钮接口
          if (isShow) {
            wx.showAllNonBaseMenuItem()
          } else {
            wx.hideAllNonBaseMenuItem()
          }
          wx.onMenuShareTimeline({
            title: t.wxTitle, // 分享标题
            desc: t.wxDesc, // 分享描述
            link: t.wxLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: t.wxImgUrl, // 分享图标
            success() {
              t.wxShare = false
              // 用户点击了分享后执行的回调函数
            }
          })
          wx.onMenuShareAppMessage({
            title: t.wxTitle, // 分享标题
            desc: t.wxDesc, // 分享描述
            link: t.wxLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: t.wxImgUrl, // 分享图标
            success() {
              t.wxShare = false
              // 用户点击了分享后执行的回调函数
            }
          })
        })
      })
    },
    /**
     *
     *  微信支付方法
     *
     */
    makePayment() {
      const t = this
      t.$store.state.isLoading = true
      const wxApi = new ApiWx()
      wxApi.makePayment(t.recordId).then(res => {
        t.isPayment = true
        t.backToTop()
        t.$store.state.isLoading = false
      })
    },
    /**
     *
     *  注册改变导航栏选择索引
     *  @type{number} index 导航栏选择索引
     */
    changeSelectedId(index) {
      const t = this
      t.navSelectedId = t.navBars[index].id
      if (t.$store.state.landscape) {
        document.body.scrollTop = document.documentElement.scrollTop = document.querySelector(
          t.navBars[index].id
        ).offsetTop
      } else {
        document.body.scrollTop = document.documentElement.scrollTop =
          document.querySelector(t.navBars[index].id).offsetTop -
          (document.documentElement.clientWidth / 750) * 173
      }
    },
    /**
     *
     *  微信获取 分享token
     *
     */
    getWXToken() {
      const t = this
      const wxApi = new ApiWx()
      wxApi.getToken(t.recordId).then(res => {
        t.wxTitle = '我正在用金姆健康检测仪做检查'
        t.wxDesc = '快来和我一起看看吧！'
        const seedArr = [
          '0',
          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
          '7',
          '8',
          '9',
          'a',
          'b',
          'c',
          'd',
          'e',
          'f',
          'g',
          'h',
          'i',
          'j',
          'k',
          'l',
          'm',
          'n',
          'o',
          'p',
          'q',
          'r',
          's',
          't',
          'u',
          'v',
          'w',
          'x',
          'y',
          'z'
        ]
        let seed =
          seedArr[Math.floor(Math.random() * 36)] +
          seedArr[Math.floor(Math.random() * 36)] +
          seedArr[Math.floor(Math.random() * 36)] +
          seedArr[Math.floor(Math.random() * 36)]
        t.wxLink =
          window.location.href.split('#/')[0] +
          '#/analysisreport?token=' +
          res.data.token +
          '&random=' +
          seed
        t.wxImgUrl = urljoin(
          window.location.href.split('app.html')[0],
          'static/share.png'
        )
        t.getJsSdkConfig(true)
      })
    },
    /**
     *
     *  微信获取 分享智能分析问题及答案
     *
     */
    getWXShareRecordQuestion(token) {
      const t = this
      const wxApi = new ApiWx()
      wxApi.getShareRecordAnalyze(token).then(res => {
        // 判断分析报告是否异常
        if (res.data.report_content.measurement_tips.length > 0) {
          t.$store.dispatch('popmsg', {
            msg: res.data.report_content.measurement_tips[0].content
          })
        }

        // 设置词条版本
        if (res.data.report_version !== '') {
          t.$store.state.entryVersion = res.data.report_version
        }

        t.isPayment = true
        // 备注模块取后台数据
        t.display_remark =
          res.data.report_content.display_options.display_remark
        t.display_user_profile =
          res.data.report_content.display_options.display_user_profile
        t.display_baby_tips =
          res.data.report_content.display_options.display_baby_tips
        t.display_tags = res.data.report_content.display_options.display_tags
        t.display_heart_rate =
          res.data.report_content.display_options.display_heart_rate
        t.display_partial_data =
          res.data.report_content.display_options.display_partial_data
        t.display_cc_bar_chart =
          res.data.report_content.display_options.display_cc_bar_chart
        t.display_cd_explain =
          res.data.report_content.display_options.display_cd_explain
        t.display_sd_explain =
          res.data.report_content.display_options.display_sd_explain
        t.display_nj_details =
          res.data.report_content.display_options.display_wh
        t.display_physical_therapy_explain =
          res.data.report_content.display_options.display_physical_therapy_explain

        if (t.display_rp) {
          t.navBars.push({
            id: '#rp',
            url: t.rpSvg,
            text: '风险预估'
          })
        }
        if (t.display_cd_explain) {
          t.navBars.push({
            id: '#cd',
            url: t.cdSvg,
            text: '体质辨证'
          })
        }
        if (t.display_sd_explain) {
          t.navBars.push({
            id: '#sd',
            url: t.sdSvg,
            text: '脏腑辨证'
          })
        }
        if (t.display_nj_details) {
          t.navBars.push({
            id: '#nj',
            url: t.njSvg,
            text: '女性健康'
          })
        }
        if (t.display_physical_therapy_explain) {
          t.navBars.push({
            id: '#ll',
            url: t.factorsSvg,
            text: '理疗指数'
          })
        }
        if (t.display_ca) {
          t.navBars.push({
            id: '#ca',
            url: t.caSvg,
            text: '调理建议'
          })
        }
        t.reportId = res.data.report_id
        t.reportDate = res.data.report_content.created_at
        t.reportNickname = res.data.report_content.user_profile.nickname
        t.reportHeaderImg = res.data.report_content.user_profile.avatar_url
        t.reportGender = res.data.report_content.user_profile.gender
        t.reportRemark = res.data.report_content.remark
        t.reportBabyTips = res.data.report_content.baby_tips
        t.reportTags = res.data.report_content.tags.filter(element => {
          return (
            element.key.indexOf('_QC0001.0') >= 0 ||
            element.key.indexOf('_QC0002.0') >= 0 ||
            element.key.indexOf('_QC0004.0') >= 0 ||
            element.key.indexOf('_QC0005.0') >= 0 ||
            element.key.indexOf('_QC0006.0') >= 0 ||
            element.key.indexOf('_QC0007.0') >= 0 ||
            element.key.indexOf('_QC0009.0') >= 0 ||
            element.key.indexOf('_QC0010.0') >= 0 ||
            element.key.indexOf('_QC0011.0') >= 0 ||
            element.key.indexOf('_QC0012.0') >= 0
          )
        })
        t.reportFinger = res.data.report_content.pulse_test.fingers[0]
        t.reportCcItems = []
        t.reportCcItems.push(res.data.report_content.measurement_result.c0)
        t.reportCcItems.push(res.data.report_content.measurement_result.c1)
        t.reportCcItems.push(res.data.report_content.measurement_result.c2)
        t.reportCcItems.push(res.data.report_content.measurement_result.c3)
        t.reportCcItems.push(res.data.report_content.measurement_result.c4)
        t.reportCcItems.push(res.data.report_content.measurement_result.c5)
        t.reportCcItems.push(res.data.report_content.measurement_result.c6)
        t.reportCcItems.push(res.data.report_content.measurement_result.c7)
        res.data.report_content.channels_and_collaterals_strength.forEach(
          element => {
            element.label =
              element.labels.length > 0
                ? element.labels[0].label.split('+')[0].split('-')[0]
                : ''
            element.highNumber =
              element.labels.length > 0
                ? element.labels[0].label.split('+').length - 1
                : ''
            element.lowNumber =
              element.labels.length > 0
                ? element.labels[0].label.split('-').length - 1
                : ''
          }
        )
        t.reportCcStrength =
          res.data.report_content.channels_and_collaterals_strength
        t.reportCcExplains =
          res.data.report_content.channels_and_collaterals_explains
        t.reportTipsForWoman = res.data.report_content.tips_for_woman
        t.reportQX = res.data.report_content.emotional_health_indexes
        t.reportQXMS = res.data.report_content.emotional_health_descriptions
        t.reportMB = res.data.report_content.facial_skins
        t.reportMBMS = res.data.report_content.facial_skin_descriptions
        t.reportFK = res.data.report_content.gynecological_inflammations
        t.reportFKMS =
          res.data.report_content.gynecological_inflammation_descriptions
        t.reportJSMS = res.data.report_content.hormone_levels
        t.reportZG = res.data.report_content.uterine_health_indexes
        t.reportZGTS = res.data.report_content.uterus_attention_prompts
        t.reportZGMS = res.data.report_content.uterine_health_descriptions
        t.reportYJ = res.data.report_content.menstrual_health_values
        t.reportYJMS = res.data.report_content.menstrual_health_descriptions
        t.reportSZN = res.data.report_content.reproductive_ages
        t.reportSZTS = res.data.report_content.reproductive_age_considerations
        t.reportLB = res.data.report_content.lymphatic_health
        t.reportLBMS = res.data.report_content.lymphatic_health_descriptions
        t.reportRX = res.data.report_content.breast_health
        t.reportRXMS = res.data.report_content.breast_health_descriptions
        t.reportBC = res.data.report_content.breast_cancer_ovarian_cancers
        t.reportBCMS =
          res.data.report_content.breast_cancer_ovarian_cancer_descriptions
        t.reportF100 = res.data.report_content.f100
        t.reportF101 = res.data.report_content.f101
        t.reportF102 = res.data.report_content.f102
        t.reportF105 = res.data.report_content.f105
        t.reportF106 = res.data.report_content.f106
        t.reportF107 = res.data.report_content.f107
        t.reportM0 = res.data.report_content.m0
        t.reportM1 = res.data.report_content.m1
        t.reportM2 = res.data.report_content.m2
        t.reportM3 = res.data.report_content.m3
        t.reportCcNotices =
          res.data.report_content.channels_and_collaterals_explain_notices
        t.reportCdExplains =
          res.data.report_content.constitution_differentiation_explains
        t.reportCdNotices =
          res.data.report_content.constitution_differentiation_explain_notices
        t.reportSdExplains =
          res.data.report_content.syndrome_differentiation_explains
        t.reportYinYang.push({
          value: res.data.report_content.physical_therapy_explain.f0
        })
        t.reportYinYang.push({
          value: res.data.report_content.physical_therapy_explain.f1
        })
        if (res.data.report_content.dictionary_entries.length > 0) {
          t.reportYinZi.push({
            label: res.data.report_content.dictionary_entries[2].label,
            value: res.data.report_content.physical_therapy_explain.f2,
            content: res.data.report_content.factor_explains[2].label
          })
          t.reportYinZi.push({
            label: res.data.report_content.dictionary_entries[3].label,
            value: res.data.report_content.physical_therapy_explain.f3,
            content: res.data.report_content.factor_explains[3].label
          })
        }
        t.reportMinRate =
          res.data.report_content.measurement_result.app_lowest_heart_rate > 200
            ? 200
            : res.data.report_content.measurement_result.app_lowest_heart_rate
        t.reportAverageRate =
          res.data.report_content.measurement_result.app_heart_rate > 200
            ? 200
            : res.data.report_content.measurement_result.app_heart_rate
        t.reportMaxRate =
          res.data.report_content.measurement_result.app_highest_heart_rate >
          200
            ? 200
            : res.data.report_content.measurement_result.app_highest_heart_rate
        t.partialPulseWave = res.data.report_content.partial_pulse_wave.points
        t.$store.state.isLoading = false
      })
    },
    /**
     *
     *  微信获取 智能分析问题及答案
     *
     */
    getWXRecordQuestion() {
      const t = this
      const wxApi = new ApiWx()
      wxApi.getRecordAnalyze(t.recordId).then(res => {
        // 判断分析报告是否异常
        if (res.data.report_content.measurement_tips.length > 0) {
          t.$store.dispatch('popmsg', {
            msg: res.data.report_content.measurement_tips[0].content
          })
        }

        // 设置词条版本
        if (res.data.report_version !== '') {
          t.$store.state.entryVersion = res.data.report_version
        }

        t.isPayment = res.data.report_content.has_paid
        t.display_user_profile =
          res.data.report_content.display_options.display_user_profile
        t.display_remark =
          res.data.report_content.display_options.display_remark
        t.display_baby_tips =
          res.data.report_content.display_options.display_baby_tips
        t.display_tags = res.data.report_content.display_options.display_tags
        t.display_heart_rate =
          res.data.report_content.display_options.display_heart_rate
        t.display_partial_data =
          res.data.report_content.display_options.display_partial_data
        t.display_cc_bar_chart =
          res.data.report_content.display_options.display_cc_bar_chart
        t.display_cd_explain =
          res.data.report_content.display_options.display_cd_explain
        t.display_sd_explain =
          res.data.report_content.display_options.display_sd_explain
        t.display_nj_details =
          res.data.report_content.display_options.display_wh
        t.display_physical_therapy_explain =
          res.data.report_content.display_options.display_physical_therapy_explain

        if (t.display_rp) {
          t.navBars.push({
            id: '#rp',
            url: t.rpSvg,
            text: '风险预估'
          })
        }
        if (t.display_cd_explain) {
          t.navBars.push({
            id: '#cd',
            url: t.cdSvg,
            text: '体质辨证'
          })
        }
        if (t.display_sd_explain) {
          t.navBars.push({
            id: '#sd',
            url: t.sdSvg,
            text: '脏腑辨证'
          })
        }
        if (t.display_nj_details) {
          t.navBars.push({
            id: '#nj',
            url: t.njSvg,
            text: '女性健康'
          })
        }
        if (t.display_physical_therapy_explain) {
          t.navBars.push({
            id: '#ll',
            url: t.factorsSvg,
            text: '理疗指数'
          })
        }
        if (t.display_ca) {
          t.navBars.push({
            id: '#ca',
            url: t.caSvg,
            text: '调理建议'
          })
        }
        t.reportId = res.data.report_id
        t.reportDate = res.data.report_content.created_at
        t.reportNickname = res.data.report_content.user_profile.nickname
        t.reportHeaderImg = res.data.report_content.user_profile.avatar_url
        t.reportGender = res.data.report_content.user_profile.gender
        t.reportRemark = res.data.report_content.remark
        t.reportBabyTips = res.data.report_content.baby_tips
        t.reportTags = res.data.report_content.tags.filter(element => {
          return (
            element.key.indexOf('_QC0001.0') >= 0 ||
            element.key.indexOf('_QC0002.0') >= 0 ||
            element.key.indexOf('_QC0004.0') >= 0 ||
            element.key.indexOf('_QC0005.0') >= 0 ||
            element.key.indexOf('_QC0006.0') >= 0 ||
            element.key.indexOf('_QC0007.0') >= 0 ||
            element.key.indexOf('_QC0009.0') >= 0 ||
            element.key.indexOf('_QC0010.0') >= 0 ||
            element.key.indexOf('_QC0011.0') >= 0 ||
            element.key.indexOf('_QC0012.0') >= 0
          )
        })
        t.reportFinger = res.data.report_content.measurement_result.finger
        t.reportCcItems = []
        t.reportCcItems.push(res.data.report_content.measurement_result.c0)
        t.reportCcItems.push(res.data.report_content.measurement_result.c1)
        t.reportCcItems.push(res.data.report_content.measurement_result.c2)
        t.reportCcItems.push(res.data.report_content.measurement_result.c3)
        t.reportCcItems.push(res.data.report_content.measurement_result.c4)
        t.reportCcItems.push(res.data.report_content.measurement_result.c5)
        t.reportCcItems.push(res.data.report_content.measurement_result.c6)
        t.reportCcItems.push(res.data.report_content.measurement_result.c7)
        res.data.report_content.channels_and_collaterals_strength.forEach(
          element => {
            element.label =
              element.labels.length > 0
                ? element.labels[0].label.split('+')[0].split('-')[0]
                : ''
            element.highNumber =
              element.labels.length > 0
                ? element.labels[0].label.split('+').length - 1
                : ''
            element.lowNumber =
              element.labels.length > 0
                ? element.labels[0].label.split('-').length - 1
                : ''
          }
        )
        t.reportCcStrength =
          res.data.report_content.channels_and_collaterals_strength
        t.reportCcExplains =
          res.data.report_content.channels_and_collaterals_explains
        t.reportTipsForWoman = res.data.report_content.tips_for_woman
        t.reportQX = res.data.report_content.emotional_health_indexes
        t.reportQXMS = res.data.report_content.emotional_health_descriptions
        t.reportMB = res.data.report_content.facial_skins
        t.reportMBMS = res.data.report_content.facial_skin_descriptions
        t.reportFK = res.data.report_content.gynecological_inflammations
        t.reportFKMS =
          res.data.report_content.gynecological_inflammation_descriptions
        t.reportJSMS = res.data.report_content.hormone_levels
        t.reportZG = res.data.report_content.uterine_health_indexes
        t.reportZGTS = res.data.report_content.uterus_attention_prompts
        t.reportZGMS = res.data.report_content.uterine_health_descriptions
        t.reportYJ = res.data.report_content.menstrual_health_values
        t.reportYJMS = res.data.report_content.menstrual_health_descriptions
        t.reportSZN = res.data.report_content.reproductive_ages
        t.reportSZTS = res.data.report_content.reproductive_age_considerations
        t.reportLB = res.data.report_content.lymphatic_health
        t.reportLBMS = res.data.report_content.lymphatic_health_descriptions
        t.reportRX = res.data.report_content.breast_health
        t.reportRXMS = res.data.report_content.breast_health_descriptions
        t.reportBC = res.data.report_content.breast_cancer_ovarian_cancers
        t.reportBCMS =
          res.data.report_content.breast_cancer_ovarian_cancer_descriptions
        t.reportF100 = res.data.report_content.f100
        t.reportF101 = res.data.report_content.f101
        t.reportF102 = res.data.report_content.f102
        t.reportF105 = res.data.report_content.f105
        t.reportF106 = res.data.report_content.f106
        t.reportF107 = res.data.report_content.f107
        t.reportM0 = res.data.report_content.m0
        t.reportM1 = res.data.report_content.m1
        t.reportM2 = res.data.report_content.m2
        t.reportM3 = res.data.report_content.m3
        t.reportCcNotices =
          res.data.report_content.channels_and_collaterals_explain_notices
        t.reportCdExplains =
          res.data.report_content.constitution_differentiation_explains
        t.reportCdNotices =
          res.data.report_content.constitution_differentiation_explain_notices
        t.reportSdExplains =
          res.data.report_content.syndrome_differentiation_explains
        t.reportYinYang.push({
          value: res.data.report_content.physical_therapy_explain.f0
        })
        t.reportYinYang.push({
          value: res.data.report_content.physical_therapy_explain.f1
        })
        if (res.data.report_content.dictionary_entries.length > 0) {
          t.reportYinZi.push({
            label: res.data.report_content.dictionary_entries[2].label,
            value: res.data.report_content.physical_therapy_explain.f2,
            content: res.data.report_content.factor_explains[2].label
          })
          t.reportYinZi.push({
            label: res.data.report_content.dictionary_entries[3].label,
            value: res.data.report_content.physical_therapy_explain.f3,
            content: res.data.report_content.factor_explains[3].label
          })
        }
        t.reportMinRate =
          res.data.report_content.measurement_result.app_lowest_heart_rate > 200
            ? 200
            : res.data.report_content.measurement_result.app_lowest_heart_rate
        t.reportAverageRate =
          res.data.report_content.measurement_result.app_heart_rate > 200
            ? 200
            : res.data.report_content.measurement_result.app_heart_rate
        t.reportMaxRate =
          res.data.report_content.measurement_result.app_highest_heart_rate >
          200
            ? 200
            : res.data.report_content.measurement_result.app_highest_heart_rate
        t.partialPulseWave = res.data.report_content.partial_pulse_wave.points
        t.$store.state.isLoading = false
      })
    },
    /**
     *
     *  金姆健康app获取 分享智能分析问题及答案
     *
     */
    getAPPShareRecordV2Question(token) {
      const t = this
      const owner = new ApiOwner()
      owner.getShareRecordV2Analyze(token).then(res => {
        t.appShare = true
        t.handleData(res, true)
        this.reportFinger = res.data.report_content.pulse_test.fingers[0]
      })
    },
    /**
     *
     *  金姆健康app获取 智能分析问题及答案
     *
     */
    getRecordV2Analyze() {
      const t = this
      const owner = new ApiOwner(
        t.$store.state.authorization,
        t.$store.state.xAccessToken
      )
      owner
        .getRecordV2Analyze(t.recordId)
        .then(res => {
          t.handleData(res, true)
          t.reportFinger = res.data.report_content.pulse_test.fingers[0]
        })
        .catch(err => {
          console.log(err)
          t.$store.dispatch('invokeBridgeMethod', {
            name: 'measurementException',
            data: '分析错误'
          })
        })
    },
    getWeeklyReport() {
      const t = this
      const owner = new ApiOwner(
        t.$store.state.authorization,
        t.$store.state.xAccessToken
      )
      owner.getWeeklyReport('zh-Hans', t.$store.state.userId).then(res => {
        t.handleData(res, false)
      })
    },
    getMonthlyReport() {
      const t = this
      const owner = new ApiOwner(
        t.$store.state.authorization,
        t.$store.state.xAccessToken
      )
      owner.getMonthlyReport('zh-Hans', t.$store.state.userId).then(res => {
        t.handleData(res, false)
      })
    },
    getInstanceReport() {
      this.handleData(instanceReport)
      this.reportFinger =
        instanceReport.data.report_content.pulse_test.fingers[0]
    },
    /**
     *
     *  一体机获取 智能分析问题及答案
     *
     */
    getJMLRecordQuestion() {
      const t = this
      const JML = new ApiJML(
        t.$store.state.authorization,
        t.$store.state.xAccessToken
      )
      JML.getRecordAnalyze(t.recordId).then(res => {
        // 判断分析报告是否异常
        if (res.data.report_content.measurement_tips.length > 0) {
          t.$store.dispatch('popmsg', {
            msg: res.data.report_content.measurement_tips[0].content
          })
          // 判断 金姆健康app 是否定义 measurementException事件
          t.$store.dispatch('invokeBridgeMethod', {
            name: 'measurementException',
            data: res.data.report_content.measurement_tips[0].content
          })
        }

        t.reportId = res.data.report_id
        t.reportDate = res.data.report_content.created_at
        t.reportNickname = res.data.report_content.user_profile.nickname
        t.reportHeaderImg = res.data.report_content.user_profile.avatar_url
        t.reportGender = res.data.report_content.user_profile.gender
        t.reportCcItems = []
        t.reportCcItems.push(res.data.report_content.measurement_result.c0)
        t.reportCcItems.push(res.data.report_content.measurement_result.c1)
        t.reportCcItems.push(res.data.report_content.measurement_result.c2)
        t.reportCcItems.push(res.data.report_content.measurement_result.c3)
        t.reportCcItems.push(res.data.report_content.measurement_result.c4)
        t.reportCcItems.push(res.data.report_content.measurement_result.c5)
        t.reportCcItems.push(res.data.report_content.measurement_result.c6)
        t.reportCcItems.push(res.data.report_content.measurement_result.c7)
        t.reportMinRate =
          res.data.report_content.heartrate.app_lowest_heart_rate > 200
            ? 200
            : res.data.report_content.heartrate.app_lowest_heart_rate
        t.reportAverageRate =
          res.data.report_content.heartrate.app_heart_rate > 200
            ? 200
            : res.data.report_content.heartrate.app_heart_rate
        t.reportMaxRate =
          res.data.report_content.heartrate.app_highest_heart_rate > 200
            ? 200
            : res.data.report_content.heartrate.app_highest_heart_rate
        t.$store.state.isLoading = false
      })
    },
    /**
     * 处理数据
     */
    handleData(res, isPrivateReport) {
      const t = this
      // 判断分析报告是否异常
      if (res.data.report_content.measurement_judgment.enabled) {
        // 判断 金姆健康app 是否定义 measurementException事件
        res.data.report_content.measurement_judgment.lookups.forEach(ele => {
          t.$store.dispatch('invokeBridgeMethod', {
            name: 'measurementException',
            data: ele.content
          })
        })
      }

      // 设置词条版本
      if (res.data.report_version !== '') {
        t.$store.state.entryVersion = res.data.report_version
      }

      // 用户信息
      t.reportId = res.data.report_id

      t.reportNickname = res.data.report_content.user_profile.nickname
      t.reportNicknameInitial =
        res.data.report_content.user_profile.nickname_initial
      t.reportHeaderImg = ''
      t.reportGender = res.data.report_content.user_profile.gender
      t.reportBirthday = res.data.report_content.user_profile.birthday
      t.reportRemark = res.data.report_content.remark.content

      if (isPrivateReport) {
        t.reportDate = res.data.report_content.created_time
      } else {
        t.startTime = res.data.start_time
        t.endTime = res.data.end_time
      }

      // 风判断
      if (res.data.report_content.measurement_judgment.lookups[0]) {
        t.measurementJudgmentContent =
          res.data.report_content.measurement_judgment.lookups[0].content
        if (
          res.data.report_content.measurement_judgment.lookups[0].key ===
          'C0001'
        ) {
          t.display_all = false
          t.display_navbar = false
        }
        t.display_measurement_judgment = true
      }

      // 心率
      const heartRate = res.data.report_content.heartrate
      t.display_heart_rate = heartRate.enabled

      t.reportMinRate =
        heartRate.lowest_heart_rate > 200 ? 200 : heartRate.lowest_heart_rate
      t.reportAverageRate =
        heartRate.average_heart_rate > 200 ? 200 : heartRate.average_heart_rate
      t.reportMaxRate =
        heartRate.highest_heart_rate > 200 ? 200 : heartRate.highest_heart_rate
      if (res.data.report_content.partial_pulse_wave.enabled) {
        t.partialPulseWave = res.data.report_content.partial_pulse_wave.points
      }

      // 血氧
      t.spo = res.data.report_content.spo
      if (t.spo > 100) {
        t.spo = 100
      }
      if (t.spo !== 0) {
        t.display_spo = true
      }

      // 风险预估
      t.riskEstimate = []
      t.riskEstimateTips = []
      const risk = res.data.report_content.risk_estimate
      if (risk.enabled) {
        risk.disease_estimate.map(element => {
          t.riskEstimate.push(element)
        })
        risk.prompt_message.map(element => {
          t.riskEstimateTips.push(element)
        })
      }

      // 体质辩证
      t.reportCdExplains = []
      t.reportCdNotices = []
      t.display_cd_explain = res.data.report_content.physical_dialectics.enabled
      if (isPrivateReport) {
        res.data.report_content.physical_dialectics.lookups.forEach(ele => {
          if (ele.key) {
            if (ele.key.indexOf('TZN') >= 0) {
              t.reportCdNotices.push(ele)
            } else {
              t.reportCdExplains.push(ele)
            }
          }
        })
      } else {
        res.data.report_content.physical_dialectics.lookups.forEach(ele => {
          if (ele.key) {
            if (ele.key.indexOf('TZMS') >= 0) {
              t.reportCdNotices.push(ele)
            } else {
              t.reportCdExplains.push(ele)
            }
          }
        })
      }
      t.reportSdExplains = []
      if (res.data.report_content.dirty_dialectic.enabled) {
        res.data.report_content.dirty_dialectic.lookups.forEach(ele => {
          if (ele.key) {
            t.reportSdExplains.push(ele)
          }
        })
      }
      t.reportYinYang = [
        {
          value:
            res.data.report_content.physical_therapy_index.f0 > 0
              ? res.data.report_content.physical_therapy_index.f0
              : 0
        },
        {
          value:
            res.data.report_content.physical_therapy_index.f1 > 0
              ? res.data.report_content.physical_therapy_index.f1
              : 0
        }
      ]
      t.reportYinZi = [
        {
          value:
            res.data.report_content.physical_therapy_index.f2 > 0
              ? res.data.report_content.physical_therapy_index.f2
              : 0,
          key: 'ct0003.0',
          label: '湿气'
        },
        {
          value:
            res.data.report_content.physical_therapy_index.f3 > 0
              ? res.data.report_content.physical_therapy_index.f3
              : 0,
          key: 'ct0004.0',
          label: '血瘀'
        }
      ]
      t.dietaryAdvice = []
      if (res.data.report_content.conditioning_advice.dietary_advice.enabled) {
        res.data.report_content.conditioning_advice.dietary_advice.lookups.forEach(
          ele => {
            if (ele.key) {
              t.dietaryAdvice.push(ele)
            }
          }
        )
      }
      if (
        res.data.report_content.conditioning_advice.dietary_advice.health_tips
      ) {
        res.data.report_content.dietary_advice.health_tips.forEach(ele => {
          if (ele.key) {
            t.dietaryAdvice.push(ele)
          }
        })
      }
      t.sportsAdvice = []
      if (res.data.report_content.conditioning_advice.sports_advice.enabled) {
        res.data.report_content.conditioning_advice.sports_advice.lookups.forEach(
          ele => {
            if (ele.key) {
              t.sportsAdvice.push(ele)
            }
          }
        )
      }
      if (
        res.data.report_content.conditioning_advice.sports_advice.health_tips
      ) {
        res.data.report_content.conditioning_advice.sports_advice.health_tips.forEach(
          ele => {
            if (ele.key) {
              t.sportsAdvice.push(ele)
            }
          }
        )
      }
      t.chineseMedicineAdvice = []
      if (
        res.data.report_content.conditioning_advice.chinese_medicine_advice
          .enabled
      ) {
        res.data.report_content.conditioning_advice.chinese_medicine_advice.lookups.forEach(
          ele => {
            if (ele.key) {
              t.chineseMedicineAdvice.push(ele)
            }
          }
        )
      }
      t.physicalTherapyAdvice = []
      if (
        res.data.report_content.conditioning_advice.physical_therapy_advice
          .enabled
      ) {
        res.data.report_content.conditioning_advice.physical_therapy_advice.lookups.forEach(
          ele => {
            if (ele.key) {
              t.physicalTherapyAdvice.push(ele)
            }
          }
        )
      }

      // 柱状图
      const barChart = res.data.report_content.meridian_bar_chart
      t.reportCcItems = []
      t.reportCcItems.push(barChart.meridian_value.c0)
      t.reportCcItems.push(barChart.meridian_value.c1)
      t.reportCcItems.push(barChart.meridian_value.c2)
      t.reportCcItems.push(barChart.meridian_value.c3)
      t.reportCcItems.push(barChart.meridian_value.c4)
      t.reportCcItems.push(barChart.meridian_value.c5)
      t.reportCcItems.push(barChart.meridian_value.c6)
      t.reportCcItems.push(barChart.meridian_value.c7)
      t.display_cc_bar_chart = barChart.enabled

      t.isPayment = true
      t.display_user_profile = isPrivateReport
      t.display_date = isPrivateReport
      t.display_remark = res.data.report_content.remark.enabled
      t.display_navbar = true
      t.display_sd_explain = res.data.report_content.dirty_dialectic
      t.display_physical_therapy_explain =
        res.data.report_content.physical_therapy_index

      if (t.riskEstimate.length > 0) {
        t.display_rp = true
      }
      if (t.reportBabyTips.length > 0) {
        t.display_baby_tips =
          res.data.report_content.display_options.display_baby_tips
      }
      if (t.reportTags.length > 0) {
        t.display_tags = res.data.report_content.display_options.display_tags
      }
      if (
        t.dietaryAdvice.length > 0 ||
        t.sportsAdvice.length > 0 ||
        t.chineseMedicineAdvice.length > 0 ||
        t.physicalTherapyAdvice.length > 0
      ) {
        t.display_ca = true
      }
      if (t.partialPulseWave.length > 0) {
        t.display_partial_data =
          res.data.report_content.partial_pulse_wave.enabled
      }
      // 应激态判定
      t.display_stress_state =
        res.data.report_content.stress_state_judgment.has_stress_state
      if (res.data.report_content.tips.enabled) {
        res.data.report_content.tips.lookups.forEach(ele => {
          if (ele.key) {
            t.svTips = res.data.report_content.tips
            t.display_stress_state_tips = true
          }
        })
      }
      if (t.display_stress_state) {
        t.display_navbar = false
        t.display_cd_explain = false
        t.display_sd_explain = false
        t.reportStressState = res.data.report_content.stress_state_judgment
      } else {
        if (t.display_rp) {
          t.navBars.push({
            id: '#rp',
            url: t.rpSvg,
            text: '风险预估'
          })
        }
        if (t.display_cd_explain) {
          t.navBars.push({
            id: '#cd',
            url: t.cdSvg,
            text: '体质辨证'
          })
        }
        if (t.display_sd_explain) {
          t.navBars.push({
            id: '#sd',
            url: t.sdSvg,
            text: '脏腑辨证'
          })
        }
        if (t.display_nj_details) {
          t.navBars.push({
            id: '#nj',
            url: t.njSvg,
            text: '女性健康'
          })
        }
        if (t.display_physical_therapy_explain) {
          t.navBars.push({
            id: '#ll',
            url: t.factorsSvg,
            text: '理疗指数'
          })
        }
        if (t.display_ca) {
          t.navBars.push({
            id: '#ca',
            url: t.caSvg,
            text: '调理建议'
          })
        }
      }
      t.$store.state.isLoading = false
    },
    /**
     *
     *  页面滚动事件
     */
    windowScroll() {
      const t = this
      if (t.$store.state.analysisReportShow) {
        const scrollTop =
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop
        if (scrollTop > 0) {
          t.showBackToTop = true
          if (t.scrollTimeOut) {
            clearTimeout(t.scrollTimeOut)
          }
          t.scrollTimeOut = setTimeout(() => {
            t.showBackToTop = false
          }, 5000)
        } else {
          t.showBackToTop = false
          if (t.scrollTimeOut) {
            clearTimeout(t.scrollTimeOut)
          }
        }
        if (t.$store.state.landscape) {
          if (t.isPayment) {
            if (
              t.display_ca &&
              scrollTop >= document.querySelector('#ca').offsetTop
            ) {
              t.navSelectedId = '#ca'
            } else if (
              t.display_physical_therapy_explain &&
              scrollTop >= document.querySelector('#ll').offsetTop
            ) {
              t.navSelectedId = '#ll'
            } else if (
              t.display_nj_details &&
              scrollTop >= document.querySelector('#nj').offsetTop
            ) {
              t.navSelectedId = '#nj'
            } else if (
              t.display_sd_explain &&
              scrollTop >= document.querySelector('#sd').offsetTop
            ) {
              t.navSelectedId = '#sd'
            } else if (
              t.display_cd_explain &&
              scrollTop >= document.querySelector('#cd').offsetTop
            ) {
              t.navSelectedId = '#cd'
            } else if (
              t.display_rp &&
              scrollTop >= document.querySelector('#rp').offsetTop
            ) {
              t.navSelectedId = '#rp'
            } else {
              t.navSelectedId = ''
            }
          }
        } else {
          if (t.isPayment) {
            if (
              t.display_ca &&
              scrollTop >=
                document.querySelector('#ca').offsetTop -
                  (document.documentElement.clientWidth / 750) * 180
            ) {
              t.navSelectedId = '#ca'
            } else if (
              t.display_physical_therapy_explain &&
              scrollTop >=
                document.querySelector('#ll').offsetTop -
                  (document.documentElement.clientWidth / 750) * 180
            ) {
              t.navSelectedId = '#ll'
            } else if (
              t.display_nj_details &&
              scrollTop >=
                document.querySelector('#nj').offsetTop -
                  (document.documentElement.clientWidth / 750) * 180
            ) {
              t.navSelectedId = '#nj'
            } else if (
              t.display_sd_explain &&
              scrollTop >=
                document.querySelector('#sd').offsetTop -
                  (document.documentElement.clientWidth / 750) * 180
            ) {
              t.navSelectedId = '#sd'
            } else if (
              t.display_cd_explain &&
              scrollTop >=
                document.querySelector('#cd').offsetTop -
                  (document.documentElement.clientWidth / 750) * 180
            ) {
              t.navSelectedId = '#cd'
            } else if (
              t.display_rp &&
              scrollTop >=
                document.querySelector('#rp').offsetTop -
                  (document.documentElement.clientWidth / 750) * 180
            ) {
              t.navSelectedId = '#rp'
            } else {
              t.navSelectedId = ''
            }
          }
        }
      }
    },
    /**
     *
     *  回到顶部
     *
     */
    backToTop() {
      document.body.scrollTop = document.documentElement.scrollTop = 0
    }
  },
  components: {
    ReportId,
    UserProfile,
    Remark,
    NavBar,
    BabyTips,
    CcAbnormal,
    HeartRate,
    Spo,
    PartialPulseWave,
    CcHistogram,
    TaiChi,
    CcDetails,
    CdExplains,
    SdExplains,
    NjDetails,
    RiskPredictor,
    ConditoningAdvice,
    MeasurementJudgment
  }
}
</script>

<style scoped>
.analysisReport {
  background-color: #f5f5f5;
  min-height: 100vh;
}
.landscapeTap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: calc(100vh / 1080 * 111);
}
.app-share {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 4;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: calc(100vw / 750 * 127);
  background-color: rgba(255, 255, 255, 0.9);
  padding: 0 calc(100vw / 750 * 32);
}
.landscape .app-share {
  height: calc(100vh / 750 * 127);
  padding: 0 calc(100vh / 750 * 32);
}
.app-share .item {
  display: flex;
  justify-content: center;
  align-items: center;
}
.app-share .app-img {
  width: calc(100vw / 750 * 85);
  margin-right: calc(100vw / 750 * 35);
}
.landscape .app-share .app-img {
  width: calc(100vh / 750 * 85);
  margin-right: calc(100vh / 750 * 35);
}
.app-share .app-download {
  width: calc(100vw / 750 * 152);
  margin-right: calc(100vw / 750 * 30);
}
.landscape .app-share .app-download {
  width: calc(100vh / 750 * 152);
  margin-right: calc(100vh / 750 * 30);
}
.app-share .app-text {
  color: #333333;
  font-size: calc(100vw / 750 * 30);
}
.landscape .app-share .app-text {
  font-size: calc(100vh / 750 * 30);
}
.app-share .app-text .subtitle {
  color: #666666;
  font-size: calc(100vw / 750 * 24);
}
.landscape .app-share .app-text .subtitle {
  font-size: calc(100vh / 750 * 24);
}
.app-share .app-close {
  width: calc(100vw / 750 * 26);
}
.landscape .app-share .app-close {
  width: calc(100vh / 750 * 26);
}
.app-share-height {
  height: calc(100vw / 750 * 127);
}
.landscape .app-share-height {
  height: calc(100vh / 750 * 127);
}
.appTabbar {
  height: calc(100vw / 1080 * 186);
}
.landscape .appTabbar {
  height: calc(100vh / 1080 * 186);
}
.appTabbar.onTop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 3;
  background-size: 100%;
  background-repeat: no-repeat;
}
.landscapeHead {
  padding: 0 calc(100vh / 1080 * 60);
}
.headerBg.app {
  background-size: 100%;
  min-height: 100vh;
  background-repeat: no-repeat;
}
.headerBg.wx {
  background-size: 100%;
  min-height: 100vh;
  background-repeat: no-repeat;
  padding-bottom: calc(100vw / 1080 * 100);
}
.landscape .headerBg.wx {
  padding-bottom: calc(100vh / 1080 * 100);
}
.headerBg.wxbg {
  background-size: 100%;
}
.landscape .headerBg.wxbg {
  background-size: 50%;
}
.headerBg {
  text-align: center;
  right: 0;
  left: 0;
  z-index: 3;
  padding: 0 calc(100vw / 1080 * 44);
  padding-top: calc(100vw / 1080 * 22);
  position: relative;
}
.landscape .headerBg {
  padding: 0;
}
.partialReport.app {
  margin-top: calc(100vw / 1080 * 63);
}
.partialReport.wx {
  margin-top: calc(100vw / 1080 * 14);
}
.partialReport {
  padding-top: calc(100vw / 1080 * 54);
  background-color: #fff;
  border-radius: calc(100vw / 1080 * 14);
  padding-bottom: calc(100vw / 1080 * 54);
  box-sizing: border-box;
  position: relative;
}
.partialReport .item {
  border-image-slice: 26 26;
  border-width: calc(13 / 375 * 100vw);
  border-style: solid;
  border-image-repeat: stretch;
  background-color: #fff;
  position: relative;
  box-sizing: border-box;
}
.partialReport .item + .item {
  margin-top: calc(30 / 375 * 100vw);
}
.partialReport .top {
  margin-top: calc(-100vw / 1080 * 118);
  padding-left: calc(100vw / 1080 * 58);
  padding-right: calc(100vw / 1080 * 66);
  padding-bottom: calc(100vw / 1080 * 53);
}
.partialReport .top .text {
  position: absolute;
  top: calc(100vw / 1080 * 26);
  left: 0;
  right: 0;
  z-index: 2;
  font-size: calc(100vw / 1080 * 43);
  line-height: calc(100vw / 1080 * 43);
  color: #fff;
}
.partialReport .bottom {
  background-color: #fff;
  margin-bottom: calc(-100vw / 1080 * 30);
  display: inline-block;
  width: calc(100vw / 1080 * 992 / 18);
  height: calc(100vw / 1080 * 30);
  border-bottom-left-radius: calc(100vw / 1080 * 992 / 18);
  border-bottom-right-radius: calc(100vw / 1080 * 992 / 18);
}
.partialReportText {
  font-size: calc(100vw / 1080 * 46);
  line-height: calc(100vw / 1080 * 46);
  padding-bottom: calc(100vw / 1080 * 39);
  padding-left: calc(100vw / 1080 * 35);
  text-align: left;
  color: #cf9155;
}
.backToTop {
  position: fixed;
  width: calc(100vw / 750 * 90);
  height: calc(100vw / 750 * 90);
  right: calc(100vw / 750 * 30);
  bottom: calc(100vw / 750 * 50);
  z-index: 3;
}
.landscape .backToTop {
  width: calc(100vh / 750 * 90);
  height: calc(100vh / 750 * 90);
  right: calc(100vh / 750 * 30);
  bottom: calc(100vh / 750 * 50);
}
.landscape .landscapeMainbg {
  display: flex;
  justify-content: center;
}
.landscape .landscapeLeft {
  width: calc(100vh / 1080 * 340);
  min-width: calc(100vh / 1080 * 340);
}
.landscape .landscapeRight {
  background-color: #f5f5f5;
}
.mainbg {
  padding: 0 calc(100vw / 750 * 30);
  padding-bottom: calc(100vw / 750 * 66);
}
.landscape .mainbg {
  padding: 0 calc(100vh / 1080 * 60);
  padding-bottom: calc(100vh / 1080 * 110);
  box-sizing: border-box;
}
.mainbg .item {
  border-image-slice: 26 26;
  border-width: calc(13 / 375 * 100vw);
  border-style: solid;
  border-image-repeat: stretch;
  margin-top: calc(100vw / 750 * 38);
  background-color: #fff;
  position: relative;
  box-sizing: border-box;
}
.landscape .mainbg .item {
  border-width: calc(13 / 375 * 100vh);
  margin-top: calc(100vh / 750 * 38);
}
.mainbg .item + .item {
  margin-top: calc(100vw / 750 * 20);
}
.landscape .mainbg .item + .item {
  margin-top: calc(100vh / 750 * 20);
}
.note {
  font-size: calc(100vw / 750 * 24);
  text-align: center;
  color: #666;
  padding-bottom: calc(100vw / 750 * 65);
}
.landscape .note {
  font-size: calc(100vh / 750 * 24);
  padding-bottom: calc(100vh / 750 * 65);
}
.bottom {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #cf9155;
  font-size: calc(100vw / 750 * 20);
  padding-bottom: calc(100vw / 750 * 40);
}
.landscape .bottom {
  font-size: calc(100vh / 750 * 20);
  padding-bottom: calc(100vh / 750 * 40);
}
.bottom .line {
  width: calc(100vw / 750 * 47);
  margin: 0 calc(100vw / 750 * 8);
  height: 1px;
  background-color: #cf9155;
}
.landscape .bottom .line {
  width: calc(100vh / 750 * 47);
  margin: 0 calc(100vh / 750 * 8);
}
.mainbg .item .title {
  font-size: calc(100vw / 750 * 40);
  line-height: calc(100vw / 750 * 40);
  color: #cf9155;
  padding-top: calc(100vw / 750 * 30);
  padding-bottom: calc(100vw / 750 * 57);
  display: flex;
  align-items: center;
}
.landscape .mainbg .item .title {
  font-size: calc(100vh / 750 * 40);
  line-height: calc(100vh / 750 * 40);
  padding-top: calc(100vh / 750 * 30);
  padding-bottom: calc(100vh / 750 * 57);
}
.mainbg .item .title .img {
  display: inline-block;
  width: calc(100vw / 750 * 60);
  margin-right: calc(100vw / 750 * 17);
}
.landscape .mainbg .item .title .img {
  width: calc(100vh / 750 * 60);
  margin-right: calc(100vh / 750 * 17);
}
#rp .title .img {
  width: calc(100vw / 750 * 62);
}
.landscape #rp .title .img {
  width: calc(100vh / 750 * 62);
}
#cd .title .img {
  width: calc(100vw / 750 * 57);
}
.landscape #cd .title .img {
  width: calc(100vh / 750 * 57);
}
#sd .title .img {
  width: calc(100vw / 750 * 58);
}
.landscape #sd .title .img {
  width: calc(100vh / 750 * 58);
}
#ll .title .img {
  width: calc(100vw / 750 * 58);
}
.landscape #ll .title .img {
  width: calc(100vh / 750 * 58);
}
#ca .title .img {
  width: calc(100vw / 750 * 53);
}
.landscape #ca .title .img {
  width: calc(100vh / 750 * 53);
}
.payment {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 3;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: calc(100vw / 1080 * 43);
  line-height: calc(100vw / 1080 * 43);
  font-weight: 400;
  border-top: 1px solid #ccc;
}
.payment .moneyInfo {
  display: flex;
  align-items: center;
  padding-left: calc(100vw / 1080 * 83);
}
.payment .moneyInfo .text {
  color: #999999;
}
.payment .moneyInfo .money {
  color: #ff3a23;
  padding: 0 calc(100vw / 1080 * 20);
}
.payment .moneyInfo .oldMoney {
  color: #999;
  font-size: calc(100vw / 1080 * 35);
  line-height: calc(100vw / 1080 * 35);
  text-decoration: line-through;
}
.payment .btn {
  background-color: #ff3a23;
  color: #fff;
  padding: calc(100vw / 1080 * 51) calc(100vw / 1080 * 105);
}
.share {
  position: fixed;
  top: 0px;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9;
}
.share img {
  width: 100%;
  height: 100%;
}
.share .jiantou {
  display: inline-block;
  width: calc(100vw / 750 * 168);
  height: calc(100vw / 750 * 170);
}
.share .center {
  text-align: center;
  color: #fff;
  font-size: calc(100vw / 750 * 34);
  padding: calc(100vw / 750 * 10);
}
.share .py {
  display: inline-block;
  width: calc(100vw / 750 * 175);
  height: calc(100vw / 750 * 175);
  margin: calc(100vw / 750 * 30) calc(100vw / 750 * 61);
}
.line {
  background-color: rgba(255, 255, 255, 0.25);
  height: 1px;
}
.week-month-note {
  display: flex;
  align-items: center;
  font-size: calc(100vw / 750 * 30);
  color: #ffffff;
  padding-top: calc(100vw / 750 * 20);
}
.landscape .week-month-note {
  font-size: calc(100vh / 750 * 30);
  padding: calc(100vh / 750 * 20) 0;
}
.week-month-note .icon {
  width: calc(100vw / 750 * 30);
  min-width: calc(100vw / 750 * 30);
  margin-right: calc(100vw / 750 * 10);
}
.landscape .week-month-note .icon {
  width: calc(100vh / 750 * 30);
  min-width: calc(100vh / 750 * 30);
  margin-right: calc(100vh / 750 * 10);
}
.week-month-date {
  font-size: calc(100vw / 750 * 24);
  color: #ffffff;
}
.landscape .week-month-date {
  font-size: calc(100vh / 750 * 24);
}
.week-month-user {
  display: flex;
  align-items: center;
  color: #ffffff;
  padding-top: calc(100vw / 750 * 20);
  padding-bottom: calc(100vw / 750 * 20);
}
.landscape .week-month-user {
  padding-top: 0;
  padding-bottom: 0;
}
.week-month-user .man {
  background-color: #547ea3;
}
.week-month-user .woman {
  background-color: #ad563f;
}
.week-month-user .header-img {
  width: calc(100vw / 750 * 120);
  height: calc(100vw / 750 * 120);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: calc(100vw / 750 * 73);
  border-radius: 50%;
  position: relative;
}
.landscape .week-month-user .header-img {
  width: calc(100vh / 750 * 60);
  height: calc(100vh / 750 * 60);
  font-size: calc(100vh / 750 * 50);
}
.week-month-user .header-img .icon {
  position: absolute;
  bottom: 0;
  right: calc(-100vw / 750 * 9);
  width: calc(100vw / 750 * 39);
  z-index: 2;
}
.landscape .week-month-user .header-img .icon {
  right: calc(-100vh / 750 * 9);
  width: calc(100vh / 750 * 30);
}
.week-month-user .info {
  text-align: left;
  padding-left: calc(100vw / 750 * 51);
  align-items: center;
}
.landscape .week-month-user .info {
  padding-left: calc(100vh / 750 * 51);
}
.week-month-user .info .name {
  font-size: calc(100vw / 750 * 40);
}
.landscape .week-month-user .info .name {
  font-size: calc(100vh / 750 * 40);
}
.week-month-user .info .birthday {
  font-size: calc(100vw / 750 * 28);
}
.landscape .week-month-user .info .birthday {
  font-size: calc(100vh / 750 * 28);
  margin-left: calc(100vh / 750 * 28);
}
</style>
