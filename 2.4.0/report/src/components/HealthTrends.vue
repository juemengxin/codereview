<template>
  <div class="health-trends">
    <div class="no-data" v-if="noData">
      <div class="img">
        <img src="../assets/no-data.svg" alt="" />
        <div class="text">暂无数据</div>
      </div>
    </div>
    <div class="tabbar">
      <div
        class="item"
        :class="{ selected: selectedId === 0 }"
        @click="selectDate(0)"
      >
        <div class="text">周平均</div>
      </div>
      <div class="line"></div>
      <div
        class="item"
        :class="{ selected: selectedId === 1 }"
        @click="selectDate(1)"
      >
        <div class="text">月平均</div>
      </div>
    </div>
    <div class="average">
      <div class="title" :style="{ backgroundImage: 'url(' + titleImg + ')' }">
        经络平均值
      </div>
      <div class="note">
        <div class="icon">
          <img src="../assets/android/icon-info.svg" alt="" />
        </div>
        <div class="text">注：应激态未参与平均值统计</div>
      </div>
      <div class="landscapeInfo" v-if="$store.state.landscape">
        <div class="information">
          <div class="introduction normal-line">
            <div class="line"></div>
            <div class="text">经络测量值</div>
          </div>
          <div class="introduction average-line">
            <div class="line"></div>
            <div class="text">经络平均值</div>
          </div>
          <div class="selection" @click="selectionPull = !selectionPull">
            <div class="text">
              {{
                selectionId === 'c0'
                  ? '心包经'
                  : selectionId === 'c1'
                  ? '肝经'
                  : selectionId === 'c2'
                  ? '肾经'
                  : selectionId === 'c3'
                  ? '脾经'
                  : selectionId === 'c4'
                  ? '肺经'
                  : selectionId === 'c5'
                  ? '胃经'
                  : selectionId === 'c6'
                  ? '胆经'
                  : '膀胱经'
              }}
            </div>
            <div class="icon">
              <img src="../assets/icon-is-pull.svg" alt="" />
            </div>
            <div class="list" v-if="selectionPull">
              <div
                class="item"
                :class="{ selected: selectionId === 'c0' }"
                @click="selectMeasurement('c0')"
              >
                心包经
              </div>
              <div
                class="item"
                :class="{ selected: selectionId === 'c1' }"
                @click="selectMeasurement('c1')"
              >
                肝经
              </div>
              <div
                class="item"
                :class="{ selected: selectionId === 'c2' }"
                @click="selectMeasurement('c2')"
              >
                肾经
              </div>
              <div
                class="item"
                :class="{ selected: selectionId === 'c3' }"
                @click="selectMeasurement('c3')"
              >
                脾经
              </div>
              <div
                class="item"
                :class="{ selected: selectionId === 'c4' }"
                @click="selectMeasurement('c4')"
              >
                肺经
              </div>
              <div
                class="item"
                :class="{ selected: selectionId === 'c5' }"
                @click="selectMeasurement('c5')"
              >
                胃经
              </div>
              <div
                class="item"
                :class="{ selected: selectionId === 'c6' }"
                @click="selectMeasurement('c6')"
              >
                胆经
              </div>
              <div
                class="item"
                :class="{ selected: selectionId === 'c7' }"
                @click="selectMeasurement('c7')"
              >
                膀胱经
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="unit x" v-if="viewArr.length > 0">经络值</div>
          <div class="svg" v-if="viewArr.length > 0">
            <div class="left">
              <svg
                :width="windowWidth * 70"
                :height="windowWidth * (108 + (maxData - minData) * 60)"
              >
                <!-- 经络值刻度 -->
                <text
                  :x="0"
                  :y="windowWidth * (20 + index * 60)"
                  fill="#333333"
                  :style="{ fontSize: windowWidth * 20 }"
                  v-for="(item, index) in maxData - minData + 1"
                  :key="'0' + index"
                >
                  {{ (maxData - index) * 10 }}%
                </text>
              </svg>
            </div>
            <div class="right">
              <svg
                :width="windowWidth * (50 + 90 * (viewArr.length - 1)) + 5"
                :height="windowWidth * (108 + (maxData - minData) * 60)"
              >
                <!-- 横向刻度线 -->
                <line
                  :x1="windowWidth * 10"
                  :y1="windowWidth * (10 + (index + 1) * 60)"
                  :x2="windowWidth * (10 + 90 * (viewArr.length - 1))"
                  :y2="windowWidth * (10 + (index + 1) * 60)"
                  style="stroke:#CF9155;stroke-width:1"
                  v-for="(item, index) in dataLength"
                  :key="'1' + index"
                />
                <!-- 纵向刻度线 -->
                <line
                  :x1="windowWidth * (index * 90 + 10)"
                  :y1="windowWidth * 10"
                  :x2="windowWidth * (index * 90 + 10)"
                  :y2="windowWidth * (10 + (maxData - minData) * 60)"
                  style="stroke:#CF9155;stroke-width:1"
                  v-for="(item, index) in viewArr.length"
                  :key="'2' + index"
                />
                <!-- 测量时间刻度 -->
                <text
                  :x="windowWidth * index * 90"
                  :y="windowWidth * (73 + (maxData - minData) * 60)"
                  fill="#333333"
                  :style="{ fontSize: windowWidth * 20 }"
                  v-for="(item, index) in viewArr"
                  :key="'3' + index"
                  style="overflow:auto"
                >
                  {{ moment(item.created_at).format('MM.DD') }}
                </text>
                <!-- 刻度外框 -->
                <rect
                  :x="windowWidth * 10"
                  :y="windowWidth * 10"
                  :width="windowWidth * (90 * (viewArr.length - 1))"
                  :height="windowWidth * (maxData - minData) * 60"
                  rx="1"
                  style="fill: none;stroke:#CF9155;stroke-width:1"
                ></rect>
                <!-- 平均虚线 -->
                <path
                  :d="averagepath"
                  stroke-dasharray="5,5"
                  style="fill:none;stroke:#CF9155;stroke-width:2"
                />
                <!-- 趋势折线 -->
                <path
                  :d="path"
                  style="fill:none;stroke:#3773AB;stroke-width:2"
                />
                <!-- 点位 -->
                <circle
                  :cx="windowWidth * (index * 90 + 10)"
                  :cy="windowWidth * (10 + maxData * 60 - item.value * 6)"
                  :r="windowWidth * 9"
                  fill="#3773AB"
                  v-for="(item, index) in viewArr"
                  :key="'4' + index"
                  @click="goToReport(item.record_id)"
                />
              </svg>
            </div>
            <div class="unit y">测量时间</div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="information">
          <div class="selection" @click="selectionPull = !selectionPull">
            <div class="text">
              {{
                selectionId === 'c0'
                  ? '心包经'
                  : selectionId === 'c1'
                  ? '肝经'
                  : selectionId === 'c2'
                  ? '肾经'
                  : selectionId === 'c3'
                  ? '脾经'
                  : selectionId === 'c4'
                  ? '肺经'
                  : selectionId === 'c5'
                  ? '胃经'
                  : selectionId === 'c6'
                  ? '胆经'
                  : '膀胱经'
              }}
            </div>
            <div class="icon">
              <img src="../assets/icon-is-pull.svg" alt="" />
            </div>
            <div class="list" v-if="selectionPull">
              <div
                class="item"
                :class="{ selected: selectionId === 'c0' }"
                @click="selectMeasurement('c0')"
              >
                心包经
              </div>
              <div
                class="item"
                :class="{ selected: selectionId === 'c1' }"
                @click="selectMeasurement('c1')"
              >
                肝经
              </div>
              <div
                class="item"
                :class="{ selected: selectionId === 'c2' }"
                @click="selectMeasurement('c2')"
              >
                肾经
              </div>
              <div
                class="item"
                :class="{ selected: selectionId === 'c3' }"
                @click="selectMeasurement('c3')"
              >
                脾经
              </div>
              <div
                class="item"
                :class="{ selected: selectionId === 'c4' }"
                @click="selectMeasurement('c4')"
              >
                肺经
              </div>
              <div
                class="item"
                :class="{ selected: selectionId === 'c5' }"
                @click="selectMeasurement('c5')"
              >
                胃经
              </div>
              <div
                class="item"
                :class="{ selected: selectionId === 'c6' }"
                @click="selectMeasurement('c6')"
              >
                胆经
              </div>
              <div
                class="item"
                :class="{ selected: selectionId === 'c7' }"
                @click="selectMeasurement('c7')"
              >
                膀胱经
              </div>
            </div>
          </div>
          <div class="introduction normal-line">
            <div class="line"></div>
            <div class="text">经络测量值</div>
          </div>
          <div class="introduction average-line">
            <div class="line"></div>
            <div class="text">经络平均值</div>
          </div>
        </div>
        <div class="unit x" v-if="viewArr.length > 0">经络值</div>
        <div class="svg" v-if="viewArr.length > 0">
          <div class="left">
            <svg
              :width="windowWidth * 70"
              :height="windowWidth * (108 + (maxData - minData) * 60)"
            >
              <!-- 经络值刻度 -->
              <text
                :x="0"
                :y="windowWidth * (20 + index * 60)"
                fill="#333333"
                :style="{ fontSize: windowWidth * 20 }"
                v-for="(item, index) in maxData - minData + 1"
                :key="'0' + index"
              >
                {{ (maxData - index) * 10 }}%
              </text>
            </svg>
          </div>
          <div class="right">
            <svg
              :width="windowWidth * (50 + 90 * (viewArr.length - 1)) + 5"
              :height="windowWidth * (108 + (maxData - minData) * 60)"
            >
              <!-- 横向刻度线 -->
              <line
                :x1="windowWidth * 10"
                :y1="windowWidth * (10 + (index + 1) * 60)"
                :x2="windowWidth * (10 + 90 * (viewArr.length - 1))"
                :y2="windowWidth * (10 + (index + 1) * 60)"
                style="stroke:#CF9155;stroke-width:1"
                v-for="(item, index) in dataLength"
                :key="'1' + index"
              />
              <!-- 纵向刻度线 -->
              <line
                :x1="windowWidth * (index * 90 + 10)"
                :y1="windowWidth * 10"
                :x2="windowWidth * (index * 90 + 10)"
                :y2="windowWidth * (10 + (maxData - minData) * 60)"
                style="stroke:#CF9155;stroke-width:1"
                v-for="(item, index) in viewArr.length"
                :key="'2' + index"
              />
              <!-- 测量时间刻度 -->
              <text
                :x="windowWidth * index * 90"
                :y="windowWidth * (73 + (maxData - minData) * 60)"
                fill="#333333"
                :style="{ fontSize: windowWidth * 20 }"
                v-for="(item, index) in viewArr"
                :key="'3' + index"
                style="overflow:auto"
              >
                {{ moment(item.created_at).format('MM.DD') }}
              </text>
              <!-- 刻度外框 -->
              <rect
                :x="windowWidth * 10"
                :y="windowWidth * 10"
                :width="windowWidth * (90 * (viewArr.length - 1))"
                :height="windowWidth * (maxData - minData) * 60"
                rx="1"
                style="fill: none;stroke:#CF9155;stroke-width:1"
              ></rect>
              <!-- 平均虚线 -->
              <path
                :d="averagepath"
                stroke-dasharray="5,5"
                style="fill:none;stroke:#CF9155;stroke-width:2"
              />
              <!-- 趋势折线 -->
              <path :d="path" style="fill:none;stroke:#3773AB;stroke-width:2" />
              <!-- 点位 -->
              <circle
                :cx="windowWidth * (index * 90 + 10)"
                :cy="windowWidth * (10 + maxData * 60 - item.value * 6)"
                :r="windowWidth * 9"
                fill="#3773AB"
                v-for="(item, index) in viewArr"
                :key="'4' + index"
                @click="goToReport(item.record_id)"
              />
            </svg>
          </div>
          <div class="unit y">测量时间</div>
        </div>
      </div>
      <div
        class="btn"
        :style="{ backgroundImage: 'url(' + btnImg + ')' }"
        @click="goToWMReport"
      >
        <img
          class="go-report"
          src="../assets/fonts/go-week.svg"
          alt=""
          v-if="selectedId === 0"
        />
        <img
          class="go-report"
          src="../assets/fonts/go-month.svg"
          alt=""
          v-else
        />
      </div>
    </div>
    <div
      class="stressState average"
      v-if="
        stressState.done_sports_count > 0 ||
          stressState.drunk_wine_count > 0 ||
          stressState.ovulation_count > 0 ||
          stressState.abdominal_pain_count > 0 ||
          stressState.physiological_period_count > 0 ||
          stressState.rhinitis_episode_count > 0 ||
          stressState.ovulation_count > 0 ||
          stressState.had_cold_count > 0 ||
          stressState.viral_infection_count > 0 ||
          stressState.pregnant_count > 0 ||
          stressState.lactation_count > 0
      "
    >
      <div class="title" :style="{ backgroundImage: 'url(' + titleImg + ')' }">
        应激态情况
      </div>
      <div class="note">
        <div class="text">经统计，您一共出现过以下几次应激态</div>
      </div>
      <div class="list">
        <div class="item" v-if="stressState.done_sports_count > 0">
          <div class="img">
            <img src="../assets/android/new/report_icon_sport.svg" />
          </div>
          <div class="text">运动：{{ stressState.done_sports_count }}次</div>
        </div>
        <div class="item" v-if="stressState.drunk_wine_count > 0">
          <div class="img">
            <img src="../assets/android/new/report_icon_drink.svg" />
          </div>
          <div class="text">饮酒：{{ stressState.drunk_wine_count }}次</div>
        </div>
        <div class="item" v-if="stressState.ovulation_count > 0">
          <div class="img">
            <img src="../assets/android/new/report_icon_ovulation.svg" />
          </div>
          <div class="text">排卵期：{{ stressState.ovulation_count }}次</div>
        </div>
        <div class="item" v-if="stressState.rhinitis_episode_count > 0">
          <div class="img">
            <img src="../assets/android/new/report_icon_rhinitis.svg" />
          </div>
          <div class="text">
            鼻炎：{{ stressState.rhinitis_episode_count }}次
          </div>
        </div>
        <div class="item" v-if="stressState.physiological_period_count > 0">
          <div class="img">
            <img
              src="../assets/android/new/report_icon_physiologicalperiod.svg"
            />
          </div>
          <div class="text">
            生理周期：{{ stressState.physiological_period_count }}次
          </div>
        </div>
        <div class="item" v-if="stressState.abdominal_pain_count > 0">
          <div class="img">
            <img src="../assets/android/new/report_icon_abdominalpain.svg" />
          </div>
          <div class="text">
            腹痛腹泻：{{ stressState.abdominal_pain_count }}次
          </div>
        </div>
        <div class="item" v-if="stressState.lactation_count > 0">
          <div class="img">
            <img src="../assets/android/new/report_icon_lactation.svg" />
          </div>
          <div class="text">哺乳期：{{ stressState.lactation_count }}次</div>
        </div>
        <div class="item" v-if="stressState.had_cold_count > 0">
          <div class="img">
            <img src="../assets/android/new/report_icon_cold.svg" />
          </div>
          <div class="text">感冒：{{ stressState.had_cold_count }}次</div>
        </div>
        <div class="item" v-if="stressState.viral_infection_count > 0">
          <div class="img">
            <img src="../assets/android/new/report_icon_virus.svg" />
          </div>
          <div class="text">
            病毒：{{ stressState.viral_infection_count }}次
          </div>
        </div>
        <div class="item" v-if="stressState.pregnant_count > 0">
          <div class="img">
            <img src="../assets/android/new/report_icon_pregnancy.svg" />
          </div>
          <div class="text">怀孕：{{ stressState.pregnant_count }}次</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import btnImg from '../assets/btn.png'
import titleImg from '../assets/title.png'
import { ApiOwner } from '../api' // api
const moment = require('moment')
export default {
  name: 'health-trends',
  data() {
    return {
      noData: false,
      moment,
      dataObj: {},
      stressState: {
        rhinitis_episode_count: 0,
        done_sports_count: 0,
        drunk_wine_count: 0,
        had_cold_count: 0,
        ovulation_count: 0,
        physiological_period_count: 0,
        pregnant_count: 0,
        viral_infection_count: 0,
        abdominal_pain_count: 0,
        lactation_count: 0
      },
      physicalDialectics: [],
      startTime: '',
      endTime: '',
      btnImg,
      titleImg,
      selectedId: 0,
      selectionId: 'c0',
      selectionPull: false,
      viewArr: [],
      minData: 0,
      maxData: 10,
      dataLength: 0,
      path: '',
      averagepath: '',
      c0: 0,
      c1: 0,
      c2: 0,
      c3: 0,
      c4: 0,
      c5: 0,
      c6: 0,
      c: 0,
      tip: ''
    }
  },
  computed: {
    windowWidth() {
      // 根据屏幕宽度算出单位比列
      return this.$store.state.windowWidth / 750
    }
  },
  watch: {
    windowWidth() {
      const t = this
      t.getSVG()
    }
  },
  beforeMount() {
    const t = this
    t.viewArr = []
  },
  mounted() {
    const t = this
    t.$store.dispatch('changeTitle', '趋势分析')
    t.$store.dispatch('getAppClientAuth').then(res => {
      t.$store.state.authorization = res.data.authorization
      t.selectDate(t.selectedId)
    })
  },
  destroyed() {},
  methods: {
    getSVG() {
      const t = this
      t.path = ''
      if (t.viewArr.length === 0) {
        t.noData = true
      } else {
        t.noData = false
        t.viewArr.forEach((element, index) => {
          if (index === 0) {
            t.path +=
              'M' +
              t.windowWidth * (index * 90 + 10) +
              ' ' +
              t.windowWidth * (10 + t.maxData * 60 - element.value * 6)
          } else {
            t.path +=
              ' ' +
              t.windowWidth * (index * 90 + 10) +
              ' ' +
              t.windowWidth * (10 + t.maxData * 60 - element.value * 6)
          }
        })
        t.averagepath =
          'M' +
          t.windowWidth * (0 * 90 + 10) +
          ' ' +
          t.windowWidth *
            (10 + Math.round(t.maxData - (t.maxData + t.minData) / 2) * 60) +
          (' ' +
            t.windowWidth * ((t.viewArr.length - 1) * 90 + 10) +
            ' ' +
            t.windowWidth *
              (10 + Math.round(t.maxData - (t.maxData + t.minData) / 2) * 60))
      }
      t.$store.state.isLoading = false
    },
    selectDate(i) {
      const t = this
      t.$store.state.isLoading = true
      t.selectedId = i
      if (t.selectedId === 0) {
        t.getWeekMeasurements()
      } else {
        t.getMonthMeasurements()
      }
    },
    selectMeasurement(i) {
      const t = this
      t.selectionId = i
      t.viewArr = t.dataObj[t.selectionId]
      if (
        Math.max.apply(
          Math,
          t.viewArr.map(e => {
            return parseFloat(e.value) / 10
          })
        ) >= 10
      ) {
        t.maxData = 10
      } else {
        t.maxData = parseInt(
          Math.max.apply(
            Math,
            t.viewArr.map(e => {
              return parseFloat(e.value) / 10
            })
          ) + 1
        )
      }
      if (
        Math.min.apply(
          Math,
          t.viewArr.map(e => {
            return parseFloat(e.value) / 10
          })
        ) <= -10
      ) {
        t.minData = -10
      } else {
        t.minData = parseInt(
          Math.min.apply(
            Math,
            t.viewArr.map(e => {
              return parseFloat(e.value) / 10
            })
          ) - 1
        )
      }
      t.dataLength = t.maxData - t.minData - 1
      t.getSVG()
    },
    getWeekMeasurements() {
      const t = this
      const owner = new ApiOwner(
        t.$store.state.authorization,
        t.$store.state.xAccessToken
      )
      owner.getWeekMeasurements(t.$store.state.userId).then(res => {
        t.dataObj = res.data
        t.startTime = res.data.start_time
        t.endTime = res.data.end_time
        t.physicalDialectics = res.data.physical_dialectics || []
        t.stressState.done_sports_count = res.data.done_sports_count
        t.stressState.rhinitis_episode_count = res.data.rhinitis_episode_count
        t.stressState.drunk_wine_count = res.data.drunk_wine_count
        t.stressState.had_cold_count = res.data.had_cold_count
        t.stressState.ovulation_count = res.data.ovulation_count
        t.stressState.physiological_period_count =
          res.data.physiological_period_count
        t.stressState.pregnant_count = res.data.pregnant_count
        t.stressState.viral_infection_count = res.data.viral_infection_count
        t.stressState.abdominal_pain_count = res.data.abdominal_pain_count
        t.stressState.lactation_count = res.data.lactation_count
        t.c0 = res.data.c0_average
        t.c1 = res.data.c1_average
        t.c2 = res.data.c2_average
        t.c3 = res.data.c3_average
        t.c4 = res.data.c4_average
        t.c5 = res.data.c5_average
        t.c6 = res.data.c6_average
        t.c7 = res.data.c7_average
        t.tip = res.data.tip
        t.selectMeasurement(this.selectionId)
      })
    },
    getMonthMeasurements() {
      const t = this
      const owner = new ApiOwner(
        t.$store.state.authorization,
        t.$store.state.xAccessToken
      )
      owner.getMonthMeasurements(t.$store.state.userId).then(res => {
        t.dataObj = res.data
        t.startTime = res.data.start_time
        t.endTime = res.data.end_time
        t.physicalDialectics = res.data.physical_dialectics || []
        t.stressState.done_sports_count = res.data.done_sports_count
        t.stressState.rhinitis_episode_count = res.data.rhinitis_episode_count
        t.stressState.drunk_wine_count = res.data.drunk_wine_count
        t.stressState.had_cold_count = res.data.had_cold_count
        t.stressState.ovulation_count = res.data.ovulation_count
        t.stressState.physiological_period_count =
          res.data.physiological_period_count
        t.stressState.pregnant_count = res.data.pregnant_count
        t.stressState.viral_infection_count = res.data.viral_infection_count
        t.stressState.abdominal_pain_count = res.data.abdominal_pain_count
        t.stressState.lactation_count = res.data.lactation_count
        t.c0 = res.data.c0_average
        t.c1 = res.data.c1_average
        t.c2 = res.data.c2_average
        t.c3 = res.data.c3_average
        t.c4 = res.data.c4_average
        t.c5 = res.data.c5_average
        t.c6 = res.data.c6_average
        t.c7 = res.data.c7_average
        t.tip = res.data.tip
        t.selectMeasurement(this.selectionId)
      })
    },
    goToReport(id) {
      this.$router.push({ name: 'analysisreport', query: { record_id: id } })
    },
    goToWMReport() {
      const t = this
      if (t.tip === '') {
        if (t.selectedId === 0) {
          t.$store
            .dispatch('invokeBridgeMethod', {
              name: 'showWeeklyReport'
            })
            .then(() => {
              t.$router.push({ name: 'analysisreport', query: { week: true } })
            })
        } else {
          t.$store
            .dispatch('invokeBridgeMethod', {
              name: 'showMonthlyReport'
            })
            .then(() => {
              t.$router.push({ name: 'analysisreport', query: { month: true } })
            })
        }
      } else {
        t.$store.dispatch('invokeBridgeMethod', {
          name: 'healthyTendencyDialog',
          data: t.tip
        })
      }
    }
  },
  components: {}
}
</script>
<style scoped>
.health-trends {
  background-color: #f5f5f5;
  min-height: 100vh;
}
.tabbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9;
}
.tabbar .item {
  width: 50%;
  text-align: center;
  font-size: calc(100vw / 750 * 32);
  line-height: calc(100vw / 750 * 50);
  padding: calc(100vw / 750 * 25) 0;
  border-bottom: 1px solid #dddddd;
}
.landscape .tabbar .item {
  font-size: calc(100vh / 750 * 32);
  line-height: calc(100vh / 750 * 50);
  padding: calc(100vh / 750 * 25) 0;
}
.tabbar .line {
  width: 1px;
  height: calc(100vw / 750 * 50);
  background-color: #dddddd;
}
.landscape .tabbar .line {
  height: calc(100vh / 750 * 50);
}
.tabbar .item.selected {
  color: #cf9155;
  border-bottom: 3px solid #cf9155;
}
.average {
  padding: 0 calc(100vw / 750 * 36);
  padding-top: calc(100vw / 750 * 100);
  padding-bottom: calc(100vw / 750 * 45);
}
.landscape .average {
  padding: 0 calc(100vh / 750 * 36);
  padding-top: calc(100vh / 750 * 100);
  padding-bottom: calc(100vh / 750 * 200);
}
.average + .average {
  padding-top: 0;
  padding-bottom: calc(100vw / 750 * 100);
}
.landscape .average + .average {
  padding-top: 0;
  padding-bottom: calc(100vh / 750 * 100);
}
.title {
  width: calc(100vw / 750 * 264);
  margin: 0 auto;
  position: relative;
  margin-top: calc(100vw / 750 * 43);
  margin-bottom: calc(100vw / 750 * 20);
}
.landscape .title {
  width: calc(100vh / 750 * 264);
  margin-top: calc(100vh / 750 * 43);
  margin-bottom: calc(100vh / 750 * 20);
}
.title .text {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  color: #ffffff;
}
.note {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: calc(100vw / 750 * 30);
}
.landscape .note {
  padding-bottom: calc(100vh / 750 * 30);
}
.note .icon {
  width: calc(100vw / 750 * 30);
  min-width: calc(100vw / 750 * 30);
  margin-right: calc(100vw / 750 * 13);
}
.landscape .note .icon {
  width: calc(100vh / 750 * 30);
  min-width: calc(100vh / 750 * 30);
  margin-right: calc(100vh / 750 * 13);
}
.note .text {
  font-size: calc(100vw / 750 * 24);
  line-height: calc(100vw / 750 * 24);
  color: #cf9155;
}
.landscape .note .text {
  font-size: calc(100vh / 750 * 24);
  line-height: calc(100vh / 750 * 24);
}
.landscapeInfo {
  display: flex;
}
.information {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: calc(100vw / 750 * 50);
}
.landscape .information {
  padding-bottom: calc(100vh / 750 * 50);
  padding-right: calc(100vh / 750 * 72);
  display: block;
}
.information .text {
  font-size: calc(100vw / 750 * 24);
  color: #999999;
}
.landscape .information .text {
  font-size: calc(100vh / 750 * 24);
}
.information .selection {
  width: calc(100vw / 750 * 177);
  height: calc(100vw / 750 * 54);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #cf9155;
  border-radius: 5px;
  position: relative;
  padding-left: calc(100vw / 750 * 28);
  box-sizing: border-box;
}
.landscape .information .selection {
  width: calc(100vh / 750 * 177);
  height: calc(100vh / 750 * 54);
  padding-left: calc(100vh / 750 * 28);
}
.information .selection .text {
  font-size: calc(100vw / 750 * 30);
  color: #cf9155;
}
.landscape .information .selection .text {
  font-size: calc(100vh / 750 * 30);
}
.information .selection .icon {
  width: calc(100vw / 750 * 21);
  padding-right: calc(100vw / 750 * 23);
}
.landscape .information .selection .icon {
  width: calc(100vh / 750 * 21);
  padding-right: calc(100vh / 750 * 23);
}
.selection .list {
  position: absolute;
  top: calc(100vw / 750 * 74);
  left: 0;
  right: 0;
  z-index: 2;
  border: 1px solid #cf9155;
  border-radius: 5px;
  background-color: #ffffff;
}
.landscape .selection .list {
  top: calc(100vh / 750 * 74);
}
.selection .list .item {
  font-size: calc(100vw / 750 * 30);
  line-height: calc(100vw / 750 * 54);
  padding-left: calc(100vw / 750 * 28);
  box-sizing: border-box;
}
.landscape .selection .list .item {
  font-size: calc(100vh / 750 * 30);
  line-height: calc(100vh / 750 * 54);
  padding-left: calc(100vh / 750 * 28);
}
.selection .list .item.selected {
  color: #cf9155;
}
.information .introduction .line {
  width: calc(100vw / 750 * 47);
  border-bottom: 2px solid #3773ab;
  margin-right: calc(100vw / 750 * 10);
}
.landscape .information .introduction .line {
  width: calc(100vh / 750 * 47);
  margin-right: calc(100vh / 750 * 10);
}
.information .introduction {
  display: flex;
  justify-content: center;
  align-items: center;
}
.landscape .information .introduction + .introduction {
  padding: calc(100vh / 1920 * 40) 0;
}
.information .average-line .line {
  border-bottom: 2px dashed #cf9155;
}
.unit {
  font-size: calc(100vw / 750 * 20);
  color: #999999;
}
.landscape .unit {
  font-size: calc(100vh / 750 * 20);
}
.unit.x {
  padding-left: calc(100vw / 750 * 49);
}
.landscape .unit.x {
  padding-left: calc(100vh / 750 * 49);
}
.unit.y {
  width: calc(100vw / 750 * 20);
  line-height: calc(100vw / 750 * 22);
  padding-bottom: calc(100vw / 750 * 80);
}
.landscape .unit.y {
  width: calc(100vh / 750 * 60);
  line-height: calc(100vh / 750 * 22);
  padding-bottom: calc(100vh / 750 * 80);
}
.svg {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
.landscape .svg {
  justify-content: center;
}
.svg .right {
  width: calc(100vw / 750 * 580);
  overflow: auto;
}
.landscape .svg .right {
  width: calc(100vh / 1080 * 1240);
}
.btn {
  background-size: 100% 100%;
  height: calc(100vw / 750 * 80);
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  margin-top: calc(100vw / 750 * 45);
}
.landscape .btn {
  width: calc(100vh / 1080 * 990);
  height: calc(100vh / 750 * 80);
  margin: 0 auto;
  margin-top: calc(100vh / 750 * 45);
}
.btn .go-report {
  width: calc(98 / 375 * 100vw);
  margin: 0 auto;
}
.landscape .btn .go-report {
  width: calc(98 / 375 * 100vh);
}
.title {
  background-size: 100% 100%;
  height: calc(100vw / 750 * 63);
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
}
.landscape .title {
  height: calc(100vh / 750 * 63);
}
.stressState .list {
  padding: 0 calc(100vw / 750 * 70);
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.landscape .stressState .list {
  padding: 0 calc(100vh / 750 * 70);
}
.stressState .list .item {
  padding-top: calc(100vw / 750 * 40);
}
.landscape .stressState .list .item {
  padding-top: calc(100vh / 750 * 40);
  padding-left: calc(100vh / 750 * 90);
  padding-right: calc(100vh / 750 * 90);
}
.stressState .list .item:nth-child(even) {
  padding-left: calc(100vw / 750 * 183);
}
.landscape .stressState .list .item:nth-child(even) {
  padding-left: calc(100vh / 750 * 90);
}
.stressState .list .item .img {
  width: calc(100vw / 750 * 160);
  height: calc(100vw / 750 * 160);
  background-color: #e5e5e5;
  border-radius: 50%;
  padding: calc(100vw / 750 * 10);
  box-sizing: border-box;
}
.landscape .stressState .list .item .img {
  width: calc(100vh / 750 * 160);
  height: calc(100vh / 750 * 160);
  padding: calc(100vh / 750 * 10);
}
.stressState .list .item .text {
  font-size: calc(100vw / 750 * 26);
  padding-top: calc(100vw / 750 * 23);
  text-align: center;
}
.landscape .stressState .list .item .text {
  font-size: calc(100vh / 750 * 26);
  padding-top: calc(100vh / 750 * 23);
}
.no-data {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 8;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
}
.no-data .img {
  width: calc(100vw / 750 * 252);
  text-align: center;
  color: #666666;
}
.landscape .no-data .img {
  width: calc(100vh / 750 * 252);
}
.no-data .img .text {
  padding-top: calc(100vw / 750 * 29);
}
.landscape .no-data .img .text {
  padding-top: calc(100vh / 750 * 29);
}
</style>
