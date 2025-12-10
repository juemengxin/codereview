<i18n>
{
  "en": {},
  "zh-Hans": {
    "index": "点击进入公司网址",
    "document-title": "了解金姆脉诊仪"
  },
  "zh-Hant": {}
}
</i18n>
<template>
  <div class="understand">
    <div>
      脉诊仪是王唯工教授历时30余年，在开创性地提出“气血共振”理论及中医十二经络谐波模型的基础上发明的。<br>
      它由信号采集器、移动设备端软件及云端服务器三部分组成。信号采集器通过光感元件记录透过手指的光强度变化，从中获取心脏搏动及血管容积周期性变化信号。<br>
      信号通过移动设备端发往云端服务器。服务器运用独特算法，对心包、肝、肾、脾、肺、胃、胆、膀胱等经络的强弱进行解读，并根据个人情况给出调理及治疗建议。<br>
      老中医版本是王唯工脉诊的一个延伸阐述，由李云博士研读大量中医古籍提出新理论，也是我们在有大量数据之后做得一些归纳。现阶段还是很初级的阶段，我们会持续以科学方法归纳验证更新。<br>
    </div>
    <div class="button" @click="goOffficial">
      <img class="go-offficial" src="../assets/app/fonts/go-offficial.svg" alt="">
    </div>
  </div>
</template>
<script>
export default {
  name: 'understand',
  data () {
    return {
    }
  },
  watch: {
  },
  computed: {
  },
  beforeMount () {
  },
  mounted () {
    const t = this
    t.$store.dispatch('changeTitle', t.$t('document-title'))
    t.$store.state.loading = false
  },
  destroyed () {
  },
  methods: {
    goOffficial () {
      this.$store.dispatch('invokeBridgeMethod', 'officialWebsite').then((dsBridge) => {
        dsBridge.call('officialWebsite', 'https://www.jinmuhealth.com/')
      }).catch(() => {
        window.open('https://www.jinmuhealth.com/')
      })
    }
  },
  components: {
  }
}
</script>
<style scoped>
  .understand {
    background-color: #ffffff;
    min-height: calc(100vh - 40 / 375 * 100vw);
    padding: calc(20 / 375 * 100vw) calc(15 / 375 * 100vw);
    font-size: calc(16 / 375 * 100vw);
    text-align: left;
    line-height: calc(30 / 375 * 100vw);
  }
  .landscape .understand {
    min-height: calc(100vh - 40 / 375 * 100vh);
    padding: calc(20 / 375 * 100vh) calc(15 / 375 * 100vh);
    font-size: calc(16 / 375 * 100vh);
    line-height: calc(30 / 375 * 100vh);
  }
  .button {
    margin-top: calc(50 / 375 * 100vw);
  }
  .landscape .button {
    margin-top: calc(40 / 375 * 100vh);
  }
</style>
