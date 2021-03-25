import axios from 'axios'
const prefix = 'https://genkan.herokuapp.com/api/v1/stories'
// const prefix = 'http://localhost:5000/api/v1/stories'
const token = localStorage.getItem('genkan-token')

async function getStories() {
  const url = prefix
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
  const response = await axios.get(url)
  .then(res => res.data)
  .catch(err => err)

  return response
}

async function createStory ({ content, status }) {
  const url = prefix
  const config = {
    headers: {
      authorization: `Bearer ${token}`
    }
  }
  let data = { content, status }

  const response = await axios.post(url, data, config)
  .then(res => res.data)
  .catch(err => err)

  return response
}

async function likeStory(storyId) {
  const url = prefix + `/like/${storyId}`
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

async function commentStory({ storyId, userId, content }) {}

async function editComment({ storyId, userId, commentId, content }) {}

async function removeComment({ storyId, userId, commentId }) {}

export {
  createStory,
  getStory,
  getStories,
  likeStory,
  commentStory,
  editComment,
  removeComment,
}