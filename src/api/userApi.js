const prefix = 'https://genkan.herokuapp.com'
const suffix = '/api/v1/users'

async function registerUser(name, email, password, passwordConfirm, matchSettings) {
  const url = prefix + suffix + '/signup'
  const headers = {'content-type': 'application/json'}

  if (!matchSettings) matchSettings = {
    "birthday": "1970-01-01",
    "gender": "male",
    "pronouns": "he/him",
    "languageKnow": ["English"],
    "languageLearn": ["English"],
    "nationality": "US",
    "residence": "US"
  }

  const payload = { name, email, password, passwordConfirm, matchSettings }

  const response = await fetch(url,
    {
      method: 'POST',
      headers,
      body: JSON.stringify(payload)
    }
  )
  .then(res => res.json())
  .then(data => data)
  .catch((error) => {
    console.error(error)
    console.error(error.message)
    return error
  })
  return response
}

async function loginWithEmailPassword(email, password) {
  const url = prefix + suffix + '/login'
  const headers = {'content-type': 'application/json'}
  const payload = { email, password }

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
      if (!data.data.user) {
        return false
      }
      return data.data.user
    }
  })
  .catch((error) => {
    console.error(error)
    console.error(error.message)
    return false
  })
  return response
}

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
  .then(({data, status}) => {
    if (status === 'success') return data
  })
  .catch(({ message }) => {
    console.error(message)
    return false
  })
  return response
}

export {
  registerUser,
  loginWithEmailPassword,
  getUserById,
  getUserByNameIdentifierCombo,
  getUsersMany,
}