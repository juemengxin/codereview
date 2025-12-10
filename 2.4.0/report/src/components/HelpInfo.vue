<template>
  <div class="helpInfo">
    <div class="goBack" @click="goBack" v-if="$store.state.isWx">
      <img src="../assets/report_icon_fh.svg" alt="">
    </div>
    <div class="item" v-for="(item, index) in childrenList" :key="index" @click="helpPush(item.url)">
      <div class="gosvg"><img src="../assets/go.svg" alt=""></div>
      {{item.text}}
    </div>
  </div>
</template>
<script>
export default {
  name: 'helpinfo',
  data () {
    return {
      // 帮助类别列表
      list: [
        {
          text: '新手指引',
          key: 0,
          url: 'question29.html'
        },
        {
          text: '脉诊仪相关',
          key: 1,
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
      childrenList: [] // 帮助子列表
    }
  },
  computed: {
  },
  beforeMount () {
  },
  mounted () {
    if (this.$route.query.title) {
      this.$store.dispatch('changeTitle', this.$route.query.title)
    }
    this.childrenList = this.list[this.$route.query.id].list
    this.$store.state.isLoading = false
  },
  destroyed () {
  },
  methods: {
    helpPush (url) {
      this.$store.dispatch('helpPush', url)
    },
    /**
    *
    *  回到上一页
    *
    */
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>
<style scoped>
  .goBack {
    position: fixed;
    width: calc(100vw/750*90);
    height: calc(100vw/750*90);
    right: calc(100vw/750*30);
    bottom: calc(100vw/750*30);
    z-index: 3;
  }
  .landscape .goBack {
    width: calc(100vh/750*90);
    height: calc(100vh/750*90);
    right: calc(100vh/750*30);
    bottom: calc(100vh/750*30);
  }
  .helpInfo {
    text-align: left;
    font-weight: 400;
  }
  .landscape .helpInfo {
    padding: 0 calc(100vw/750*40);
  }
  .helpInfo .item {
    border-bottom: 1px solid #ECECEC;
    line-height: calc(100vw/750*40);
    font-size: calc(100vw/750*28);
    padding: calc(100vw/750*25) calc(100vw/750*30);
    padding-right: calc(100vw/750*50);
    position: relative;
  }
  .landscape .helpInfo .item {
    line-height: calc(100vh/750*40);
    font-size: calc(100vh/750*28);
    padding: calc(100vh/750*25) calc(100vh/750*60);
  }
  .helpInfo .item .gosvg {
    position: absolute;
    top: calc(100vw/750*36);
    right: calc(100vw/750*30);
    width: calc(100vw/750*10);
    height: calc(100vw/750*20);
  }
  .landscape .helpInfo .item .gosvg {
    top: calc(100vh/750*36);
    right: calc(100vh/750*60);
    width: calc(100vh/750*10);
    height: calc(100vh/750*20);
  }
</style>
