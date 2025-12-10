<template>
  <div class="history">
    <div class="list" v-for="(item, index) in list" :key="index" @click="routeToQuestion(item.record_id, item.created_at)">
      <div class="item">
        <div class="top">
          <img class="img" src="../assets/img.png" alt="">
          <div class="right">
            <div class="text">
              <div class="date">{{moment(item.created_at).format('YYYY年MM月DD日 HH:mm:ss')}}</div>
              <div class="xinLv">心率：{{item.app_heart_rate}}</div>
              <div class="status">
                <img class="statusImg" src="../assets/android/wechat_icon_health.svg" alt="">
                <div v-if="item.tags.length > 0">
                  <span class="label" v-for="(tagitem, tagindex) in item.tags" :key="tagindex">
                    {{tagitem.label}}
                  </span>
                </div>
              <div v-else>无</div>
            </div>
          </div>
          <img class="rightIcon" src="../assets/android/wechat_icon_go.svg" alt="">
        </div>
      </div>
      <div class="border" v-if="item.remark!==''">
        <div class="details"
        :style="{whiteSpace: item.remarkopen?'pre-wrap':'nowrap'}">{{item.remark}}</div>
        <div class="corderImgContainer" @click.stop="open(index)">
          <img class="bottomIcon"
          src="../assets/android/wechat_icon_expand.svg"
          alt=""
          v-if="item.remark.length>27"
          :style="{transform: item.remarkopen?'rotate(180deg)':'rotate(0deg)'}">
        </div>
      </div>
      <div class="payed" v-if="item.has_paid">已付款</div>
    </div>
  </div>
</div>
</template>

<script>
import moment from 'moment' // 时间插件
import {ApiOwner, ApiWx} from '../api' // api
const wx = require('weixin-js-sdk') // 微信jisdk
export default {
  name: 'history', // 历史记录页面
  data () {
    return {
      moment, // @type{Object} 引入时间插件
      list: [], // @type{array} 历史记录列表数据
      start: '2018-10-29T08:33:02Z', // TODO 筛选起始时间 假数据
      end: '2018-11-29T08:33:02Z', // TODO 筛选结束时间 假数据
      offset: 0,
      size: 100
    }
  },
  watch: {
  },
  mounted () {
    const t = this
    t.$store.state.isLoading = true
    // 通用修改title方法
    t.$store.dispatch('changeTitle', '历史记录')
    // 调用微信检测
    if (t.$store.state.isWx) {
      t.getWXRecordHistory()
    } else {
      t.gitAppRecordHistory()
    }
    // APP获取H5路由
    t.$store.dispatch('invokeBridgeMethod', {
      name: 'interfaceMethod',
      data: 'history'
    })
  },
  destroyed () {
  },
  methods: {
    /**
    *
    *  微信回调config
    *
    */
    getJsSdkConfig () {
      const wxApi = new ApiWx()
      wxApi.getJsSdkConfig(
        window.location.href.split('#')[0]
      ).then((res) => {
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: res.data.app_id, // 必填，公众号的唯一标识
          timestamp: res.data.timestamp, // 必填，生成签名的时间戳
          nonceStr: res.data.noncestr, // 必填，生成签名的随机串
          signature: res.data.signature, // 必填，签名
          jsApiList: ['hideAllNonBaseMenuItem'] // 必填，需要使用的JS接口列表
        })
        wx.ready(() => {
          wx.hideAllNonBaseMenuItem()
        })
      })
    },
    /**
    *
    *  展开备注
    *
    *  @param {Number} index 索引
    */
    open (index) {
      const t = this
      t.list[index].remarkopen = !t.list[index].remarkopen
    },
    /**
    *
    *  跳转问题页面
    *
    *  @param {integer} recordid 测量流水号
    *  @param {string <date-time>} 分析报告时间
    */
    routeToQuestion (recordId, createdAt) {
      const t = this
      t.$router.push({name: 'analysisreport', query: {record_id: recordId}})
    },
    /**
    *
    *  获取金姆健康app历史记录
    *
    */
    gitAppRecordHistory () {
      const t = this
      // TODO 查看测量历史记录
      const owner = new ApiOwner(t.$store.state.authorization, t.$store.state.xAccessToken)
      owner.getRecordHistory(
        t.start,
        t.end,
        t.offset,
        t.size,
        t.$store.state.userId
      ).then((res) => {
        res.data.forEach((element) => {
          element.remarkopen = false // 添加 备注打开属性
        })
        t.list = res.data
        t.$store.state.isLoading = false
      })
    },
    /**
    *
    *  获取微信历史记录
    *
    */
    getWXRecordHistory () {
      const t = this
      // TODO 查看测量历史记录
      const wxApi = new ApiWx()
      wxApi.getRecordHistory().then((res) => {
        res.data.forEach((element) => {
          element.remarkopen = false // 添加 备注打开属性
        })
        t.list = res.data
        t.$store.state.isLoading = false
      })
    }
  }
}
</script>

<style lang="css" scoped>
.appTabbar {
  height: calc(100vw/1080*186);
  height: -moz-calc(100vw/1080*186);
  height: -webkit-calc(100vw/1080*186);
}
.history {
  padding: calc(100vw/375*20) calc(100vw/375*15);
  padding: -moz-calc(100vw/375*20) -moz-calc(100vw/375*15);
  padding: -webkit-calc(100vw/375*20) -webkit-calc(100vw/375*15);
}
.list {
  text-align: center;
  padding: calc(100vw/375*5) 0;
  padding: -moz-calc(100vw/375*5) 0;
  padding: -webkit-calc(100vw/375*5) 0;
}
.item {
  background-color: #fff;
  box-shadow: 0px 0px calc(100vw/375*25) rgba(2, 160, 172, 0.3);
  box-shadow: 0px 0px -moz-calc(100vw/375*25) rgba(2, 160, 172, 0.3);
  box-shadow: 0px 0px -webkit-calc(100vw/375*25) rgba(2, 160, 172, 0.3);
  border-radius: calc(100vw/375*5);
  border-radius: -moz-calc(100vw/375*5);
  border-radius: -webkit-calc(100vw/375*5);
  padding: 0 calc(100vw/375*10);
  padding: 0 -moz-calc(100vw/375*10);
  padding: 0 -webkit-calc(100vw/375*10);
  position: relative;
  overflow: hidden;
}
.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: calc(100vw/375*10) 0;
  padding: -moz-calc(100vw/375*10) 0;
  padding: -webkit-calc(100vw/375*10) 0;
}
.img {
  width: calc(100vw/375*65);
  width: -moz-calc(100vw/375*65);
  width: -webkit-calc(100vw/375*65);
  height: calc(100vw/375*65);
  height: -moz-calc(100vw/375*65);
  height: -webkit-calc(100vw/375*65);
  min-width: calc(100vw/375*65);
  min-width: -moz-calc(100vw/375*65);
  min-width: -webkit-calc(100vw/375*65);
  border-radius: calc(100vw/375*5);
  border-radius: -moz-calc(100vw/375*5);
  border-radius: -webkit-calc(100vw/375*5);
  margin-right: calc(100vw/375*16);
  margin-right: -moz-calc(100vw/375*16);
  margin-right: -webkit-calc(100vw/375*16);
}
.right {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.text {
  text-align: left;
}
.date {
  font-size: calc(100vw/375*12);
  font-size: -moz-calc(100vw/375*12);
  font-size: -webkit-calc(100vw/375*12);
  line-height: calc(100vw/375*12);
  line-height: -moz-calc(100vw/375*12);
  line-height: -webkit-calc(100vw/375*12);
  color: #999999;
}
.xinLv {
  font-size: calc(100vw/375*18);
  font-size: -moz-calc(100vw/375*18);
  font-size: -webkit-calc(100vw/375*18);
  line-height: calc(100vw/375*18);
  line-height: -moz-calc(100vw/375*18);
  line-height: -webkit-calc(100vw/375*18);
  color: #666666;
  padding: calc(100vw/375*16) 0;
  padding: -moz-calc(100vw/375*16) 0;
  padding: -webkit-calc(100vw/375*16) 0;
}
.status {
  font-size: calc(100vw/375*12);
  font-size: -moz-calc(100vw/375*12);
  font-size: -webkit-calc(100vw/375*12);
  line-height: calc(100vw/375*12);
  line-height: -moz-calc(100vw/375*12);
  line-height: -webkit-calc(100vw/375*12);
  color: #999999;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.border {
  font-size: calc(100vw/375*12);
  font-size: -moz-calc(100vw/375*12);
  font-size: -webkit-calc(100vw/375*12);
  color: #999999;
  border-top: 1px dashed #DDD;
  padding: calc(100vw/375*3) 0;
  padding: -moz-calc(100vw/375*3) 0;
  padding: -webkit-calc(100vw/375*3) 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  text-align: left;
}
.details {
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
}
.payed {
  background-color: #3ACDB2;
  color: #fff;
  display: inline-block;
  font-size: calc(100vw/375*10);
  font-size: -moz-calc(100vw/375*10);
  font-size: -webkit-calc(100vw/375*10);
  transform: rotate(45deg);
  padding: calc(100vw/375*20) calc(100vw/375*20) calc(100vw/375*2) calc(100vw/375*20);
  padding: -moz-calc(100vw/375*20) -moz-calc(100vw/375*20) -moz-calc(100vw/375*2) -moz-calc(100vw/375*20);
  padding: -webkit-calc(100vw/375*20) -webkit-calc(100vw/375*20) -webkit-calc(100vw/375*2) -webkit-calc(100vw/375*20);
  position: absolute;
  top: calc(-100vw/375*10);
  top: -moz-calc(-100vw/375*10);
  top: -webkit-calc(-100vw/375*10);
  right: calc(-100vw/375*28);
  right: -moz-calc(-100vw/375*28);
  right: -webkit-calc(-100vw/375*28);
  z-index: 3;
}
.statusImg {
  width: calc(100vw/375*11);
  width: -moz-calc(100vw/375*11);
  width: -webkit-calc(100vw/375*11);
  height: calc(100vw/375*12);
  height: -moz-calc(100vw/375*12);
  height: -webkit-calc(100vw/375*12);
  margin-right: calc(100vw/375*7);
  margin-right: -moz-calc(100vw/375*7);
  margin-right: -webkit-calc(100vw/375*7);
}
.label {
  margin-right: calc(100vw/375*5);
  margin-right: -moz-calc(100vw/375*5);
  margin-right: -webkit-calc(100vw/375*5);
}
.rightIcon {
  width: calc(100vw/375*7*1.3);
  width: -moz-calc(100vw/375*7*1.3);
  width: -webkit-calc(100vw/375*7*1.3);
  height: calc(100vw/375*12*1.3);
  height: -moz-calc(100vw/375*12*1.3);
  height: -webkit-calc(100vw/375*12*1.3);
}
.corderImgContainer {
  height: calc(100vw/375*17);
  height: -moz-calc(100vw/375*17);
  height: -webkit-calc(100vw/375*17);
  display: flex;
  align-items: center;
}
.bottomIcon {
  width: calc(100vw/375*12*1.3);
  width: -moz-calc(100vw/375*12*1.3);
  width: -webkit-calc(100vw/375*12*1.3);
  height: calc(100vw/375*7*1.3);
  height: -moz-calc(100vw/375*7*1.3);
  height: -webkit-calc(100vw/375*7*1.3);
  margin-left: calc(100vw/375*10);
  margin-left: -moz-calc(100vw/375*10);
  margin-left: -webkit-calc(100vw/375*10);
  transition: all 0.25s;
}
</style>
