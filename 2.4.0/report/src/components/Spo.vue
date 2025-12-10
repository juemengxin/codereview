<template>
  <div class="spo">
    <div class="title">
      <div class="line"></div>
      <div class="text">血氧饱和度</div>
      <div class="line"></div>
    </div>
    <div class="main">
      <div class="number">&nbsp;{{spo}}<span class="percent">%</span></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'spo',
  props: ['spo'],
  data () {
    return {
    }
  },
  computed: {
    windowWidth () {
      // 根据屏幕宽度算出单位比列
      return this.$store.state.windowWidth / 750
    },
    lowRate () {
      return this.minRate
    },
    highRate () {
      return this.maxRate
    }
  },
  mounted () {
  },
  destroyed () {
  },
  methods: {
  }
}
</script>

<style>
.spo {
  text-align: center;
  padding: calc(100vw / 750 * 30) 0;
}
.landscape .spo {
  text-align: center;
  padding: calc(100vw / 750 * 30) 0;
}
.spo .title {
  display: flex;
  justify-content: center;
  align-items: center;
}
.spo .title .text {
  color: #cf9155;
  font-size: calc(100vw / 1080 * 56);
  margin: 0 calc(100vw / 1080 * 25);
}
.landscape .spo .title .text {
  color: #cf9155;
  font-size: calc(100vh / 1080 * 56);
  margin: 0 calc(100vh / 1080 * 25);
}
.spo .title .line {
  height: 1px;
  background-color: #cf9155;
  width: calc(100vw / 1080 * 197);
}
.landscape .spo .title .line {
  height: 1px;
  background-color: #cf9155;
  width: calc(100vh / 1080 * 409);
}
.spo .main {
  display: flex;
  color: #3773ab;
  text-align: center;
  padding-top: calc(100vw / 1080 * 86);
  padding-bottom: calc(100vw / 750 * 50);
}
.landscape .spo .main {
  display: flex;
  text-align: center;
  color: #3773ab;
  padding-top: calc(100vh / 1080 * 86);
  padding-bottom: calc(100vh / 750 * 50);
}
.spo .main .number {
  margin: 0 auto;
  font-weight: 500;
  font-size: calc(100vw / 750 * 85);
  line-height: clac(100vw / 750 * 85);
}
.landscape .spo .main .number {
  margin: 0 auto;
  font-weight: 500;
  font-size: calc(100vw / 750 * 85);
  line-height: clac(100vw / 750 * 85);
}
.spo .main .number .percent {
  font-weight: normal !important;
  font-size: calc(100vw / 1080 * 60) !important;
  line-height: calc(100vw / 1080 * 60) !important;
  color: #333 !important;
}
.landscape .spo .main .number .percent {
  font-weight: normal !important;
  font-size: calc(100vw / 1080 * 60) !important;
  line-height: calc(100vw / 1080 * 60) !important;
  color: #333 !important;
}
</style>
