<template>
  <div class="ccHistogram">
    <div class="title" v-if="isPayment">
      <div class="line" v-if="isPull"></div>
      <div class="text">经络柱状图</div>
      <div class="line" v-if="isPull"></div>
      <div class="pull" v-if="!isPull" @click="isPull = true">展开</div>
      <div class="pull" v-if="isPull" @click="isPull = false">收起</div>
    </div>
    <div class="title" v-if="!isPayment">
      <div class="line"></div>
      <div class="text">经络柱状图</div>
      <div class="line"></div>
    </div>
    <div class="main" v-if="isPull || !isPayment">
      <div class="ccHigh">
        <div class="ccItem" v-for="(item, index) in ccHighItems" :key="index">
          <div class="text">{{ item > 0 ? '+' + item + '%' : '' }}</div>
          <div
            class="img"
            :style="{
              margin: `0 auto`,
              height: `${item * 1}px`,
              width: '20px',
              backgroundColor: '#C73E3A',
              borderRadius: '5px'
            }"
          ></div>
        </div>
      </div>
      <div class="ccName">
        <div
          class="item"
          v-for="(item, index) in ccNames"
          :key="index"
          @click="newEntryPush(item, index)"
        >
          {{ item.name }}
        </div>
      </div>
      <div class="ccLow">
        <div class="ccItem" v-for="(item, index) in ccLowItems" :key="index">
          <div
            class="img"
            :style="{
              margin: `0 auto`,
              height: `${item * 1}px`,
              width: '20px',
              backgroundColor: '#fed14d',
              borderRadius: '5px'
            }"
          ></div>
          <div class="text">{{ item > 0 ? '-' + item + '%' : '' }}</div>
        </div>
      </div>
      <div class="remark">
        <div class="color">
          <div class="high-dot"></div>
          <div class="text">高</div>
          <div class="low-dot"></div>
          <div class="text">低</div>
        </div>
        <div class="tips">
          <div class="normal-dot"></div>
          数值越接近
          <div class="mid-item"></div>
          越健康
        </div>
      </div>
      <div class="attention">
        <div class="attention-item">
          <div class="icon">
            <img src="../assets/android/icon-info.svg" alt="" />
          </div>
          <div class="right">
            <div class="title">点击经络名称，查看详情</div>
          </div>
        </div>
        <div class="attention-item">
          <div class="right">
            <div>
              注：人体的气血时刻在变化，多次测量略有波动属于人体正常现象，肾经、膀胱经一般变化较大，脾经、肺经变化较小。在短时间内、并且心率波动不大的情况下，经络值偏差一般不超过正负10%。
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'cchistogram', // 经络柱状图
  props: ['ccItems', 'isPayment'],
  data() {
    return {
      ccNames: [
        {
          name: '心包经',
          key: 'c0'
        },
        {
          name: '肝经',
          key: 'c1'
        },
        {
          name: '肾经',
          key: 'c2'
        },
        {
          name: '脾经',
          key: 'c3'
        },
        {
          name: '肺经',
          key: 'c4'
        },
        {
          name: '胃经',
          key: 'c5'
        },
        {
          name: '胆经',
          key: 'c6'
        },
        {
          name: '膀胱经',
          key: 'c7'
        }
      ], // 经络名
      ccHighItems: [], // 经络高数组
      ccLowItems: [], // 经络低数组
      isPull: false
    }
  },
  mounted() {
    const t = this
    t.ccItems.forEach((element, index) => {
      // 根据经络的正负区分高低数组
      if (element > 0) {
        if (element > 100) {
          t.ccHighItems.push(100)
        } else {
          t.ccHighItems.push(element)
        }
      } else {
        t.ccHighItems.push(0)
      }
      if (element < 0) {
        if (element < -100) {
          t.ccLowItems.push(100)
        } else {
          t.ccLowItems.push(-element)
        }
      } else {
        t.ccLowItems.push(0)
      }
    })
  },
  watch: {
    ccItems() {
      const t = this
      t.ccItems.forEach((element, index) => {
        // 根据经络的正负区分高低数组
        if (element > 0) {
          if (element > 100) {
            t.ccHighItems.push(100)
          } else {
            t.ccHighItems.push(element)
          }
        } else {
          t.ccHighItems.push(0)
        }
        if (element < 0) {
          if (element < -100) {
            t.ccLowItems.push(100)
          } else {
            t.ccLowItems.push(-element)
          }
        } else {
          t.ccLowItems.push(0)
        }
      })
    }
  },
  destroyed() {},
  methods: {
    newEntryPush(item, index) {
      const t = this
      // 如果是已支付状态择可以点击经络
      if (t.isPayment) {
        let key = ''
        if (t.ccItems[index] > 0) {
          key = item.key + '_high'
        } else if (t.ccItems[index] < 0) {
          key = item.key + '_low'
        } else {
          key = item.key
        }
        t.$store.dispatch('newEntryPush', key)
      }
    }
  }
}
</script>

<style scoped>
.ccHistogram {
  padding: calc(100vw / 750 * 30) 0;
}
.landscape .ccHistogram {
  padding: calc(100vh / 750 * 30) 0;
}
.ccHistogram .title {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.ccHistogram .title .text {
  color: #cf9155;
  font-size: calc(100vw / 1080 * 46);
  margin: 0 calc(100vw / 1080 * 25);
}
.landscape .ccHistogram .title .text {
  font-size: calc(100vh / 1080 * 46);
  margin: 0 calc(100vh / 1080 * 25);
}
.ccHistogram .title .line {
  height: 1px;
  background-color: #cf9155;
  width: calc(100vw / 1080 * 200);
}
.landscape .ccHistogram .title .line {
  width: calc(100vh / 1080 * 420);
}
.ccHistogram .title .pull {
  position: absolute;
  top: 0;
  right: 0;
  color: #3773ab;
  line-height: calc(100vw / 750 * 46);
  font-size: calc(100vw / 750 * 28);
}
.landscape .ccHistogram .title .pull {
  line-height: calc(100vh / 750 * 46);
  font-size: calc(100vh / 750 * 28);
}
.ccHistogram .main {
}
.ccHistogram .main .ccName {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 2px;
  margin-bottom: 2px;
}
.ccHistogram .main .ccName .item {
  margin: 0 calc(100vw / 1080 * 5);
  display: inline-block;
  width: calc(100vw / 1080 * 105);
  font-size: calc(100vw / 1080 * 32);
  line-height: calc(100vw / 1080 * 32);
  border-radius: calc(100vw / 1080 * 12);
  padding: calc(100vw / 1080 * 13) 0;
  background-color: #3773ab;
  color: #fff;
}
.landscape .ccHistogram .main .ccName .item {
  width: calc(100vh / 1080 * 120);
  font-size: calc(100vh / 1080 * 32);
  line-height: calc(100vh / 1080 * 32);
  border-radius: calc(100vh / 1080 * 12);
  padding: calc(100vh / 1080 * 13) 0;
}
.ccHistogram .main .ccHigh {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding-top: calc(100vw / 1080 * 15);
  min-height: calc(100vw / 1080 * 435);
  box-sizing: border-box;
}
.landscape .ccHistogram .main .ccHigh {
  padding-top: calc(100vh / 1080 * 15);
  min-height: calc(100vh / 1080 * 435);
}
.ccHistogram .main .ccLow {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-bottom: calc(100vw / 1080 * 15);
  min-height: calc(100vw / 1080 * 435);
  box-sizing: border-box;
}
.landscape .ccHistogram .main .ccLow {
  padding-bottom: calc(100vh / 1080 * 15);
  min-height: calc(100vh / 1080 * 435);
}
.ccHistogram .main .remark .color .high-dot {
  width: 25px;
  height: 8px;
  opacity: 1;
  background: #c73e3a;
  border-radius: 4px;
}
.ccHistogram .main .remark .color .low-dot {
  width: 25px;
  height: 8px;
  opacity: 1;
  background: #fed14d;
  border-radius: 4px;
}
.ccHistogram .main .ccItem {
  display: inline-block;
  width: calc(100vw / 1080 * 105);
  margin: 0 calc(100vw / 1080 * 5);
}
.landscape .ccHistogram .main .ccItem {
  width: calc(100vh / 1080 * 120);
}
.ccHistogram .main .ccItem .img {
  height: calc(100vw / 1080 * 32);
  margin: calc(100vw / 1080 * 4.5) 0;
}
.landscape .ccHistogram .main .ccItem .img {
  height: calc(100vh / 1080 * 32);
  margin: calc(100vh / 1080 * 4.5) 0;
}
.ccHistogram .main .ccItem .text {
  text-align: center;
  color: #666;
  font-size: calc(100vw / 1080 * 32);
  line-height: calc(100vw / 1080 * 32);
  margin: calc(100vw / 1080 * 11.5) 0;
}
.landscape .ccHistogram .main .ccItem .text {
  font-size: calc(100vh / 1080 * 32);
  line-height: calc(100vh / 1080 * 32);
  margin: calc(100vh / 1080 * 11.5) 0;
}
.ccHistogram .main .remark {
  color: #666;
  text-align: left;
  font-size: calc(100vw / 1080 * 35);
  line-height: calc(100vw / 1080 * 35);
}
.landscape .ccHistogram .main .remark {
  font-size: calc(100vh / 1080 * 35);
  line-height: calc(100vh / 1080 * 35);
}
.ccHistogram .main .remark .color {
  display: flex;
  align-items: center;
  padding-bottom: calc(100vw / 1080 * 52);
}
.landscape .ccHistogram .main .remark .color {
  padding-bottom: calc(100vh / 1080 * 52);
}
.ccHistogram .main .remark .color .img {
  display: inline-block;
  width: calc(100vw / 1080 * 101);
  height: calc(100vw / 1080 * 32);
}
.landscape .ccHistogram .main .remark .color .img {
  width: calc(100vh / 1080 * 101);
  height: calc(100vh / 1080 * 32);
}
.ccHistogram .main .remark .color .text {
  padding-left: calc(100vw / 1080 * 11);
  padding-right: calc(100vw / 1080 * 29);
}
.landscape .ccHistogram .main .remark .color .text {
  padding-left: calc(100vh / 1080 * 11);
  padding-right: calc(100vh / 1080 * 29);
}
.ccHistogram .attention {
  border-top: 1px solid #ccc;
  margin-top: calc(100vw / 750 * 36);
  padding-top: calc(100vw / 750 * 25);
  font-size: calc(100vw / 750 * 20);
}
.landscape .ccHistogram .attention {
  margin-top: calc(100vh / 750 * 36);
  padding-top: calc(100vh / 750 * 25);
  font-size: calc(100vh / 750 * 20);
}
.ccHistogram .attention .right {
  text-align: justify;
}
.attention .attention-item {
  display: flex;
  align-items: flex-start;
}
.attention .attention-item + .attention-item {
  padding-top: calc(100vw / 750 * 17);
}
.landscape .attention .attention-item + .attention-item {
  padding-top: calc(100vh / 750 * 17);
}
.attention .tip {
  justify-content: space-between;
}
.attention .icon {
  width: calc(100vw / 750 * 30);
  min-width: calc(100vw / 750 * 30);
  margin-right: calc(100vw / 750 * 10);
}
.landscape .attention .icon {
  width: calc(100vh / 750 * 30);
  min-width: calc(100vh / 750 * 30);
  margin-right: calc(100vh / 750 * 10);
}
.attention .title {
  color: #cf9155;
  font-size: calc(100vw / 750 * 24);
  font-weight: 500;
  line-height: calc(100vw / 750 * 30);
}
.landscape .attention .title {
  font-size: calc(100vh / 750 * 24);
  line-height: calc(100vh / 750 * 30);
}
.tips {
  display: flex;
  align-items: center;
}
.mid-item {
  width: calc(100vw / 750 * 56);
  height: calc(100vw / 750 * 27);
  background-color: #3773ab;
  border-radius: calc(100vw / 1080 * 12);
  margin: 0 calc(100vw / 750 * 10);
}
.landscape .mid-item {
  width: calc(100vh / 750 * 56);
  height: calc(100vh / 750 * 27);
  border-radius: calc(100vh / 1080 * 12);
  margin: 0 calc(100vh / 750 * 10);
}
</style>
