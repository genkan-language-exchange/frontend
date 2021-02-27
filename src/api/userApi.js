const prefix = 'https://genkan.herokuapp.com'
const suffix = '/api/v1/users'

async function getUserById(id) {
  return id;
}

async function getUserByNameIdentifierCombo(name, identifier) {
  const url = prefix + suffix
  const headers = {'content-type': 'application/json'}
  const payload = { name, identifier }

  const response = await fetch(url,
    {
      method: 'POST',
      headers,
      body: JSON.stringify(payload)
    }
  )
  .then(res => res.json())
  .then(data => {
    if (data.status === 'success') {
      if (!data.data.length) {
        return false
      }
      return data.data[0]
    }
  })
  .catch(({ message }) => {
    console.error(message)
    console.error('Something went wrong fetching the user\'s profile.\nPlease try again later.\nIf the problem persists please email support@genkan.app')
    return false
  })
  return response
}

async function getUsersMany() {
  const url = prefix + suffix
  const response = await fetch(url,
    {
      method: 'GET',
    }
  )
  .then(res => res.json())
  .then(data => {
    if (data.status === 'success') {
      if (!data.data.users.length) {
        return false
      }
      const filteredResponse = data.data.users.filter(user => user.accountStatus === 'verified')
      return filteredResponse
    }
  })
  .catch(({ message }) => {
    console.error(message)
    return false
  })
  return response
}

export {
  getUserById,
  getUserByNameIdentifierCombo,
  getUsersMany
}