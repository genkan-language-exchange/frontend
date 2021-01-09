import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/chat',
    name: 'Chat',
    // lazy loading
    component: () => import('../views/Chat.vue')
  },
  {
    path: '/stories',
    name: 'Stories',
    component: () => import('../views/Stories.vue')
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/Search.vue')
  },
  {
    path: '/passport',
    name: 'Passport',
    component: () => import('../views/Passport.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (!navigator.onLine) next({ name: 'Home' })
  else next()
})

export default router
