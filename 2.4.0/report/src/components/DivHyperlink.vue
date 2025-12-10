<script>
export default {
  name: 'divhyperlink',
  props: {
    content: {
      type: String
    },
    spanStyle: {
      type: Object,
      default () {
        return {
          color: '#CF9155',
          borderBottom: '1px solid #CF9155'
        }
      }
    },
    divClass: {
      type: Boolean,
      default: true
    }
  },
  render: function (createElement) {
    /*
    * '/(\[[\w\u4e00-\u9fa5]+\]\(#[\w|.]+#\))/i'正则
    * aaa[xxx](#key#)bbb
    * xxx 任意中文字符串
    * key 任意 数字 字母 下划线 .
    * 分割结果：[aaa, [xxx](#key#), bbb]
    */
    let contentArr = this.content.split(/(\[[/\uff0c\u3001\uff08\uff09\w\u4e00-\u9fa5]+\]\(#[\w|.]+#\))/i)
    let tagArr = []
    contentArr.forEach((element, index) => {
      /*
      * '/^\[[\w\u4e00-\u9fa5]+\]\(#[\w|.]+#\)$/ig'正则
      * 验证文本格式是否是 [xxx](#key#)
      */
      let rt = /^\[[/\uff0c\u3001\uff08\uff09\w\u4e00-\u9fa5]+\]\(#[\w|.]+#\)$/ig
      if (rt.test(element)) {
        /*
        * '/\[([\w\u4e00-\u9fa5]+)\]\(#([\w|.]+)#\)/i'正则
        * [xxx](#key#
        * 分割结果: ['', 'xxx', 'key', '']
        */
        let aArr = element.split(/\[([/\uff0c\u3001\uff08\uff09\w\u4e00-\u9fa5]+)\]\(#([\w|.]+)#\)/i)
        // 生成a标签 <a style="color: #CF9155" href="javascript:void(0);" @click="newEntryPush(aArr[2])>aArr[1]</a>"
        tagArr.push(createElement(
          'span',
          {
            style: this.spanStyle,
            on: {
              click: () => this.newEntryPush(aArr[2])
            },
            domProps: {
              innerHTML: aArr[1]
            }
          }
        ))
      } else {
        tagArr.push(createElement(
          'span',
          {
            style: {
            },
            domProps: {
              innerHTML: element
            }
          }
        ))
      }
    })
    return createElement(
      'div',
      {
        'class': {
          text: this.divClass
        }
      },
      tagArr
    )
  },
  methods: {
    newEntryPush (key) {
      this.$store.dispatch('newEntryPush', key)
    }
  }
}
</script>
