import axios from 'axios'
const baseUrl = 'http://localhost:8080/api/chats'

const configAsAdmin = {
  headers: {
    Authorization: 'kaiku'
  }
}

/**
 * Gets and returns all chats from backend
 * @param {*} user_id loggedUser.user_id
 * @param {*} token loggedUser.token
 */
const getAllByID = async (user_id, token) => {
  try {
    const requestString = baseUrl + `/?user_id=${user_id}`
    console.log(requestString)
    const response = await axios.get(baseUrl + `/?user_id=${user_id}`, { headers: { Authorization: token } })
    console.log('response.data', response.data)
    return response.data
  } catch (e) {
    console.log('error: ', e)
  }
}


const getAllChats = async () => {
  try {
    const response = await axios.get(baseUrl + '/?user_id', configAsAdmin)
    console.log('respones.data', response.data)
    return response.data
  } catch (e) {
    console.log('error: ', e)
  }
}


const create = newObject => {
  const request = axios.post(baseUrl, newObject, configAsAdmin)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject, configAsAdmin)
  return request.then(response => response.data)
}

const deleteById = (id) => {
  axios.delete(`${baseUrl}/?chat_id=${id}`, configAsAdmin)
}


export default { getAllChats, getAllByID, create, update, deleteById }