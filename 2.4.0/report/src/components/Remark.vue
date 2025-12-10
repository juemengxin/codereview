<template>
  <div class="remark">
    <div class="line"></div>
    <div class="text" @click="routeToUpdateRemark">
      {{remark===''?'请点击填写备注':remark}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'remark', // 备注文字模块
  props: ['remark', 'reportShare'],
  data () {
    return {
    }
  },
  mounted () {
  },
  destroyed () {
  },
  methods: {
    /**
    *
    *  跳转填写备注
    */
    routeToUpdateRemark () {
      const t = this
      // 判断是否是分享页面
      if (!t.reportShare) {
        t.$store.state.remark = t.remark
        t.$router.push({name: 'updateremark', query: t.$route.query}) // 跳转填写备注页面
      }
    }
  }
}
</script>

<style scoped>
  .remark {
    padding-bottom: calc(100vw/750*19);
  }
  .landscape .remark {
    padding-bottom: calc(100vh/750*19);
  }
  .remark .line {
    background-color: rgba(255, 255, 255, 0.25);
    height: 1px;
    margin-bottom: calc(100vw/750*19);
  }
  .landscape .remark .line {
    margin-bottom: calc(100vh/750*19);
  }
  .text {
    background-color: rgba(255, 255, 255, 0.8);
    color: #666;
    font-size: calc(100vw/750*24);
    line-height: calc(100vw/750*41);
    padding: calc(100vw/750*25);
    border-radius: calc(100vw/750*8);
    text-align: left;
    word-break: break-all;
  }
  .landscape .text {
    font-size: calc(100vh/750*24);
    line-height: calc(100vh/750*41);
    padding: calc(100vh/750*25);
    border-radius: calc(100vh/750*8);
  }
</style>
