import React, { useState, useEffect } from 'react'
import UsersColumn from './components/UsersColumn'
import ChatColumn from './components/ChatColumn'

const Chat = ({ initialData, loggedUser, setCurrentPage, setLoggedUser }) => {
  const [displayProfile, setDisplayProfile] = useState('d-none')

  if(initialData === undefined) return <></>
  
  return (
    <div id="chat" className="container">
      <div className="chat-container container row">
        <UsersColumn initialData={initialData} setLoggedUser={setLoggedUser} setDisplayProfile={setDisplayProfile} setCurrentPage={setCurrentPage} />
        <ChatColumn loggedUser={loggedUser} initialData={initialData} displayProfile={displayProfile} setDisplayProfile={setDisplayProfile} />
      </div>
    </div>
  )
}

export default Chat
