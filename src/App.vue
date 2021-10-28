<template>
  <div class="app__router-link">
    <div 
      class="app__router-link-items"
      v-for="(item, index) in curRouters" 
      :key="item.path" 
    >
      <router-link :to="item.path">{{ item.name }}</router-link>
    </div>
  </div>
  
  <div class="app__center-box-wrap">
    <router-view></router-view>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { routes } from '@routers/index'
import { loginCheck } from '@api/user'

export default {
  name: 'App',
  setup() {
    const curRouters = computed(() => routes)

    onMounted(() => {
      loginCheck()
    })

    return {
      curRouters
    }
  }
}
</script>

<style>
  .app__router-link {
    line-height: 28px;
    display: flex;
    justify-content: center;
    background: #eee;
  }

  .app__router-link .app__router-link-items {
    padding: 4px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-right: 16px;
    box-sizing: border-box;
  }

  .app__router-link .app__router-link-items:hover {
    background: yellow;
  }

  .app__center-box-wrap {
    border: 1px solid #eee;
    margin: 20px;
    min-height: 600px;
  }
</style>