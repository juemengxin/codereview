<template>
  <div class="njDetails" :style="{justifyContent: lists.length>0?'flex-star':'center'}">
    <div class="item" @click="routerToNjExplains(index)" v-for="(item, index) in lists" :key="index">
      <div class="img">
        <img :src="item.img" alt="">
      </div>
      <div>{{item.label}}</div>
    </div>
  </div>
</template>

<script>
import icon1 from '../assets/report_icon_1.svg'
import icon2 from '../assets/report_icon_2.svg'
import icon3 from '../assets/report_icon_3.svg'
export default {
  name: 'njdetails',
  data () {
    return {
      lists: [
        {
          label: '女性健康美肤',
          img: icon1
        },
        {
          label: '女性生殖健康',
          img: icon2
        },
        {
          label: '女性乳腺健康',
          img: icon3
        }
      ]
    }
  },
  mounted () {
  },
  destroyed () {
  },
  methods: {
    routerToNjExplains (id) {
      const t = this
      t.$route.query.id = id
      t.$router.push({name: 'njexplains', query: t.$route.query}) // 跳转女性健康子页面
    }
  }
}
</script>

<style scoped>
  .njDetails {
    text-align: center;
    display: flex;
    flex-wrap: wrap;
    padding: 0 calc(100vw/750*20);
    padding: 0 -moz-calc(100vw/750*20);
    padding: 0 -webkit-calc(100vw/750*20);
    padding-bottom: calc(100vw/750*48);
    padding-bottom: -moz-calc(100vw/750*48);
    padding-bottom: -webkit-calc(100vw/750*48);
  }
  .njDetails .item {
   width: 50%;
   text-align: center;
   padding: calc(100vw/750*20) 0;
   padding: -moz-calc(100vw/750*20) 0;
   padding: -webkit-calc(100vw/750*20) 0;
   font-size: calc(100vw/750*36);
   font-size: -moz-calc(100vw/750*36);
   font-size: -webkit-calc(100vw/750*36);
  }
  .njDetails .item .img {
    display: inline-block;
    width: calc(100vw/750*190);
    width: -moz-calc(100vw/750*190);
    width: -webkit-calc(100vw/750*190);
    height: calc(100vw/750*190);
    height: -moz-calc(100vw/750*190);
    height: -webkit-calc(100vw/750*190);
    padding-bottom: calc(100vw/750*10);
    padding-bottom: -moz-calc(100vw/750*10);
    padding-bottom: -webkit-calc(100vw/750*10);
  }
</style>
