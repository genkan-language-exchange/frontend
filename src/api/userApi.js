import axios from 'axios'
import UserAuth from './UserAuth'

const prefix = 'https://genkan.herokuapp.com/api/v1/users'
// const prefix = 'http://localhost:5000/api/v1/users'

const userAuth = new UserAuth()


async function registerUser(name, email, password, passwordConfirm, incomingMatchSettings) {
  const url = prefix + '/signup'
  const matchSettings = {
    birthday: "2000-01-01",
    gender: "non-binary",
    languageKnow: ["???"],
    languageLearn: ["???"],
    nationality: "???",
    residence: "???",
    ...incomingMatchSettings,
  }
  matchSettings.birthday = new Date(matchSettings.birthday)
  matchSettings.gender = matchSettings.gender.toLowerCase()
  matchSettings.lastSeen = Date.now();

  const data = { name, email, password, passwordConfirm, matchSettings }

  const response = await axios.post(url, data)
  .then(res => res.data)
  .catch(err => err)
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

  const response = await axios.post(url, data, userAuth.config)
  .then(res => res.data)
  .catch(err => err)
  return response
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

  const response = await axios.get(url, userAuth.config)
  .then(res => res.data)
  .catch(err => err)
  return response
}
async function getUsersOnline(page) {
  const url = `${prefix}/online?matchSettings.age[gt]=18&page=${page || 1}`

  const response = await axios.get(url, userAuth.config)
  .then(res => res.data)
  .catch(err => err)
  return response
}

async function getUsersNew(page) {
  const url = `${prefix}/new?matchSettings.age[gt]=18&page=${page || 1}`

  const response = await axios.get(url, userAuth.config)
  .then(res => res.data)
  .catch(err => err)
  return response
}

async function validateAccount(validationToken) {
  const url = `${prefix}/validation/${validationToken}`

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