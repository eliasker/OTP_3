import React, { useState, useRef, useEffect } from 'react'
import useField from '../hooks/hooks'
import ChatHeader from './ChatHeader'
import InMessage from './InMessage'
import OutMessage from './OutMessage'
import MessageForm from './MessageForm'
import keyGen from '../util/keyGen'

const ChatColumn = ({ messages, setMessages, loggedUser }) => {
	const [searchInput, setSearchInput] = useState('')
	const messagesEndRef = useRef(null)
	const newMessage = useField('text')

	const listMessages = () => {
		const filteredMsgs = messages.filter(msg => msg.content.includes(searchInput))
		return filteredMsgs.map(m =>
			m.user_id === loggedUser.id ?
				<OutMessage key={keyGen.generateKey(m.content)} content={m.content} /> :
				<InMessage key={keyGen.generateKey(m.content)} content={m.content} />)
	}

	const scrollToBottom = () => {
		messagesEndRef.current.scrollIntoView({ behavior: "auto" })
	}

	useEffect(scrollToBottom, [messages])

	const removeReset = (object) => {
		const { reset, ...newObject } = object
		return newObject
	}

	const handleSubmit = (event) => {
		event.preventDefault()
		const newMessageObj = {
			content: newMessage.value,
			id: keyGen.generateId,
			user_id: loggedUser.id
		}
		setMessages(messages.concat(newMessageObj))
		newMessage.reset()
	}

	return (
		<div className="chat-col col-7">
			<ChatHeader searchInput={searchInput} setSearchInput={setSearchInput} />
			<div className="read-field">
				<div className="brick"></div>
				{listMessages()}
				<div id="beginning" ref={messagesEndRef}></div>
			</div>
			<MessageForm newMessage={newMessage} removeReset={removeReset} handleSubmit={handleSubmit} />
		</div>
	)
}

export default ChatColumn