<template>
  <h1>{{ msg }}</h1>
</template>

<script>
import { ref, onActivated, onDeactivated } from 'vue'
export default {
  name: 'C',

  setup() {
    const msg = ref('我是page C')

    // 因为是keep-alive包裹，所以需要使用以下2个钩子去监听或者取消某些事件
    onActivated(() => {
      console.log('onActivated');
    })

    onDeactivated(() => {
      console.log('onDeactivated');
    })

    return {
      msg
    }
  }
}
</script>