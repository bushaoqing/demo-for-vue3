import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import { router } from './routers'
import store from './store'

createApp(App).use(router).use(store).mount('#app')
