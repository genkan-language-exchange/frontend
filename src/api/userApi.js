import axios from 'axios'

const prefix = `${process.env.VUE_APP_API_URL}/api/v1/users`

async function registerUser(name, email, password, passwordConfirm, incomingMatchSettings) {
  const url = prefix + '/signup'
  const matchSettings = {
    birthday: "1970-01-01",
    gender: "non-binary",
    languageKnow: ["???"],
    languageLearn: ["???"],
    nationality: "???",
    residence: "Antarctica",
    ...incomingMatchSettings,
  }
  matchSettings.birthday = new Date(matchSettings.birthday)
  matchSettings.gender = matchSettings.gender.toLowerCase()
  matchSettings.lastSeen = Date.now();

  const data = { name, email, password, passwordConfirm, matchSettings }

  const response = await axios.post(url, data)
  return response.data
}

async function loginWithEmailPassword(email, password) {
  const url = prefix + '/login'
  const data = { email, password }

  const response = await axios.post(url, data)
  return response.data
}

async function getSelf() {
  const url = prefix + '?self=true'
  
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
    return false
  }
}

async function getUserByNameIdentifierCombo(name, identifier) {
  const url = prefix
  const data = { name, identifier }

  const token = localStorage.getItem('genkan-token');
  const config = {
    headers: {
      authorization: `Bearer ${token}`
    }
  }

  const response = await axios.post(url, data, config)
  return response.data
}

async function getUsers(filter, page) {
  let response

  switch(filter) {
    case "all":
      response = await getUsersMany(page)
      break;
    case "online":
      response = await getUsersOnline(page)
      break;
    case "new":
      response = await getUsersNew(page)
      break;
    default:
      response = await getUsersMany(page)
      break;
  }

  return response
}

async function getUsersMany(page) {
  const url = `${prefix}?matchSettings.age[gt]=18&page=${page || 1}`

  const token = localStorage.getItem('genkan-token');
  const config = {
    headers: {
      authorization: `Bearer ${token}`
    }
  }

  const response = await axios.get(url, config)
  return response.data
}
async function getUsersOnline(page) {
  const url = `${prefix}/online?matchSettings.age[gt]=18&page=${page || 1}`

  const token = localStorage.getItem('genkan-token');
  const config = {
    headers: {
      authorization: `Bearer ${token}`
    }
  }

  const response = await axios.get(url, config)
  return response.data
}

async function getUsersNew(page) {
  const url = `${prefix}/new?matchSettings.age[gt]=18&page=${page || 1}`

  const token = localStorage.getItem('genkan-token');
  const config = {
    headers: {
      authorization: `Bearer ${token}`
    }
  }

  const response = await axios.get(url, config)
  return response.data
}

async function validateAccount(validationToken) {
  const url = `${prefix}/validation/${validationToken}`

  const response = await axios.patch(url)
  return response
}

async function requestPasswordToken(email) {
  const url = `${prefix}/forgotPassword`
  const response = await axios.post(url, { email })
  return response
}

async function testResetPasswordToken(token) {
  const url = `${prefix}/testResetPasswordToken/${token}`
  const response = await axios.get(url)
  return response
}

async function resetPassword(token, password, passwordConfirm) {
  const url = `${prefix}/resetPassword/${token}`
  const response = await axios.patch(url, { password, passwordConfirm })
  return response
}

async function resendValidationEmail(email) {
  const url = `${prefix}/revalidate`
  const response = await axios.post(url, { email })
  return response
}

async function pingServer(token) {
  const url = `${prefix}/ping`
  
  const config = {
    headers: {
      authorization: `Bearer ${token}`
    }
  }

  return axios.get(url, config)
}

export {
  registerUser,
  loginWithEmailPassword,
  getSelf,
  getUserByNameIdentifierCombo,
  getUsers,
  validateAccount,
  requestPasswordToken,
  testResetPasswordToken,
  resetPassword,
  resendValidationEmail,
  pingServer
}