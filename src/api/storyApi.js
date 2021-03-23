const prefix = 'https://genkan.herokuapp.com'
const suffix = '/api/v1/stories'
const headers = {'content-type': 'application/json'}

async function getStories() {
  const url = prefix + suffix
  const response = await fetch(url, {
      method: 'GET',
    })
  .then(res => res.json())
  .then(({ data, status }) => {
    if (status === 'success') return data.data
    return false
  })
  .catch(({ message }) => {
    console.error(message)
    return false
  })

  return response
}

async function getStory(id) {
  const url = prefix + suffix + `/${id}`
  const response = await fetch(url, {
      method: 'GET',
    })
  .then(res => res.json())
  .then(({ data, status }) => {
    if (status === 'success') return data.data
    return false
  })
  .catch(({ message }) => {
    console.error(message)
    return false
  })

  return response
}

async function createStory ({ content, user }) {
  const url = prefix + suffix
  const payload = { content, user }

  const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload)
    })
  .then(res => res.json())
  .then(data => {
    if (data.status === 'success') return data.data.newStory
  })
  .catch(({ message }) => {
    console.error(message)
    return false
  })

  return response
}

async function likeStory({ storyId, userId }) {
  const url = prefix + suffix + `/like/${storyId}`
  const payload = { userId }

  const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload)
    })
  .then(res => res.json())
  .then(data => data.data.likes)
  .catch(({ message }) => {
    console.error(message)
    return false
  })

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