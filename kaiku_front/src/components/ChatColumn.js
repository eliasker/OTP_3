import React from 'react'
import useField from '../hooks/hooks'
import ChatHeader from './ChatHeader'
import InMessage from './InMessage'
import OutMessage from './OutMessage'
import MessageForm from './MessageForm'
import keyGen from '../util/keyGen'

const ChatColumn = ({ messages, setMessages }) => {
	const newMessage = useField('text')
	const listMessages = () => {
		return messages.map(m => (m.type === 'in' ?
			<InMessage key={keyGen.generateKey(m.content)} content={m.content} /> :
			<OutMessage key={keyGen.generateKey(m.content)} content={m.content} />)
		)
	}

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
			</div>
			<MessageForm newMessage={newMessage} removeReset={removeReset} handleSubmit={handleSubmit} />
		</div>
	)
}

export default ChatColumn