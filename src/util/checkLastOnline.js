import moment from 'moment'

export default function(lastSeen) {
  const lastSeenMoment = moment(lastSeen)
  const now = moment(Date.now())
  return now.diff(lastSeenMoment) < (1000 * 60 * 60)
}