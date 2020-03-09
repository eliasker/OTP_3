import axios from 'axios'
const baseUrl = 'http://localhost:8080/'

const configAsAdmin = {
  headers: {
    Authorization: 'kaiku'
  }
}

const login = async (username, password) => {
  try {
    const response = await axios.post(
      baseUrl + 'api/users/' + username,
      {
        username,
        password
      }
    )
    return response.data;

  } catch (error) {
    console.log('REST: login error', error);
  }
}

export default { login }