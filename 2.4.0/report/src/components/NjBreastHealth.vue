<template>
  <div class="njBreastHealth">
    <div class="mainbg">
      <div class="item" v-if="reportM3!==null">
        <div class="title">
          <div class="left"></div>
          <div>乳腺健康</div>
        </div>
        <div class="text">
          您的乳腺健康情况为：
        </div>
        <div style="text-align: center;">
        <div class="rule">
          <div class="value" :style="{marginLeft: reportM3>=9?'75%':reportM3>=6?'50%':reportM3>=3?'25%':'0', backgroundColor: reportM3>=9?'#F45437':reportM3>=6?'#F87F33':reportM3>=3?'#FCA31F':'#FFBD00'}">
            <div>{{reportM3>=9?'很差':reportM3>=6?'较差':reportM3>=3?'一般':'良好'}}</div>
            <div class="mid" :style="{borderTopColor: reportM3>=9?'#F45437':reportM3>=6?'#F87F33':reportM3>=3?'#FCA31F':'#FFBD00'}"></div>
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
        <div v-for="item in reportRXMS" :key="item.key">
        <div class="text">
          <div-hyperlink :content="item.content.slice(0, 150)+'...'"></div-hyperlink>
        </div>
        <div class="more">
          <span  @click="routeToNjEntry('乳腺健康', item.content)">查看更多></span>
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
          <div>乳腺癌/卵巢癌风险</div>
        </div>
        <div class="text">
          您的乳腺癌/卵巢癌风险情况为：
        </div>
        <div style="text-align: center;">
        <div class="rule">
          <div class="value" v-if="reportBC.length===0" style="marginLeft: 0; backgroundColor: #FFBD00">
            <div>较低</div>
            <div class="mid" style="borderTopColor: #FFBD00"></div>
          </div>
          <div v-for="item in reportBC" :key="item.key">
          <div class="value" v-if="item.key==='BC0004.0'" style="marginLeft: 0; backgroundColor: #FFBD00">
            <div>较低</div>
            <div class="mid" style="borderTopColor: #FFBD00"></div>
          </div>
          <div class="value" v-if="item.key==='BC0003.0'" style="marginLeft: 0; backgroundColor: #FFBD00">
            <div>较低</div>
            <div class="mid" style="borderTopColor: #FFBD00"></div>
          </div>
          <!-- 保留代码块 -->
          <!-- <div class="value" v-if="item.key==='BC0003.0'" style="marginLeft: 25%; backgroundColor: #FCA31F">
            <div>轻度</div>
            <div class="mid" style="borderTopColor: #FCA31F"></div>
          </div> -->
          <div class="value" v-if="item.key==='BC0002.0'" style="marginLeft: 50%; backgroundColor: #F87F33">
            <div>中度</div>
            <div class="mid" style="borderTopColor: #F87F33"></div>
          </div>
          <div class="value" v-if="item.key==='BC0001.0'" style="marginLeft: 75%; backgroundColor: #F45437">
            <div>重度</div>
            <div class="mid" style="borderTopColor: #F45437"></div>
          </div>
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
            <div class="i">重度</div>
          </div>
        </div>
        </div>
        <div v-for="item in reportBCMS" :key="item.key">
        <div class="text">
          <div-hyperlink :content="item.content.slice(0, 150)+'...'"></div-hyperlink>
        </div>
        <div class="more">
          <span @click="routeToNjEntry('乳腺癌/卵巢癌风险', item.content)">查看更多></span>
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
  name: 'njbreasthealth',
  props: ['reportM3', 'reportRXMS', 'reportBC', 'reportBCMS'],
  data () {
    return {
    }
  },
  mounted () {
  },
  destroyed () {
  },
  computed: {
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
  .njBreastHealth {
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
    padding-bottom: calc(100vw/750*30);
    padding-bottom: -moz-calc(100vw/750*30);
    padding-bottom: -webkit-calc(100vw/750*30);
  }
  .mainbg .item .svg .svgText {
    font-size: calc(100vw/750*100);
    font-size: -moz-calc(100vw/750*100);
    font-size: -webkit-calc(100vw/750*100);
    font-weight: 600;
  }
</style>
