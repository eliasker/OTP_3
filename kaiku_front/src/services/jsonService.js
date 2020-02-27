// services for local db
import axios from 'axios'
const baseUrl = 'http://localhost:3001/'

const getInitialData = () => {
  const request = axios.get(`${baseUrl}user`)
  return request.then(response => response.data)
}

// voisi olla getMessagesByChatId
const getMessages = () => {
  const request = axios.get(`${baseUrl}user`)
  return request.then(response => response.data.chats[0].messages)
}

export default { getInitialData, getMessages }