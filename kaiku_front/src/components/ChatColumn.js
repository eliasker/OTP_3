import React from 'react'
import ChatHeader from './ChatHeader'
import InMessage from './InMessage'
import OutMessage from './OutMessage'
import MessageForm from './MessageForm'

const ChatColumn = ({ messages }) => {
	const listMessages = () => {
		return (
			messages.map(m => {
				return (m.type === 'in' ?
					<InMessage key={m.id} content={m.content} /> :
					<OutMessage key={m.id} content={m.content} />)
			})
		)
	}

	return (
		<div className="chat-col col-7">
			<ChatHeader />
			<div className="read-field">
				{listMessages()}
			</div>
			<MessageForm />
		</div>
	)
}

export default ChatColumn