import { createRouter, createWebHistory } from 'vue-router'
import Landing from '../views/Landing.vue'

import store from '../store'

const router = createRouter({
  history: createWebHistory(),
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Landing',
      component: Landing,
      meta: {
        title: "Genkan",
        guest: true,
        requiresUnauth: true,
      }
    },
    {
      path: '/admin',
      name: 'Admin',
      component: () => import('../views/Admin.vue'),
      meta: {
        title: "Admin | Genkan",
        requiresAuth: true,
        requiresAdmin: true,
      },
    },
    {
      path: '/chat',
      name: 'Chat',
      component: () => import('../views/Chat.vue'),
      meta: {
        title: "Chat | Genkan",
        requiresAuth: true,
      },
    },
    {
      path: '/stories',
      name: 'Stories',
      component: () => import('../views/Stories.vue'),
      meta: {
        title: "Stories | Genkan",
        requiresAuth: true,
      }
    },
    {
      path: '/stories/create',
      name: 'StoryCreation',
      component: () => import('../views/StoryCreation.vue'),
      meta: {
        title: "Share your story | Genkan",
        requiresAuth: true,
        requiresVerified: true,
      }
    },
    {
      path: '/lessons',
      name: 'UserLessons',
      component: () => import('../views/UserLessons.vue'),
      meta: {
        title: "Lessons | Genkan",
        requiresAuth: true,
        requiresVerified: true,
      },
    },
    {
      path: '/lessons/:language',
      name: 'LessonsOverview',
      component: () => import('../views/LessonsOverview.vue'),
      meta: {
        title: "Lessons | Genkan",
        requiresAuth: true,
        requiresVerified: true,
      },
    },
    {
      path: '/lesson/:id',
      name: 'LessonPage',
      component: () => import('../views/LessonPage.vue'),
      meta: {
        title: "Lesson | Genkan",
        requiresAuth: true,
        requiresVerified: true,
      },
    },
    {
      path: '/lesson/creation/:language',
      name: 'LessonCreationOverview',
      component: () => import('../views/LessonCreationOverview.vue'),
      meta: {
        title: "Your created lessons | Genkan",
        requiresAuth: true,
        requiresVerified: true,
      },
    },
    {
      path: "/lesson/creation/:language/:id",
      name: "LessonCreator",
      component: () => import('../views/LessonCreator.vue'),
      props: route => ({ query: route.query.id }),
      meta: {
        title: "Create a lesson | Genkan",
        requiresAuth: true,
        requiresVerified: true,
      },
    },
    {
      path: '/search',
      name: 'Search',
      component: () => import('../views/Search.vue'),
      meta: {
        title: "Search | Genkan",
        requiresAuth: true,
      }
    },
    {
      path: '/passport',
      name: 'Passport',
      props: true,
      component: () => import('../views/Passport.vue'),
      meta: {
        title: "Passport | Genkan",
        requiresAuth: true,
      },
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Login.vue'),
      meta: {
        title: "Login | Genkan",
        guest: true,
        requiresUnauth: true,
      }
    },
    {
      path: '/welcome',
      name: 'Welcome',
      component: () => import('../views/Welcome.vue'),
      meta: {
        title: "Genkan",
        guest: true,
        requiresUnauth: true,
      }
    },
    {
      path: '/verify/:token',
      name: 'Verify',
      component: () => import('../views/VerifyAccount.vue'),
      meta: {
        title: "Genkan",
        guest: true,
      },
      beforeEnter(_to, _from, next) {
        if (store.getters.isVerified) next('/')
        else next()
      }
    },
    {
      path: '/reset/:token',
      name: 'ResetPassword',
      component: () => import('../views/ResetPassword.vue'),
      meta: {
        title: "Genkan",
        guest: true,
        requiresUnauth: true,
      },
      beforeEnter(_to, _from, next) {
        if (store.getters.isVerified) next('/')
        else next()
      },
    },
    {
      path: '/roadmap',
      name: 'Roadmap',
      component: () => import('../views/Roadmap.vue'),
      meta: {
        title: "Genkan",
        guest: true,
      },
    },
    // {
    //   path: '/privacy',
    //   name: 'Privacy',
    //   component: () => import('../views/Privacy.vue'),
    // },
    {
      path: '/account_not_found',
      name: 'ResourceNotFound',
      component: () => import('../views/ResourceNotFound.vue'),
      meta: {
        title: "Genkan",
        guest: true
      }
    },
    {
      path: '/:pageNotFound(.*)',
      name: 'PageNotFound',
      component: () => import('../views/PageNotFound.vue'),
      meta: {
        title: "Genkan",
        guest: true
      }
    },
/* 
    {
      path: '/example', // can add :id here or make `children` array
      name: 'ExampleNested',
      component: () => import('../views/ExampleNested.vue'),
      children: [ {path: ':id' component: ..., props: ... } ] // a second router-view needs to be placed in the parent component template tree
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

router.beforeEach((to, from, next) => {
  // This goes through the matched routes from last to first, finding the closest route with a title.
  // e.g., if we have `/some/deep/nested/route` and `/some`, `/deep`, and `/nested` have titles,
  // `/nested`'s will be chosen.
  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);
  const previousNearestWithMeta = from.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);

  // If a route with a title was found, set the document (page) title to that value.
  if(nearestWithTitle) {
    document.title = nearestWithTitle.meta.title;
  } else if(previousNearestWithMeta) {
    document.title = previousNearestWithMeta.meta.title;
  }

  if (to.meta.requiresAdmin && store.getters.hasRole !== 'admin') {
    console.log(store.getters.hasRole)
    next(from)
  }
  if (to.meta.requiresAuth && !store.getters.isAuth) {
    // route requires a user to be logged in
    // and the user is not logged in
    next('/login')
  } else if (to.meta.requiresUnauth && store.getters.isAuth) {
    // route requires a user not logged in
    // and the user is logged in
    next('/stories')
  } else if (to.meta.requiresVerified && !store.getters.isVerified) {
    console.log(store.getters.isVerified)
    // protect route from users who haven't verified their email address
    next(from)
  } else {
    next()
  }
})

export default router
