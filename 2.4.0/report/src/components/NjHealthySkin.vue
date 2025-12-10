<template>
  <div class="njHealthySkin">
    <div class="mainbg">
      <div class="item">
        <div class="title">
          <div class="left"></div>
          <div>情绪健康</div>
        </div>
        <div class="text" v-for="item in reportQX" :key="item.key">
          您的情绪健康情况为：<span><div-hyperlink :content="item.content"></div-hyperlink></span>
        </div>
        <div v-for="item in reportQXMS" :key="item.key">
        <div class="text">
          <div-hyperlink :content="item.content.slice(0, 150)+'...'"></div-hyperlink>
        </div>
        <div class="more">
          <span @click="routeToNjEntry('情绪健康', item.content)">查看更多></span>
        </div>
        </div>
        <div class="bottom">
            <div class="line"></div>
            <div>金姆健康</div>
            <div class="line"></div>
          </div>
      </div>
      <div class="item">
        <div class="title">
          <div class="left"></div>
          <div>面部美肤</div>
        </div>
        <div class="text" v-for="item in reportMB" :key="item.key">
          您的面部美肤情况为：<span><div-hyperlink :content="item.content"></div-hyperlink></span>
        </div>
        <div v-for="item in reportMBMS" :key="item.key">
        <div class="text">
          <div-hyperlink :content="item.content.slice(0, 150)+'...'"></div-hyperlink>
        </div>
        <div class="more">
          <span @click="routeToNjEntry('面部美肤', item.content)">查看更多></span>
        </div>
        </div>
        <div class="bottom">
            <div class="line"></div>
            <div>金姆健康</div>
            <div class="line"></div>
          </div>
      </div>
      <div class="item">
        <div class="title">
          <div class="left"></div>
          <div>妇科疾病风险预估</div>
        </div>
        <div class="text">
          您的妇科疾病风险预估情况为：
        </div>
        <div style="text-align: center;">
        <div class="rule">
          <div class="value" :style="{marginLeft: reportF101>=5?'75%':reportF101>=3?'50%':reportF101>=1?'25%':'0', backgroundColor: reportF101>=5?'#F45437':reportF101>=3?'#F87F33':reportF101>=1?'#FCA31F':'#FFBD00'}">
            <div>{{reportF101>=5?'高度':reportF101>=3?'中度':reportF101>=1?'轻度':'较低'}}</div>
            <div class="mid" :style="{borderTopColor: reportF101>=5?'#F45437':reportF101>=3?'#F87F33':reportF101>=1?'#FCA31F':'#FFBD00'}"></div>
          </div>
          <div class="bgColor">
            <div class="i" style="background-color: #FFBD00;"></div>
            <div class="i" style="background-color: #FCA31F;"></div>
            <div class="i" style="background-color: #F87F33;"></div>
            <div class="i" style="background-color: #F45437;"></div>
          </div>
          <div class="bgColor text">
            <div class="i">较低</div>
            <div class="i">轻度</div>
            <div class="i">中度</div>
            <div class="i">高度</div>
          </div>
        </div>
        </div>
        <div v-for="item in reportYJMS" :key="item.key" v-if="item.key==='YJMS0003.0'">
        <div class="text">
          <div-hyperlink :content="item.content.slice(0, 150)+'...'"></div-hyperlink>
        </div>
        <div class="more">
          <span @click="routeToNjEntry('妇科疾病风险预估', item.content)">查看更多></span>
        </div>
        </div>
        <div class="bottom">
            <div class="line"></div>
            <div>金姆健康</div>
            <div class="line"></div>
          </div>
      </div>
      <div class="item">
        <div class="title">
          <div class="left"></div>
          <div>妇科炎症</div>
        </div>
        <div class="text">
          您的妇科炎症情况为：
        </div>
        <div style="text-align: center;">
        <div class="rule">
          <div class="value" :style="{marginLeft: reportF102>=80?'75%':reportF102>=60?'50%':reportF102>=40?'25%':'0', backgroundColor: reportF102>=80?'#F45437':reportF102>=60?'#F87F33':reportF102>=40?'#FCA31F':'#FFBD00'}">
            <div>{{reportF102>=80?'严重':reportF102>=60?'中度':reportF102>=40?'轻度':'极低'}}</div>
            <div class="mid" :style="{borderTopColor: reportF102>=80?'#F45437':reportF102>=60?'#F87F33':reportF102>=40?'#FCA31F':'#FFBD00'}"></div>
          </div>
          <div class="bgColor">
            <div class="i" style="background-color: #FFBD00;"></div>
            <div class="i" style="background-color: #FCA31F;"></div>
            <div class="i" style="background-color: #F87F33;"></div>
            <div class="i" style="background-color: #F45437;"></div>
          </div>
          <div class="bgColor text">
            <div class="i">极低</div>
            <div class="i">轻度</div>
            <div class="i">中度</div>
            <div class="i">严重</div>
          </div>
        </div>
        </div>
        <div v-for="item in reportFKMS" :key="item.key">
        <div class="text">
          <div-hyperlink :content="item.content.slice(0, 150)+'...'"></div-hyperlink>
        </div>
        <div class="more">
          <span @click="routeToNjEntry('妇科炎症', item.content)">查看更多></span>
        </div>
        </div>
        <div class="bottom">
            <div class="line"></div>
            <div>金姆健康</div>
            <div class="line"></div>
          </div>
      </div>
      <div class="item">
        <div class="title">
          <div class="left"></div>
          <div>激素水平</div>
        </div>
        <div class="svg">
          <svg :width="windowWidth*220" :height="windowWidth*220">
            <circle :cx="windowWidth*110" :cy="windowWidth*110" :r="windowWidth*104" stroke="#eee" :stroke-width="windowWidth*12" fill="none"/>
            <circle :cx="windowWidth*110" :cy="windowWidth*110" :r="windowWidth*104" stroke="#1AA99D" :stroke-width="windowWidth*12" stroke-linecap="round" :stroke-dasharray="windowWidth*653.12" :stroke-dashoffset="windowWidth*653.12*((100-reportF106)/100)" fill="none" class="svgCircle" :transform= "'rotate(-90 '+windowWidth*110+' '+windowWidth*110+')'"/>
          </svg>
          <div class="svgText">
            {{reportF106}}
          </div>
        </div>
        <div class="text" style="text-align: center;">
          总分
        </div>
        <div class="more" v-for="item in reportJSMS" :key="item.key">
          <span @click="routeToNjEntry('激素水平', item.content)">查看更多></span>
        </div>
        <div class="bottom">
            <div class="line"></div>
            <div>金姆健康</div>
            <div class="line"></div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import DivHyperlink from './DivHyperlink' // a标签超链接模块
export default {
  name: 'njhealthyskin',
  props: ['reportQX', 'reportQXMS', 'reportMB', 'reportMBMS', 'reportF101', 'reportF102', 'reportFKMS', 'reportF106', 'reportJSMS', 'reportYJMS'],
  data () {
    return {
    }
  },
  mounted () {
  },
  destroyed () {
  },
  computed: {
    windowWidth () {
      // 根据屏幕宽度算出单位比列
      return this.$store.state.windowWidth / 750
    }
  },
  methods: {
    routeToNjEntry (title, content) {
      const t = this
      t.$route.query.title = title
      t.$store.state.content = content
      t.$router.push({name: 'njcontent', query: t.$route.query}) // 跳转女性健康完整页
    }
  },
  components: {
    DivHyperlink
  }
}
</script>

<style scoped>
  .njHealthySkin {
  }
  .mainbg {
    padding: 0 calc(100vw/750*30);
    padding: 0 -moz-calc(100vw/750*30);
    padding: 0 -webkit-calc(100vw/750*30);
    padding-bottom: calc(100vw/750*151);
    padding-bottom: -moz-calc(100vw/750*151);
    padding-bottom: -webkit-calc(100vw/750*151);
  }
  .mainbg .item {
    margin-top: calc(100vw/1080*61);
    margin-top: -moz-calc(100vw/1080*61);
    margin-top: -webkit-calc(100vw/1080*61);
    box-shadow: 0px 0px calc(100vw/1080*80) rgba(2, 160, 172, 0.4);
    box-shadow: 0px 0px -moz-calc(100vw/1080*80) rgba(2, 160, 172, 0.4);
    box-shadow: 0px 0px -webkit-calc(100vw/1080*80) rgba(2, 160, 172, 0.4);
    border-radius: calc(100vw/750*10);
    border-radius: -moz-calc(100vw/750*10);
    border-radius: -webkit-calc(100vw/750*10);
    padding: 0 calc(100vw/750*20);
    padding: 0 -moz-calc(100vw/750*20);
    padding: 0 -webkit-calc(100vw/750*20);
    padding-top: calc(100vw/750*34);
    padding-top: -moz-calc(100vw/750*34);
    padding-top: -webkit-calc(100vw/750*34);
    padding-bottom: calc(100vw/750*131);
    padding-bottom: -moz-calc(100vw/750*131);
    padding-bottom: -webkit-calc(100vw/750*131);
    background-color: #fff;
    position: relative;
  }
  .mainbg .item+.item {
    margin-top: calc(-100vw/750*131);
    margin-top: -moz-calc(-100vw/750*131);
    margin-top: -webkit-calc(-100vw/750*131);
  }
  .mainbg .item .title {
    font-size: calc(100vw/750*36);
    font-size: -moz-calc(100vw/750*36);
    font-size: -webkit-calc(100vw/750*36);
    line-height: calc(100vw/750*36);
    line-height: -moz-calc(100vw/750*36);
    line-height: -webkit-calc(100vw/750*36);
    font-weight: 600;
    display: flex;
    align-items: center;
    padding-bottom: calc(100vw/750*31);
    padding-bottom: -moz-calc(100vw/750*31);
    padding-bottom: -webkit-calc(100vw/750*31);
  }
  .mainbg .item .title .left {
    display: inline-block;
    width: calc(100vw/750*8);
    width: -moz-calc(100vw/750*8);
    width: -webkit-calc(100vw/750*8);
    height: calc(100vw/750*34);
    height: -moz-calc(100vw/750*34);
    height: -webkit-calc(100vw/750*34);
    border-radius: calc(100vw/750*4);
    border-radius: -moz-calc(100vw/750*4);
    border-radius: -webkit-calc(100vw/750*4);
    background-color: #1AA99D;
    margin-right: calc(100vw/750*17);
    margin-right: -moz-calc(100vw/750*17);
    margin-right: -webkit-calc(100vw/750*17);
  }
  .mainbg .item .rule {
    display: inline-block;
    width: calc(100vw/750*600);
    width: -moz-calc(100vw/750*600);
    width: -webkit-calc(100vw/750*600);
    padding: calc(100vw/750*50) 0;
    padding: -moz-calc(100vw/750*50) 0;
    padding: -webkit-calc(100vw/750*50) 0;
  }
  .mainbg .item .rule .value {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25%;
    height: calc(100vw/750*56);
    height: -moz-calc(100vw/750*56);
    height: -webkit-calc(100vw/750*56);
    background-color: #FCA31F;
    color: #fff;
    border-radius: calc(100vw/750*28);
    border-radius: -moz-calc(100vw/750*28);
    border-radius: -webkit-calc(100vw/750*28);
    font-size: calc(100vw/750*28);
    font-size: -moz-calc(100vw/750*28);
    font-size: -webkit-calc(100vw/750*28);
    position: relative;
    margin-bottom: calc(100vw/750*20);
    margin-bottom: -moz-calc(100vw/750*20);
    margin-bottom: -webkit-calc(100vw/750*20);
    margin-left: 25%;
  }
  .mainbg .item .rule .value .mid {
    position: absolute;
    bottom: calc(-100vw/750*16);
    bottom: -moz-calc(-100vw/750*16);
    bottom: -webkit-calc(-100vw/750*16);
    left: calc(50% - 100vw/750*9);
    left: -moz-calc(50% - 100vw/750*9);
    left: -webkit-calc(50% - 100vw/750*9);
    display: inline-block;
    width: 0;
    height: 0;
    border-left: calc(100vw/750*9) solid transparent;
    border-left: -moz-calc(100vw/750*9) solid transparent;
    border-left: -webkit-calc(100vw/750*9) solid transparent;
    border-right: calc(100vw/750*9) solid transparent;
    border-right: -moz-calc(100vw/750*9) solid transparent;
    border-right: -webkit-calc(100vw/750*9) solid transparent;
    border-top: calc(100vw/750*20) solid #FCA31F;
    border-top: -moz-calc(100vw/750*20) solid #FCA31F;
    border-top: -webkit-calc(100vw/750*20) solid #FCA31F;
  }
  .mainbg .item .rule .bgColor {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
  .mainbg .item .rule .text {
    padding-top: calc(100vw/750*20);
    padding-top: -moz-calc(100vw/750*20);
    padding-top: -webkit-calc(100vw/750*20);
  }
  .mainbg .item .rule .bgColor .i {
    width: 25%;
    height: calc(100vw/750*42);
    height: -moz-calc(100vw/750*42);
    height: -webkit-calc(100vw/750*42);
    text-align: center;
    font-size: calc(100vw/750*30);
    font-size: -moz-calc(100vw/750*30);
    font-size: -webkit-calc(100vw/750*30);
  }
  .mainbg .item .rule .bgColor .i:first-child {
    border-top-left-radius: calc(100vw/750*8);
    border-top-left-radius: -moz-calc(100vw/750*8);
    border-top-left-radius: -webkit-calc(100vw/750*8);
    border-bottom-left-radius: calc(100vw/750*8);
    border-bottom-left-radius: -moz-calc(100vw/750*8);
    border-bottom-left-radius: -webkit-calc(100vw/750*8);
  }
  .mainbg .item .rule .bgColor .i:last-child {
    border-top-right-radius: calc(100vw/750*8);
    border-top-right-radius: -moz-calc(100vw/750*8);
    border-top-right-radius: -webkit-calc(100vw/750*8);
    border-bottom-right-radius: calc(100vw/750*8);
    border-bottom-right-radius: -moz-calc(100vw/750*8);
    border-bottom-right-radius: -webkit-calc(100vw/750*8);
  }
  .mainbg .item .text {
    font-size: calc(100vw/750*28);
    font-size: -moz-calc(100vw/750*28);
    font-size: -webkit-calc(100vw/750*28);
  }
  .mainbg .item .text span {
    color: #1AA99D;
    font-size:  calc(100vw/750*34);
    font-size:  -moz-calc(100vw/750*34);
    font-size:  -webkit-calc(100vw/750*34);
    font-weight: 600;
  }
  .mainbg .item .more {
    font-size: calc(100vw/750*24);
    font-size: -moz-calc(100vw/750*24);
    font-size: -webkit-calc(100vw/750*24);
    color: #1AA99D;
    text-align: right;
    padding-bottom: calc(100vw/750*59);
    padding-bottom: -moz-calc(100vw/750*59);
    padding-bottom: -webkit-calc(100vw/750*59);
  }
  .mainbg .item .bottom {
    position: absolute;
    bottom: calc(100vw/750*43);
    bottom: -moz-calc(100vw/750*43);
    bottom: -webkit-calc(100vw/750*43);
    left: 0;
    right: 0;
    z-index: 2;
    display: none;
    justify-content: center;
    align-items: center;
    color: #1AA99D;
    font-size: calc(100vw/750*20);
    font-size: -moz-calc(100vw/750*20);
    font-size: -webkit-calc(100vw/750*20);
  }
  .mainbg .item:last-child .bottom {
    display: flex;
  }
  .mainbg .item .bottom .line {
    width: calc(100vw/750*47);
    width: -moz-calc(100vw/750*47);
    width: -webkit-calc(100vw/750*47);
    margin: 0 calc(100vw/750*8);
    margin: 0 -moz-calc(100vw/750*8);
    margin: 0 -webkit-calc(100vw/750*8);
    height: 1px;
    background-color: #1AA99D;
  }
  .mainbg .item .svg {
    text-align: center;
    margin-bottom: calc(100vw/750*30);
    margin-bottom: -moz-calc(100vw/750*30);
    margin-bottom: -webkit-calc(100vw/750*30);
    position: relative;
  }
  .mainbg .item .svg .svgText {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: calc(100vw/750*100);
    font-size: -moz-calc(100vw/750*100);
    font-size: -webkit-calc(100vw/750*100);
    font-weight: 600;
  }
</style>
