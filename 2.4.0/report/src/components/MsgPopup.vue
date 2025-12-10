<template>
  <div class="msgPopup">
    <div class="text">
      <div>{{$store.state.msg}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'msgpopup', // msg 消息模块
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
  .msgPopup {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
  }
  .msgPopup .text {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    max-width: 80vw;
    max-height: 40vw;
    background-color: rgba(0, 0, 0, 0.6);
    color: #fff;
    font-size: calc(100vw/375*16);
    border-radius: calc(100vw/375*5);
    padding: calc(100vw/375*20) calc(100vw/375*30);
  }
  .landscape .msgPopup .text {
    max-width: 80vh;
    max-height: 40vh;
    font-size: calc(100vh/375*16);
    border-radius: calc(100vh/375*5);
    padding: calc(100vh/375*20) calc(100vh/375*30);
  }
</style>
