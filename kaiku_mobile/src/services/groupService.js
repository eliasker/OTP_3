// import axios from 'axios'
// import config from '../util/config'
// const BASEURI = config.BASEURI

// const configAsAdmin = {
//   headers: {
//     Authorization: 'kaiku'
//   }
// }

// /**
//  * Gets and returns all chats from backend
//  * @param {*} user_id loggedUser.user_id
//  * @param {*} token loggedUser.token
//  */
// const getAllByID = async (user_id, token) => {
//   try {
//     const response = await axios.get(`${BASEURI}api/chats/?user_id=${user_id}`, { headers: { Authorization: token } })
//     return response.data
//   } catch (e) {
//     console.log('error: ', e)
//   }
// }


// const getAllChats = async () => {
//   try {
//     const response = await axios.get(`${BASEURI}api/chats/?user_id`, configAsAdmin)
//     return response.data
//   } catch (e) {
//     console.log('error: ', e)
//   }
// }


// const create = newObject => {
//   const request = axios.post(`${BASEURI}api/chats`, newObject, configAsAdmin)
//   return request.then(response => response.data)
// }

// const update = (id, newObject) => {
//   const request = axios.put(`${BASEURI}api/chats/${id}`, newObject, configAsAdmin)
//   return request.then(response => response.data)
// }

// const deleteById = (id) => {
//   axios.delete(`${BASEURI}api/chats/?chat_id=${id}`, configAsAdmin)
// }


// export default { getAllChats, getAllByID, create, update, deleteById }