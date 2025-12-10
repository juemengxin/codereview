<template>
  <div class="babyTips">
    <div class="bg" v-if="tips">
      <div class="img">
        <img src="../assets/android/report_jinmu_baby_prompt.svg" alt="" />
      </div>
      <div class="text">
        <div>温馨提示：</div>
        <div v-for="item in warmTips" :key="item.key">
          <div-hyperlink :content="item.content"></div-hyperlink>
        </div>
      </div>
    </div>
    <div class="main" v-if="stressState">
      <div class="title">
        <div class="line"></div>
        <div class="text">身体状态</div>
        <div class="line"></div>
      </div>
      <div class="list">
        <div class="item" v-if="babyTips.has_done_sports">
          <div class="img">
            <img src="../assets/android/new/report_icon_sport.svg" />
          </div>
          <div class="text">
            运动
          </div>
        </div>
        <div class="item" v-if="babyTips.has_drunk_wine">
          <div class="img">
            <img src="../assets/android/new/report_icon_drink.svg" />
          </div>
          <div class="text">
            饮酒
          </div>
        </div>
        <div
          class="item"
          v-if="babyTips.has_ovulation"
          @click="newEntryPush('jk0006.0')"
        >
          <div class="img">
            <img src="../assets/android/new/report_icon_ovulation.svg" />
          </div>
          <div class="text">
            排卵期
          </div>
        </div>
        <div
          class="item"
          v-if="babyTips.has_rhinitis_episode"
          @click="newEntryPush('jk0002.0')"
        >
          <div class="img">
            <img src="../assets/android/new/report_icon_rhinitis.svg" />
          </div>
          <div class="text">
            鼻炎
          </div>
        </div>
        <div
          class="item"
          v-if="babyTips.has_physiological_period"
          @click="newEntryPush('jk0005.0')"
        >
          <div class="img">
            <img
              src="../assets/android/new/report_icon_physiologicalperiod.svg"
            />
          </div>
          <div class="text">
            生理周期
          </div>
        </div>
        <div
          class="item"
          v-if="babyTips.has_abdominal_pain"
          @click="newEntryPush('jk0003.0')"
        >
          <div class="img">
            <img src="../assets/android/new/report_icon_abdominalpain.svg" />
          </div>
          <div class="text">
            腹痛腹泻
          </div>
        </div>
        <div
          class="item"
          v-if="babyTips.has_lactations"
          @click="newEntryPush('jk0008.0')"
        >
          <div class="img">
            <img src="../assets/android/new/report_icon_lactation.svg" />
          </div>
          <div class="text">
            哺乳期
          </div>
        </div>
        <div
          class="item"
          v-if="babyTips.has_had_cold"
          @click="newEntryPush('jk0001.0')"
        >
          <div class="img">
            <img src="../assets/android/new/report_icon_cold.svg" />
          </div>
          <div class="text">
            感冒
          </div>
        </div>
        <div
          class="item"
          v-if="babyTips.has_viral_infection"
          @click="newEntryPush('jk0009.0')"
        >
          <div class="img">
            <img src="../assets/android/new/report_icon_virus.svg" />
          </div>
          <div class="text">
            <div>病毒</div>
            <div class="annotation">（感冒、腹泻、鼻炎等等）</div>
          </div>
        </div>
        <div
          class="item"
          v-if="babyTips.has_pregnant"
          @click="newEntryPush('jk0007.0')"
        >
          <div class="img">
            <img src="../assets/android/new/report_icon_pregnancy.svg" />
          </div>
          <div class="text">
            怀孕
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DivHyperlink from './DivHyperlink' // a标签超链接模块
export default {
  name: 'babytips',
  props: ['babyTips', 'tips', 'stressState', 'svTips'],
  data() {
    return {
      warmTips: []
    }
  },
  mounted() {
    this.svTips.lookups.forEach(element => {
      const tipRegexp = /(温馨|溫馨)提示：/g
      this.warmTips.push({
        key: element.key,
        content: element.content.replace(tipRegexp, '')
      })
    })
  },
  destroyed() {},
  methods: {
    newEntryPush(key) {
      this.$store.dispatch('newEntryPush', key)
    }
  },
  components: {
    DivHyperlink
  }
}
</script>

<style scoped>
.bg {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: calc(100vw / 750 * 37);
  padding-top: -moz-calc(100vw/750 * 37);
  padding-top: -webkit-calc(100vw/750 * 37);
}
.bg .img {
  display: inline-block;
  width: calc(100vw / 750 * 116);
  width: -moz-calc(100vw/750 * 116);
  width: -webkit-calc(100vw/750 * 116);
  min-width: calc(100vw / 750 * 116);
  min-width: -moz-calc(100vw/750 * 116);
  min-width: -webkit-calc(100vw/750 * 116);
  height: calc(100vw / 750 * 116);
  height: -moz-calc(100vw/750 * 116);
  height: -webkit-calc(100vw/750 * 116);
  padding-right: calc(100vw / 750 * 14);
  padding-right: -moz-calc(100vw/750 * 14);
  padding-right: -webkit-calc(100vw/750 * 14);
}
.bg .text {
  font-size: calc(100vw / 750 * 30);
  font-size: -moz-calc(100vw/750 * 30);
  font-size: -webkit-calc(100vw/750 * 30);
  line-height: calc(100vw / 750 * 48);
  line-height: -moz-calc(100vw/750 * 48);
  line-height: -webkit-calc(100vw/750 * 48);
  padding-bottom: calc(100vw / 750 * 20);
  padding-bottom: -webkit-calc(100vw/750 * 20);
  padding-right: calc(100vw / 750 * 10);
  padding-right: -webkit-calc(100vw/750 * 10);
  text-align: justify;
}
.main {
  background-color: #fff;
  position: relative;
  padding: calc(100vw / 750 * 30) 0;
}
.main .mainTop {
  display: inline-block;
  width: calc(100vw / 750 * 100);
  width: -moz-calc(100vw/750 * 100);
  width: -webkit-calc(100vw/750 * 100);
  height: calc(100vw / 750 * 79);
  height: -moz-calc(100vw/750 * 79);
  height: -webkit-calc(100vw/750 * 79);
  position: absolute;
  top: calc(-100vw / 750 * 35);
  top: -moz-calc(-100vw/750 * 35);
  top: -webkit-calc(-100vw/750 * 35);
  right: calc(100vw / 750 * 12);
  right: -moz-calc(100vw/750 * 12);
  right: -webkit-calc(100vw/750 * 12);
  z-index: 2;
}
.main .title {
  display: flex;
  justify-content: center;
  align-items: center;
}
.main .title .text {
  color: #cf9155;
  font-size: calc(100vw / 1080 * 46);
  font-size: -moz-calc(100vw/1080 * 46);
  font-size: -webkit-calc(100vw/1080 * 46);
  margin: 0 calc(100vw / 1080 * 25);
  margin: 0 -moz-calc(100vw/1080 * 25);
  margin: 0 -webkit-calc(100vw/1080 * 25);
}
.main .title .line {
  height: 1px;
  background-color: #cf9155;
  width: calc(100vw / 1080 * 268);
  width: -moz-calc(100vw/1080 * 268);
  width: -webkit-calc(100vw/1080 * 268);
}
.main .list {
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.main .list .item {
  display: inline-block;
  text-align: center;
  width: 50%;
  padding-top: calc(100vw / 750 * 83);
  padding-top: -moz-calc(100vw/750 * 83);
  padding-top: -webkit-calc(100vw/750 * 83);
}
.main .list .item .img {
  display: inline-block;
  width: calc(100vw / 750 * 155);
  width: -moz-calc(100vw/750 * 155);
  width: -webkit-calc(100vw/750 * 155);
  height: calc(100vw / 750 * 155);
  height: -moz-calc(100vw/750 * 155);
  height: -webkit-calc(100vw/750 * 155);
  padding-bottom: calc(100vw / 750 * 33);
  padding-bottom: -moz-calc(100vw/750 * 33);
  padding-bottom: -webkit-calc(100vw/750 * 33);
}
.main .list .item .text {
  font-size: calc(100vw / 750 * 36);
  font-size: -moz-calc(100vw/750 * 36);
  font-size: -webkit-calc(100vw/750 * 36);
  line-height: calc(100vw / 750 * 36);
  line-height: -moz-calc(100vw/750 * 36);
  line-height: -webkit-calc(100vw/750 * 36);
  padding: 0 calc(100vw / 750 * 36);
  padding: 0 -moz-calc(100vw/750 * 36);
  padding: 0 -webkit-calc(100vw/750 * 36);
  padding-bottom: calc(100vw / 750 * 30);
  padding-bottom: -moz-calc(100vw/750 * 30);
  padding-bottom: -webkit-calc(100vw/750 * 30);
}
.main .list .item .text .annotation {
  font-size: calc(100vw / 750 * 30);
  font-size: -moz-calc(100vw/750 * 30);
  font-size: -webkit-calc(100vw/750 * 30);
  line-height: calc(100vw / 750 * 30);
  line-height: -moz-calc(100vw/750 * 30);
  line-height: -webkit-calc(100vw/750 * 30);
  color: #999;
}
.main .bottom {
  background-color: #fff;
  margin-bottom: calc(-100vw / 1080 * 30);
  margin-bottom: -moz-calc(-100vw/1080 * 30);
  margin-bottom: -webkit-calc(-100vw/1080 * 30);
  display: inline-block;
  width: calc(100vw / 750 * 690 / 18);
  width: -moz-calc(100vw/750 * 690/18);
  width: -webkit-calc(100vw/750 * 690/18);
  height: calc(100vw / 1080 * 30);
  height: -moz-calc(100vw/1080 * 30);
  height: -webkit-calc(100vw/1080 * 30);
  border-bottom-left-radius: calc(100vw / 1080 * 992 / 18);
  border-bottom-left-radius: -moz-calc(100vw/1080 * 992/18);
  border-bottom-left-radius: -webkit-calc(100vw/1080 * 992/18);
  border-bottom-right-radius: calc(100vw / 1080 * 992 / 18);
  border-bottom-right-radius: -moz-calc(100vw/1080 * 992/18);
  border-bottom-right-radius: -webkit-calc(100vw/1080 * 992/18);
}
</style>
