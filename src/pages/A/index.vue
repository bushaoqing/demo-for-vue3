<template>
  <h1>我是page A</h1>
  <h2>{{ userInfo }}</h2>
</template>

<script>
import { useStore } from 'vuex'

export default {
  name: 'A',

  setup() {
    const store = useStore()

    return {
      ...store.state.user
    }
  }
}
</script>