<template>
  <div class="sdExplains" :style="{justifyContent: explains.length>0?'flex-star':'center'}">
    <div class="item" v-for="(item, index) in explains" :key="index">
      <div class="main" v-if="item.key.indexOf('Z0022')<0">
        <div class="img">
          <img src="../assets/android/zangfu.svg" alt="">
          <div class="text">
            <div><div-hyperlink :content="item.content" :spanStyle="{}" :divClass="false"></div-hyperlink></div>
          </div>
        </div>
      </div>
      <div class="normal" v-else>
        <div class="normalimg">
          <img src="../assets/android/viscera_dialectics_icon_congratulations.svg" :alt="item.content">
        </div>
        <div class="normaltext">{{item.content}}</div>
      </div>
    </div>
    <div class="attention">
      <div class="icon">
        <img src="../assets/android/icon-info.svg" alt="">
      </div>
      <div class="right">
        <div class="title">点击脏腑图标，查看详情</div>
      </div>
    </div>
  </div>
</template>

<script>
import DivHyperlink from './DivHyperlink' // a标签超链接模块
export default {
  name: 'sdexplains',
  props: ['explains'],
  data () {
    return {
    }
  },
  mounted () {
  },
  destroyed () {
  },
  methods: {
  },
  components: {
    DivHyperlink
  }
}
</script>

<style scoped>
  .sdExplains {
    text-align: center;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  .normalimg {
    display: inline-block;
    width: calc(100vw/750*287);
    height: calc(100vw/750*267);
  }
  .landscape .normalimg {
    width: calc(100vh/750*287);
    height: calc(100vh/750*267);
  }
  .normaltext {
    font-weight: 400;
    font-size: calc(100vw/750*36);
    padding-top: calc(100vw/750*30);
  }
  .landscape .normaltext {
    font-size: calc(100vh/750*36);
    padding-top: calc(100vh/750*30);
  }
  .sdExplains .item {
    color: #CF9155;
    padding-bottom: calc(100vw/750*48);
  }
  .landscape .sdExplains .item {
    padding-bottom: calc(100vh/750*48);
    padding-left: calc(100vh/750*44);
    padding-right: calc(100vh/750*44);
  }
  .sdExplains .item:nth-child(even) {
    padding-left: calc(100vw/750*88);
  }
  .landscape .sdExplains .item:nth-child(even) {
    padding-left: calc(100vh/750*44);
  }
  .sdExplains .item .main {
    width: calc(100vw/750*229);
  }
  .landscape .sdExplains .item .main {
    width: calc(100vh/750*229);
  }
  .sdExplains .item .img {
    position: relative;
  }
  .sdExplains .item .normal .img {
    display: inline-block;
    width: calc(100vw/750*287);
    height: calc(100vw/750*267);
  }
  .landscape .sdExplains .item .normal .img {
    width: calc(100vh/750*287);
    height: calc(100vh/750*267);
  }
  .sdExplains .item .text {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: calc(100vw/750*32);
    font-weight: 400;
  }
  .landscape .sdExplains .item .text {
    font-size: calc(100vh/750*32);
  }
  .sdExplains .item .text div {
    display: inline-block;
    max-width: calc(100vw/750*154);
  }
  .landscape .sdExplains .item .text div {
    max-width: calc(100vh/750*154);
  }
  .normal {
    width: calc(100vw/375*259);
  }
  .landscape .normal {
    width: calc(100vh/375*259);
  }
  .attention {
    display: flex;
    align-items: flex-start;
    width: 100%;
    border-top: 1px solid #ccc;
    padding-top: calc(100vw/750*34);
    padding-bottom: calc(100vw/750*34);
  }
  .landscape .attention {
    padding-top: calc(100vh/750*34);
    padding-bottom: calc(100vh/750*34);
  }
  .attention .icon {
    width: calc(100vw/750*30);
    min-width: calc(100vw/750*30);
    margin-right: calc(100vw/750*10);
  }
  .landscape .attention .icon {
    width: calc(100vh/750*30);
    min-width: calc(100vh/750*30);
    margin-right: calc(100vh/750*10);
  }
  .attention .title {
    color: #CF9155;
    font-size: calc(100vw/750*24);
    font-weight: 500;
    line-height: calc(100vw/750*30);
  }
  .landscape .attention .title {
    font-size: calc(100vh/750*24);
    line-height: calc(100vh/750*30);
  }
</style>
