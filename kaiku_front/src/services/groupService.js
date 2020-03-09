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
 */
const getAll = async (user_id) => {
  try {
    const requestString = baseUrl + `/?user_id=${user_id}`
    console.log(requestString)
    const response = await axios.get(requestString, configAsAdmin)
    console.log('response.data', response.data)
    return response.data
  } catch (e) {
    console.log('error: ', e)
  }
  
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const deleteById = (id) =>
  axios.delete(`${baseUrl}/${id}`)


export default { getAll, create, update, deleteById }