<template>
  <div class="ccDetails">
    <div class="title">
      <div class="line"></div>
      <div class="text">经络解读</div>
      <div class="line"></div>
    </div>
    <div class="main">
      <div class="item" v-for="(item, index) in explains" :key="index">
        <div class="name" v-if="strength.length>0" @click="newEntryPush(strength[index].key)">
          <div>{{strength[index].label}}</div>
          <div class="img" v-for="i in strength[index].highNumber" :key="i">
            <img src="../assets/android/report_icon_meridian_high.svg" alt="">
          </div>
          <div class="img" v-for="i in strength[index].lowNumber" :key="i">
            <img src="../assets/android/report_icon_meridian_low.svg" alt="">
          </div>
        </div>
        <div-hyperlink :content="item.content"></div-hyperlink>
      </div>
      <div class="item" v-for="(item, index) in reportTipsForWoman" :key="index">
        <div-hyperlink :content="item.content"></div-hyperlink>
      </div>
      <div class="attention" v-for="item in notices" :key="item.key">
        <div class="img">
          <img src="../assets/android/report_icon_cc_tip.svg" alt="">
        </div>
        <div-hyperlink :content="item.content"></div-hyperlink>
      </div>
    </div>
  </div>
</template>

<script>
import DivHyperlink from './DivHyperlink' // a标签超链接模块
export default {
  name: 'ccdetails',
  props: ['strength', 'explains', 'notices', 'reportTipsForWoman'],
  data () {
    return {
    }
  },
  mounted () {
  },
  destroyed () {
  },
  methods: {
    newEntryPush (key) {
      this.$store.dispatch('newEntryPush', key)
    }
  },
  components: {
    DivHyperlink
  }
}
</script>

<style scoped>
  .ccDetails {
  }
  .ccDetails .title {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: calc(100vw/1080*28);
    padding-bottom: -moz-calc(100vw/1080*28);
    padding-bottom: -webkit-calc(100vw/1080*28);
  }
  .ccDetails .title .text {
    color: #1AA99D;
    font-size: calc(100vw/1080*46);
    font-size: -moz-calc(100vw/1080*46);
    font-size: -webkit-calc(100vw/1080*46);
    margin: 0 calc(100vw/1080*25);
    margin: 0 -moz-calc(100vw/1080*25);
    margin: 0 -webkit-calc(100vw/1080*25);
  }
  .ccDetails .title .line {
    height: 1px;
    background-color: #1AA99D;
    width: calc(100vw/1080*268);
    width: -moz-calc(100vw/1080*268);
    width: -webkit-calc(100vw/1080*268);
  }
  .main {
    padding: 0 calc(100vw/750*24);
    padding: 0 -moz-calc(100vw/750*24);
    padding: 0 -webkit-calc(100vw/750*24);
  }
  .item+.item {
    border-top: 1px solid #ccc;
  }
  .item .name {
    color: #1AA99D;
    font-size: calc(100vw/750*36);
    font-size: -moz-calc(100vw/750*36);
    font-size: -webkit-calc(100vw/750*36);
    line-height: calc(100vw/750*36);
    line-height: -moz-calc(100vw/750*36);
    line-height: -webkit-calc(100vw/750*36);
    display: flex;
    align-items: center;
    font-weight: 400;
    padding-top: calc(100vw/750*27);
    padding-top: -moz-calc(100vw/750*27);
    padding-top: -webkit-calc(100vw/750*27);
  }
  .item .name .img {
    display: inline-block;
    width: calc(100vw/750*30);
    width: -moz-calc(100vw/750*30);
    width: -webkit-calc(100vw/750*30);
    height: calc(100vw/750*30);
    height: -moz-calc(100vw/750*30);
    height: -webkit-calc(100vw/750*30);
    padding-left: calc(100vw/750*19);
    padding-left: -moz-calc(100vw/750*19);
    padding-left: -webkit-calc(100vw/750*19);
  }
  .main .item .text {
    padding: calc(100vw/750*27) 0;
    padding: -moz-calc(100vw/750*27) 0;
    padding: -webkit-calc(100vw/750*27) 0;
    font-size: calc(100vw/750*28);
    font-size: -moz-calc(100vw/750*28);
    font-size: -webkit-calc(100vw/750*28);
    line-height: calc(100vw/750*40);
    line-height: -moz-calc(100vw/750*40);
    line-height: -webkit-calc(100vw/750*40);
  }
  .item .text a{
    color: #1AA99D;
  }
  .item+.attention {
    border-top: 1px dashed #bfbfbf;
    padding-top: calc(100vw/750*37);
    padding-top: -moz-calc(100vw/750*37);
    padding-top: -webkit-calc(100vw/750*37);
  }
  .attention {
    padding-bottom: calc(100vw/750*37);
    padding-bottom: -moz-calc(100vw/750*37);
    padding-bottom: -webkit-calc(100vw/750*37);
    display: flex;
    align-items: flex-start;
  }
  .attention .img {
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
  .attention .text {
    display: inline-block;
    width: calc(100vw/750*576);
    width: -moz-calc(100vw/750*576);
    width: -webkit-calc(100vw/750*576);
    text-align: left;
    font-size: calc(100vw/750*24);
    font-size: -moz-calc(100vw/750*24);
    font-size: -webkit-calc(100vw/750*24);
    line-height: calc(100vw/750*40);
    line-height: -moz-calc(100vw/750*40);
    line-height: -webkit-calc(100vw/750*40);
  }
</style>
