<template>
  <h1>我是page B</h1>
  <h2>{{ `我是store下cart中的getters：joinItems ：${joinItems}` }}</h2>
</template>

<script>
import { useStore } from 'vuex'

export default {
  name: 'B',

  setup() {
    const store = useStore()
    const joinItems = store.getters['cart/joinItems']

    return {
      joinItems
    }
  }
}
</script>