export default {
  state: {
    activeFilter: 'all',
    customFilter: [],
  },
  mutations: {
    setActiveFilter(state, payload) {
      state.activeFilter = payload.value
    }
  },
  actions: {},
  getters: {
    activeFilter: state => state.activeFilter,
    customFilter: state => state.customFilter,
  }
}