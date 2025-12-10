<template>
  <div class="conditoning-advice">
    <div class="list">
      <div class="item" v-if="dietaryAdvice.length>0">
        <div class="left">
          <div class="icon recipe">
            <img src="../assets/recipe.svg" alt="">
          </div>
          <div class="name">
            食疗建议
          </div>
        </div>
        <div class="right">
          <span class="text" v-for="item in dietaryAdvice.slice(0, 2)" :key="item.key">
            {{content(item.content)}}<span class="join">、</span><span v-if="item.content.length>=30">...</span>
          </span>
          <span v-if="dietaryAdvice.length>2">...</span>
          <div class="btn" @click="entryHTML(dietaryAdvice, '食疗建议')">
            点击查看
          </div>
        </div>
      </div>
      <div class="item" v-if="sportsAdvice.length>0">
        <div class="left">
          <div class="icon sport">
            <img src="../assets/sport.svg" alt="">
          </div>
          <div class="name">
            运动建议
          </div>
        </div>
        <div class="right">
          <span class="text" v-for="item in sportsAdvice.slice(0, 2)" :key="item.key">
            {{content(item.content)}}<span class="join">、</span><span v-if="item.content.length>=30">...</span>
          </span>
          <span v-if="sportsAdvice.length>2">...</span>
          <div class="btn" @click="entryHTML(sportsAdvice, '运动建议')">
            点击查看
          </div>
        </div>
      </div>
      <div class="item" v-if="chineseMedicineAdvice.length>0">
        <div class="left">
          <div class="icon ac">
            <img src="../assets/medicine.svg" alt="">
          </div>
          <div class="name">
            中药建议
          </div>
        </div>
        <div class="right">
          <span class="text" v-for="item in chineseMedicineAdvice.slice(0, 2)" :key="item.key">
            {{content(item.content)}}<span class="join">、</span><span v-if="item.content.length>=30">...</span>
          </span>
          <span v-if="chineseMedicineAdvice.length>2">...</span>
          <div class="btn" @click="entryHTML(chineseMedicineAdvice, '中药建议')">
            点击查看
          </div>
        </div>
      </div>
      <div class="item" v-if="physicalTherapyAdvice.length>0">
        <div class="left">
          <div class="icon ac">
            <img src="../assets/ac.svg" alt="">
          </div>
          <div class="name">
            理疗建议
          </div>
        </div>
        <div class="right">
          <span class="text" v-for="item in physicalTherapyAdvice.slice(0, 2)" :key="item.key">
            {{content(item.content)}}<span class="join">、</span><span v-if="item.content.length>=30">...</span>
          </span>
          <span v-if="physicalTherapyAdvice.length>2">...</span>
          <div class="btn" @click="entryHTML(physicalTherapyAdvice, '理疗建议')">
            点击查看
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'conditoning-advice',
  props: ['dietaryAdvice', 'sportsAdvice', 'chineseMedicineAdvice', 'physicalTherapyAdvice'],
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
    content (val) {
      let returnArr = []
      let contentArr = val.split(/(\[[/，、 \w\u4e00-\u9fa5]+\]\(#[\w|.]+#\))/i)
      contentArr.forEach((element) => {
        let rt = /^\[[/，、 \w\u4e00-\u9fa5]+\]\(#[\w|.]+#\)$/ig
        if (rt.test(element)) {
          let aArr = element.split(/\[([/，、 \w\u4e00-\u9fa5]+)\]\(#([\w|.]+)#\)/i)
          returnArr.push(aArr[1])
        } else {
          returnArr.push(element)
        }
      })
      return returnArr.join('').slice(0, 30)
    },
    entryHTML (list, title) {
      let keys = []
      list.forEach(element => {
        if (element.key) {
          keys.push(element.key)
        }
      })
      let query = this.$router.history.current.query
      query.keys = keys.join('-')
      query.title = title
      this.$router.push({name: 'entry-html', query: query})
    }
  },
  components: {
  }
}
</script>
<style scoped>
.conditoning-advice{
}
.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: calc(100vw/750*30) 0;
}
.landscape .item {
  padding: calc(100vh/750*30) 0;
}
.item + .item {
  border-top: 1px solid #cccccc;
}
.icon {
  margin: 0 auto;
}
.recipe {
  width: calc(100vw/750*58);
}
.landscape .recipe {
  width: calc(100vh/750*58);
}
.sport {
  width: calc(100vw/750*74);
}
.landscape .sport {
  width: calc(100vh/750*74);
}
.ac {
  width: calc(100vw/750*63);
}
.landscape .ac {
  width: calc(100vh/750*63);
}
.name {
  font-size: calc(100vw/750*30);
  color: #666666;
  text-align: center;
  padding-top: calc(100vw/750*23);
}
.landscape .name {
  font-size: calc(100vh/750*30);
  padding-top: calc(100vh/750*23);
}
.left {
  width: calc(100vw/750*150);
  min-width: calc(100vw/750*150);
  border-right: 1px solid #dddddd;
}
.landscape .left {
  width: calc(100vh/750*150);
  min-width: calc(100vh/750*150);
}
.right {
  width: 100%;
  padding-left: calc(100vw/750*26);
  font-size: calc(100vw/750*28);
  text-align: left;
}
.landscape .right {
  padding-left: calc(100vh/750*26);
  font-size: calc(100vh/750*28);
}
.right .text:nth-last-child(2) .join {
  display: none;
}
.btn {
  color: #3773AB;
  padding-top: calc(100vw/750*23);
}
.landscape .btn {
  padding-top: calc(100vh/750*23);
}
</style>
