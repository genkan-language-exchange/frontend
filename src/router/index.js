import { createRouter, createWebHistory } from 'vue-router'
import Chat from '../views/Chat.vue'
import store from '../store'

const router = createRouter({
  history: createWebHistory(),
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Chat',
      component: Chat,
      meta: {
        requiresAuth: true,
      },
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
      path: '/stories/create',
      name: 'StoryCreation',
      component: () => import('../views/StoryCreation.vue'),
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
      },
    },
    {
      path: '/passport/:id',
      name: 'Passport',
      props: true,
      component: () => import('../views/Passport.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Login.vue'),
      meta: {
        guest: true,
        requiresUnauth: true,
      }
    },
    {
      path: '/welcome',
      name: 'Welcome',
      component: () => import('../views/Welcome.vue'),
      meta: {
        guest: true,
        requiresUnauth: true,
      }
    },
    {
      path: '/verify/:token',
      name: 'Verify',
      component: () => import('../views/VerifyAccount.vue'),
      meta: {
        guest: true,
      },
    },
    {
      path: '/roadmap',
      name: 'Roadmap',
      component: () => import('../views/Roadmap.vue'),
      meta: {
        guest: true,
      },
    },
    {
      path: '/account_not_found',
      name: 'ResourceNotFound',
      component: () => import('../views/ResourceNotFound.vue'),
      meta: {
        guest: true
      }
    },
    {
      path: '/:pageNotFound(.*)',
      name: 'PageNotFound',
      component: () => import('../views/PageNotFound.vue'),
      meta: {
        guest: true
      }
    },
/* 
    {
      path: '/example', // can add :id here or make `children` array
      name: 'ExampleNested',
      component: () => import('../views/ExampleNested.vue'),
      children: [ path: ':id' component: ..., props: ...] // a second router-view needs to be placed in the parent component template tree
      props: true, // pass the :id param as props into the component,
      redirect: '/',
      alias: '/' // alias this route to another (put this on the route it should go to)
      meta: {
        guest: true
      },
      beforeEnter(to, from, next) {},
    }
*/
  ],
  scrollBehavior(_, _2, savedPosition) {
    if (savedPosition) return savedPosition
    return {
      left: 0,
      top: 0,
    }
  }
})

router.beforeEach((to, _from, next) => {
  if (to.meta.requiresAuth && !store.getters.isAuth) {
    // route requires a user to be logged in
    // and the user is not logged in
    next('/login')
  }
  if (to.meta.requiresUnauth && store.getters.isAuth) {
    // route requires a user not logged in
    // and the user is logged in
    next('/')
  }
  next()
})

export default router
