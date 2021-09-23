import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import authModule from './auth/authModule'
import searchModule from './search/searchModule'
import storyModule from './story/storyModule'
import lessonsModule from './lessons/lessonsModule'

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
  },
  plugins: [
    createPersistedState({
      storage: window.sessionStorage
    })
  ],
})
