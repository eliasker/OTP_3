import React from 'react'
import UsersColumn from './components/UsersColumn'
import ChatColumn from './components/ChatColumn'

const Chat = () => {
  return(
  <div id="chat" className="container">
    <div className="chat-container container row">
      <UsersColumn />
        <ChatColumn />
    </div>
  </div>
  )
}

export default Chat
