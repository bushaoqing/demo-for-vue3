<template>
  <page-wrap>
    <h1>我是page B</h1>
    <h2>{{ `我是store下cart中的getters：joinItems ：${joinItems}` }}</h2>
  </page-wrap>
</template>

<script>
import { useStore } from 'vuex'
import PageWrap from '@components/PageWrap/index.vue'

export default {
  name: 'B',
  components: {
    'page-wrap': PageWrap
  },

  setup() {
    const store = useStore()
    const joinItems = store.getters['cart/joinItems']

    return {
      joinItems
    }
  }
}
</script>