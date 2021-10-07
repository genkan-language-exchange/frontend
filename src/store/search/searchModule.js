export default {
  state: {
    activeFilter: 0,
    customFilter: [],
  },
  mutations: {
    setActiveFilter(state, payload) {
      state.activeFilter = payload.value
    }
  },
  actions: {
    // TODO: dispatch to API here to get users list instead of at page level
  },
  getters: {
    activeFilter: state => state.activeFilter,
    customFilter: state => state.customFilter,
  }
}