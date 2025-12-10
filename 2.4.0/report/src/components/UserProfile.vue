<template>
  <div class="userProfile">
    <div class="headerInfo">
      <img :src="img" alt="" v-if="img!==''">
      <div class="nameSex">
        <div class="name">
          {{name}}
        </div>
        <div class="gender">
          {{gender===-1?'':gender===0?'男':'女'}}
        </div>
        <div class="gender">
          {{finger===-1?'':finger>5?'右手':'左手'}}
        </div>
      </div>
    </div>
    <div class="share" v-if="isPayment&&$store.state.isWx&&!$route.query.token" @click="openWxShare()">
      <img src="../assets/button_share@2x.png" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: 'userprofile', // 用户信息模块
  props: ['img', 'name', 'gender', 'isPayment', 'openWxShare', 'finger'],
  data () {
    return {
    }
  },
  mounted () {
  },
  destroyed () {
  },
  methods: {
  }
}
</script>

<style scoped>
  .userProfile {
    display: flex;
    justify-content: space-between;
  }
  .headerInfo {
    padding-bottom: calc(100vw/1080*50);
    display: flex;
    align-items: center;
  }
  .landscape .headerInfo {
    padding-bottom: 0;
  }
  .headerInfo img{
    width: calc(100vw/1080*215);
    min-width: calc(100vw/1080*215);
    height: calc(100vw/1080*215);
    border-radius: 50%;
  }
  .landscape .headerInfo img{
    width: calc(100vh/1080*215);
    min-width: calc(100vh/1080*215);
    height: calc(100vh/1080*215);
  }
  .headerInfo .nameSex {
    text-align: left;
    margin-left: calc(100vw/1080*43);
  }
  .landscape .headerInfo .nameSex {
    margin-left: 0;
    display: flex;
    align-items: center;
  }
  .headerInfo .name {
    color: #fff;
    font-size: calc(100vw/1080*58);
  }
  .landscape .headerInfo .name {
    font-size: calc(100vh/1080*58);
    margin-right: calc(100vh/1080*19);
  }
  .headerInfo .gender {
    font-size: calc(100vw/1080*35);
    background-color: #fff;
    color: #CF9155;
    display: inline-block;
    padding: 0 calc(100vw/1080*35);
    border-radius: calc(100vw/1080*22);
    margin-top: calc(100vw/1080*34);
  }
  .landscape .headerInfo .gender {
    font-size: calc(100vh/1080*35);
    padding: 0 calc(100vh/1080*35);
    border-radius: calc(100vh/1080*22);
    margin-top: 0;
    margin-left: calc(100vh/1080*26);
  }
  .share{
    display: inline-block;
    width: calc(100vw/1080*215);
    min-width: calc(100vw/1080*215);
    height: calc(100vw/1080*73);
  }
  .landscape .share{
    width: calc(100vh/1080*215);
    min-width: calc(100vh/1080*215);
    height: calc(100vh/1080*73);
  }
</style>
