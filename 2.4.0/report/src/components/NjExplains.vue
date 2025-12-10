<template>
  <div>
    <div class="njExplains" v-if="$store.state.njExplainsShow">
      <div class="backToTop" @click="backToTop" v-if="showBackToTop">
        <img src="../assets/android/report_icon_up.svg" alt="">
      </div>
      <div class="goBack" @click="goBack">
        <img src="../assets/report_icon_fh.svg" alt="">
      </div>
      <div>
        <div class="narbar">
          <div class="item" v-for="(item, index) in title" :key="item" :class="selectedId === index?'on':''" @click="selectId(index)">
            {{item}}
            <div class="bottom" v-if="selectedId === index"></div>
          </div>
        </div>
        <div class="narbarHeight"></div>
        <nj-healthy-skin v-if="selectedId===0"
          :reportQX="reportQX"
          :reportQXMS="reportQXMS"
          :reportMB="reportMB"
          :reportMBMS="reportMBMS"
          :reportF101="reportF101"
          :reportF102="reportF102"
          :reportFKMS="reportFKMS"
          :reportF106="reportF106"
          :reportJSMS="reportJSMS"
          :reportYJMS="reportYJMS"></nj-healthy-skin>
        <nj-reproductive-health v-if="selectedId===1"
          :reportF100="reportF100"
          :reportZGTS="reportZGTS"
          :reportZGMS="reportZGMS"
          :reportM0="reportM0"
          :reportYJMS="reportYJMS"
          :reportM1="reportM1"
          :reportM2="reportM2"
          :reportF105="reportF105"
          :reportSZTS="reportSZTS"
          :reportF107="reportF107"
          :reportLBMS="reportLBMS"></nj-reproductive-health>
        <nj-breast-health v-if="selectedId===2"
          :reportM3="reportM3"
          :reportRXMS="reportRXMS"
          :reportBC="reportBC"
          :reportBCMS="reportBCMS"></nj-breast-health>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
import NjHealthySkin from './NjHealthySkin' // 女性健康美肤模块
import NjReproductiveHealth from './NjReproductiveHealth' // 女性生殖健康模块
import NjBreastHealth from './NjBreastHealth' // 女性乳腺健康模块
export default {
  name: 'njexplains',
  props: ['reportQX', 'reportQXMS', 'reportMB', 'reportMBMS', 'reportF101', 'reportF102', 'reportFKMS', 'reportF106', 'reportJSMS', 'reportF100', 'reportZGTS', 'reportZGMS', 'reportM0', 'reportYJMS', 'reportM1', 'reportM2', 'reportF105', 'reportSZTS', 'reportF107', 'reportLBMS', 'reportM3', 'reportRXMS', 'reportBC', 'reportBCMS'],
  data () {
    return {
      showBackToTop: false, // @type{boolean} 展示到顶部图标
      scrollTimeOut: false, // @type{boolean} 滚动延迟
      selectedId: 0, // @type{string} 选择的Id
      title: ['女性健康美肤', '女性生殖健康', '女性乳腺健康']
    }
  },
  mounted () {
    const t = this
    // 通用修改title方法
    this.$store.dispatch('changeTitle', '女性健康')
    t.backToTop()
    t.selectedId = parseInt(t.$route.query.id)
    t.$store.state.analysisReportShow = false
    // 监听页面滚动
    window.addEventListener('scroll', t.windowScroll)
  },
  destroyed () {
    const t = this
    t.$store.state.analysisReportShow = true
    // 移除监听
    window.removeEventListener('scroll', t.windowScroll)
  },
  computed: {
  },
  methods: {
    /**
    *
    *  选择Id
    *
    */
    selectId (id) {
      const t = this
      t.backToTop()
      t.selectedId = id
    },
    /**
    *
    *  回到上一页
    *
    */
    goBack () {
      this.$router.go(-1)
    },
    /**
    *
    *  页面滚动事件
    */
    windowScroll () {
      const t = this
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
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
    },
    /**
    *
    *  回到顶部
    *
    */
    backToTop () {
      document.body.scrollTop = document.documentElement.scrollTop = 0
    }
  },
  components: {
    NjHealthySkin,
    NjReproductiveHealth,
    NjBreastHealth
  }
}
</script>

<style scoped>
  .njExplains {
  }
  .narbar {
    border-bottom: 1px solid #EFEFEF;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 3;
    background-color: #fff;
    color: #666;
    font-weight: 400;
  }
  .narbarHeight {
    height: calc(100vw/750*70);
    height: -moz-calc(100vw/750*70);
    height: -webkit-calc(100vw/750*70);
  }
  .narbar .item {
   display: inline-block;
   width: 33.33%;
   text-align: center;
   font-size: calc(100vw/750*28);
   font-size: -moz-calc(100vw/750*28);
   font-size: -webkit-calc(100vw/750*28);
   line-height: calc(100vw/750*70);
   line-height: -moz-calc(100vw/750*70);
   line-height: -webkit-calc(100vw/750*70);
   position: relative;
  }
  .narbar .item .bottom {
    display: inline-block;
    width: 100%;
    height: 2px;
    background-color: #1AA99D;
    position: absolute;
    bottom: 0;
    left: 0;
  }
  .narbar .on {
    color: #1AA99D;
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
  .backToTop {
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
    bottom: calc(100vw/750*30);
    bottom: -moz-calc(100vw/750*30);
    bottom: -webkit-calc(100vw/750*30);
    z-index: 3;
  }
</style>
