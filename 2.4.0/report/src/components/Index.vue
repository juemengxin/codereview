<template>
  <div class="index">
  </div>
</template>

<script>
export default {
  // TODO: 首页
  name: 'index', // 首页
  data () {
    return {
    }
  },
  beforeMount () {
  },
  mounted () {
    this.$store.state.isLoading = false
    // 通用修改title方法
    this.$store.dispatch('changeTitle', '金姆健康')
  },
  destroyed () {
  },
  methods: {
  }
}
</script>

<style scoped>
  .index {
    font-size: calc(100vw/375*32);
    font-size: -moz-calc(100vw/375*32);
    font-size: -webkit-calc(100vw/375*32);
    text-align: center;
    color: #26AEA0;
  }
</style>
