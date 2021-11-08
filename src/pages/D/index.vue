<template>
  <h1>{{ msg }}</h1>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'D',

  setup() {
    const msg = ref('我是page D')

    return {
      msg
    }
  }
}
</script>