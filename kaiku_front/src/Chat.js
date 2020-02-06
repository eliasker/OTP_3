import React, { useState } from 'react'
import UsersColumn from './components/UsersColumn'
import ChatColumn from './components/ChatColumn'

const Chat = ({ users, loggedUser, setCurrentPage, setLoggedUser }) => {
  const [displayProfile, setDisplayProfile] = useState('d-none')

  return (
    <div id="chat" className="container">
      <div className="chat-container container row">
        <UsersColumn users={users} setLoggedUser={setLoggedUser} setDisplayProfile={setDisplayProfile} setCurrentPage={setCurrentPage} />
        <ChatColumn loggedUser={loggedUser} users={users} displayProfile={displayProfile} setDisplayProfile={setDisplayProfile} />
      </div>
    </div>
  )
}

export default Chat
