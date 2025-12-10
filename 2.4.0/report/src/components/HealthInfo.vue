<template>
  <div class="healthInfo">
    <div class="goBack" @click="goBack" v-if="$store.state.isWx">
      <img src="../assets/report_icon_fh.svg" alt="" />
    </div>
    <div class="nav" v-if="list.length > 1">
      <div
        class="item"
        v-for="(item, index) in $store.state.landscape
          ? list.slice(0, 5)
          : list.slice(0, 4)"
        :key="index"
        @click="scrollId(index)"
        :style="{ color: selectId === index ? '#CF9155' : '#999' }"
      >
        {{ item.nav }}
      </div>
      <div
        class="more"
        @click="nav_more = true"
        v-if="$store.state.landscape ? list.length > 5 : list.length > 4"
      >
        <img class="icon" src="../assets/more.svg" alt="" />
      </div>
    </div>
    <div class="nav_bottom" v-if="list.length > 1"></div>
    <div class="nav_more" v-if="nav_more">
      <div class="close" @click="nav_more = false">
        <img src="../assets/close.svg" alt="" />
      </div>
      <div class="title">全部{{ $route.query.title }}词条</div>
      <div class="list">
        <div
          class="item"
          v-for="(item, index) in list"
          :key="index"
          @click="scrollId(index)"
        >
          {{ item.nav }}
        </div>
      </div>
    </div>
    <div class="main">
      <div class="item" v-for="(item, index) in list" :key="index">
        <div class="title" @click="goBack" :id="'id' + index">
          {{ item.nav }}
        </div>
        <div
          class="text"
          v-for="(item1, index1) in item.list"
          :key="index1"
          @click="newEntryPush(item1.key)"
        >
          {{ item1.name }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const healthentry = require('../../static/healthentry.json')
export default {
  name: 'healthinfo',
  data() {
    return {
      nav_more: false, // 更多显示
      selectId: -1, // 选择Id
      list: [] // 列表
    }
  },
  computed: {},
  beforeMount() {},
  mounted() {
    if (this.$route.query.title) {
      this.$store.dispatch('changeTitle', this.$route.query.title)
    }
    this.list = healthentry[this.$route.query.key]
    this.$store.state.isLoading = false
  },
  destroyed() {},
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    scrollId(index) {
      this.selectId = index
      this.nav_more = false
      document.body.scrollTop = document.documentElement.scrollTop =
        document.querySelector('#id' + index).offsetTop -
        (document.documentElement.clientWidth / 750) * 93
    },
    newEntryPush(key) {
      this.$store.dispatch('newHealthEntryPush', key)
    }
  }
}
</script>
<style scoped>
.goBack {
  position: fixed;
  width: calc(100vw / 750 * 90);
  height: calc(100vw / 750 * 90);
  right: calc(100vw / 750 * 30);
  bottom: calc(100vw / 750 * 30);
  z-index: 3;
}
.landscape .goBack {
  width: calc(100vh / 750 * 90);
  height: calc(100vh / 750 * 90);
  right: calc(100vh / 750 * 30);
  bottom: calc(100vh / 750 * 30);
}
.healthInfo {
  color: #666;
  text-align: center;
  font-weight: 400;
}
.nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #cf9155;
  background-color: #fff;
}
.nav_bottom {
  height: calc(100vw / 750 * 80);
}
.landscape .nav_bottom {
  height: calc(100vh / 750 * 80);
}
.nav .item {
  font-size: calc(100vw / 750 * 26);
  line-height: calc(100vw / 750 * 80);
  min-width: 22%;
}
.landscape .nav .item {
  font-size: calc(100vh / 750 * 26);
  line-height: calc(100vh / 750 * 80);
  min-width: 22vh;
}
.nav .more {
  min-width: 12%;
  line-height: calc(100vw / 750 * 26);
}
.landscape .nav .more {
  min-width: 12vh;
  line-height: calc(100vh / 750 * 26);
}
.nav .icon {
  display: inline-block;
  width: calc(100vw / 750 * 26);
  height: calc(100vw / 750 * 26);
}
.landscape .nav .icon {
  width: calc(100vh / 750 * 26);
  height: calc(100vh / 750 * 26);
}
.main {
  padding: 0 calc(100vw / 750 * 30);
  text-align: left;
  font-size: calc(100vw / 750 * 28);
}
.landscape .main {
  padding: 0 calc(100vh / 750 * 30);
  font-size: calc(100vh / 750 * 28);
}
.main .title {
  color: #333;
  padding: 0 calc(100vw / 750 * 20);
  margin: calc(100vw / 750 * 13) 0;
  line-height: calc(100vw / 750 * 54);
  background-color: #ededed;
}
.landscape .main .title {
  padding: 0 calc(100vh / 750 * 20);
  margin: calc(100vh / 750 * 13) 0;
  line-height: calc(100vh / 750 * 54);
}
.main .text {
  color: #cf9155;
  padding: 0 calc(100vw / 750 * 20);
  line-height: calc(100vw / 750 * 80);
}
.landscape .main .text {
  padding: 0 calc(100vh / 750 * 20);
  line-height: calc(100vh / 750 * 80);
}
.main .text + .text {
  border-top: 1px solid #eeeeee;
}
.close {
  position: fixed;
  top: calc(100vw / 750 * 30);
  right: calc(100vw / 750 * 30);
  width: calc(100vw / 750 * 25);
  height: calc(100vw / 750 * 25);
}
.landscape .close {
  top: calc(100vh / 750 * 30);
  right: calc(100vh / 750 * 30);
  width: calc(100vh / 750 * 25);
  height: calc(100vh / 750 * 25);
}
.nav_more {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.5);
}
.nav_more .title {
  font-size: calc(100vw / 750 * 32);
  line-height: calc(100vw / 750 * 85);
  background-color: #fff;
  border-bottom: 1px solid #c5c5c5;
}
.landscape .nav_more .title {
  font-size: calc(100vh / 750 * 32);
  line-height: calc(100vh / 750 * 85);
}
.nav_more .list {
  display: flex;
  flex-wrap: wrap;
  background-color: #fff;
}
.nav_more .item {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 33.33%;
  font-size: calc(100vw / 750 * 32);
  height: calc(100vw / 750 * 160);
  border-bottom: 1px solid #c5c5c5;
  box-sizing: border-box;
}
.landscape .nav_more .item {
  width: 20%;
  font-size: calc(100vh / 750 * 32);
  height: calc(100vh / 750 * 160);
}
.nav_more .item:nth-child(3n + 1) {
  border-right: 1px solid #c5c5c5;
}
.nav_more .item:nth-child(3n + 2) {
  border-right: 1px solid #c5c5c5;
}
.landscape .nav_more .item {
  border-right: none;
}
.landscape .nav_more .item + .item {
  border-left: 1px solid #c5c5c5;
}
.landscape .nav_more .item:nth-child(5n + 1) {
  border-left: none;
}
</style>
