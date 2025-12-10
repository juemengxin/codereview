<template>
  <transition name="message">
    <div class="jm-message" v-if="status">
      <div class="app-message">
        <div class="text">
          <img class="top" src="../assets/app/tusi1.svg" alt="">
          <div class="main">{{text}}</div>
          <img class="bottom" src="../assets/app/tusi2.svg" alt="">
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'jm-message',
  props: {
    status: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: 'error'
    }
  },
  data () {
    return {
    }
  },
  computed: {
  },
  beforeMount () {
  },
  mounted () {
  },
  destroyed () {
  },
  methods: {
  },
  components: {
  }
}
</script>
<style scoped>
  .app-message {
    position: fixed;
    top: calc(124 / 375 * 100vw);
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
  }
  .landscape .app-message {
    top: calc(80 / 375 * 100vh);
  }
  .app-message .text {
    max-width: 80%;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(39 / 375 * 100vw);
    padding: 0 calc(16 / 375 * 100vw);
    color: #fff;
    font-size: calc(16 / 375 * 100vw);
    background-color: #b46651;
    position: relative;
    overflow: hidden;
  }
  .landscape .app-message .text {
    height: calc(39 / 375 * 100vh);
    padding: 0 calc(16 / 375 * 100vh);
    font-size: calc(16 / 375 * 100vh);
  }
  .app-message .text .top {
    position: absolute;
    top: calc(4 / 375 * 100vw);
    left: calc(4 / 375 * 100vw);
    width: calc(30 / 375 * 100vw);
    z-index: 2;
  }
  .landscape .app-message .text .top {
    top: calc(4 / 375 * 100vh);
    left: calc(4 / 375 * 100vh);
    width: calc(30 / 375 * 100vh);
  }
  .app-message .text .bottom {
    position: absolute;
    bottom: calc(4 / 375 * 100vw);
    right: calc(4 / 375 * 100vw);
    width: calc(30 / 375 * 100vw);
    z-index: 2;
  }
  .landscape .app-message .text .bottom {
    bottom: calc(4 / 375 * 100vh);
    right: calc(4 / 375 * 100vh);
    width: calc(30 / 375 * 100vh);
  }
  .jm-message {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 99;
    /* min-width: calc(400 / 16 * 1rem); */
  }
</style>
