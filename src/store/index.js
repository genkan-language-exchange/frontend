import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import authModule from './auth/authModule'
import searchModule from './search/searchModule'
import storyModule from './story/storyModule'
import lessonsModule from './lessons/lessonsModule'
import notificationsModule from './notifications/notificationsModule'

export default createStore({
  state: {
    isMobile: false,
  },
  mutations: {},
  actions: {},
  getters: {
    isMobile(state) {
      return state.isMobile
    },
  },
  modules: {
    authModule,
    searchModule,
    storyModule,
    lessonsModule,
    notificationsModule
  },
  plugins: [
    createPersistedState({
      storage: window.sessionStorage
    })
  ],
})
