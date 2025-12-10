<template>
  <div class="njReproductiveHealth">
    <div class="mainbg">
      <div class="item">
        <div class="title">
          <div class="left"></div>
          <div>子宫健康</div>
        </div>
        <div class="attention" v-for="item in reportZGTS" :key="item.key">
          <div class="img">
            <img src="../assets/android/report_icon_cc_tip.svg" alt="">
          </div>
          <div class="text">
            <span>子宫健康注意事项：</span><span class="span"><div-hyperlink :content="item.content"></div-hyperlink></span>
          </div>
        </div>
        <div class="text">
          您的子宫健康情况为：
        </div>
        <div style="text-align: center;">
        <div class="rule">
          <div class="value" :style="{marginLeft: reportF100>=91?'0':reportF100>=77?'25%':reportF100>=61?'50%':'75%', backgroundColor: reportF100>=91?'#FFBD00':reportF100>=77?'#FCA31F':reportF100>=61?'#F87F33':'#F45437'}">
            <div>{{reportF100>=91?'良好':reportF100>=77?'一般':reportF100>=61?'较差':'很差'}}</div>
            <div class="mid" :style="{borderTopColor: reportF100>=91?'#FFBD00':reportF100>=77?'#FCA31F':reportF100>=61?'#F87F33':'#F45437'}"></div>
          </div>
          <div class="bgColor">
            <div class="i" style="background-color: #FFBD00;"></div>
            <div class="i" style="background-color: #FCA31F;"></div>
            <div class="i" style="background-color: #F87F33;"></div>
            <div class="i" style="background-color: #F45437;"></div>
          </div>
          <div class="bgColor text">
            <div class="i">良好</div>
            <div class="i">一般</div>
            <div class="i">较差</div>
            <div class="i">很差</div>
          </div>
        </div>
        </div>
        <div v-for="item in reportZGMS" :key="item.key">
        <div class="text">
          <div-hyperlink :content="item.content.slice(0, 150)+'...'"></div-hyperlink>
        </div>
        <div class="more">
          <span @click="routeToNjEntry('子宫健康', item.content)">查看更多></span>
        </div>
        </div>
        <div class="bottom">
            <div class="line"></div>
            <div>金姆健康</div>
            <div class="line"></div>
          </div>
      </div>
      <div class="item" v-if="reportM0!==null">
        <div class="title">
          <div class="left"></div>
          <div>月经（天癸）健康</div>
        </div>
        <div class="text">
          您的月经健康情况为：
        </div>
        <div style="text-align: center;">
        <div class="rule">
          <div class="value" :style="{marginLeft: reportM0>=4?'0':reportM0>=3?'25%':reportM0>=2?'50%':'75%',backgroundColor: reportM0>=4?'#FFBD00':reportM0>=3?'#FCA31F':reportM0>=2?'#F87F33':'#F45437'}">
            <div>{{reportM0>=4?'良好':reportM0>=3?'一般':reportM0>=2?'较差':'很差'}}</div>
            <div class="mid" :style="{borderTopColor: reportM0>=4?'#FFBD00':reportM0>=3?'#FCA31F':reportM0>=2?'#F87F33':'#F45437'}"></div>
          </div>
          <div class="bgColor">
            <div class="i" style="background-color: #FFBD00;"></div>
            <div class="i" style="background-color: #FCA31F;"></div>
            <div class="i" style="background-color: #F87F33;"></div>
            <div class="i" style="background-color: #F45437;"></div>
          </div>
          <div class="bgColor text">
            <div class="i">良好</div>
            <div class="i">一般</div>
            <div class="i">较差</div>
            <div class="i">很差</div>
          </div>
        </div>
        </div>
        <div class="bottom">
            <div class="line"></div>
            <div>金姆健康</div>
            <div class="line"></div>
          </div>
      </div>
      <div class="item" v-if="reportM1!==null">
        <div class="title">
          <div class="left"></div>
          <div>月经不调</div>
        </div>
        <div class="text">
          您的月经不调情况为：
        </div>
        <div style="text-align: center;">
        <div class="rule">
          <div class="value j" :style="{marginLeft: reportM1>=3?'66.66%':reportM1>=2?'33.33%':'0%', backgroundColor: reportM1>=3?'#F45437':reportM1>=2?'#F87F33':'#FCA31F'}">
            <div>{{reportM1>=3?'重度':reportM1>=2?'中度':'轻度'}}</div>
            <div class="mid" :style="{borderTopColor: reportM1>=3?'#F45437':reportM1>=2?'#F87F33':'#FCA31F'}"></div>
          </div>
          <div class="bgColor">
            <div class="i j" style="background-color: #FFBD00;"></div>
            <div class="i j" style="background-color: #F87F33;"></div>
            <div class="i j" style="background-color: #F45437;"></div>
          </div>
          <div class="bgColor text">
            <div class="i j">轻度</div>
            <div class="i j">中度</div>
            <div class="i j">重度</div>
          </div>
        </div>
        </div>
        <div v-for="item in reportYJMS" :key="item.key" v-if="item.key==='YJMS0001.0'">
        <div class="text">
          <div-hyperlink :content="item.content.slice(0, 150)+'...'"></div-hyperlink>
        </div>
        <div class="more">
          <span @click="routeToNjEntry('月经不调', item.content)">查看更多></span>
        </div>
        </div>
        <div class="bottom">
            <div class="line"></div>
            <div>金姆健康</div>
            <div class="line"></div>
          </div>
      </div>
      <div class="item" v-if="reportM2!==null">
        <div class="title">
          <div class="left"></div>
          <div>痛经</div>
        </div>
        <div class="text">
          您的痛经指数为：
        </div>
        <div style="text-align: center;">
        <div class="rule">
          <div class="value j" :style="{marginLeft: reportM2>=5?'66.66%':reportM2>=2?'33.33%':'0', backgroundColor: reportM2>=5?'#F45437':reportM2>=2?'#F87F33':'#FCA31F'}">
            <div>{{reportM2>=5?'较高':reportM2>=2?'偏高':'较低'}}</div>
            <div class="mid" :style="{borderTopColor: reportM2>=5?'#F45437':reportM2>=2?'#F87F33':'#FCA31F'}"></div>
          </div>
          <div class="bgColor">
            <div class="i j" style="background-color: #FFBD00;"></div>
            <div class="i j" style="background-color: #F87F33;"></div>
            <div class="i j" style="background-color: #F45437;"></div>
          </div>
          <div class="bgColor text">
            <div class="i j">较低</div>
            <div class="i j">偏高</div>
            <div class="i j">较高</div>
          </div>
        </div>
        </div>
        <div v-for="item in reportYJMS" :key="item.key" v-if="item.key==='YJMS0002.0'">
        <div class="text">
          <div-hyperlink :content="item.content.slice(0, 150)+'...'"></div-hyperlink>
        </div>
        <div class="more">
          <span @click="routeToNjEntry('痛经', item.content)">查看更多></span>
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
          <div>生殖年龄</div>
        </div>
        <div class="svg">
          <svg :width="windowWidth*220" :height="windowWidth*220">
            <circle :cx="windowWidth*110" :cy="windowWidth*110" :r="windowWidth*104" stroke="#eee" :stroke-width="windowWidth*12" fill="none"/>
            <circle :cx="windowWidth*110" :cy="windowWidth*110" :r="windowWidth*104" stroke="#1AA99D" :stroke-width="windowWidth*12" stroke-linecap="round" :stroke-dasharray="windowWidth*653.12" :stroke-dashoffset="windowWidth*653.12*((100-reportF105)/100)" fill="none" class="svgCircle" :transform= "'rotate(-90 '+windowWidth*110+' '+windowWidth*110+')'"/>
          </svg>
          <div class="svgText">
            {{reportF105}}
          </div>
        </div>
        <div class="text" v-for="item in reportSZTS" :key="item.key">
          <div-hyperlink :content="'注：'+item.content"></div-hyperlink>
        </div>
        <div class="more">
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
          <div>淋巴健康</div>
        </div>
        <div class="text">
          您的淋巴健康情况为：
        </div>
        <div style="text-align: center;">
        <div class="rule">
          <div class="value" :style="{marginLeft: reportF107>90?'0':reportF107>70?'25%':reportF107>50?'50%':'75%', backgroundColor: reportF107>90?'#FFBD00':reportF107>70?'#FCA31F':reportF107>50?'#F87F33':'#F45437'}">
            <div>{{reportF107>90?'尚可':reportF107>70?'一般':reportF107>50?'较差':'很差'}}</div>
            <div class="mid" :style="{borderTopColor: reportF107>90?'#FFBD00':reportF107>70?'#FCA31F':reportF107>50?'#F87F33':'#F45437'}"></div>
          </div>
          <div class="bgColor">
            <div class="i" style="background-color: #FFBD00;"></div>
            <div class="i" style="background-color: #FCA31F;"></div>
            <div class="i" style="background-color: #F87F33;"></div>
            <div class="i" style="background-color: #F45437;"></div>
          </div>
          <div class="bgColor text">
            <div class="i">尚可</div>
            <div class="i">一般</div>
            <div class="i">较差</div>
            <div class="i">很差</div>
          </div>
        </div>
        </div>
        <div v-for="item in reportLBMS" :key="item.key">
        <div class="text">
          <div-hyperlink :content="item.content.slice(0, 150)+'...'"></div-hyperlink>
        </div>
        <div class="more">
          <span  @click="routeToNjEntry('淋巴健康', item.content)">查看更多></span>
        </div>
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
  name: 'njreproductivehealth',
  props: ['reportF100', 'reportZGTS', 'reportZGMS', 'reportM0', 'reportYJMS', 'reportM1', 'reportM2', 'reportF105', 'reportSZTS', 'reportF107', 'reportLBMS'],
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
  .njReproductiveHealth {
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
  .mainbg .item .rule .j {
    width: 33.33%;
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
  .mainbg .item .rule .bgColor .j {
    width: 33.33%;
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
  .mainbg .item .attention {
    padding-bottom: calc(100vw/750*37);
    padding-bottom: -moz-calc(100vw/750*37);
    padding-bottom: -webkit-calc(100vw/750*37);
    display: flex;
    align-items: flex-start;
  }
  .mainbg .item .attention .img {
    display: inline-block;
    width: calc(100vw/750*30);
    width: -moz-calc(100vw/750*30);
    width: -webkit-calc(100vw/750*30);
    height: calc(100vw/750*30);
    height: -moz-calc(100vw/750*30);
    height: -webkit-calc(100vw/750*30);
    padding-top: calc(100vw/750*4);
    padding-top: -moz-calc(100vw/750*4);
    padding-top: -webkit-calc(100vw/750*4);
    padding-right: calc(100vw/750*10);
    padding-right: -moz-calc(100vw/750*10);
    padding-right: -webkit-calc(100vw/750*10);
  }
  .mainbg .item .attention .text {
    color: #1AA99D;
    display: inline-block;
    width: calc(100vw/750*576);
    width: -moz-calc(100vw/750*576);
    width: -webkit-calc(100vw/750*576);
    text-align: left;
    font-size: calc(100vw/750*26);
    font-size: -moz-calc(100vw/750*26);
    font-size: -webkit-calc(100vw/750*26);
    line-height: calc(100vw/750*40);
    line-height: -moz-calc(100vw/750*40);
    line-height: -webkit-calc(100vw/750*40);
  }
  .mainbg .item .attention .text .span {
    font-size: calc(100vw/750*26);
    font-size: -moz-calc(100vw/750*26);
    font-size: -webkit-calc(100vw/750*26);
    font-weight: 300;
  }
  .mainbg .item .attention .text span {
    font-size: calc(100vw/750*28);
    font-size: -moz-calc(100vw/750*28);
    font-size: -webkit-calc(100vw/750*28);
  }
</style>
