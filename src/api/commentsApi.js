import axios from 'axios'

const prefix = 'https://genkan.herokuapp.com/api/v1/stories/comment'
// const prefix = 'http://localhost:5000/api/v1/stories/comment'

async function commentStory({ storyId, content }) {
  const url = prefix + `/${storyId}`
  let data = { content }

  const token = localStorage.getItem('genkan-token');
  const config = {
    headers: {
      authorization: `Bearer ${token}`
    }
  }

  return axios.post(url, data, config)
  .then(res => res.data)
  .catch(err => console.error(err))
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
