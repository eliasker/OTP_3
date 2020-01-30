// services for local db
import axios from 'axios'
const baseUrl = 'http://localhost:3001/'

const getUsers = () => {
	const request = axios.get(`${baseUrl}users`)
	return request.then(response => response.data)
}

const getMessages = () => {
	const request = axios.get(`${baseUrl}messages`)
	return request.then(response => response.data)
}

export default { getUsers, getMessages }