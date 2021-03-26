import axios from 'axios'
// const prefix = 'https://genkan.herokuapp.com/api/v1/users'
const prefix = 'http://localhost:5000/api/v1/users'
const token = localStorage.getItem('genkan-token')
const config = {
  headers: {
    authorization: `Bearer ${token}`
  }
}

async function registerUser(name, email, password, passwordConfirm, matchSettings) {
  const url = prefix + '/signup'
  
  if (!matchSettings) {
    matchSettings = {
      birthday: "2000-01-01",
      gender: "non-binary",
      languageKnow: ["???"],
      languageLearn: ["???"],
      nationality: "???",
      residence: "???"
    }
  }
  matchSettings.birthday = new Date(matchSettings.birthday)
  matchSettings.gender = matchSettings.gender.toLowerCase()
  matchSettings.lastSeen = Date.now();

  const data = { name, email, password, passwordConfirm, matchSettings }

  const response = await axios.post(url, data)
  .then(res => res.data)
  .catch(err => {
    console.error(err)
    console.error(err.message)
    return err
  })
  return response
}

async function loginWithEmailPassword(email, password) {
  const url = prefix + '/login'
  const data = { email, password }

  const response = await axios.post(url, data)
  .then(res => res.data)
  .catch((error) => {
    console.error(error)
    return error
  })
  return response
}

async function getUserByNameIdentifierCombo(name, identifier) {
  const url = prefix
  const data = { name, identifier }

  const response = await axios.post(url, data, config)
  .then(res => res.data)
  .catch(err => err)
  return response
}

async function getUsers(filter) {
  let response

  switch(filter) {
    case "all":
      response = await getUsersMany()
      break;
    case "online":
      response = await getUsersOnline()
      break;
    case "new":
      response = await getUsersNew()
      break;
    default:
      response = await getUsersMany()
      break;
  }

  return response
}

async function getUsersMany() {
  const url = prefix

  const response = await axios.get(url, config)
  .then(res => res.data)
  .catch(err => err)
  return response
}
async function getUsersOnline() {
  const url = prefix + "/online?matchSettings.age[gt]=18"

  const response = await axios.get(url, config)
  .then(res => res.data)
  .catch(err => err)
  return response
}

async function getUsersNew() {
  const url = prefix + "/new?matchSettings.age[gt]=18"

  const response = await axios.get(url, config)
  .then(res => res.data)
  .catch(err => err)
  return response
}

async function validateAccount(validationToken) {
  const url = prefix + `/validation/${validationToken}`

  const response = await axios.patch(url)
  .then(res => res)
  .catch(err => err)
  return response
}

export {
  registerUser,
  loginWithEmailPassword,
  getUserByNameIdentifierCombo,
  getUsers,
  validateAccount
}