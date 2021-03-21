import { getStories } from '../../api/storyApi'

export default {
  state: {
    stories: [],
    storyFilter: 'all',
  },
  mutations: {
    setStories(state, payload) {
      state.stories = payload
    },
    setStoryFilter(state, payload) {
      state.storyFilter = payload.value
    }
  },
  actions: {
    async getStories(ctx) {
      const stories = await getStories()
      ctx.commit('setStories', stories)
      return stories
    },
    // TODO: add other filters
  },
  getters: {
    stories: state => state.stories,
    storyFilter: state => state.storyFilter
  }
}
