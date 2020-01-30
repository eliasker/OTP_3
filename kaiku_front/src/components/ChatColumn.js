import React, { useState, useRef, useEffect } from 'react'
import useField from '../hooks/hooks'
import ChatHeader from './ChatHeader'
import InMessage from './InMessage'
import OutMessage from './OutMessage'
import MessageForm from './MessageForm'

const ChatColumn = ({ messages, setMessages }) => {
	const messagesEndRef = useRef(null)
	const newMessage = useField('text')
	//const [newMessage, setNewMessage] = useState('Lähetä viesti (ei se kilpailu)...')
	const listMessages = () => {
		return messages.map(m => (m.type === 'in' ?
			<InMessage key={m.id} content={m.content} /> :
			<OutMessage key={m.id} content={m.content} />)
		)
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
		console.log('submit message:', newMessage)
		newMessage.reset()
	}

	return (
		<div className="chat-col col-7">
			<ChatHeader />
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