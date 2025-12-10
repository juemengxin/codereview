<template>
  <div>
    <div class="navBar" id="navBar" :class="navBarIsOnTop?'onTop':''" :style="{backgroundImage: $store.state.landscape ? 'url('+ headerImg +')' : '', backgroundPositionY: backgroundPositionY + 'px'}">
      <div class="main">
        <div class="item" v-for="(item, index) in navBars" :key="index" @click="changeSelectedId(index)">
          <div class="img">
            <img :src="item.url" alt="">
          </div>
          <div class="text">{{item.text}}</div>
          <div class="select" v-if="selectedId===item.id">
            <div></div>
          </div>
        </div>
      </div>
    </div>
    <div class="navBarHeight" v-if="navBarIsOnTop">&nbsp;</div>
  </div>
</template>

<script>
import headerImg from '../assets/bg.png'
export default {
  name: 'navbar', // 导航栏
  props: ['navBars', 'selectedId'],
  data () {
    return {
      headerImg,
      navBarIsOnTop: false, //  @type {boolean} 导航栏是否在顶部
      backgroundPositionY: 0,
      navBarTop: 0 //  @type {integer} 导航栏位置
    }
  },
  mounted () {
    const t = this
    t.windowScroll()
    window.addEventListener('scroll', t.windowScroll)
  },
  destroyed () {
    const t = this
    window.removeEventListener('scroll', t.windowScroll)
  },
  methods: {
    /**
    *
    *  页面滚动事件
    */
    windowScroll () {
      const t = this
      if (t.$store.state.landscape) {
        const landscapeHead = document.getElementById('landscapeHead').getBoundingClientRect()
        t.backgroundPositionY = landscapeHead.height
        if (landscapeHead.top < window.innerHeight && landscapeHead.bottom > 0) {
          t.navBarIsOnTop = false
        } else {
          t.navBarIsOnTop = true
        }
      } else {
        t.navBarTop = document.querySelector('#navBar').offsetTop
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        const headerObject = document.getElementById('header').getBoundingClientRect()
        if (scrollTop >= t.navBarTop) {
          t.$emit('navBarIsOnTop', {
            headerHeight: headerObject.height,
            navBarTop: t.navBarTop,
            narBarStatus: true
          })
        } else {
          t.$emit('navBarIsOnTop', {
            headerHeight: headerObject.height,
            navBarTop: t.navBarTop,
            narBarStatus: false
          })
        }
      }
    },
    /**
    *
    *  触发改变导航栏选择索引
    *  @type{number} index 导航栏选择索引
    */
    changeSelectedId (index) {
      const t = this
      t.$emit('change-selected-id', index)
    }
  }
}
</script>

<style scoped>
  .navBar {
    padding-top: calc(100vw/750*20);
    background-size: 0;
  }
  .landscape .navBar {
    padding-top: 0;
  }
  .navBarHeight {
    height: calc(100vw/750*157);
  }
  .landscape .navBarHeight {
    height: auto;
  }
  .onTop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 3;
    padding: 0 calc(100vw/1080*44);
  }
  .landscape .onTop {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: auto;
    width: calc(100vh/1080*340);
    background-size: calc(1920/340*50%);
    z-index: 3;
    padding: 0;
  }
  .main {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .landscape .main {
    display: block;
  }
  .main .item {
    padding-bottom: calc(100vw/750*28);
    min-width: 20%;
    width: 100%;
    position: relative;
    text-align: center;
  }
  .landscape .main .item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: calc(100vh/1080*128);
    padding-bottom: 0;
    padding-top: calc(100vh/1080*23);
    min-width: auto;
    width: 100%;
  }
  .main .item .select {
    position: absolute;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    bottom: 0;
    z-index: 2;
    left: 0;
    right: 0;
  }
  .main .item .select div {
    display: inline-block;
    width: 0;
    height: 0;
    border-left: calc(100vw/750*20) solid transparent;
    border-right: calc(100vw/750*20) solid transparent;
    border-bottom: calc(100vw/750*15) solid #fff;
  }
  .landscape .main .item .select {
    display: flex;
    align-items: center;
    justify-content: center;
    top: calc(100vh/1080*23);
    left: auto;
  }
  .landscape .main .item .select div {
    display: inline-block;
    width: 0;
    height: 0;
    border-top: calc(100vw/750*10) solid transparent;
    border-bottom: calc(100vw/750*10) solid transparent;
    border-right: calc(100vw/750*10) solid #f5f5f5;
  }
  .main .item .img {
    display: inline-block;
    width: calc(100vw/750*60);
    height: calc(100vw/750*60);
    margin-bottom: calc(100vw/750*10);
  }
  .landscape .main .item .img {
    width: calc(100vh/1080*67);
    height: auto;
    margin-bottom: 0;
    margin-right: calc(100vh/1080*30);
  }
  .main .item .text {
    font-size: calc(100vw/750*26);
    line-height: calc(100vw/750*26);
    color: #fff;
  }
  .landscape .main .item .text {
    font-size: calc(100vh/1080*42);
  }
</style>
