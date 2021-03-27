import axios from 'axios'
import UserAuth from './UserAuth'

const prefix = 'https://genkan.herokuapp.com/api/v1/stories'
// const prefix = 'http://localhost:5000/api/v1/stories/comment'

const userAuth = new UserAuth()

async function commentStory({ storyId, content }) {
  const url = prefix + `/${storyId}`
  let data = { content }

  const response = await axios.post(url, data, userAuth.config)
  .then(res => res.data)
  .catch(err => err)

  return response
}

async function editComment({ storyId, commentId, content, id }) {
  let data = { storyId, content }
  if (id) data._id = id
}

async function removeComment({ storyId, commentId }) {
  
}

export {
  commentStory,
  editComment,
  removeComment,
}
