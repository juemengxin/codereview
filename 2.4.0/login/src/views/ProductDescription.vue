<i18n>
{
  "en": {},
  "zh-Hans": {
    "document-title": "产品介绍"
  },
  "zh-Hant": {}
}
</i18n>
<template>
  <div class="product-description">
    <img :src="$store.state.landscape ? landscapeImg : img" alt="">
  </div>
</template>
<script>
import img from '../assets/app/product-description.png'
import landscapeImg from '../assets/app/landscape-product-description.png'
export default {
  name: 'product-description',
  data () {
    return {
      img,
      landscapeImg
    }
  },
  computed: {
  },
  beforeMount () {
  },
  mounted () {
    const t = this
    t.$store.dispatch('changeTitle', t.$t('document-title'))
    t.$store.state.loading = false
  },
  destroyed () {
  },
  methods: {
  }
}
</script>
<style scoped>
  .product-description {
    padding-top: 20px;
    background-color: #ffffff;
  }
  .landscape .product-description {
    padding-top: 0;
  }
</style>
