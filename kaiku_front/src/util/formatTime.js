// Helper function, that formatting message timestamps
// Timestamps for new messages undefined we get it from getCurrentTimestamp()
const formatTimeStamp = (timestamp) => {
  if (timestamp === undefined) return getCurrentTimestamp()
  const date = new Date(timestamp)
  const curr = new Date()
  if (date.getDate() === curr.getDate() && date.getMonth() === curr.getMonth() && date.getFullYear() === curr.getFullYear()) 
    return 'Tänään ' + date.getHours() + '.' + date.getMinutes()

  // Amerikkalaisittain:  new Intl.DateTimeFormat('en-US').format(date)
  const newTimestamp = new Intl.DateTimeFormat('en-GB').format(date) + ' ' + date.getHours() + '.' + date.getMinutes()
  return newTimestamp
}

// Returns current timestamp
const getCurrentTimestamp = () => {
  const date = new Date()
  const timestamp = date.getHours() + '.' + date.getMinutes()
  console.log(timestamp)
  return timestamp
}

export default { formatTimeStamp, getCurrentTimestamp }