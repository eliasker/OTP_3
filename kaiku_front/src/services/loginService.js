import axios from 'axios'
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

export default { login }