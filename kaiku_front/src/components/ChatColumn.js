import React from 'react'
import ChatHeader from './ChatHeader'
import InMessage from './InMessage'
import OutMessage from './OutMessage'
import MessageForm from './MessageForm'


const ChatColumn = () => {
  return(
    <div className="chat-col col-7">
      <ChatHeader />
      <div className="read-field">
        <InMessage />
        <OutMessage />
        <InMessage />
        <OutMessage />
      </div>
        <MessageForm />
    </div>
  )
}

export default ChatColumn
