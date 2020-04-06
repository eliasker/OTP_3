import axios from 'axios'
const baseUrl = 'http://localhost:8080/api/users'

const configAsAdmin = {
  headers: {
    Authorization: 'kaiku'
  }
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const createUser = async (username, password, name, token) => {
  const user = {
    id: null,
    username,
    password,
    name
  }
  const result = await axios.post(baseUrl, user, token)
  return result.data;
}

const getAllUsers = async (token) => {
  const result = await axios.get(baseUrl, configAsAdmin)
  return result.data;
}

const deleteById = (id) => {
  axios.delete(`${baseUrl}/?user_id=${id}`, configAsAdmin)
}

export default { update, createUser, getAllUsers, deleteById }
