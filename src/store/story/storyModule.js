const prefix = 'https://genkan.herokuapp.com/api/v1/stories'

export default {
  state: {
    storyFilter: 'all',
    selectedStory: '',
    modalStory: {
      _id: null,
      likes: [],
      comments: [],
      content: null,
      originalContent: null,
      userId: null,
      status: null,
      createdAt: null,
      report: null,
    },
  },
  mutations: {
    setStoryFilter: (state, payload) => state.storyFilter = payload.value,
    setSelectedStory: (state, payload) => state.selectedStory = payload.storyId,
    setModalStory: (state, payload) => state.modalStory = payload,
    setModalStoryComments: (state, payload) => state.modalStory.comments = payload,
  },
  actions: {
    async addNewComment(ctx, payload) {
      const { storyId, content } = payload
      const url = prefix + `/comment/${storyId}`
      let data = { content }

      const token = ctx.getters.token
    
      return fetch(url, {
        method: "POST",
        mode: "cors",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      })
      .then(res => res.json())
      .then(res => ctx.commit('setModalStoryComments', res))
      .catch(err => console.error(err))
    },
    async fetchStorySingle(ctx, payload) {
      const { storyId } = payload
      const url = prefix + `/${storyId}`
      const token = ctx.getters.token

      await fetch(url, {
        method: "GET",
        mode: "cors",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'authorization': `Bearer ${token}`
        },
      })
      .then(res => res.json())
      .then(res => ctx.commit('setModalStory', res.data))
      .catch(err => console.error(err))
    },
  },
  getters: {
    storyFilter: state => state.storyFilter,
    modalStory: state => state.modalStory,
    selectedStory: state => state.selectedStory,
  }
}
