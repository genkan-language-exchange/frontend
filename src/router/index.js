import { createRouter, createWebHistory } from 'vue-router'
import Chat from '../views/Chat.vue'

const routes = [
  {
    path: '/',
    name: 'Chat',
    component: Chat,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/stories',
    name: 'Stories',
    component: () => import('../views/Stories.vue'),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/Search.vue'),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/passport',
    name: 'Passport',
    component: () => import('../views/Passport.vue'),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: {
      guest: true,
    }
  },
  {
    path: '/welcome',
    name: 'Welcome',
    component: () => import('../views/Welcome.vue'),
    meta: {
      guest: true
    }
  },
  // {
  //   path: '/example/:id',
  //   name: 'ExampleNested',
  //   component: () => import('../views/ExampleNested.vue'),
  //   props: true, // pass the :id param as props into the component
  //   meta: {
  //     guest: true
  //   }
  // }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (!navigator.onLine) next({ name: 'Home' })
  else next()
})

export default router
