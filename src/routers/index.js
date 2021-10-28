import { createRouter, createWebHistory } from 'vue-router'
import Home from '@pages/Home.vue'
import A from '@pages/A/index.vue'
import B from '@pages/B/index.vue'

export const routes = [
  {
    path: '/',
    name: 'Go home',
    component: Home
  }, {
    path: '/A',
    name: 'Go A',
    component: A
  }, {
    path: '/B',
    name: 'Go B',
    component: B
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})
