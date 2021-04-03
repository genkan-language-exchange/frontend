import axios from 'axios'

const prefix = `${process.env.VUE_APP_API_URL}/api/v1/stories`

async function getStories(page) {
  const url = prefix + `?page=${page || 1}`

  const token = localStorage.getItem('genkan-token');
  const config = {
    headers: {
      authorization: `Bearer ${token}`
    }
  }

  const response = await axios.get(url, config)
  .then(res => res.data)
  .catch(err => err)

  return response
}

async function getDrafts() {
  const url = prefix + '/my-drafts'

  const token = localStorage.getItem('genkan-token');
  const config = {
    headers: {
      authorization: `Bearer ${token}`
    }
  }

  const response = await axios.get(url, config)
  .then(res => res.data)
  .catch(err => err)

  return response
}

async function getStory(id) {
  const url = prefix + `/${id}`
  const token = localStorage.getItem('genkan-token');
  const config = {
    headers: {
      authorization: `Bearer ${token}`
    }
  }

  const response = await axios.get(url, config)
  .then(res => res.data)
  .catch(err => err)

  return response
}

async function createStory ({ content, status, id }) {
  const url = prefix
  let data = { content, status }
  if (id) data._id = id

  const token = localStorage.getItem('genkan-token');
  const config = {
    headers: {
      authorization: `Bearer ${token}`
    }
  }

  const response = await axios.post(url, data, config)
  .then(res => res.data)
  .catch(err => err)

  return response
}

async function likeStory(storyId) {
  const url = prefix + `/like/${storyId}`
  const token = localStorage.getItem('genkan-token');
  const config = {
    headers: {
      authorization: `Bearer ${token}`
    }
  }

  const response = await axios.post(url, storyId, config)
  .then(res => res.data)
  .catch(err => err)

  return response
}

async function removeStory(storyId) {
  const url = prefix + `/delete/${storyId}`
  const token = localStorage.getItem('genkan-token');
  const config = {
    headers: {
      authorization: `Bearer ${token}`
    }
  }

  const response = await axios.patch(url, storyId, config)
  .then(res => res.data)
  .catch(err => err)
  return response
}

export {
  createStory,
  getStory,
  getDrafts,
  getStories,
  likeStory,
  removeStory,
}