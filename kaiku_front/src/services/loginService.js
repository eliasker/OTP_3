import axios from 'axios'
import config from '../util/config'
const BASEURI = config.BASEURI

const login = async (username, password) => {
  try {
    const response = await axios.post(
      BASEURI + 'api/users/' + username,
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