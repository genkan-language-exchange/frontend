import { createStore } from 'vuex'
import authModule from './auth/authModule'
import searchModule from './search/searchModule'

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
  }
})
