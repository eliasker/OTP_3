import axios from 'axios'

/*
const baseUrl = 'http://localhost:3001/users'
const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
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
*/

const baseUrl = 'http://localhost:8080/'

const configAsAdmin = {
  headers: {
    Authorization: 'kaiku'
  }
}

const login = async (username, password) => {
  try {
    console.log('login with: ', username, password)
    const response = await axios.post(
      baseUrl + 'api/users/' + username,
      {
        username,
        password
      }
    )
    console.log('response from request', response);
    return response.data;

  } catch (error) {
    console.log('REST: login error', error);
  }
}


//set config manually or set null;
const createUser = async (username, password, name, config) => {

  const user = {
    id: null,
    username,
    password,
    name
  }

  /*
  axios.post(
      baseUrl + 'api/users',
      user,
      configAsAdmin
  )
  .then((response) => {
      console.log('REST: createUser', response.data);
      return response.data
  })
  .catch((error) => {
      console.log('REST: createUser error', error);
  })
  */

  const result = await axios.post(
    baseUrl + 'api/users',
    user,
    configAsAdmin
  )

  console.log(result.data);
  return result.data;
}

const getAllUsers = async (token) => {

  const configAsAdmin = {
    headers: {
      Authorization: 'kaiku'
    }
  }

  const result = await axios.get(
    baseUrl + "api/users",
    configAsAdmin
  )

  console.log("REST: getAllUsers", result.data);

  return result.data;
}

export default { login, createUser, getAllUsers }