//import axios from 'axios'
import config from '../util/config'
const BASEURI = config.BASEURI

const configAsAdmin = {
  headers: {
    Authorization: 'kaiku'
  }
}

const getAllUsers = async (token) => {
  // const result = await axios.get(`${BASEURI}api/users`, configAsAdmin)
  // return result.data;
}


export default { getAllUsers }