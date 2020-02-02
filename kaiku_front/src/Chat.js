import React, {useState} from 'react'
import UsersColumn from './components/UsersColumn'
import ChatColumn from './components/ChatColumn'

const Chat = ({ users, messages, setMessages, loggedUser, setCurrentPage }) => {
	const [displayProfile, setDisplayProfile] = useState('d-none')

	return (
		<div id="chat" className="container">
			<div className="chat-container container row">
				<UsersColumn users={users} setDisplayProfile={setDisplayProfile} setCurrentPage={setCurrentPage} />
				<ChatColumn messages={messages} setMessages={setMessages} loggedUser={loggedUser} users={users} displayProfile={displayProfile} setDisplayProfile={setDisplayProfile} />
			</div>
		</div>
	)
}

export default Chat