import React, { useState, useRef, useEffect } from 'react'
import useField from '../hooks/hooks'
import ChatHeader from './ChatHeader'
import InMessage from './InMessage'
import OutMessage from './OutMessage'
import MessageForm from './MessageForm'
import keyGen from '../util/keyGen'
import ProfilePage from './ProfilePage'

const ChatColumn = ({ messages, setMessages, loggedUser, users }) => {
	const [searchInput, setSearchInput] = useState('')
	const messagesEndRef = useRef(null)
	const newMessage = useField('text')

	const getUser = (user_id) => {
		const user = users.find(user => user.id === user_id)
		return user
	}
	const listMessages = () => {
		const filteredMsgs = messages.filter(msg => msg.content.includes(searchInput))
		return filteredMsgs.map(m =>
			m.user_id === loggedUser.id ?
				<OutMessage key={keyGen.generateKey(m.content)} content={m.content} /> :
				<InMessage key={keyGen.generateKey(m.content)} content={m.content} user={getUser(m.user_id)} />)
	}

	const scrollToBottom = () => {
		if(messagesEndRef.current !== null) messagesEndRef.current.scrollIntoView({ behavior: "auto" })
	}

	useEffect(scrollToBottom, [messages])

	const removeReset = (object) => {
		const { reset, ...newObject } = object
		return newObject
	}

	const handleSubmit = (event) => {
		event.preventDefault()
		if (newMessage.value !== '') {
			const newMessageObj = {
				content: newMessage.value,
				id: keyGen.generateId,
				user_id: loggedUser.id
			}
			setMessages(messages.concat(newMessageObj))
			newMessage.reset()
		}
	}

//Profiili sivun testausta varten
/*
	return(
		<div className="chat-col col-7">
			<ProfilePage />
		</div>
	)*/

	return (
		<div className="chat-col col-7">
			<ChatHeader searchInput={searchInput} setSearchInput={setSearchInput} />
			<div className="read-container">
				<div className="relative">
					<div className="read-field">
						{listMessages()}
						<div id="beginning" ref={messagesEndRef}></div>
					</div>
				</div>

			</div>
			<MessageForm newMessage={newMessage} removeReset={removeReset} handleSubmit={handleSubmit} />
		</div>
	)
}

export default ChatColumn