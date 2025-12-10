<template>
  <div class="updateRemark">
    <div class="textarea">
      <div class="div">
        <textarea name="remark" v-model="remark"></textarea>
        <span>{{100-remark.length}}</span>
      </div>
    </div>
    <div class="btns">
      <div class="btn" @click="updateRemark(false)" :style="{backgroundImage: 'url('+onImg+')'}"><img class="button" src="../assets/fonts/cancle.svg" alt=""></div>
      <div class="btn" @click="updateRemark(true)" :style="{backgroundImage: 'url('+offImg+')'}"><img class="button" src="../assets/fonts/done.svg" alt=""></div>
    </div>
  </div>
</template>

<script>
import onImg from '../assets/button.png'
import offImg from '../assets/button-m.png'
import {ApiOwner, ApiWx} from '../api' // api
export default {
  name: 'updateremark',
  data () {
    return {
      onImg,
      offImg,
      remark: '', // @type {string} 备注
      recordId: 0 // @type {integer} 测量流水号
    }
  },
  watch: {
    remark (val) {
      if (val.length > 100) {
        this.remark = this.remark.slice(0, 100)
      }
    }
  },
  mounted () {
    const t = this
    t.remark = t.$store.state.remark
    t.recordId = parseInt(t.$route.query.record_id) // 测量流水号
    // 通用修改title方法
    this.$store.dispatch('changeTitle', '备注')
    // APP获取H5路由
    t.$store.dispatch('invokeBridgeMethod', {
      name: 'interfaceMethod',
      data: 'updateremark'
    })
    t.$store.state.isLoading = false
  },
  destroyed () {
  },
  methods: {
    updateRemark (value) {
      const t = this
      if (value) {
        // 调用微信检测
        if (t.$store.state.isWx) {
          t.wxUpdateRemark()
        } else {
          t.$store.dispatch('getAppClientAuth').then((res) => {
            t.$store.state.authorization = res.data.authorization
            t.appUpdateRemark()
          })
        }
      } else {
        t.$router.go(-1)
      }
    },
    /**
    *
    *  金姆健康app 修改备注 TODO
    *
    */
    appUpdateRemark () {
      const t = this
      t.$store.state.isLoading = true
      const owner = new ApiOwner(t.$store.state.authorization, t.$store.state.xAccessToken)
      owner.updateRemark(
        t.recordId,
        t.$store.state.userId,
        t.remark
      ).then((res) => {
        t.$store.dispatch('popmsg', {
          msg: '保存成功'
        })
        t.$store.dispatch('invokeBridgeMethod', {
          name: 'updateRemark'
        })
        t.$router.go(-1)
      })
    },
    /**
    *
    *  微信 修改备注
    *
    */
    wxUpdateRemark () {
      const t = this
      t.$store.state.isLoading = true
      const wxApi = new ApiWx()
      wxApi.updateRemark(
        t.recordId,
        t.remark
      ).then((res) => {
        t.$store.dispatch('popmsg', {
          msg: '保存成功'
        })
        t.$router.go(-1)
      })
    }
  }
}
</script>

<style scoped>
  .updateRemark {
    text-align: center;
  }
  .textarea {
    padding-top: calc(100vw/750*55);
    padding-bottom: calc(100vw/750*103);
    position: relative;
  }
  .landscape .textarea {
    padding-top: calc(100vh/750*55);
    padding-bottom: calc(100vh/750*103);
  }
  .textarea .div {
    display: inline-block;
    border-radius: calc(100vw/750*10);
  }
  .landscape .textarea .div {
    border-radius: calc(100vh/750*10);
  }
  .textarea textarea {
    border: none;
    outline: none;
    resize: none;
    width: calc(100vw/750*689);
    height: calc(100vw/750*390);
    background-color: #E8E8E8;
    border-radius: calc(100vw/750*10);
    color: #CF9155;
    padding: calc(100vw/750*46) calc(100vw/750*39);
    box-sizing: border-box;
    font-size: calc(100vw/750*32);
    font-weight: 300;
  }
  .landscape .textarea textarea {
    width: calc(100vh/750*1249);
    height: calc(100vh/750*390);
    border-radius: calc(100vh/750*10);
    padding: calc(100vh/750*46) calc(100vh/750*39);
    font-size: calc(100vh/750*32);
  }
  .textarea span {
    position: absolute;
    bottom: calc(100vw/750*116);
    right: calc(100vw/750*55);
    font-size: calc(100vw/750*24);
    color: #999;
  }
  .landscape .textarea span {
    bottom: calc(100vh/750*116);
    right: calc(100vh/750*55);
    font-size: calc(100vh/750*24);
  }
  .btns {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .btn {
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vw/750*80);
    width: calc(100vw/750*296);
    font-size: calc(100vw/750*36);
    font-weight: 500;
    color: #fff;
    background-size: 100% 100%;
  }
  .landscape .btn {
    height: calc(100vh/750*80);
    width: calc(100vh/750*296);
    font-size: calc(100vh/750*36);
  }
  .btn + .btn {
    margin-left: calc(100vw/750*50);
  }
  .landscape .btn + .btn {
    margin-left: calc(100vh/750*50);
  }
  .btn .button {
    width: calc(39 / 375 * 100vw);
    margin: 0 auto;
  }
  .landscape .btn .button {
    width: calc(39 / 375 * 100vh);
  }
</style>
