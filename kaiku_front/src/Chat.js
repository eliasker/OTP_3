import React, { useState } from 'react'
import UsersColumn from './components/UsersColumn'
import ChatColumn from './components/ChatColumn'
import useChat from "./hooks/useChat"

const Chat = ({ users, messages, setMessages, loggedUser, setCurrentPage }) => {
  const [displayProfile, setDisplayProfile] = useState('d-none')

    const { sendMessage } = useChat()
    
    return (
    <div id="chat" className="container">
      <div className="chat-container container row">
        <UsersColumn users={users} setDisplayProfile={setDisplayProfile} setCurrentPage={setCurrentPage} />
            <ChatColumn messages={messages} setMessages={setMessages} loggedUser={loggedUser} users={users} displayProfile={displayProfile} setDisplayProfile={setDisplayProfile} sendMessage={sendMessage} />
      </div>
    </div>
  )
}

export default Chat
