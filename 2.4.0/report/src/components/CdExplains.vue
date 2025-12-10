<template>
  <div class="cdExplains">
    <div class="line">
      <div class="img" :class="'img'+explains.length" v-for="item in explains" :key="item.key" >
        <img src="../assets/android/report_label_cd.svg" alt="">
        <div class="text">
          <div :style="{marginTop: displayWeekMonth&&item.score!==0 ? 'calc(-100vw/750*30)' : '0px'}">
            <div class="name"><div-hyperlink :content="item.content.split('（')[0]" :spanStyle="{}" :divClass="false"></div-hyperlink></div>
            <div class="dec">{{item.content.split('（')[1]?'（'+item.content.split('（')[1]:''}}</div>
          </div>
        </div>
        <div class="score" v-if="item.score!==0 && displayWeekMonth">
          {{item.score}}%
        </div>
      </div>
    </div>
    <div class="attention" v-for="item in notices" :key="item.key">
      <div class="attention-item">
        <div class="icon">
          <img src="../assets/android/icon-info.svg" alt="">
        </div>
        <div class="right">
          <div class="title">点击体质图标，查看详情</div>
        </div>
      </div>
      <div class="attention-item">
        <div class="left">注：</div>
        <div class="right">
          <div-hyperlink :content="item.content"></div-hyperlink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DivHyperlink from './DivHyperlink' // a标签超链接模块
export default {
  name: 'cdexplains',
  props: ['explains', 'notices', 'displayWeekMonth'],
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
  .cdExplains {
    text-align: center;
  }
  .cdExplains .line {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
  }
  .cdExplains .line + .line {
    padding-top: calc(100vw/750*20);
  }
  .landscape .cdExplains .line + .line {
    padding-top: calc(100vh/750*20);
  }
  .cdExplains .img {
    max-width: 45%;
    min-width: 25%;
    position: relative;
    margin-bottom: calc(100vh/750*24);
  }
  .landscape .cdExplains .img {
    max-width: 30%;
    margin-bottom: calc(100vw/750*24);
  }
  .cdExplains .img + .img {
    margin-left: 5%
  }

  .score {
    font-size: calc(100vw/750*30);
    color: #666666;
  }
  .cdExplains .img .text {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    font-weight: 400;
    color: #C73E3A;
  }
  .cdExplains .img1 .name {
    font-size: calc(100vw/750*36);
  }
  .landscape .cdExplains .img1 .name {
    font-size: calc(100vh/750*36);
  }
  .cdExplains .img1  .dec {
    font-size: calc(100vw/750*26);
  }
  .landscape .cdExplains .img1  .dec {
    font-size: calc(100vh/750*26);
  }
  .cdExplains .img2 .name {
    font-size: calc(100vw/750*30);
  }
  .landscape .cdExplains .img2 .name {
    font-size: calc(100vh/750*30);
  }
  .cdExplains .img2  .dec {
    font-size: calc(100vw/750*24);
  }
  .landscape .cdExplains .img2  .dec {
    font-size: calc(100vh/750*24);
  }
  .cdExplains .img3 .name {
    font-size: calc(100vw/750*26);
  }
  .landscape .cdExplains .img3 .name {
    font-size: calc(100vh/750*26);
  }
  .cdExplains .img3  .dec {
    font-size: calc(100vw/750*22);
  }
  .landscape .cdExplains .img3  .dec {
    font-size: calc(100vh/750*22);
  }
  .cdExplains .attention {
    border-top: 1px solid #ccc;
    margin-top: calc(100vw/750*58);
    padding: calc(100vw/750*25) 0;
    font-size: calc(100vw/750*20);
  }
  .landscape .cdExplains .attention {
    margin-top: calc(100vh/750*58);
    padding: calc(100vh/750*25) 0;
    font-size: calc(100vh/750*20);
  }
  .attention .attention-item {
    display: flex;
    align-items: flex-start;
  }
  .attention .attention-item + .attention-item {
    padding-top: calc(100vw/750*17);
  }
  .landscape .attention .attention-item + .attention-item {
    padding-top: calc(100vh/750*17);
  }
  .attention .tip {
    justify-content: space-between;
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
    color: #CF9155;
    font-size: calc(100vh/750*24);
    font-weight: 500;
    line-height: calc(100vh/750*30);
  }
  .cdExplains .attention .right {
    text-align: justify;
  }
  .img.text {
    font-size: calc(100vw/750*30);
    color: #666666;
  }
  .landscape .img.text {
    font-size: calc(100vh/750*30);
  }
</style>
