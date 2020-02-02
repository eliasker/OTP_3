import React from 'react'
import UsersColumn from './components/UsersColumn'
import ChatColumn from './components/ChatColumn'
import useChat from "./hooks/useChat"

const Chat = ({ users, messages, setMessages, loggedUser }) => {

  const { sendMessage } = useChat()
  
  return (
    <div id="chat" className="container">
      <div className="chat-container container row">
	<UsersColumn users={users} />
	<ChatColumn messages={messages} setMessages={setMessages} loggedUser={loggedUser} users={users} sendMessage={message => {
          sendMessage({ message });
        }}/>
      </div>
    </div>
  )
}

export default Chat
