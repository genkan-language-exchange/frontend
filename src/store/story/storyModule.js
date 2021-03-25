import { createStory, getStories } from '../../api/storyApi'

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
      const response = await getStories()
      if (response.status === "success") ctx.commit('setStories', response.data)
      return response
    },
    async createStory(ctx, payload) {
      const response = await createStory(payload)
      ctx.commit('setStories', response)
      return response
    }
    // TODO: add other filters
  },
  getters: {
    stories: state => state.stories,
    storyFilter: state => state.storyFilter
  }
}
