<template>
  <div class="measurementJudgment">
    <div class="main">
      <img class="icon" src="../assets/analysis-report/tips.svg" alt="" />
      <div class="content">{{ measurementJudgmentContent }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'measurementjudgment', // 风判断模块
  props: ['measurementJudgmentContent'],
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
.measurementJudgment {
  text-align: center;
  padding: calc(100vw / 750 * 30) 0;
  background-color: #faf4ee;
}

.landscape .measurementJudgment {
  padding: calc(100vh / 750 * 30) 0;
}

.measurementJudgment .icon {
  padding-top: 2px;
  display: inline-block;
  text-align: left;
  float: left;
  margin-left: 20px;
  width: 16px;
}
.landscape .measurementJudgment .icon {
  width: 24px;
}

.measurementJudgment .content {
  padding: 0 20px 0 40px;
  word-wrap: break-word;
  color: #cf9155;
  font-size: 12px;
  line-height: 20px;
  font-weight: Regular;
  font-family: 'PingFang SC Regular';
}

.landscape .measurementJudgment .content {
  padding: 0 20px 0 40px;
  font-size: 20px;
  line-height: 28px;
}
</style>
