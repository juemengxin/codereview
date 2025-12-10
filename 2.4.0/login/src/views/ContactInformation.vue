<i18n>
{
  "en": {},
  "zh-Hans": {
    "document-title": "购买/续费方式"
  },
  "zh-Hant": {}
}
</i18n>
<template>
  <div class="contact-information">
    <div class="title app-color">
      购买/续费联系方式
    </div>
    <div class="subtitle app-color">
      购买或续费方式
    </div>
    <div class="text">
      如您需购买金姆脉诊仪，请联系我们<br>
      如您的脉诊仪服务时间已到期，请联系金姆。
    </div>
    <div class="subtitle app-color">
      金姆咨询联系方式
    </div>
    <div class="text">
      <div>客服电话：400-928-3900</div>
      <div>联系邮箱：sales@jinmuhealth.com</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'contact-information',
  data () {
    return {
      dealers: [
        {
          area: '宝鸡市',
          name: '李东东',
          phone: '18609175198'
        },
        {
          area: '北京市',
          name: '段玉宝',
          phone: '18615320959'
        },
        {
          area: '常州市',
          name: '瞿又实',
          phone: '13167197274'
        },
        {
          area: '重庆市',
          name: '刘礼',
          phone: '15320492098'
        },
        {
          area: '重庆市',
          name: '赵凌霄',
          phone: '13167879111'
        },
        {
          area: '贵阳市',
          name: '耿星',
          phone: '13823258552'
        },
        {
          area: '昆明市',
          name: '蒋辉',
          phone: '18468033905'
        },
        {
          area: '上海市',
          name: '黄爽',
          phone: '18001655305'
        },
        {
          area: '天津市',
          name: '徐兴东',
          phone: '15620239618'
        },
        {
          area: '无锡市',
          name: '孔相清',
          phone: '17326991319'
        },
        {
          area: '西安市',
          name: '水箐',
          phone: '18092277570'
        },
        {
          area: '西安市',
          name: '王欣',
          phone: '13571889282'
        },
        {
          area: '郑州市',
          name: '李俊',
          phone: '13911221079'
        }
      ]
    }
  },
  computed: {
  },
  beforeMount () {
  },
  mounted () {
    const t = this
    t.$store.dispatch('changeTitle', t.$t('document-title'))
    t.$store.state.loading = false
  },
  destroyed () {
  },
  methods: {
  }
}
</script>
<style scoped>
  .contact-information {
    background-color: #ffffff;
    padding: calc(20 / 375 * 100vw) calc(15 / 375 * 100vw);
    text-align: left;
  }
  .landscape .contact-information {
    padding: calc(20 / 375 * 100vh);
  }
  .title {
    font-size: calc(18 / 375 * 100vw);
  }
  .landscape .title {
    font-size: calc(18 / 375 * 100vh);
  }
  .subtitle {
    padding-top: calc(30 / 375 * 100vw);
    padding-bottom: calc(10 / 375 * 100vw);
  }
  .landscape .subtitle {
    padding-top: calc(30 / 375 * 100vh);
    padding-bottom: calc(10 / 375 * 100vh);
  }
  .dealer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .dealer__title {
    color: #ffffff;
    margin-bottom: calc(10 / 375 * 100vw);
  }
  .landscape .dealer__title {
    margin-bottom: calc(10 / 375 * 100vh);
  }
  .dealer .item {
    width: 33%;
  }
  .dealer__text  .item{
    line-height: calc(27 / 375 * 100vw);
    border-bottom: 1px solid #F0F0F0;
  }
  .landscape .dealer__text  .item{
    line-height: calc(27 / 375 * 100vh);
  }
</style>
