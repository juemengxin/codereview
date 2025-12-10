<template>
  <div class="entryDetails">
    <iframe :src="src" class="iframe">
      <a :href="$route.query.src">您的微信浏览器版本太低，请点击查看详情</a>
    </iframe>
    <div class="goBack" @click="goBack" v-if="$store.state.isWx">
      <img src="../assets/report_icon_fh.svg" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'entrydetails',
  data() {
    return {}
  },
  computed: {
    src() {
      const seedArr = [
        '0',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
        'g',
        'h',
        'i',
        'j',
        'k',
        'l',
        'm',
        'n',
        'o',
        'p',
        'q',
        'r',
        's',
        't',
        'u',
        'v',
        'w',
        'x',
        'y',
        'z'
      ]
      let seed =
        seedArr[Math.floor(Math.random() * 36)] +
        seedArr[Math.floor(Math.random() * 36)] +
        seedArr[Math.floor(Math.random() * 36)] +
        seedArr[Math.floor(Math.random() * 36)]
      return (
        this.$route.query.src +
        (this.$route.query.src.split('?')[1] ? '&random=' : '?random=' + seed)
      )
    }
  },
  mounted() {
    const t = this
    t.$store.state.isLoading = false
    t.$store.state.analysisReportShow = false
    // 判断是否有title传值
    if (t.$route.query.title) {
      // 通用修改title方法
      t.$store.dispatch('changeTitle', t.$route.query.title)
    }
    // 监听页面滚动
    window.addEventListener('scroll', t.windowScroll)
  },
  destroyed() {
    const t = this
    t.$store.state.analysisReportShow = true
    // 移除监听
    window.removeEventListener('scroll', t.windowScroll)
  },
  methods: {
    /**
     *
     *  回到上一页
     *
     */
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
.entryDetails {
}
.iframe {
  display: block;
  width: 100vw;
  height: 100vh;
  border: none;
}
.goBack {
  position: fixed;
  width: calc(100vw / 750 * 90);
  width: -moz-calc(100vw/750 * 90);
  width: -webkit-calc(100vw/750 * 90);
  height: calc(100vw / 750 * 90);
  height: -moz-calc(100vw/750 * 90);
  height: -webkit-calc(100vw/750 * 90);
  right: calc(100vw / 750 * 30);
  right: -moz-calc(100vw/750 * 30);
  right: -webkit-calc(100vw/750 * 30);
  bottom: calc(100vw / 750 * 30);
  bottom: -moz-calc(100vw/750 * 30);
  bottom: -webkit-calc(100vw/750 * 30);
  z-index: 3;
}
</style>
