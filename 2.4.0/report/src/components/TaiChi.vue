<template>
  <div class="taiChi">
    <div class="img" @click="newEntryPush('ct0007.0')">
      <img src="../assets/android/report_icon_question_mark.svg" alt="" />
    </div>
    <svg :width="windowWidth * 638" :height="windowWidth * 420">
      <!-- 底色 -->
      <rect
        :width="windowWidth * 609"
        :x="windowWidth * 40"
        :height="windowWidth * 100"
        style="fill:rgba(55,115,171,0.1);"
      />
      <rect
        :width="windowWidth * 609"
        :x="windowWidth * 40"
        :y="windowWidth * 100"
        :height="windowWidth * 100"
        style="fill:rgba(255,190,0,0.1);"
      />
      <rect
        :width="windowWidth * 609"
        :x="windowWidth * 40"
        :y="windowWidth * 200"
        :height="windowWidth * 100"
        style="fill:rgba(250,112,96,0.1);"
      />
      <rect
        :width="windowWidth * 609"
        :x="windowWidth * 40"
        :y="windowWidth * 300"
        :height="windowWidth * 100"
        style="fill:rgba(255,0,0,0.1);"
      />
      <!-- 刻度线 -->
      <line
        :x1="windowWidth * 40"
        y1="0"
        :x2="windowWidth * 40"
        :y2="windowWidth * 400"
        style="stroke:#999;stroke-width:1"
      />
      <line
        :x1="windowWidth * 40"
        y1="0"
        :x2="windowWidth * 93"
        y2="0"
        style="stroke:#999;stroke-width:1"
      />
      <line
        :x1="windowWidth * 40"
        :y1="windowWidth * 40"
        :x2="windowWidth * 64"
        :y2="windowWidth * 40"
        style="stroke:#999;stroke-width:1"
      />
      <line
        :x1="windowWidth * 40"
        :y1="windowWidth * 80"
        :x2="windowWidth * 64"
        :y2="windowWidth * 80"
        style="stroke:#999;stroke-width:1"
      />
      <line
        :x1="windowWidth * 40"
        :y1="windowWidth * 120"
        :x2="windowWidth * 64"
        :y2="windowWidth * 120"
        style="stroke:#999;stroke-width:1"
      />
      <line
        :x1="windowWidth * 40"
        :y1="windowWidth * 160"
        :x2="windowWidth * 64"
        :y2="windowWidth * 160"
        style="stroke:#999;stroke-width:1"
      />
      <line
        :x1="windowWidth * 40"
        :y1="windowWidth * 200"
        :x2="windowWidth * 64"
        :y2="windowWidth * 200"
        style="stroke:#999;stroke-width:1"
      />
      <line
        :x1="windowWidth * 40"
        :y1="windowWidth * 240"
        :x2="windowWidth * 64"
        :y2="windowWidth * 240"
        style="stroke:#999;stroke-width:1"
      />
      <line
        :x1="windowWidth * 40"
        :y1="windowWidth * 280"
        :x2="windowWidth * 64"
        :y2="windowWidth * 280"
        style="stroke:#999;stroke-width:1"
      />
      <line
        :x1="windowWidth * 40"
        :y1="windowWidth * 320"
        :x2="windowWidth * 64"
        :y2="windowWidth * 320"
        style="stroke:#999;stroke-width:1"
      />
      <line
        :x1="windowWidth * 40"
        :y1="windowWidth * 360"
        :x2="windowWidth * 64"
        :y2="windowWidth * 360"
        style="stroke:#999;stroke-width:1"
      />
      <line
        :x1="windowWidth * 40"
        :y1="windowWidth * 400"
        :x2="windowWidth * 93"
        :y2="windowWidth * 400"
        style="stroke:#999;stroke-width:1"
      />
      <!-- 太极底色 -->
      <circle
        :cx="windowWidth * 345"
        :cy="windowWidth * 200"
        :r="windowWidth * 200"
        fill="#fff"
      />
      <!-- 阴剪切路径 -->
      <defs>
        <clipPath id="cut-left-path">
          <path
            :d="
              'M' +
                windowWidth * 345 +
                ' ' +
                0 +
                ' Q' +
                windowWidth * 265 +
                ' ' +
                windowWidth * 100 +
                ' ' +
                windowWidth * 345 +
                ' ' +
                windowWidth * 200 +
                ' Q' +
                windowWidth * 425 +
                ' ' +
                windowWidth * 300 +
                ' ' +
                windowWidth * 345 +
                ' ' +
                windowWidth * 400 +
                ' A' +
                windowWidth * 200 +
                ' ' +
                windowWidth * 200 +
                ' ' +
                0 +
                ' ' +
                0 +
                ' ' +
                1 +
                ' ' +
                windowWidth * 345 +
                ' ' +
                0 +
                ' Z'
            "
          />
        </clipPath>
      </defs>
      <!-- 阳剪切路径 -->
      <defs>
        <clipPath id="cut-right-path">
          <path
            :d="
              'M' +
                windowWidth * 345 +
                ' ' +
                0 +
                ' Q' +
                windowWidth * 265 +
                ' ' +
                windowWidth * 100 +
                ' ' +
                windowWidth * 345 +
                ' ' +
                windowWidth * 200 +
                ' Q' +
                windowWidth * 425 +
                ' ' +
                windowWidth * 300 +
                ' ' +
                windowWidth * 345 +
                ' ' +
                windowWidth * 400 +
                ' A' +
                windowWidth * 200 +
                ' ' +
                windowWidth * 200 +
                ' ' +
                0 +
                ' ' +
                0 +
                ' ' +
                0 +
                ' ' +
                windowWidth * 345 +
                ' ' +
                0 +
                ' Z'
            "
          />
        </clipPath>
      </defs>
      <!-- 阴底色动画 -->
      <path
        :d="yinPathOne"
        clip-path="url(#cut-left-path)"
        style="fill:#3773AB;"
      >
        <animate
          attributeName="d"
          :values="yinPathOne + ';' + yinPathTwo"
          dur="2s"
          repeatCount="indefinite"
        />
      </path>
      <!-- 阳底色动画 -->
      <path
        :d="yangPathOne"
        clip-path="url(#cut-right-path)"
        style="fill:#EAA926;"
      >
        <animate
          attributeName="d"
          :values="yangPathOne + ';' + yangPathTwo"
          dur="2s"
          repeatCount="indefinite"
        />
      </path>
      <!-- 太极分割线 -->
      <path
        :d="
          'M' +
            windowWidth * 345 +
            ' ' +
            0 +
            ' Q' +
            windowWidth * 265 +
            ' ' +
            windowWidth * 100 +
            ' ' +
            windowWidth * 345 +
            ' ' +
            windowWidth * 200 +
            ' Q' +
            windowWidth * 425 +
            ' ' +
            windowWidth * 300 +
            ' ' +
            windowWidth * 345 +
            ' ' +
            windowWidth * 400
        "
        style="fill:none;stroke:#eee;stroke-width:2;"
      />
      <!-- 太极边框 -->
      <circle
        :cx="windowWidth * 345"
        :cy="windowWidth * 200"
        :r="windowWidth * 195"
        stroke="#eee"
        :stroke-width="windowWidth * 10"
        fill="none"
      />
      <!-- 刻度标记 -->
      <text
        x="0"
        :y="windowWidth * 18"
        fill="#999"
        :style="{ fontSize: windowWidth * 24 }"
      >
        100
      </text>
      <text
        :x="windowWidth * 5"
        :y="windowWidth * 52"
        fill="#999"
        :style="{ fontSize: windowWidth * 24 }"
      >
        90
      </text>
      <text
        :x="windowWidth * 5"
        :y="windowWidth * 92"
        fill="#999"
        :style="{ fontSize: windowWidth * 24 }"
      >
        80
      </text>
      <text
        :x="windowWidth * 5"
        :y="windowWidth * 132"
        fill="#999"
        :style="{ fontSize: windowWidth * 24 }"
      >
        70
      </text>
      <text
        :x="windowWidth * 5"
        :y="windowWidth * 172"
        fill="#999"
        :style="{ fontSize: windowWidth * 24 }"
      >
        60
      </text>
      <text
        :x="windowWidth * 5"
        :y="windowWidth * 212"
        fill="#999"
        :style="{ fontSize: windowWidth * 24 }"
      >
        50
      </text>
      <text
        :x="windowWidth * 5"
        :y="windowWidth * 252"
        fill="#999"
        :style="{ fontSize: windowWidth * 24 }"
      >
        40
      </text>
      <text
        :x="windowWidth * 5"
        :y="windowWidth * 292"
        fill="#999"
        :style="{ fontSize: windowWidth * 24 }"
      >
        30
      </text>
      <text
        :x="windowWidth * 5"
        :y="windowWidth * 332"
        fill="#999"
        :style="{ fontSize: windowWidth * 24 }"
      >
        20
      </text>
      <text
        :x="windowWidth * 7"
        :y="windowWidth * 372"
        fill="#999"
        :style="{ fontSize: windowWidth * 24 }"
      >
        10
      </text>
      <text
        :x="windowWidth * 14"
        :y="windowWidth * 412"
        fill="#999"
        :style="{ fontSize: windowWidth * 24 }"
      >
        0
      </text>
      <!-- 状态标记 -->
      <text
        :x="windowWidth * 80"
        :y="windowWidth * 56"
        fill="#999"
        :style="{ fontSize: windowWidth * 26 }"
        style="fontWeight: normal"
      >
        高
      </text>
      <text
        :x="windowWidth * 80"
        :y="windowWidth * 156"
        fill="#999"
        :style="{ fontSize: windowWidth * 26 }"
        style="fontWeight: normal"
      >
        中
      </text>
      <text
        :x="windowWidth * 80"
        :y="windowWidth * 256"
        fill="#999"
        :style="{ fontSize: windowWidth * 26 }"
        style="fontWeight: normal"
      >
        低
      </text>
      <text
        :x="windowWidth * 80"
        :y="windowWidth * 356"
        fill="#999"
        :style="{ fontSize: windowWidth * 26 }"
        style="fontWeight: normal"
      >
        极低
      </text>
      <!-- 阴阳标记 -->
      <text
        :x="windowWidth * 234"
        :y="windowWidth * 217"
        fill="#333"
        :style="{ fontSize: windowWidth * 35 }"
        style="fontWeight: normal"
      >
        阴
      </text>
      <text
        :x="windowWidth * 444"
        :y="windowWidth * 217"
        fill="#333"
        :style="{ fontSize: windowWidth * 35 }"
        style="fontWeight: normal"
      >
        阳
      </text>
    </svg>
    <div class="info">
      <div class="number">
        <div class="item" @click="newEntryPush('ct0001.0')">
          <div class="num yin">{{ yinyang[0].value }}</div>
          <div class="text">
            阴指数
            <div class="img">
              <img
                src="../assets/android/report_icon_question_mark.svg"
                alt=""
              />
            </div>
          </div>
        </div>
        <div class="line"></div>
        <div class="item" @click="newEntryPush('ct0002.0')">
          <div class="num yang">{{ yinyang[1].value }}</div>
          <div class="text">
            阳指数
            <div class="img">
              <img
                src="../assets/android/report_icon_question_mark.svg"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <div class="rule">
        <div class="item" v-for="(item, index) in yinzi" :key="index">
          <div class="right">
            <div
              class="valueInfo"
              :style="{
                marginLeft: ((windowWidth * item.value) / 10) * 297 + 'px',
                backgroundColor: valueColors[item.value]
              }"
            >
              <div class="value" :style="{ color: valueColors[item.value] }">
                {{ item.value }}
              </div>
              <div class="text">
                {{
                  item.value > 6 ? '重度' : 3 >= item.value ? '轻度' : '中度'
                }}
              </div>
              <div
                class="mid"
                :style="{
                  left: ((windowWidth * item.value) / 10) * 149 + 'px',
                  borderTopColor: valueColors[item.value]
                }"
              ></div>
            </div>
          </div>
          <div class="main">
            <div class="text" @click="newEntryPush(item.key)">
              {{ item.label }}指数
              <div class="img">
                <img
                  src="../assets/android/report_icon_question_mark.svg"
                  alt=""
                />
              </div>
            </div>
            <div class="bg">
              <div
                class="value"
                :style="{
                  width: ((windowWidth * item.value) / 10) * 457 + 'px'
                }"
              ></div>
            </div>
          </div>
          <div class="right">
            <div class="num">
              <div>0</div>
              <div>1</div>
              <div>2</div>
              <div>3</div>
              <div>4</div>
              <div>5</div>
              <div>6</div>
              <div>7</div>
              <div>8</div>
              <div>9</div>
              <div>10</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="attention">
      <div class="attention-item">
        <div class="icon">
          <img src="../assets/android/icon-info.svg" alt="" />
        </div>
        <div class="right">
          <div class="title">点击问号图标，查看详情</div>
        </div>
      </div>
      <div class="attention-item">
        <div class="left">注：</div>
        <div class="right">
          <div>1. 阴阳指数满分各100，数值越低表示越虚。</div>
          <div>
            2. 湿气指数、血瘀指数均为病理指数，数值越大，则表示健康程度越差。
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'taichi', // 阴阳理疗模块
  props: ['yinyang', 'yinzi'],
  data() {
    return {
      valueColors: [
        '#febe2d',
        '#fdb52e',
        '#fdac2e',
        '#fba130',
        '#fa9631',
        '#f98a32',
        '#f87f33',
        '#f77334',
        '#f66935',
        '#f55f36',
        '#f45537'
      ] // 指数颜色数组
    }
  },
  computed: {
    windowWidth() {
      // 根据屏幕宽度算出单位比列
      return this.$store.state.windowWidth / 750
    },
    valueYinHeight() {
      // 根据阴的值算出阴在八卦中的高度
      return (100 - this.yinyang[0].value) * 4
    },
    valueYangHeight() {
      // 根据阴的值算出阳在八卦中的高度
      return (100 - this.yinyang[1].value) * 4
    },
    yinPathOne() {
      // 根据阴的高度制作阴波浪动画第一部分
      return (
        'M' +
        this.windowWidth * 145 +
        ' ' +
        this.windowWidth * this.valueYinHeight +
        ' Q' +
        this.windowWidth * 245 +
        ' ' +
        this.windowWidth * (this.valueYinHeight + 25) +
        ' ' +
        this.windowWidth * 345 +
        ' ' +
        this.windowWidth * this.valueYinHeight +
        ' Q' +
        this.windowWidth * 445 +
        ' ' +
        this.windowWidth * (this.valueYinHeight - 25) +
        ' ' +
        this.windowWidth * 545 +
        ' ' +
        this.windowWidth * this.valueYinHeight +
        ' Q' +
        this.windowWidth * 645 +
        ' ' +
        this.windowWidth * (this.valueYinHeight + 25) +
        ' ' +
        this.windowWidth * 745 +
        ' ' +
        this.windowWidth * this.valueYinHeight +
        ' Q' +
        this.windowWidth * 845 +
        ' ' +
        this.windowWidth * (this.valueYinHeight - 25) +
        ' ' +
        this.windowWidth * 945 +
        ' ' +
        this.windowWidth * this.valueYinHeight +
        ' L' +
        this.windowWidth * 945 +
        ' ' +
        this.windowWidth * 400 +
        ' L' +
        this.windowWidth * 145 +
        ' ' +
        this.windowWidth * 400
      )
    },
    yinPathTwo() {
      // 根据阴的高度制作阴波浪动画第二部分
      return (
        'M' +
        this.windowWidth * -265 +
        ' ' +
        this.windowWidth * this.valueYinHeight +
        ' Q' +
        this.windowWidth * -165 +
        ' ' +
        this.windowWidth * (this.valueYinHeight + 25) +
        ' ' +
        this.windowWidth * -65 +
        ' ' +
        this.windowWidth * this.valueYinHeight +
        ' Q' +
        this.windowWidth * 45 +
        ' ' +
        this.windowWidth * (this.valueYinHeight - 25) +
        ' ' +
        this.windowWidth * 145 +
        ' ' +
        this.windowWidth * this.valueYinHeight +
        ' Q' +
        this.windowWidth * 245 +
        ' ' +
        this.windowWidth * (this.valueYinHeight + 25) +
        ' ' +
        this.windowWidth * 345 +
        ' ' +
        this.windowWidth * this.valueYinHeight +
        ' Q' +
        this.windowWidth * 445 +
        ' ' +
        this.windowWidth * (this.valueYinHeight - 25) +
        ' ' +
        this.windowWidth * 545 +
        ' ' +
        this.windowWidth * this.valueYinHeight +
        ' L' +
        this.windowWidth * 545 +
        ' ' +
        this.windowWidth * 400 +
        ' L' +
        this.windowWidth * -265 +
        ' ' +
        this.windowWidth * 400
      )
    },
    yangPathOne() {
      // 根据阳的高度制作阳波浪动画第一部分
      return (
        'M' +
        this.windowWidth * 145 +
        ' ' +
        this.windowWidth * this.valueYangHeight +
        ' Q' +
        this.windowWidth * 245 +
        ' ' +
        this.windowWidth * (this.valueYangHeight + 25) +
        ' ' +
        this.windowWidth * 345 +
        ' ' +
        this.windowWidth * this.valueYangHeight +
        ' Q' +
        this.windowWidth * 445 +
        ' ' +
        this.windowWidth * (this.valueYangHeight - 25) +
        ' ' +
        this.windowWidth * 545 +
        ' ' +
        this.windowWidth * this.valueYangHeight +
        ' Q' +
        this.windowWidth * 645 +
        ' ' +
        this.windowWidth * (this.valueYangHeight + 25) +
        ' ' +
        this.windowWidth * 745 +
        ' ' +
        this.windowWidth * this.valueYangHeight +
        ' Q' +
        this.windowWidth * 845 +
        ' ' +
        this.windowWidth * (this.valueYangHeight - 25) +
        ' ' +
        this.windowWidth * 945 +
        ' ' +
        this.windowWidth * this.valueYangHeight +
        ' L' +
        this.windowWidth * 945 +
        ' ' +
        this.windowWidth * 400 +
        ' L' +
        this.windowWidth * 145 +
        ' ' +
        this.windowWidth * 400
      )
    },
    yangPathTwo() {
      // 根据阳的高度制作阳波浪动画第二部分
      return (
        'M' +
        this.windowWidth * -265 +
        ' ' +
        this.windowWidth * this.valueYangHeight +
        ' Q' +
        this.windowWidth * -165 +
        ' ' +
        this.windowWidth * (this.valueYangHeight + 25) +
        ' ' +
        this.windowWidth * -65 +
        ' ' +
        this.windowWidth * this.valueYangHeight +
        ' Q' +
        this.windowWidth * 45 +
        ' ' +
        this.windowWidth * (this.valueYangHeight - 25) +
        ' ' +
        this.windowWidth * 145 +
        ' ' +
        this.windowWidth * this.valueYangHeight +
        ' Q' +
        this.windowWidth * 245 +
        ' ' +
        this.windowWidth * (this.valueYangHeight + 25) +
        ' ' +
        this.windowWidth * 345 +
        ' ' +
        this.windowWidth * this.valueYangHeight +
        ' Q' +
        this.windowWidth * 445 +
        ' ' +
        this.windowWidth * (this.valueYangHeight - 25) +
        ' ' +
        this.windowWidth * 545 +
        ' ' +
        this.windowWidth * this.valueYangHeight +
        ' L' +
        this.windowWidth * 545 +
        ' ' +
        this.windowWidth * 400 +
        ' L' +
        this.windowWidth * -265 +
        ' ' +
        this.windowWidth * 400
      )
    }
  },
  mounted() {},
  destroyed() {},
  methods: {
    newEntryPush(key) {
      this.$store.dispatch('newEntryPush', key)
    }
  }
}
</script>

<style scoped>
.taiChi {
  font-size: calc(100vw / 750 * 32);
  text-align: center;
}
.landscape .taiChi {
  font-size: calc(100vh / 750 * 32);
}
.taiChi .img {
  width: calc(100vw / 750 * 26);
  height: calc(100vw / 750 * 26);
  float: right;
}
.landscape .taiChi .img {
  width: calc(100vh / 750 * 26);
  height: calc(100vh / 750 * 26);
}
.info {
  padding-top: calc(100vw / 750 * 58);
}
.landscape .info {
  padding-top: calc(100vh / 750 * 58);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.number {
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: 1px solid #ccc;
  padding-bottom: calc(100vw / 750 * 30);
}
.landscape .number {
  display: block;
  padding-bottom: 0;
}
.number .line {
  display: inline-block;
  width: 1px;
  height: calc(100vw / 750 * 89);
  background-color: #ccc;
}
.landscape .number .line {
  display: block;
  width: 100%;
  opacity: 0;
  height: calc(100vh / 750 * 26);
}
.number .item {
  width: calc(100vw / 750 * 324);
  font-size: calc(100vw / 750 * 30);
  line-height: calc(100vw / 750 * 30);
  color: #666;
}
.landscape .number .item {
  width: calc(100vh / 750 * 324);
  font-size: calc(100vh / 750 * 30);
  line-height: calc(100vh / 750 * 30);
}
.number .item .num {
  font-size: calc(100vw / 750 * 60);
  line-height: calc(100vw / 750 * 60);
  font-weight: 700;
  padding-bottom: calc(100vw / 750 * 16);
}
.landscape .number .item .num {
  font-size: calc(100vh / 750 * 60);
  line-height: calc(100vh / 750 * 60);
  padding-bottom: calc(100vh / 750 * 16);
}
.number .item .yin {
  color: #3773ab;
}
.number .item .yang {
  color: #eaa926;
}
.number .item .text {
  position: relative;
  display: inline-block;
}
.number .item .text .img {
  display: inline-block;
  width: calc(100vw / 750 * 26);
  height: calc(100vw / 750 * 26);
  position: absolute;
  top: calc(-100vw / 750 * 15);
  right: calc(-100vw / 750 * 48);
  z-index: 2;
}
.landscape .number .item .text .img {
  width: calc(100vh / 750 * 26);
  height: calc(100vh / 750 * 26);
  top: calc(-100vh / 750 * 15);
  right: calc(-100vh / 750 * 48);
}
.rule {
  padding-top: calc(100vw / 750 * 47);
}
.landscape .rule {
  padding-top: 0;
}
.rule .item {
  padding-bottom: calc(100vw / 750 * 26);
}
.landscape .rule .item {
  padding-bottom: calc(100vh / 750 * 26);
}
.rule .item .right {
  padding-left: calc(100vw / 750 * 131);
}
.landscape .rule .item .right {
  padding-left: calc(100vh / 750 * 131);
}
.rule .item .valueInfo {
  display: flex;
  width: calc(70vw / 750 * 195);
  height: calc(100vw / 750 * 60);
  align-items: center;
  border-radius: calc(100vw / 750 * 28);
  background-color: #f34e38;
  box-sizing: border-box;
  padding-left: calc(100vw / 750 * 5);
  margin-bottom: calc(100vw / 750 * 26);
  position: relative;
  box-sizing: border-box;
}
.landscape .rule .item .valueInfo {
  width: calc(70vh / 750 * 195);
  height: calc(100vh / 750 * 60);
  border-radius: calc(100vh / 750 * 28);
  padding-left: calc(100vh / 750 * 5);
  margin-bottom: calc(100vh / 750 * 26);
}
.rule .item .valueInfo .mid {
  position: absolute;
  margin-left: calc(100vw / 750 * 10);
  bottom: calc(-100vw / 750 * 10);
  display: inline-block;
  width: 0;
  height: 0;
  border-left: calc(100vw / 750 * 10) solid transparent;
  border-right: calc(100vw / 750 * 10) solid transparent;
  border-top: calc(100vw / 750 * 16) solid #f34e38;
}
.landscape .rule .item .valueInfo .mid {
  margin-left: calc(100vh / 750 * 10);
  bottom: calc(-100vh / 750 * 10);
  border-left: calc(100vh / 750 * 10) solid transparent;
  border-right: calc(100vh / 750 * 10) solid transparent;
  border-top: calc(100vh / 750 * 16) solid #f34e38;
}
.rule .item .valueInfo .value {
  display: flex;
  font-size: calc(100vw / 750 * 34);
  width: calc(100vw / 750 * 48);
  height: calc(100vw / 750 * 48);
  line-height: calc(100vw / 750 * 34);
  justify-content: center;
  align-items: center;
  background-color: #fff;
  color: #f34e38;
  border-radius: 50%;
  font-weight: 500;
}
.landscape .rule .item .valueInfo .value {
  font-size: calc(100vh / 750 * 34);
  width: calc(100vh / 750 * 48);
  height: calc(100vh / 750 * 48);
  line-height: calc(100vh / 750 * 34);
}
.rule .item .valueInfo .text {
  display: flex;
  padding-left: calc(70vw / 750 * 15);
  justify-content: center;
  align-items: center;
  font-size: calc(100vw / 750 * 28);
  line-height: calc(100vw / 750 * 28);
  height: calc(100vw / 750 * 48);
  color: #fff;
}
.landscape .rule .item .valueInfo .text {
  padding-left: calc(70vh / 750 * 15);
  font-size: calc(100vh / 750 * 28);
  line-height: calc(100vh / 750 * 28);
  height: calc(100vh / 750 * 48);
}
.rule .item .main {
  display: flex;
  align-items: center;
}
.rule .item .main .text {
  position: relative;
  display: inline-block;
  font-size: calc(100vw / 750 * 30);
  line-height: calc(100vw / 750 * 30);
  color: #666;
  margin-right: calc(100vw / 750 * 26);
}
.landscape .rule .item .main .text {
  font-size: calc(100vh / 750 * 30);
  line-height: calc(100vh / 750 * 30);
  margin-right: calc(100vh / 750 * 26);
}
.rule .item .main .text .img {
  display: inline-block;
  width: calc(100vw / 750 * 26);
  height: calc(100vw / 750 * 26);
  position: absolute;
  top: calc(-100vw / 750 * 26);
  right: calc(-100vw / 750 * 26);
  z-index: 2;
}
.landscape .rule .item .main .text .img {
  width: calc(100vh / 750 * 26);
  height: calc(100vh / 750 * 26);
  top: calc(-100vh / 750 * 26);
  right: calc(-100vh / 750 * 26);
}
.rule .item .main .bg {
  background-color: #eee;
  display: inline-block;
  width: calc(100vw / 750 * 457);
  height: calc(100vw / 750 * 27);
  border-radius: calc(100vw / 750 * 14);
  overflow: hidden;
}
.landscape .rule .item .main .bg {
  width: calc(100vh / 750 * 457);
  height: calc(100vh / 750 * 27);
  border-radius: calc(100vh / 750 * 14);
}
.rule .item .main .bg .value {
  background: linear-gradient(to bottom right, #febe2d, #f34e38);
  background-size: calc(100vw / 750 * 457) calc(100vw / 750 * 27);
  height: calc(100vw / 750 * 27);
  border-radius: calc(100vw / 750 * 14);
}
.landscape .rule .item .main .bg .value {
  background-size: calc(100vh / 750 * 457) calc(100vh / 750 * 27);
  height: calc(100vh / 750 * 27);
  border-radius: calc(100vh / 750 * 14);
}
.rule .item .num {
  display: flex;
  justify-content: space-between;
  width: calc(100vw / 750 * 467);
  font-size: calc(100vw / 750 * 22);
  line-height: calc(100vw / 750 * 22);
  color: #666;
  padding-top: calc(100vw / 750 * 13);
  padding-left: calc(100vw / 750 * 15);
}
.landscape .rule .item .num {
  width: calc(100vh / 750 * 467);
  font-size: calc(100vh / 750 * 22);
  line-height: calc(100vh / 750 * 22);
  padding-top: calc(100vh / 750 * 13);
  padding-left: calc(100vh / 750 * 15);
}
.attention {
  border-top: 1px solid #ccc;
  margin-top: calc(100vw / 750 * 36);
  padding: calc(100vw / 750 * 25) 0;
  font-size: calc(100vw / 750 * 20);
}
.landscape .attention {
  margin-top: calc(100vh / 750 * 36);
  padding: calc(100vh / 750 * 25) 0;
  font-size: calc(100vh / 750 * 20);
}
.attention .right {
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
</style>
