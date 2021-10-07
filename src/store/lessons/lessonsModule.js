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
    async getOwnUserInfo(ctx) {
      const response = await getSelf()
      if (response.status === "success") {
        const mSettings = response.data.matchSettings
        const languageKnow = [
          { language: mSettings.languageKnow1, level: mSettings.languageKnow1Level },
          mSettings.languageKnow2 ? { language: mSettings.languageKnow2, level: mSettings.languageKnow2Level } : null,
          mSettings.languageKnow3 ? { language: mSettings.languageKnow3, level: mSettings.languageKnow3Level } : null,
        ]
        const languageLearn = [
          { language: mSettings.languageLearn1, level: mSettings.languageLearn1Level },
          mSettings.languageLearn2 && { language: mSettings.languageLearn2, level: mSettings.languageLearn2Level },
          mSettings.languageLearn3 && { language: mSettings.languageLearn3, level: mSettings.languageLearn3Level },
        ]
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