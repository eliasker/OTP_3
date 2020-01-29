import React from 'react'
import UsersColumn from './components/UsersColumn'
import ChatColumn from './components/ChatColumn'

const Chat = ({ users, messages }) => {
	return (
		<div id="chat" className="container">
			<div className="chat-container container row">
				<UsersColumn users={users} />
				<ChatColumn messages={messages} />
			</div>
		</div>
	)
}

export default Chat