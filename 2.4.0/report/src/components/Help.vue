<template>
  <div>
    <div class="help">
      <div class="list">
        <div class="item" v-for="(item, index) in $store.state.landscape ? Math.ceil(list.length/4) : Math.ceil(list.length/3)" :key="index" :style="{left: selectId*windowWidth+movelength+index*windowWidth+'px', transition: itemtransition?'all 0.25s':'none'}" @touchstart="itemtouchstart" @touchmove="itemtouchmove" @touchend="itemtouchend">
          <div class="info">
            <div class="item_in" v-for="(item1, index1) in $store.state.landscape ? list.slice(index*4, (index+1)*4) : list.slice(index*3, (index+1)*3)" :key="index1" @click="routetToInfo(item1)">
              <div class="img_in"><img :src="item1.img" alt=""></div>
              <div class="text">{{item1.text}}</div>
            </div>
          </div>
        </div>
        <div class="button" :style="{left: $store.state.landscape ? 'calc(50% - '+(Math.ceil(list.length/4)*8+22)/2+'px' : 'calc(50% - '+(Math.ceil(list.length/3)*8+22)/2+'px'}">
          <div class="icon" v-for="(item, index) in $store.state.landscape ? Math.ceil(list.length/4) : Math.ceil(list.length/3)" :key="index" :style="{backgroundColor: selectId===-index?'#CF9155':'#979797'}" @click="selectItem(index)"></div>
        </div>
      </div>
      <div class="recommend">
        <div class="title">
          热点问题
        </div>
        <div class="item" v-for="(item, index) in hotList" :key="index" @click="helpPush(item.url)">
          {{item.text}}
          <div class="gosvg"><img src="../assets/go.svg" alt=""></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import xsvg from '../assets/help/0.svg'
import msvg from '../assets/help/1.svg'
import jsvg from '../assets/help/2.svg'
import csvg from '../assets/help/4.svg'
export default {
  name: 'help',
  data () {
    return {
      startlength: 0, // 帮助类别开始距离
      movelength: 0, // 帮助类别滑动距离
      itemtransition: true, // 帮助类别动画布尔值
      selectId: 0, // 帮助类别分页Id
      // 帮助类别
      list: [
        {
          text: '新手指引',
          key: 0,
          img: xsvg,
          url: 'question29.html'
        },
        {
          text: '脉诊仪相关',
          key: 1,
          img: msvg,
          list: [
            {
              text: '脉诊仪能否替代医疗设备？',
              url: 'question22.html'
            },
            {
              text: '脉诊仪对手机的要求？',
              url: 'question24.html'
            },
            {
              text: '脉诊仪完全充电需要多久？',
              url: 'question21.html'
            },
            {
              text: '脉诊仪充一次电使用多久？',
              url: 'question23.html'
            },
            {
              text: '如何查看脉诊仪MAC地址（设备地址）？',
              url: 'question20.html'
            },
            {
              text: '脉诊仪在什么情况下是工作状态？',
              url: 'question18.html'
            },
            {
              text: '脉诊仪在什么情况下是待机状态？',
              url: 'question19.html'
            },
            {
              text: '如何使用脉诊仪？',
              url: 'question17.html'
            },
            {
              text: '脉诊仪使用时有没有对测量环境或状态的要求？',
              url: 'question25.html'
            },
            {
              text: '手机电量低，金姆健康App搜索脉诊仪出现“搜索不到脉诊仪”，该怎么办？',
              url: 'question15.html'
            },
            {
              text: '在打开脉诊仪的情况下，Android手机在搜索脉诊仪时，出现搜索不到脉诊仪现象，该怎么办？',
              url: 'question16.html'
            },
            {
              text: '金姆健康App升级到最新版本，出现搜索不到脉诊仪现象，该怎么办？',
              url: 'question8.html'
            }
          ]
        },
        {
          text: '金姆健康App的使用',
          key: 2,
          img: jsvg,
          list: [
            {
              text: 'Android手机如何开启App的后台活动？',
              url: 'question31.html'
            },
            {
              text: '如何查找手机系统版本号？',
              url: 'question28.html'
            },
            {
              text: '更新下载有哪些方法？',
              url: 'question27.html'
            },
            {
              text: '为什么人体有12条经络，但是脉象柱状图/脉象横状图呈现其中8条经络对应？',
              url: 'question7.html'
            },
            {
              text: '移除用户档案，会把与该用户档案关联的测量记录删除吗？',
              url: 'question26.html'
            },
            {
              text: '测量结束后不显示测量结果，该怎么办？',
              url: 'question3.html'
            },
            {
              text: '连续二次测量时间间隔不长，为什么测量结果会有差异？',
              url: 'question5.html'
            },
            {
              text: '我有账号密码，为什么也要重新注册？',
              url: 'question32.html'
            },
            {
              text: '老用户如何绑定手机号？',
              url: 'question33.html'
            },
            {
              text: '更换了手机号，金姆的账号怎么办？可以修改吗？',
              url: 'question34.html'
            },
            {
              text: '手机号的密码是什么？',
              url: 'question35.html'
            },
            {
              text: '我用海外的手机号注册了账号，对我App的使用有影响吗？',
              url: 'question41.html'
            },
            {
              text: '不购买订阅可以使用App吗？',
              url: 'question36.html'
            },
            {
              text: '购买了激活码之后怎样才可以测量？',
              url: 'question37.html'
            },
            {
              text: '没有我常住地的经销商，我如何购买？',
              url: 'question38.html'
            },
            {
              text: '为什么个人资料里填写的手机号和邮箱都没有了？',
              url: 'question39.html'
            },
            {
              text: '为什么登录的时候提示我账号快要过期，登录失败？',
              url: 'question40.html'
            },
            {
              text: '为什么升级后测量报告会消失？',
              url: 'question42.html'
            }
          ]
        },
        {
          text: '测量问题',
          key: 3,
          img: csvg,
          list: [
            {
              text: '什么是正确的测量姿势？',
              url: 'question2.html'
            },
            {
              text: '测量左右手是否需要区分男左女右？',
              url: 'question6.html'
            },
            {
              text: '测量时选择左右手的哪一个手指？',
              url: 'question12.html'
            },
            {
              text: '系统提示“测量异常，请重新测量”，该怎么办？',
              url: 'question1.html'
            },
            {
              text: '测量时出现“非常抱歉，由于测量异常，需要重新测量”？',
              url: 'question13.html'
            },
            {
              text: '为什么有时不能开始测量或测量中止？',
              url: 'question4.html'
            },
            {
              text: '测量过程中突然中止怎么办？',
              url: 'question11.html'
            }
          ]
        }
      ],
      // 热点列表
      hotList: [
        {
          text: '新手指引',
          url: 'question29.html'
        },
        {
          text: '如何使用脉诊仪?',
          url: 'question17.html'
        },
        {
          text: '测量结束后不显示测量结果，该怎么办？',
          url: 'question3.html'
        },
        {
          text: '金姆健康App升级到最新版本，出现搜索不到脉诊仪现象，该怎么办？',
          url: 'question8.html'
        },
        {
          text: '不购买订阅可以使用App吗？',
          url: 'question36.html'
        },
        {
          text: '没有我常住地的经销商，我如何购买？',
          url: 'question38.html'
        }
      ]
    }
  },
  computed: {
    windowWidth () {
      return this.$store.state.windowWidth
    }
  },
  beforeMount () {
  },
  mounted () {
    this.$store.state.isLoading = false
    if (this.$route.query.title) {
      this.$store.dispatch('changeTitle', this.$route.query.title)
    } else {
      this.$store.dispatch('changeTitle', '帮助中心')
    }
  },
  destroyed () {
  },
  methods: {
    closeTouch (e) {
      e.preventDefault()
    },
    routetToInfo (item) {
      if (item.url) {
        this.helpPush(item.url)
      } else {
        this.$router.push({name: 'helpinfo', query: {title: item.text, id: item.key}})
      }
    },
    selectItem (i) {
      this.selectId = -i
    },
    helpStatus (val) {
      this.helpShow = val
    },
    helpPush (url) {
      this.$store.dispatch('helpPush', url)
    },
    itemtouchstart (e) {
      document.body.addEventListener('touchmove', this.closeTouch, {passive: false})
      this.startlength = e.changedTouches[0].clientX
      this.itemtransition = false
    },
    itemtouchmove (e) {
      document.body.addEventListener('touchmove', this.closeTouch, {passive: false})
      this.movelength = e.changedTouches[0].clientX - this.startlength
    },
    itemtouchend (e) {
      document.body.removeEventListener('touchmove', this.closeTouch)
      this.itemtransition = true
      if (this.movelength >= window.screen.width / 10) {
        if (this.selectId < 0) {
          this.selectId++
        }
      } else if (this.movelength <= -window.screen.width / 10) {
        if (this.selectId - 1 > -Math.ceil(this.list.length / 3)) {
          this.selectId--
        }
      }
      this.movelength = 0
    }
  }
}
</script>
<style scoped>
  .help {
    font-weight: 400;
  }
  .list {
    position: relative;
    overflow: hidden;
    border-top: calc(100vw/750*28) solid #ECECEC;
  }
  .landscape .list {
    border-top: calc(100vh/750*28) solid #ECECEC;
  }
  .help .list {
    height: calc(100vw/750*268);
  }
  .landscape .help .list {
    height: calc(100vh/750*268);
  }
  .list .item {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 2;
  }
  .list .button {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 3;
  }
  .list .button .icon {
    vertical-align: bottom;
    display: inline-block;
    width: 8px;
    height: 8px;
    margin-bottom: 10px;
    border-radius: 50%;
  }
  .list .button .icon + .icon {
    margin-left: 22px;
  }
  .info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: calc(100vw/750*268 - 18px);
    padding: 0 calc(100vw/750*25);
  }
  .landscape .info {
    height: calc(100vh/750*268 - 18px);
    padding: 0;
  }
  .info .item_in {
    min-width: 33.33%;
    text-align: center;
  }
  .landscape .info .item_in {
    min-width: 25%;
  }
  .info .item_in .img_in {
    display: inline-block;
    width: calc(100vw/750*100);
  }
  .landscape .info .item_in .img_in {
    display: inline-block;
    width: calc(100vh/750*100);
  }
  .info .item_in .text {
    font-size: calc(100vw/750*26);
  }
  .landscape .info .item_in .text {
    font-size: calc(100vh/750*26);
  }
  .recommend {
    border-top: calc(100vw/750*28) solid #ECECEC;
  }
  .landscape .recommend {
    border-top: calc(100vh/750*28) solid #ECECEC;
    padding: 0 calc(100vh/750*40);
  }
  .recommend .title {
    font-size: calc(100vw/750*32);
    line-height: calc(100vw/750*98);
    color: #CF9155;
    padding: 0 calc(100vw/750*30);
    border-bottom: 1px solid #ECECEC;
  }
  .landscape .recommend .title {
    font-size: calc(100vh/750*32);
    line-height: calc(100vh/750*98);
    padding: 0 calc(100vh/750*60);
  }
  .recommend .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ECECEC;
    line-height: calc(100vw/750*40);
    font-size: calc(100vw/750*28);
    padding: calc(100vw/750*25) calc(100vw/750*30);
    position: relative;
  }
  .landscape .recommend .item {
    line-height: calc(100vh/750*40);
    font-size: calc(100vh/750*28);
    padding: calc(100vh/750*25) calc(100vh/750*60);
  }
  .recommend .item .gosvg {
    width: calc(100vw/750*10);
    min-width: calc(100vw/750*10);
  }
  .landscape .recommend .item .gosvg {
    width: calc(100vh/750*10);
    min-width: calc(100vh/750*10);
  }
</style>
