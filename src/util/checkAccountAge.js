import moment from 'moment'

export default function(createdAt) {
  const accountCreated = moment(createdAt)
  const now = moment(Date.now())
  return now.diff(accountCreated) < (1000 * 60 * 60 * 24 * 3)
}