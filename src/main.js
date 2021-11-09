import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import { router } from './routers'
import store from './store'

// 路由守卫
// router.beforeEach((to, from, next) => {
//   // if (to.meta.priv !== 0) {
//   //   next()
//   // }
// })

createApp(App).use(router).use(store).mount('#app')
