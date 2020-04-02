// Helper function, that formatting message timestamps
// Timestamps for new messages undefined so we get it from getCurrentTimestamp()
const formatTimeStamp = (timestamp) => {
  if (timestamp === undefined) return getCurrentTimestamp()
  var hours = parseInt(timestamp.substring(11, 13))
  hours += getTimezoneOffset()
  var minutes = timestamp.substring(14, 16)
  const time = hours + '.' + minutes
  return time
}

// Returns current timezone offset (should be localized)
const getTimezoneOffset = () => {
  const currentDate = new Date()
  const hoursOffset = -currentDate.getTimezoneOffset() / 60
  return hoursOffset
}

// Returns current timestamp
const getCurrentTimestamp = () => {
  const date = new Date()
  const timestamp = date.getHours() + '.' + date.getMinutes()
  return timestamp
}

export default formatTimeStamp