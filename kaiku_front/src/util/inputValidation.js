//contains functions for checking message content legitimacy (work in progress)
function messageValidation(message) {
  if (message === '' || message === undefined) {
    console.log('empty message', message)
    return false
  }
  return true
}

export default messageValidation