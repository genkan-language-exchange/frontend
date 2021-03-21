import { createStore } from 'vuex'
import authModule from './auth/authModule'
import searchModule from './search/searchModule'
import storyModule from './story/storyModule'

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
  }
})
