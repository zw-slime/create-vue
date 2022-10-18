import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/resource',
      name: 'resource',
      component: HomeView
    },
    {
      path: '/resource/book',
      name: 'book',
      component: HomeView
    },
    {
      path: '/resource/picture',
      name: 'picture',
      component: HomeView
    },
    {
      path: '/resource/material',
      name: 'material',
      component: HomeView
    },
    {
      path: '/resource/cartoon',
      name: 'cartoon',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/learn',
      name: 'learn',
      component: HomeView
    },
    {
      path: '/square',
      name: 'square',
      component: HomeView
    },
  ]
})

export default router
