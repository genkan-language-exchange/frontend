import { getOwnNotifications, markOwnNotificationRead, deleteOwnNotification } from "../../api/notificationsApi"

export default {
  state: {
    notifications: []
  },
  mutations: {
    setNotifications: (state, payload) => state.notifications = payload.notifications,
    updateNotifications: (state, payload) => {
      const updatedNotifications = [ ...state.notifications ]
      updatedNotifications.map(un => {        
        if (un._id === payload.updatedNotification._id) {
          un.read = payload.updatedNotification.read
        }
      })
      state.notifications = updatedNotifications
    }
  },
  actions: {
    async getNotifications(ctx) {
      const response = await getOwnNotifications()
      ctx.commit('setNotifications', { notifications: response.data})
    },
    async toggleNotificationRead(ctx, payload) {
      const response = await markOwnNotificationRead(payload.id)
      if (response.success) {
        const updatedNotification = response.notification
        ctx.commit('updateNotifications', { updatedNotification })
      }
    },
    async removeNotification(ctx, payload) {
      const response = await deleteOwnNotification(payload.id)
      if (response.success) {
        const updatedNotification = { _id: payload.id }
        ctx.commit('updateNotifications', { updatedNotification })
      }
    }
  },
  getters: {
    notifications: state => state.notifications,
  }
}
