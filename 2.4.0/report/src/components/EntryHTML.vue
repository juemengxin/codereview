<template>
  <div class="entry-html">
    <div v-html="entryShow"></div>
  </div>
</template>
<script>
import axios from 'axios' // http请求插件
const urljoin = require('url-join')
export default {
  name: 'entry-html',
  data() {
    return {
      keys: [],
      entryShow: '',
      index: 0
    }
  },
  computed: {
    random() {
      const seedArr = [
        '0',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
        'g',
        'h',
        'i',
        'j',
        'k',
        'l',
        'm',
        'n',
        'o',
        'p',
        'q',
        'r',
        's',
        't',
        'u',
        'v',
        'w',
        'x',
        'y',
        'z'
      ]
      let seed =
        seedArr[Math.floor(Math.random() * 36)] +
        seedArr[Math.floor(Math.random() * 36)] +
        seedArr[Math.floor(Math.random() * 36)] +
        seedArr[Math.floor(Math.random() * 36)]
      return '?random=' + seed
    }
  },
  beforeMount() {
    const t = this
    if (t.$route.query.keys) {
      t.keys = t.$route.query.keys.split('-')
      t.$store.state.isLoading = false
    }
    if (this.$route.query.title) {
      this.$store.dispatch('changeTitle', this.$route.query.title)
    }
    t.getHTML()
  },
  mounted() {
    const t = this
    t.$store.state.analysisReportShow = false
  },
  destroyed() {
    const t = this
    t.$store.state.analysisReportShow = true
  },
  methods: {
    getHTML() {
      const t = this
      var env = ''
      if (process.env.ENV !== 'prod') {
        env = '?env=' + process.env.ENV
      }
      var entryVersion = '&version=2-4'
      axios({
        method: 'get',
        url: urljoin(
          'https://go.jinmuhealth.com/e/',
          t.keys[t.index] + env + entryVersion
        )
      }).then((res) => {
        function replacer(match, p1, offset, string) {
          let url = new URL(p1, res.request.responseURL)
          return 'src="' + url + '"'
        }
        t.entryShow += res.data
          .split('<body>')[1]
          .split('</body>')[0]
          .replace(/src="(.+?)"/gi, replacer)
        t.index = t.index + 1
        if (t.index < t.keys.length) {
          t.getHTML()
        }
      })
    }
  },
  components: {}
}
</script>
<style>
.entry-html {
  padding: 10px;
}
.entry-html .title {
  color: #cf9155;
  font-size: 2.5rem;
  font-weight: 900;
}
.entry-html h1 {
  color: #cf9155;
  font-family: 'Noto', '苹方', 'Roboto', 'San Francisco' ， 'Hiragino Sans GB',
    'Microsoft YaHei', 'WenQuanYi Micro Hei', sans-serif, 'helvetica neue',
    arial, 'hiragino sans gb', stheiti, \5fae\8f6f\96c5\9ed1, \5b8b\4f53;
}
.entry-html p {
  color: #333333;
  line-height: 2em;
  font-family: 'Noto', '苹方', 'Roboto', 'San Francisco' ， 'Hiragino Sans GB',
    'Microsoft YaHei', 'WenQuanYi Micro Hei', sans-serif, 'helvetica neue',
    arial, 'hiragino sans gb', stheiti, \5fae\8f6f\96c5\9ed1, \5b8b\4f53;
}
.entry-html ol {
  line-height: 2em;
  color: #333333;
}

.entry-html h2 {
  color: #cf9155;
  margin-bottom: 5px;
  margin-top: 5px;
}
.entry-html h3 {
  color: #333333;
}
.entry-html span {
  padding-left: 5px;
  padding-right: 5px;
  padding-bottom: 2px;
  padding-top: 2px;
  background: #f5e9dd;
}
.entry-html a {
  color: #cf9155;
}
.entry-html .h img {
  width: 100%;
  height: 100%;
}
.entry-html h5 {
  color: #cf9155;
}
.entry-html b {
  color: #cf9155;
}
</style>
