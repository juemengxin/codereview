<template>
  <div class="njContent">
    <div class="goBack" @click="goBack">
      <img src="../assets/report_icon_fh.svg" alt="">
    </div>
    <div class="text">
      <div-hyperlink :content="content"></div-hyperlink>
    </div>
  </div>
</template>

<script>
import DivHyperlink from './DivHyperlink' // a标签超链接模块
export default {
  name: 'njcontent',
  data () {
    return {
      content: ''
    }
  },
  mounted () {
    const t = this
    t.$store.state.njExplainsShow = false
    // 判断是否有title传值
    if (t.$route.query.title) {
      // 通用修改title方法
      t.$store.dispatch('changeTitle', t.$route.query.title)
    }
    t.content = t.$store.state.content
  },
  destroyed () {
    const t = this
    t.$store.state.njExplainsShow = true
    switch (process.env.ENV) {
      case 'dev':
        document.title = '女性健康D'
        break
      case 'test':
        document.title = '女性健康T'
        break
      case 'staging':
        document.title = '女性健康S'
        break
      default:
        document.title = '女性健康'
        break
    }
  },
  methods: {
    /**
    *
    *  回到上一页
    *
    */
    goBack () {
      this.$router.go(-1)
    }
  },
  components: {
    DivHyperlink
  }
}
</script>

<style scoped>
  .njContent {
  }
  .text {
    font-size: calc(100vw/750*28);
    font-size: -moz-calc(100vw/750*28);
    font-size: -webkit-calc(100vw/750*28);
    padding: calc(100vw/750*20) calc(100vw/750*30);
    padding: -moz-calc(100vw/750*20) -moz-calc(100vw/750*30);
    padding: -webkit-calc(100vw/750*20) -webkit-calc(100vw/750*30);
  }
  .goBack {
    position: fixed;
    width: calc(100vw/750*90);
    width: -moz-calc(100vw/750*90);
    width: -webkit-calc(100vw/750*90);
    height: calc(100vw/750*90);
    height: -moz-calc(100vw/750*90);
    height: -webkit-calc(100vw/750*90);
    right: calc(100vw/750*30);
    right: -moz-calc(100vw/750*30);
    right: -webkit-calc(100vw/750*30);
    bottom: calc(100vw/750*130);
    bottom: -moz-calc(100vw/750*130);
    bottom: -webkit-calc(100vw/750*130);
    z-index: 3;
  }
</style>
