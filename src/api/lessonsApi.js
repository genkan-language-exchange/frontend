import axios from 'axios'

const prefix = `${process.env.VUE_APP_API_URL}/api/v1/lessons`

/*
  routes:
  GET /MyLessons/[?language=] - get user's own lessons
  GET /UserLessons/[?language=] - get all of a user's published lessons
  GET /all/:language - get published lessons for a language
  GET /single/:id - get a lesson by id

  POST /:language/new - creates a new lesson and returns the id
  PATCH /:id/edit - edits a lesson (editing title, status, adding widgets) and returns the lesson

  POST /:id/widget - creates a widget and returns the id and lesson
  PATCH /:id/widget/edit - edits a widget and returns the widget
*/

async function getSingleLesson(id) {
  const url = `${prefix}/single/${id}`

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

async function getMyLessons(language) {
  const url = `${prefix}/MyLessons${language ? `?language=${language.toLowerCase()}` : ""}`

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

async function createLesson(language) {
  const url = `${prefix}/${language}/new`

  const token = localStorage.getItem('genkan-token');
  const config = {
    headers: {
      authorization: `Bearer ${token}`
    }
  }

  try {
    const response = await axios.post(url, {}, config)
    return response.data
  } catch (error) {
    console.error(error)
    return false
  }
}

async function addWidget(id, type) {
  const url = `${prefix}/${id}/widget`

  const token = localStorage.getItem('genkan-token');
  const config = {
    headers: {
      authorization: `Bearer ${token}`
    }
  }

  try {
    const response = await axios.post(url, { type }, config)
    return response.data
  } catch (error) {
    console.error(error)
    return false
  }
}

async function editWidget(id, payload) {
  const url = `${prefix}/${id}/widget/edit`

  const token = localStorage.getItem('genkan-token');
  const config = {
    headers: {
      authorization: `Bearer ${token}`
    }
  }

  try {
    const response = await axios.patch(url, payload, config)
    return response.data
  } catch (error) {
    console.error(error)
    return false
  }
}

export {
  getSingleLesson,
  getMyLessons,
  createLesson,
  addWidget,
  editWidget,
}