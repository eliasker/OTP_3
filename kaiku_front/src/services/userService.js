import axios from 'axios'
import config from '../util/config'
const BASEURI = config.BASEURI

const configAsAdmin = {
  headers: {
    Authorization: 'kaiku'
  }
}

const update = (id, newObject) => {
  const request = axios.put(`${BASEURI}api/users/${id}`, newObject)
  return request.then(response => response.data)
}

const createUser = async (username, password, name) => {
  const user = {
    id: null,
    username,
    password,
    name
  }
  const result = await axios.post(`${BASEURI}api/users`, user, configAsAdmin)
  return result.data;
}

const getAllUsers = async (token) => {
  const result = await axios.get(`${BASEURI}api/users`, configAsAdmin)
  return result.data;
}

const deleteById = (id) => {
  axios.delete(`${BASEURI}api/users/?user_id=${id}`, configAsAdmin)
}

export default { update, createUser, getAllUsers, deleteById }