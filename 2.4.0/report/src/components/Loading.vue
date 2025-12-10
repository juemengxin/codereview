<template>
  <div class="loading" v-show="$store.state.isLoading">
    <div>
      <svg id="testsvg" :width="windowWidth*375" :height="windowWidth*375">
        <path :d="path" style="fill:none;stroke:#fff;stroke-width:4;">
          <animateTransform attributeName="transform" type="rotate" :from="0+' '+windowWidth*375/2+' '+windowWidth*375/2" :to="360+' '+windowWidth*375/2+' '+windowWidth*375/2" dur="1s" repeatCount="indefinite"/>
        </path>
      </svg>
      <div>加载中...</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'loading', // loading 模块
  data () {
    return {
      loadingTimeOut: false
    }
  },
  computed: {
    windowWidth () {
      return this.$store.state.windowWidth / 2000
    },
    path () {
      return 'M' + this.windowWidth * 375 / 2 + ' ' + 2 + ' A' + (this.windowWidth * 375 / 2 - 2) + ' ' + (this.windowWidth * 375 / 2 - 2) + ' ' + 0 + ' ' + 0 + ' ' + 1 + ' ' + this.windowWidth * 375 / 2 + ' ' + (this.windowWidth * 375 - 2)
    },
    isLoading () {
      return this.$store.state.isLoading
    }
  },
  watch: {
    isLoading (val) {
      // TODO
      // 加载动画3秒结束 保留注释
      // const t = this
      // if (val) {
      //   if (t.loadingTimeOut) {
      //     clearTimeout(t.loadingTimeOut)
      //   }
      //   t.loadingTimeOut = setTimeout(() => {
      //     t.$store.state.isLoading = false
      //   }, 3000)
      // } else {
      //   if (t.loadingTimeOut) {
      //     clearTimeout(t.loadingTimeOut)
      //   }
      // }
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

<style scoped>
  .loading {
    background-color: rgba(0, 0, 0, 0.8);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 98;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: calc(100vw/750*32);
    text-align: center;
    font-weight: 300;
    line-height: calc(100vw/750*64);
  }
  .landscape .loading {
    font-size: calc(100vh/750*32);
    line-height: calc(100vh/750*64);
  }
</style>
