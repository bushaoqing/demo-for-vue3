import { createRouter, createWebHistory } from 'vue-router'
import Home from '@pages/Home.vue'
import A from '@pages/A/index.vue'
import B from '@pages/B/index.vue'
import C from '@pages/C/index.vue'
import D from '@pages/D/index.vue'
import E from '@pages/E/index.vue'

export const routes = [
  {
    path: '/home',
    name: 'Go home',
    component: Home,
    children: [
      {
        path: 'toC',
        name: 'to c',
        component: C
      }, {
        path: 'toD',
        name: 'to d',
        component: D
      }, {
        path: 'toE',
        name: 'to e',
        component: E,
        // meta: {
        //   priv: 0
        // }
      }
    ]
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
