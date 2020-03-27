//contains functions for checking message content legitimacy (work in progress)
function messageValidation(message) {
  if (message === '' || message === undefined) {
    return false
  }
  return true
}

export default messageValidation