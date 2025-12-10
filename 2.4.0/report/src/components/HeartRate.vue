<template>
  <div class="heartRate">
    <div class="title">
      <div class="line"></div>
      <div class="text">心率图</div>
      <div class="line"></div>
    </div>
    <div class="main">
      <div class="average">
        <div
          class="text"
          :class="
            averageRate < 50
              ? 'minColor'
              : averageRate > 111
              ? 'maxColor'
              : 'averageColor'
          "
        >
          {{ averageRate }}
        </div>
        <div>平均心率（ bmp )</div>
      </div>
    </div>
    <div class="rule" v-if="isPayment">
      <div
        class="averageRate"
        v-if="$store.state.landscape"
        :style="{
          marginLeft:
            ((windowWidth * averageRate) / 200) * 848 - windowWidth * 9 + 'px',
          borderTopColor:
            averageRate < 50
              ? '#EAA926'
              : averageRate > 111
              ? '#C73E3A'
              : '#3773AB'
        }"
      ></div>
      <div
        class="averageRate"
        v-else
        :style="{
          marginLeft:
            ((windowWidth * averageRate) / 200) * 630 - windowWidth * 9 + 'px',
          borderTopColor:
            averageRate < 50
              ? '#EAA926'
              : averageRate > 111
              ? '#C73E3A'
              : '#3773AB'
        }"
      ></div>
      <div class="colorBg">
        <div class="min">过缓</div>
        <div class="average">正常</div>
        <div class="max">过速</div>
      </div>
      <div class="number">
        <div class="min">0</div>
        <div class="average">50</div>
        <div class="max">110</div>
        <div>200</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'heartrate', // 心率图
  props: ['averageRate'],
  data() {
    return {}
  },
  computed: {
    windowWidth() {
      // 根据屏幕宽度算出单位比列
      return this.$store.state.windowWidth / 750
    }
  },
  mounted() {},
  destroyed() {},
  methods: {}
}
</script>

<style scoped>
.heartRate {
  text-align: center;
  padding: calc(100vw / 750 * 30) 0;
}
.landscape .heartRate {
  padding: calc(100vh / 750 * 30) 0;
}
.heartRate .title {
  display: flex;
  justify-content: center;
  align-items: center;
}
.heartRate .title .text {
  color: #cf9155;
  font-size: calc(100vw / 1080 * 46);
  margin: 0 calc(100vw / 1080 * 25);
}
.landscape .heartRate .title .text {
  font-size: calc(100vh / 1080 * 46);
  margin: 0 calc(100vh / 1080 * 25);
}
.heartRate .title .line {
  height: 1px;
  background-color: #cf9155;
  width: calc(100vw / 1080 * 268);
}
.landscape .heartRate .title .line {
  height: 1px;
  background-color: #cf9155;
  width: calc(100vh / 1080 * 480);
}
.heartRate .main {
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  font-size: calc(100vw / 1080 * 35);
  line-height: calc(100vw / 1080 * 35);
  color: #666;
  text-align: center;
  padding-top: calc(100vw / 1080 * 86);
  padding-bottom: calc(100vw / 750 * 50);
}
.landscape .heartRate .main {
  font-size: calc(100vh / 1080 * 35);
  line-height: calc(100vh / 1080 * 35);
  padding-top: calc(100vh / 1080 * 86);
  padding-bottom: calc(100vh / 750 * 50);
}
.heartRate .main .line {
  background-color: #ccc;
  display: inline-block;
  width: 1px;
  height: calc(100vw / 1080 * 92);
}
.landscape .heartRate .main .line {
  height: calc(100vh / 1080 * 92);
}
.heartRate .main .text {
  font-weight: 500;
  margin-bottom: calc(100vw / 1080 * 24);
}
.landscape .heartRate .main .text {
  margin-bottom: calc(100vh / 1080 * 24);
}
.heartRate .main .minColor {
  color: #eaa926;
}
.heartRate .main .averageColor {
  color: #3773ab;
}
.heartRate .main .maxColor {
  color: #c73e3a;
}
.heartRate .main .min .text {
  font-size: calc(100vw / 1080 * 86);
  line-height: calc(100vw / 1080 * 86);
}
.landscape .heartRate .main .min .text {
  font-size: calc(100vh / 1080 * 86);
  line-height: calc(100vh / 1080 * 86);
}
.heartRate .main .average .text {
  font-size: calc(100vw / 750 * 100);
  line-height: calc(100vw / 750 * 100);
}
.landscape .heartRate .main .average .text {
  font-size: calc(100vh / 750 * 100);
  line-height: calc(100vh / 750 * 100);
}
.heartRate .main .max .text {
  font-size: calc(100vw / 1080 * 86);
  line-height: calc(100vw / 1080 * 86);
}
.landscape .heartRate .main .max .text {
  font-size: calc(100vh / 1080 * 86);
  line-height: calc(100vh / 1080 * 86);
}
.rule {
  display: inline-block;
  width: calc(100vw / 750 * 630);
  text-align: left;
}
.landscape .rule {
  width: calc(100vh / 750 * 848);
}
.rule .averageRate {
  display: inline-block;
  width: 0;
  height: 0;
  border-left: calc(100vw / 750 * 9) solid transparent;
  border-right: calc(100vw / 750 * 9) solid transparent;
  border-top: calc(100vw / 750 * 16) solid #3773ab;
}
.landscape .rule .averageRate {
  border-left: calc(100vh / 750 * 9) solid transparent;
  border-right: calc(100vh / 750 * 9) solid transparent;
  border-top: calc(100vh / 750 * 16) solid #3773ab;
}
.rule .colorBg {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: calc(100vw / 750 * 24);
  line-height: calc(100vw / 750 * 36);
  color: #fff;
  overflow: hidden;
}
.landscape .rule .colorBg {
  font-size: calc(100vh / 750 * 24);
  line-height: calc(100vh / 750 * 36);
}
.rule .colorBg .min {
  background-color: #eaa926;
  width: calc(100vw / 750 * 50 / 200 * 630);
  border-top-left-radius: calc(100vw / 750 * 18);
  border-bottom-left-radius: calc(100vw / 750 * 18);
}
.landscape .rule .colorBg .min {
  width: calc(100vh / 750 * 50 / 200 * 848);
  border-top-left-radius: calc(100vh / 750 * 18);
  border-bottom-left-radius: calc(100vh / 750 * 18);
}
.rule .colorBg .average {
  background-color: #3773ab;
  width: calc(100vw / 750 * 60 / 200 * 630);
}
.landscape .rule .colorBg .average {
  width: calc(100vh / 750 * 60 / 200 * 848);
}
.rule .colorBg .max {
  background-color: #c73e3a;
  width: calc(100vw / 750 * 90 / 200 * 630);
  border-top-right-radius: calc(100vw / 750 * 18);
  border-bottom-right-radius: calc(100vw / 750 * 18);
}
.landscape .rule .colorBg .max {
  width: calc(100vh / 750 * 90 / 200 * 848);
  border-top-right-radius: calc(100vh / 750 * 18);
  border-bottom-right-radius: calc(100vh / 750 * 18);
}
.rule .number {
  display: flex;
  justify-content: space-between;
  font-size: calc(100vw / 750 * 20);
  line-height: calc(100vw / 750 * 30);
  color: #666;
}
.landscape .rule .number {
  font-size: calc(100vh / 750 * 20);
  line-height: calc(100vh / 750 * 30);
}
.rule .number .min {
  min-width: calc(100vw / 750 * 45 / 200 * 630);
}
.landscape .rule .number .min {
  min-width: calc(100vh / 750 * 45 / 200 * 848);
}
.rule .number .average {
  min-width: calc(100vw / 750 * 60 / 200 * 630);
}
.landscape .rule .number .average {
  min-width: calc(100vh / 750 * 60 / 200 * 848);
}
.rule .number .max {
  min-width: calc(100vw / 750 * 85 / 200 * 630);
}
.landscape .rule .number .max {
  min-width: calc(100vh / 750 * 85 / 200 * 848);
}
</style>
