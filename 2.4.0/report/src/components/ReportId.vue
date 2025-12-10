<template>
  <div class="reportId">
    <div class="date"><img src="../assets/android/new/reporting_home_icon_measured_at_time.svg" alt=""><div>{{moment(date).format('YYYY-MM-DD HH:mm:ss')}}</div></div>
    <div class="id"><img src="../assets/android/new/reporting_home_icon_transaction_number.svg" alt=""><div>{{id}}</div></div>
  </div>
</template>

<script>
import moment from 'moment' // 时间插件

export default {
  name: 'reportId', // 时间编号模块
  props: ['date', 'id'],
  data () {
    return {
      moment
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
  .reportId {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: calc(100vw/1080*35);
    line-height: calc(100vw/1080*35);
    padding-bottom: calc(100vw/1080*50);
    color: #fff;
  }
  .landscape .reportId {
    font-size: calc(100vh/1080*35);
    line-height: calc(100vh/1080*35);
    padding-bottom: 0;
  }
  .reportId img {
    width: calc(100vw/1080*40);
    height: calc(100vw/1080*40);
    margin-right: calc(100vw/1080*8);
  }
  .landscape .reportId img {
    width: calc(100vh/1080*40);
    height: calc(100vh/1080*40);
    margin-right: calc(100vh/1080*8);
  }
  .reportId .date {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .reportId .id {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .landscape .reportId .id {
    margin-left: calc(100vh/1080*133);
  }
</style>
