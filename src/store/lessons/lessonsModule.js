import { getSelf } from '../../api/userApi'

export default {
  state: {
    languageKnow: [],
    languageLearn: [],
  },
  mutations: {
    setLanguages(state, payload) {
      state.languageLearn = payload.languageLearn
      state.languageKnow = payload.languageKnow
    },
  },
  actions: {
    async getOwnUserInfo(ctx, _payload) {
      const response = await getSelf()
      if (response.status === "success") {
        const languageKnow = response.data.matchSettings.languageKnow
        const languageLearn = response.data.matchSettings.languageLearn
        ctx.commit("setLanguages", { languageKnow, languageLearn })
      }
    },
  },
  getters: {
    getLanguagesKnow: state => state.languageKnow,
    getLanguagesLearn: state => state.languageLearn,
    getLanguages: state => state.languageKnow.concat(state.languageLearn)
  }
}