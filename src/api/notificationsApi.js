import axios from 'axios'

const prefix = `${process.env.VUE_APP_API_URL}/api/v1/notifications`

// ***************************
// User Specific Notifications
// ***************************

async function getOwnNotifications() {
  const url = `${prefix}`

  const token = localStorage.getItem('genkan-token');
  const config = {
    headers: {
      authorization: `Bearer ${token}`
    }
  }

  try {
    const response = await axios.get(url, config)
    return response.data
  } catch (error) {
    console.error(error)
    return false
  }
}

async function markOwnNotificationRead(id) {
  const url = `${prefix}/${id}`

  const token = localStorage.getItem('genkan-token');
  const config = {
    headers: {
      authorization: `Bearer ${token}`
    }
  }

  try {
    const response = await axios.patch(url, {}, config)
    return response.data
  } catch (error) {
    console.error(error)
    return false
  }
}

async function deleteOwnNotification(id) {
  const url = `${prefix}/${id}`

  const token = localStorage.getItem('genkan-token');
  const config = {
    headers: {
      authorization: `Bearer ${token}`
    }
  }

  try {
    const response = await axios.delete(url, config)
    return response.data
  } catch (error) {
    console.error(error)
    return false
  }
}

// ********************
// Global Notifications
// ********************

async function getGlobalNotifications() {
  const url = `${prefix}/global`

  const token = localStorage.getItem('genkan-token');
  const config = {
    headers: {
      authorization: `Bearer ${token}`
    }
  }

  try {
    const response = await axios.get(url, config)
    return response.data
  } catch (error) {
    console.error(error)
    return false
  }
}
async function markGlobalNotificationRead(id) {
  const url = `${prefix}/global/${id}`

  const token = localStorage.getItem('genkan-token');
  const config = {
    headers: {
      authorization: `Bearer ${token}`
    }
  }

  try {
    const response = await axios.patch(url, {}, config)
    return response.data
  } catch (error) {
    console.error(error)
    return false
  }
}

export {
  getOwnNotifications,
  markOwnNotificationRead,
  deleteOwnNotification,
  getGlobalNotifications,
  markGlobalNotificationRead,
}
