<template>
  <div class="risk-predictor">
    <div class="list" v-if="riskEstimate.length > 0">
      <div class="item" v-for="(item, index) in riskEstimate" :key="index">
        <div class="text">
          <div-hyperlink
            :content="item.content"
            :spanStyle="{}"
            :divClass="false"
          ></div-hyperlink>
        </div>
        <div
          class="status"
          :style="{
            color: item.score === 0 ? '#5ca694' : '#C73E3A',
            borderColor: item.score === 0 ? '#5ca694' : '#C73E3A'
          }"
        >
          {{
            item.score === 0
              ? '正常'
              : item.score === 1
              ? '轻风险'
              : item.score === 2
              ? '中风险'
              : '重风险'
          }}
        </div>
      </div>
    </div>
    <div class="attention" v-if="riskEstimateTips.length > 0">
      <div class="attention-item">
        <div class="icon">
          <img src="../assets/android/icon-info.svg" alt="" />
        </div>
        <div class="right">
          <div class="title">点击疾病名称，查看详情</div>
        </div>
      </div>
      <div class="attention-item tip">
        <div class="icon">
          <img src="../assets/android/icon-info.svg" alt="" />
        </div>
        <div class="right">
          <div class="title">温馨提示：</div>
          <div class="text">
            <div-hyperlink :content="tip"></div-hyperlink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import DivHyperlink from './DivHyperlink' // a标签超链接模块
export default {
  name: 'risk-predictor',
  props: ['riskEstimate', 'riskEstimateTips'],
  data() {
    return {
      tip: ''
    }
  },
  computed: {},
  beforeMount() {},
  mounted() {
    const t = this
    if (t.riskEstimateTips.length > 0) {
      t.tip = t.riskEstimateTips[0].content
    }
  },
  destroyed() {},
  methods: {},
  components: {
    DivHyperlink
  }
}
</script>
<style scoped>
.risk-predictor {
  padding-bottom: calc(100vw / 750 * 30);
}
.landscape .risk-predictor {
  padding-bottom: calc(100vh / 750 * 30);
}
.list {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}
.list .item {
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: calc(100vw / 750 * 20);
}
.landscape .list .item {
  width: 33%;
  margin-bottom: calc(100vh / 750 * 20);
}
.list .item .status {
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc(100vw / 750 * 88);
  min-width: calc(100vw / 750 * 88);
  font-size: calc(100vw / 750 * 22);
  border-radius: calc(100vw / 750 * 26);
  border: 1px solid #c73e3a;
  color: #c73e3a;
  margin-left: calc(100vw / 750 * 28);
  margin-right: calc(100vw / 750 * 28);
}
.landscape .list .item .status {
  width: calc(100vh / 750 * 88);
  min-width: calc(100vh / 750 * 88);
  font-size: calc(100vh / 750 * 22);
  border-radius: calc(100vh / 750 * 26);
  margin-left: calc(100vh / 750 * 28);
  margin-right: calc(100vh / 750 * 28);
}
.list .item .text {
  font-size: calc(100vw / 750 * 26);
  text-align: center;
  width: 100%;
}
.landscape .list .item .text {
  font-size: calc(100vh / 750 * 26);
}
.attention {
  margin-top: calc(100vw / 750 * 20);
  font-size: calc(100vw / 750 * 24);
  color: #cf9155;
  border-top: 1px solid #cccccc;
  padding-top: calc(100vw / 750 * 30);
  text-align: justify;
}
.landscape .attention {
  margin-top: calc(100vh / 750 * 20);
  font-size: calc(100vh / 750 * 24);
  padding-top: calc(100vh / 750 * 30);
}
.attention .attention-item {
  display: flex;
  align-items: flex-start;
}
.attention .attention-item + .attention-item {
  padding-top: calc(100vw / 750 * 17);
}
.landscape .attention .attention-item + .attention-item {
  padding-top: calc(100vh / 750 * 17);
}
.attention .tip {
  justify-content: space-between;
}
.attention .icon {
  width: calc(100vw / 750 * 30);
  min-width: calc(100vw / 750 * 30);
  margin-right: calc(100vw / 750 * 10);
}
.landscape .attention .icon {
  width: calc(100vh / 750 * 30);
  min-width: calc(100vh / 750 * 30);
  margin-right: calc(100vh / 750 * 10);
}
.attention .title {
  font-weight: 500;
  line-height: calc(100vw / 750 * 30);
}
.landscape .attention .title {
  line-height: calc(100vh / 750 * 30);
}
</style>
