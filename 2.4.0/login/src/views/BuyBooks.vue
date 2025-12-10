<i18n>
{
  "en": {},
  "zh-Hans": {
    "document-title": "购买相关书籍"
  },
  "zh-Hant": {}
}
</i18n>
<template>
  <div class="buy-books">
    <div class="title app-color">
      看懂经气脉络(套装共2册) 平装
    </div>
    <div class="book">
      <div class="img">
        <img src="../assets/app/book.png" alt="">
      </div>
    </div>
    <div class="book">
       王唯工 (作者)
    </div>
    <div class="book">
      <span class="money">
        ¥ 69.00
      </span>
    </div>
    <div class="app-color subtitle">
      详情
    </div>
    <div class="text">
      《看懂经气脉络(套装共2册)》包括《看懂经气脉络上——中医与人体的和稭之舞》《看懂经气脉络下——揭开气血共振的奥秘》共两册。《看懂经气脉络(套装共2册)》讲述了三十年的研究，他找到了一个让中医以科学语言和大众沟通的方法，让不懂我国传统文化思维的对象，也能够理解中医，理解“气”、“经络”、“阴阳五行”之于人体的意义。
    </div>
    <div class="app-color subtitle">
      购买联系方式
    </div>
    <div>
      客服电话：400-928-3900
    </div>
    <div>
      联系邮箱：sales@jinmuhealth.com
    </div>
  </div>
</template>
<script>
export default {
  name: 'buy-books',
  data () {
    return {
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
  .buy-books {
    background-color: #ffffff;
    padding: calc(20 / 375 * 100vw) calc(15 / 375 * 100vw);
    text-align: left;
  }
  .landscape .buy-books  {
    padding: calc(20 / 375 * 100vh);
  }
  .title {
    font-size: calc(18 / 375 * 100vw);
  }
  .landscape .title {
    font-size: calc(18 / 375 * 100vh);
  }
  .book {
    text-align: center;
    font-size: calc(16 / 375 * 100vw);
  }
  .landscape .book {
    font-size: calc(16 / 375 * 100vh);
  }
  .book .img {
    padding-top: calc(23 / 375 * 100vw);
    display: inline-block;
    width: calc(128 / 375 * 100vw);
  }
  .landscape .book .img {
    padding-top: calc(23 / 375 * 100vh);
    width: calc(128 / 375 * 100vh);
  }
  .book span {
    font-size: calc(10 / 375 * 100vw);
  }
  .landscape .book span {
    font-size: calc(10 / 375 * 100vh);
  }
  .book .money {
    font-size: calc(16 / 375 * 100vw);
    color: #FF0000;
  }
  .landscape .book .money {
    font-size: calc(16 / 375 * 100vh);
  }
  .subtitle {
    padding-top: calc(43 / 375 * 100vw);
    padding-bottom: calc(10 / 375 * 100vw);
  }
  .landscape .subtitle {
    padding-top: calc(43 / 375 * 100vh);
    padding-bottom: calc(10 / 375 * 100vh);
  }
  .text {
    line-height: calc(26 / 375 * 100vw);
  }
  .landscape .text {
    line-height: calc(26 / 375 * 100vh);
  }
</style>
