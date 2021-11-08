<template>
  <h1>{{ msg }}</h1>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'E',

  setup() {
    const msg = ref('我是page E')

    return {
      msg
    }
  }
}
</script>