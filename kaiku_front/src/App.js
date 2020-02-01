import React, { useState, useEffect } from 'react'
import './App.css'
import Login from './Login'
import Chat from './Chat'
import jsonService from '../src/services/jsonService'

const App = () => {
	// placeholder logged in user for testing 
	const loggedUser = {
		name: 'Make',
		id: 6
	}
	const [currentPage, setCurrentPage] = useState('login')
	const [users, setUsers] = useState([])
	const [messages, setMessages] = useState([])

	useEffect(() => {
		jsonService.getUsers()
			.then(users => setUsers(users))
	}, [])

	useEffect(() => {
		jsonService.getMessages()
			.then(messages => setMessages(messages))
	}, [])

	return (
		<div className="App">
			{currentPage === 'a' ? <Login /> : <Chat users={users} messages={messages} setMessages={setMessages} loggedUser={loggedUser} />}
		</div>
	)
}

export default App