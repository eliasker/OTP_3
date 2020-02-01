import React from 'react'
import UsersColumn from './components/UsersColumn'
import ChatColumn from './components/ChatColumn'

const Chat = ({ users, messages, setMessages, loggedUser }) => {
	return (
		<div id="chat" className="container">
			<div className="chat-container container row">
				<UsersColumn users={users} />
				<ChatColumn messages={messages} setMessages={setMessages} loggedUser={loggedUser} />
			</div>
		</div>
	)
}

export default Chat