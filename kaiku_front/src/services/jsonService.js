// services for local db
import axios from 'axios'
const baseUrl = 'http://localhost:3001/'

const getUsers = () => {
	/*
	const users = [
		{ name: 'Marko' }, { name: 'Mirka' }, { name: 'markus' }, { name: 'Makedius' }
	]
	*/
	const request = axios.get(`${baseUrl}users`)
	return request.then(response => response.data)
}

const getMessages = () => {
	/*
	const messages = [{ content: 'hei', type: 'in' }, { content: 'vastaus1', type: 'out' },
	{ content: 'asdf', type: 'in' }, { content: 'vastaus2', type: 'out' },
	{ content: 'vataus3', type: 'out' }]
	*/
	const request = axios.get(`${baseUrl}messages`)
	return request.then(response => response.data)
}

export default { getUsers, getMessages }