<template>
  <div class="partialPulseWave">
    <div class="title">
      <div class="line" v-if="isPull"></div>
      <div class="text">局部脉搏波形图</div>
      <div class="line" v-if="isPull"></div>
      <div class="pull" v-if="!isPull" @click="isPull = true">展开</div>
      <div class="pull" v-if="isPull" @click="isPull = false">收起</div>
    </div>
    <svg class="svg" :width="windowWidth*605" :height="windowWidth*240" v-if="isPull">
      <!-- 底线 -->
      <line x1="0" y1="0" :x2="windowWidth*605" y2="0" style="stroke:#666;stroke-width:1"/>
      <line x1="0" :y1="windowWidth*60" :x2="windowWidth*605" :y2="windowWidth*60" style="stroke:#666;stroke-width:1"/>
      <line x1="0" :y1="windowWidth*120" :x2="windowWidth*605" :y2="windowWidth*120" style="stroke:#666;stroke-width:1"/>
      <line x1="0" :y1="windowWidth*180" :x2="windowWidth*605" :y2="windowWidth*180" style="stroke:#666;stroke-width:1"/>
      <line x1="0" :y1="windowWidth*240" :x2="windowWidth*605" :y2="windowWidth*240" style="stroke:#666;stroke-width:1"/>
      <!-- 脉搏波 -->
      <path :d="path" style="fill:none;stroke:#CF9155;stroke-width:1"/>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'partialpulsewave', // 脉搏波模块
  props: ['partialPulseWave'],
  data () {
    return {
      spacePoint: 5, // @type {integer} 两点之间的间隔数
      points: 150, // @type {integer} 一共取多少个点
      path: '', // @type {string} 脉搏波
      isPull: false
    }
  },
  computed: {
    windowWidth () {
      // 根据屏幕宽度算出单位比列
      return this.$store.state.landscape ? this.$store.state.windowWidth / 750 * 1.5 : this.$store.state.windowWidth / 750
    }
  },
  watch: {
    partialPulseWave () {
      const t = this
      t.getSVG()
    },
    windowWidth () {
      const t = this
      t.getSVG()
    }
  },
  mounted () {
    const t = this
    t.getSVG()
  },
  destroyed () {
  },
  methods: {
    getSVG () {
      // TODO 脉搏图
      const t = this
      const filterArr = []
      const pointArr = []
      t.path = ''
      if (t.partialPulseWave.length > 0) {
        // 根据间隔点过滤脉搏点
        t.partialPulseWave.forEach((element, index) => {
          if (index % t.spacePoint === 0) {
            filterArr.push(element)
          }
        })
        // 根据points截取脉搏点
        if (t.$store.state.landscape) {
          filterArr.slice(0, t.points).forEach((element, index) => {
            pointArr.push({
              x: (t.$store.state.windowWidth / 750 * 1.5 * (605 / filterArr.slice(0, t.points).length) * index).toFixed(2),
              y: (t.$store.state.windowWidth / 750 * 1.5 * (3000 + ((element - Math.min(...t.partialPulseWave)) / (Math.max(...t.partialPulseWave) - Math.min(...t.partialPulseWave)) * 18000)) / 100).toFixed(2)
            })
          })
        } else {
          filterArr.slice(0, t.points).forEach((element, index) => {
            pointArr.push({
              x: (t.$store.state.windowWidth / 750 * (605 / filterArr.slice(0, t.points).length) * index).toFixed(2),
              y: (t.$store.state.windowWidth / 750 * (3000 + ((element - Math.min(...t.partialPulseWave)) / (Math.max(...t.partialPulseWave) - Math.min(...t.partialPulseWave)) * 18000)) / 100).toFixed(2)
            })
          })
        }
        // 判断 如果数组为偶数 则把第一点重复添加到头部
        if (pointArr.length % 2 === 0) {
          pointArr.unshift(pointArr[0])
        }
        // 画脉搏波
        pointArr.forEach((element, index) => {
          if (index === 0) {
            t.path += ('M' + element.x + ' ' + element.y)
          } else if (index % 2 === 1) {
            t.path += (' S' + element.x + ' ' + element.y)
          } else {
            t.path += (' ' + element.x + ' ' + element.y)
          }
        })
      }
    }
  }
}
</script>

<style scoped>
  .partialPulseWave {
    text-align: center;
    padding: calc(100vw/750*30) 0;
  }
  .landscape .partialPulseWave {
    padding: calc(100vh/750*30) 0;
  }
  .partialPulseWave .title {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  .partialPulseWave .title .pull {
    position: absolute;
    top: 0;
    right: 0;
    color: #3773AB;
    line-height: calc(100vw/750*46);
    font-size: calc(100vw/750*28);
  }
  .landscape .partialPulseWave .title .pull {
    line-height: calc(100vh/750*46);
    font-size: calc(100vh/750*28);
  }
  .partialPulseWave .title .text {
    color: #CF9155;
    font-size: calc(100vw/1080*46);
    margin: 0 calc(100vw/1080*25);
  }
  .landscape .partialPulseWave .title .text {
    font-size: calc(100vh/1080*46);
    margin: 0 calc(100vh/1080*25);
  }
  .partialPulseWave .title .line {
    height: 1px;
    background-color: #CF9155;
    width: calc(100vw/750*118);
  }
  .landscape .partialPulseWave .title .line {
    width: calc(100vh/1080*400);
  }
  .partialPulseWave .svg {
    padding-top: calc(100vw/750*80);
  }
  .landscape .partialPulseWave .svg {
    padding-top: calc(100vh/750*80);
  }
</style>
