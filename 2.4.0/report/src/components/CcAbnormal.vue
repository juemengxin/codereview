<template>
  <div class="ccAbnormal" v-if="ccAbnormals.length>0">
    <div class="abnormalNumber">你有<span class="bigNumber">{{ccAbnormals.length}}</span>条经络状况出现异常</div>
    <div class="ccItem" v-for="(item, index) in ccAbnormals" :key="index">
      <div class="text">
        {{ccNames[item]}}
      </div>
      <div class="img">
        <img src="../assets/android/reporting_home_icon_cc_exception.svg" alt="">
      </div>
    </div>
    <div class="line"></div>
  </div>
</template>

<script>
export default {
  name: 'ccabnormal', // 异常经络模块
  props: ['ccItems'],
  data () {
    return {
      ccNames: ['心包经', '肝经', '肾经', '脾经', '肺经', '胃经', '胆经', '膀胱经'], // 经络名
      ccAbnormals: [] // 异常经络索引
    }
  },
  mounted () {
    const t = this
    t.ccItems.forEach((element, index) => {
      if (element > 20 || element < -20) {
        t.ccAbnormals.push(index)
      }
    })
  },
  watch: {
    ccItems () {
      const t = this
      t.ccItems.forEach((element, index) => {
        if (element > 20 || element < -20) {
          t.ccAbnormals.push(index)
        }
      })
    }
  },
  destroyed () {
  },
  methods: {
  }
}
</script>

<style scoped>
  .ccAbnormal {
  }
  .abnormalNumber {
    font-size: calc(100vw/1080*46);
    font-size: -moz-calc(100vw/1080*46);
    font-size: -webkit-calc(100vw/1080*46);
    line-height: calc(100vw/1080*86);
    line-height: -moz-calc(100vw/1080*86);
    line-height: -webkit-calc(100vw/1080*86);
    color: #CF9155;
    padding-bottom: calc(100vw/1080*60);
    padding-bottom: -moz-calc(100vw/1080*60);
    padding-bottom: -webkit-calc(100vw/1080*60);
  }
  .bigNumber {
    font-size: calc(100vw/1080*86);
    font-size: -moz-calc(100vw/1080*86);
    font-size: -webkit-calc(100vw/1080*86);
    color: #C73E3A;
    font-weight: 700;
    padding-left: calc(100vw/1080*23);
    padding-left: -moz-calc(100vw/1080*23);
    padding-left: -webkit-calc(100vw/1080*23);
    padding-right: calc(100vw/1080*46);
    padding-right: -moz-calc(100vw/1080*46);
    padding-right: -webkit-calc(100vw/1080*46);
  }
  .ccItem{
    display: inline-block;
    margin: calc(100vw/1080*20) calc(100vw/1080*55);
    margin: -moz-calc(100vw/1080*20) -moz-calc(100vw/1080*55);
    margin: -webkit-calc(100vw/1080*20) -webkit-calc(100vw/1080*55);
    position: relative;
  }
  .ccItem .text{
    display: inline-block;
    color: #CF9155;
    border: 1px solid #CF9155;
    font-size: calc(100vw/1080*46);
    font-size: -moz-calc(100vw/1080*46);
    font-size: -webkit-calc(100vw/1080*46);
    line-height: calc(100vw/1080*46);
    line-height: -moz-calc(100vw/1080*46);
    line-height: -webkit-calc(100vw/1080*46);
    width: calc(100vw/1080*207);
    width: -moz-calc(100vw/1080*207);
    width: -webkit-calc(100vw/1080*207);
    padding: calc(100vw/1080*16) 0;
    padding: -moz-calc(100vw/1080*16) 0;
    padding: -webkit-calc(100vw/1080*16) 0;
    margin-top: calc(100vw/1080*32);
    margin-top: -moz-calc(100vw/1080*32);
    margin-top: -webkit-calc(100vw/1080*32);
    margin-right: calc(100vw/1080*81);
    margin-right: -moz-calc(100vw/1080*81);
    margin-right: -webkit-calc(100vw/1080*81);
    border-radius: calc(100vw/1080*38);
    border-radius: -moz-calc(100vw/1080*38);
    border-radius: -webkit-calc(100vw/1080*38);
  }
  .ccItem .img {
    display: inline-block;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 2;
    width: calc(100vw/1080*125);
    width: -moz-calc(100vw/1080*125);
    width: -webkit-calc(100vw/1080*125);
    height: calc(100vw/1080*101);
    height: -moz-calc(100vw/1080*101);
    height: -webkit-calc(100vw/1080*101);
  }
  .line{
    height: 1px;
    background-image: linear-gradient(to right, #999 0%, #999 50%, transparent 50%);
    background-size: 5px 1px;
    background-repeat: repeat-x;
    margin-top: calc(100vw/1080*80);
    margin-top: -moz-calc(100vw/1080*80);
    margin-top: -webkit-calc(100vw/1080*80);
    margin-bottom:  calc(100vw/1080*58);
    margin-bottom:  -moz-calc(100vw/1080*58);
    margin-bottom:  -webkit-calc(100vw/1080*58);
    display: inline-block;
    width: calc(100vw/1080*914);
    width: -moz-calc(100vw/1080*914);
    width: -webkit-calc(100vw/1080*914);
  }
</style>
