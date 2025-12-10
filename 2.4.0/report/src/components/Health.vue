<template>
  <div class="health">
    <div>
      <div
        class="carousel"
        :style="{ backgroundImage: 'url(' + headerImg + ')' }"
      >
        <div class="list">
          <div
            class="item"
            v-for="(item, index) in $store.state.landscape
              ? landscapeList
              : list"
            :key="index"
            :style="{
              left:
                selectId * windowWidth +
                movelength +
                index * windowWidth +
                'px',
              transition: itemtransition ? 'all 0.25s' : 'none'
            }"
            @touchstart="itemtouchstart"
            @touchmove="itemtouchmove"
            @touchend="itemtouchend"
          >
            <img class="img" :src="item.img" alt="" />
          </div>
          <div
            class="button"
            :style="{ left: 'calc(50% - ' + (list.length * 2 - 1) * 4 + 'px' }"
          >
            <div
              class="icon"
              v-for="(item, index) in list"
              :key="index"
              :style="{
                backgroundColor:
                  selectId === -index ? '#CF9155' : 'rgba(255, 255, 255, 0.6)'
              }"
              @click="selectItem(index)"
            ></div>
          </div>
        </div>
      </div>
      <div class="encyclopedia">
        <div class="list">
          <div
            class="item"
            v-for="(item, index) in Math.ceil(classList.length / 15)"
            :key="index"
          >
            <div class="info">
              <div
                class="item_in"
                v-for="(item1, index1) in classList.slice(
                  index * 15,
                  (index + 1) * 15
                )"
                :key="index1"
                @click="routetToInfo(item1)"
              >
                <div class="img_in"><img :src="item1.img" alt="" /></div>
                <div class="text">{{ item1.text }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="entry">
        <div class="title"><span>词条推荐</span></div>
        <div class="list">
          <div
            class="item"
            v-for="(item, index) in Math.ceil(recommendList.length / 6)"
            :key="index"
            :style="{
              left:
                recommendSelectId * windowWidth +
                recommendMovelength +
                index * windowWidth +
                'px',
              transition: recommendItemtransition ? 'all 0.25s' : 'none'
            }"
            @touchstart="recommendItemtouchstart"
            @touchmove="recommendItemtouchmove"
            @touchend="recommendItemtouchend"
          >
            <div class="recommend">
              <div
                class="item_in"
                v-for="(item1, index1) in recommendList.slice(
                  index * 6,
                  (index + 1) * 6
                )"
                :key="index1"
                @click="newEntryPush(item1.key)"
              >
                {{ item1.name }}
              </div>
            </div>
          </div>
          <div
            class="button"
            :style="{
              left:
                'calc(50% - ' +
                (Math.ceil(recommendList.length / 6) * 2 - 1) * 4 +
                'px'
            }"
          >
            <div
              class="icon"
              v-for="(item, index) in Math.ceil(recommendList.length / 6)"
              :key="index"
              :style="{
                backgroundColor:
                  recommendSelectId === -index ? '#CF9155' : '#979797'
              }"
              @click="recommendSelectItem(index)"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import headerImg from '../assets/bg.png'
import firstimg from '../assets/first.png'
import landscapeFirstimg from '../assets/landscape-first.png'
import jksvg from '../assets/jk.svg'
import ccsvg from '../assets/cc.svg'
import cpsvg from '../assets/cc_point.svg'
import comdsvg from '../assets/comd.svg'
import cdsvg from '../assets/cd.svg'
import sdsvg from '../assets/sd.svg'
import stsvg from '../assets/solar_terms.svg'
import moxisvg from '../assets/moxi.svg'
import ctsvg from '../assets/ct.svg'
import tuinasvg from '../assets/tuina.svg'
import meddietsvg from '../assets/meddiet.svg'
import prescriptionsvg from '../assets/prescription.svg'
import foodsvg from '../assets/food.svg'
export default {
  name: 'health',
  data() {
    return {
      headerImg,
      // 轮播图列表
      list: [
        {
          img: firstimg
        }
      ],
      landscapeList: [
        {
          img: landscapeFirstimg
        }
      ],
      // 类别列表
      classList: [
        {
          img: jksvg,
          text: '健康状态',
          key: 'jk'
        },
        {
          img: ccsvg,
          text: '经络概述',
          key: 'cc'
        },
        {
          img: cpsvg,
          text: '经络穴位',
          key: 'cc_point'
        },
        {
          img: comdsvg,
          text: '常见病',
          key: 'comd'
        },
        {
          img: cdsvg,
          text: '体质辨证',
          key: 'cd'
        },
        {
          img: sdsvg,
          text: '脏腑辨证',
          key: 'sd'
        },
        {
          img: ctsvg,
          text: '理疗因子',
          key: 'ct'
        },
        {
          img: tuinasvg,
          text: '推拿',
          key: 'tuina'
        },
        {
          img: moxisvg,
          text: '艾灸',
          key: 'moxi'
        },
        {
          img: stsvg,
          text: '24节气养生',
          key: 'solar_terms'
        },
        {
          img: meddietsvg,
          text: '药膳',
          key: 'meddiet'
        },
        {
          img: prescriptionsvg,
          text: '方剂',
          key: 'prescription'
        },
        {
          img: foodsvg,
          text: '食材',
          key: 'food'
        }
      ],
      recommendList: [
        {
          name: '血压',
          key: 'jbct_point_2'
        },
        {
          name: '心包经',
          key: 'c0'
        },
        {
          name: '血糖',
          key: 'jbct_point_1'
        },
        {
          name: '血脂',
          key: 'jbct_point_3'
        },
        {
          name: '膀胱经',
          key: 'c7'
        },
        {
          name: '抑郁',
          key: 'jbct_point_19'
        }
      ], // 推荐列表
      startlength: 0, // 轮播图开始距离
      movelength: 0, // 轮播图滑动距离
      itemtransition: true, // 轮播图动画布尔值
      scrollTimeOut: false, // 轮播图延迟事件
      selectId: 0, // 轮播图当前页面Id
      classStartlength: 0, // 类别开始距离
      classMovelength: 0, // 类别滑动距离
      classItemtransition: true, // 类别动画布尔值
      classSelectId: 0, // 类别当前页面Id
      recommendStartlength: 0, // 推荐开始距离
      recommendMovelength: 0, // 推荐滑动距离
      recommendItemtransition: true, // 推荐动画布尔值
      recommendSelectId: 0 // 推荐当前页面Id
    }
  },
  computed: {
    windowWidth() {
      return this.$store.state.windowWidth
    }
  },
  beforeMount() {},
  mounted() {
    this.$store.state.isLoading = false
    if (this.$route.query.title) {
      this.$store.dispatch('changeTitle', this.$route.query.title)
    } else {
      this.$store.dispatch('changeTitle', '健康百科')
    }
    this.moveAuto()
  },
  destroyed() {},
  methods: {
    closeTouch(e) {
      e.preventDefault()
    },
    newEntryPush(key) {
      this.$store.state.entryVersion = '2-4'
      this.$store.dispatch('newEntryPush', key)
    },
    routetToInfo(item) {
      this.$store.dispatch('webPush', {
        name: 'healthinfo',
        query: { title: item.text, key: item.key }
      })
    },
    healthStatus(val) {
      this.healthShow = val
    },
    selectItem(i) {
      this.selectId = -i
      if (this.scrollTimeOut) {
        clearTimeout(this.scrollTimeOut)
      }
      this.moveAuto()
    },
    moveAuto() {
      this.scrollTimeOut = setTimeout(() => {
        if (this.selectId - 1 > -this.list.length) {
          this.selectId--
        } else {
          this.selectId = 0
        }
        this.moveAuto()
      }, 3000)
    },
    itemtouchstart(e) {
      document.body.addEventListener('touchmove', this.closeTouch, {
        passive: false
      })
      this.startlength = e.changedTouches[0].clientX
      this.itemtransition = false
      if (this.scrollTimeOut) {
        clearTimeout(this.scrollTimeOut)
      }
    },
    itemtouchmove(e) {
      e.preventDefault()
      document.body.addEventListener('touchmove', this.closeTouch, {
        passive: false
      })
      this.movelength = e.changedTouches[0].clientX - this.startlength
    },
    itemtouchend(e) {
      document.body.removeEventListener('touchmove', this.closeTouch)
      this.itemtransition = true
      if (this.movelength >= window.screen.width / 10) {
        if (this.selectId < 0) {
          this.selectId++
        }
      } else if (this.movelength <= -window.screen.width / 10) {
        if (this.selectId - 1 > -this.list.length) {
          this.selectId--
        }
      }
      this.movelength = 0
      if (this.scrollTimeOut) {
        clearTimeout(this.scrollTimeOut)
      }
      this.moveAuto()
    },
    classSelectItem(i) {
      this.classSelectId = -i
    },
    classItemtouchstart(e) {
      document.body.addEventListener('touchmove', this.closeTouch, {
        passive: false
      })
      this.classStartlength = e.changedTouches[0].clientX
      this.classItemtransition = false
    },
    classItemtouchmove(e) {
      document.body.addEventListener('touchmove', this.closeTouch, {
        passive: false
      })
      this.classMovelength = e.changedTouches[0].clientX - this.classStartlength
    },
    classItemtouchend(e) {
      document.body.removeEventListener('touchmove', this.closeTouch)
      this.classItemtransition = true
      if (this.classMovelength >= window.screen.width / 10) {
        if (this.classSelectId < 0) {
          this.classSelectId++
        }
      } else if (this.classMovelength <= -window.screen.width / 10) {
        if (this.classSelectId - 1 > -Math.ceil(this.classList.length / 10)) {
          this.classSelectId--
        }
      }
      this.classMovelength = 0
    },
    recommendSelectItem(i) {
      this.recommendSelectId = -i
    },
    recommendItemtouchstart(e) {
      document.body.addEventListener('touchmove', this.closeTouch, {
        passive: false
      })
      this.recommendStartlength = e.changedTouches[0].clientX
      this.recommendItemtransition = false
    },
    recommendItemtouchmove(e) {
      document.body.addEventListener('touchmove', this.closeTouch, {
        passive: false
      })
      this.recommendMovelength =
        e.changedTouches[0].clientX - this.recommendStartlength
    },
    recommendItemtouchend(e) {
      document.body.removeEventListener('touchmove', this.closeTouch)
      this.recommendItemtransition = true
      if (this.recommendMovelength >= window.screen.width / 10) {
        if (this.recommendSelectId < 0) {
          this.recommendSelectId++
        }
      } else if (this.recommendMovelength <= -window.screen.width / 10) {
        if (
          this.recommendSelectId - 1 >
          -Math.ceil(this.recommendList.length / 6)
        ) {
          this.recommendSelectId--
        }
      }
      this.recommendMovelength = 0
    }
  }
}
</script>
<style scoped>
.health {
  text-align: center;
  background-color: #fff;
  font-weight: 400;
}
.carousel {
  height: calc(100vw / 750 * 216);
  padding-top: calc(100vw / 750 * 7);
  background-size: 100%;
  background-repeat: repeat;
}
.landscape .carousel {
  background-size: 50%;
  padding-top: 0;
  height: calc(100vh / 750 * 146);
}
.encyclopedia {
  padding-top: calc(100vw / 750 * 90);
}
.landscape .encyclopedia {
  padding-top: calc(100vh / 750 * 96);
  padding-bottom: calc(100vh / 750 * 10);
}
.list {
  position: relative;
  overflow: hidden;
}
.carousel .list {
  height: calc(100vw / 750 * 284);
}
.landscape .carousel .list {
  height: calc(100vh / 750 * 229);
}
.carousel .list .item {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 2;
}
.carousel .list .item .img {
  display: block;
  width: calc(100vw / 750 * 725);
  height: calc(100vw / 750 * 284);
  border-radius: 10px;
  margin: 0 auto;
}
.landscape .carousel .list .item .img {
  width: calc(100vh / 750 * 1251);
  height: calc(100vh / 750 * 229);
}
.carousel .list .button {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 3;
}
.carousel .list .button .icon {
  vertical-align: bottom;
  display: inline-block;
  width: 8px;
  height: 8px;
  margin-bottom: 10px;
  border-radius: 50%;
}
.carousel .list .button .icon + .icon {
  margin-left: 8px;
}
.info {
  display: flex;
  flex-wrap: wrap;
}
.landscape .info {
  width: calc(100vh / 750 * 180 * 7);
  margin: 0 auto;
}
.info .item_in {
  width: 20%;
  padding-bottom: calc(100vw / 750 * 20);
}
.landscape .info .item_in {
  width: calc(100vh / 750 * 160);
  padding: calc(100vh / 750 * 10);
}
.info .item_in .img_in {
  display: inline-block;
  width: calc(100vw / 750 * 92);
}
.landscape .info .item_in .img_in {
  width: calc(100vh / 750 * 100);
  margin: 0 auto;
}
.info .item_in .text {
  font-size: calc(100vw / 750 * 26);
}
.landscape .info .item_in .text {
  font-size: calc(100vh / 750 * 26);
}
.entry {
  border-top: calc(100vw / 750 * 28) solid #ececec;
}
.landscape .entry {
  border-top: calc(100vh / 750 * 21) solid #ececec;
}
.recommend {
  display: flex;
  flex-wrap: wrap;
}
.landscape .recommend {
  justify-content: center;
  border-bottom: 1px solid #f5f5f5;
  margin-bottom: calc(100vh / 750 * 32);
}
.entry .title {
  color: #cf9155;
  padding: calc(100vw / 750 * 23) 0;
  font-size: calc(100vw / 750 * 32);
  box-sizing: border-box;
  border-bottom: 1px solid #f5f5f5;
}
.landscape .entry .title {
  padding: calc(100vh / 750 * 25) 0;
  font-size: calc(100vh / 750 * 32);
}
.entry .title .img {
  display: inline-block;
  width: calc(100vw / 750 * 28);
  height: calc(100vw / 750 * 28);
  margin-right: calc(100vw / 750 * 14);
}
.entry .title * {
  vertical-align: middle;
}
.recommend .item_in {
  height: calc(100vw / 750 * 67);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: calc(100vw / 750 * 30);
  width: 33.33%;
  box-sizing: border-box;
  border-bottom: 1px solid #f5f5f5;
  border-right: 1px solid #f5f5f5;
}
.landscape .recommend .item_in {
  height: calc(100vh / 750 * 67);
  font-size: calc(100vh / 750 * 30);
  width: calc(100vh / 750 * 208);
  border-bottom: none;
}
/* :nth-child(even) 子元素偶数 */
/* :nth-child(odd) 子元素奇数 */
.recommend .item_in:nth-child(3n + 3) {
  border-right: none;
}
.landscape .recommend .item_in {
  border-right: none;
}
.landscape .recommend .item_in + .item_in {
  border-left: 1px solid #f5f5f5;
}
</style>
