
export default {
  state: {
    storyFilter: 'all',
  },
  mutations: {
    setStoryFilter(state, payload) {
      state.storyFilter = payload.value
    }
  },
  actions: {
    // TODO: add other filters
  },
  getters: {
    storyFilter: state => state.storyFilter
  }
}
