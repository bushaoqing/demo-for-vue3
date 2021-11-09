<template>
  <page-wrap :leftMenu="leftMenu">
    <h1>我是page A</h1>
    <h2>{{ userInfo }}</h2>
  </page-wrap>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import PageWrap from '@components/PageWrap/index.vue'
import C from '@pages/C/index.vue'
import D from '@pages/D/index.vue'
import E from '@pages/E/index.vue'

export default {
  name: 'A',
  components: {
    'page-wrap': PageWrap
  },
  setup() {
    const store = useStore()
    const leftMenu = ref([
      {
        name: 'to c',
        component: C
      }, {
        name: 'to d',
        component: D
      }, {
        name: 'to e',
        component: E
      }
    ])

    return {
      ...store.state.user,
      leftMenu
    }
  }
}
</script>