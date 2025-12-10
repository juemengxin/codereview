<i18n>
{
  "en": {},
  "zh-Hans": {},
  "zh-Hant": {}
}
</i18n>
<template>
  <div class="jm-input" :class="iClass">
    <input
    :value="value"
    :type="type"
    :placeholder="placeholder"
    :disabled="disabled"
    :readonly="readonly"
    :maxlength="maxlength"
    @focus="onFocus"
    @blur="onBlur"
    @input="$emit('input', $event.target.value)">
    <div class="icon" v-if="iconShow" @click="onClick">
      <img src="../assets/app/icon-clean.svg" alt="">
    </div>
  </div>
</template>
<script>
export default {
  name: 'jm-input',
  props: {
    type: {
      type: String,
      default: 'text'
    },
    placeholder: String,
    areaCode: String,
    value: [String, Number],
    readonly: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    maxlength: {
      type: Number,
      default: 50
    },
    iClass: String
  },
  data () {
    return {
      inputScrollTop: 0
    }
  },
  computed: {
    iconShow () {
      if (this.value !== '') {
        return true
      } else {
        return false
      }
    }
  },
  beforeMount () {
  },
  mounted () {
  },
  destroyed () {
  },
  methods: {
    onFocus () {
      const t = this
      clearTimeout(t.$store.state.inputTimeout)
      this.inputScrollTop = document.body.scrollTop || document.documentElement.scrollTop
      this.$emit('focus')
    },
    onBlur () {
      const t = this
      t.$store.state.inputTimeout = setTimeout(() => {
        document.body.scrollTop = document.documentElement.scrollTop = t.inputScrollTop
      }, 250)
      this.$emit('input', this.value.replace(/(^\s*)|(\s*$)/g, ''))
      this.$emit('blur')
    },
    onClick () {
      this.$emit('input', '')
    }
  },
  components: {
  }
}
</script>
<style scoped>
  .jm-input {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-right: calc(15 / 375 * 100vw);
    box-sizing: border-box;
  }
  .landscape .jm-input {
    padding-right: calc(15 / 375 * 100vh);
  }
  .icon {
    min-width: calc(12 / 375 * 100vw);
    width: calc(12 / 375 * 100vw);
    margin-left: calc(16 / 375 * 100vw);
  }
  .landscape .icon {
    min-width: calc(12 / 375 * 100vh);
    width: calc(12 / 375 * 100vh);
    margin-left: calc(16 / 375 * 100vh);
  }
  input {
    background-color: rgba(255, 255, 255, 0);
    color: #333333;
    font-size: calc(14 / 375 * 100vw);
    height: calc(45 / 375 * 100vw);
  }
  .landscape input {
    font-size: calc(14 / 375 * 100vh);
    height: calc(45 / 375 * 100vh);
  }
  input::placeholder {
    color: #8F8F8F;
    font-size: calc(14 / 375 * 100vw);
  }
  .landscape input::placeholder {
    font-size: calc(14 / 375 * 100vh);
  }
  .user-info input {
    background-color: rgba(255, 255, 255, 0);
    color: #333333;
    font-size: calc(14 / 375 * 100vw);
    height: calc(45 / 375 * 100vw);
  }
  .landscape .user-info input {
    font-size: calc(14 / 375 * 100vh);
    height: calc(45 / 375 * 100vh);
  }
  .user-info input::placeholder {
    color: #8F8F8F;
    font-size: calc(14 / 375 * 100vw);
  }
  .landscape .user-info input::placeholder {
    font-size: calc(14 / 375 * 100vh);
  }
  .sign-in input {
    background-color: rgba(255, 255, 255, 0);
    color: #333333;
    font-size: calc(14 / 375 * 100vw);
    height: calc(45 / 375 * 100vw);
  }
  .landscape .sign-in input {
    font-size: calc(14 / 375 * 100vh);
    height: calc(45 / 375 * 100vh);
  }
  .sign-in input::placeholder {
    color: #8F8F8F;
    font-size: calc(14 / 375 * 100vw);
  }
  .landscape .sign-in input::placeholder {
    font-size: calc(14 / 375 * 100vh);
  }
</style>
