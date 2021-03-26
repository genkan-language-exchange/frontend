import axios from 'axios'
// const prefix = 'https://genkan.herokuapp.com/api/v1/stories'
const prefix = 'http://localhost:5000/api/v1/stories'

class UserAuth {
  constructor() {
    this._token = localStorage.getItem('genkan-token');
    this._config = {
      headers: {
        authorization: `Bearer ${this.token}`
      }
    }
  }

  get token() {
    return this._token
  }

  get config() {
    return this._config
  }
}

const userAuth = new UserAuth()

async function getStories() {
  const url = prefix

  const response = await axios.get(url, userAuth.config)
  .then(res => res.data)
  .catch(err => err)

  return response
}

async function getDrafts() {
  const url = prefix + '/my-drafts'

  const response = await axios.get(url, userAuth.config)
  .then(res => res.data)
  .catch(err => err)

  return response
}

async function getStory(id) {
  const url = prefix + `/${id}`
  const response = await axios.get(url, userAuth.config)
  .then(res => res.data)
  .catch(err => err)

  return response
}

async function createStory ({ content, status, id }) {
  const url = prefix
  let data = { content, status }
  if (id) data._id = id

  const response = await axios.post(url, data, userAuth.config)
  .then(res => res.data)
  .catch(err => err)

  return response
}

async function likeStory(storyId) {
  const url = prefix + `/like/${storyId}`
  const response = await axios.post(url, storyId, userAuth.config)
  .then(res => res.data)
  .catch(err => err)

  return response
}

async function removeStory(storyId) {
  const url = prefix + `/delete/${storyId}`
  const response = await axios.patch(url, storyId, userAuth.config)
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