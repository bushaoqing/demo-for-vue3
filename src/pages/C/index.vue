<template>
  <h1>{{ msg }}</h1>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'C',

  setup() {
    const msg = ref('我是page C')

    return {
      msg
    }
  }
}
</script>