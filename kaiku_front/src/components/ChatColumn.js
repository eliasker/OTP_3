import React, { useState, useRef, useEffect } from 'react'
import useField from '../hooks/hooks'
import ChatHeader from './ChatHeader'
import InMessage from './InMessage'
import OutMessage from './OutMessage'
import MessageForm from './MessageForm'
import keyGen from '../util/keyGen'
import ProfilePage from './ProfilePage'
import useChat from '../hooks/useChat'
import jsonService from '../services/jsonService'

const ChatColumn = ({ loggedUser, users, displayProfile, setDisplayProfile }) => {
  const { messages, sendMessage } = useChat(loggedUser.id)

  const [searchInput, setSearchInput] = useState('')
  const messagesEndRef = useRef(null)
  const newMessage = useField('text')

  const scrollToBottom = () => {
    if (messagesEndRef.current !== null) messagesEndRef.current.scrollIntoView({ behavior: "auto" })
  }

  const getUser = (user_id) => {
    const user = users.find(user => user.id === user_id) || { name: '', color: 'red' }
    return user
  }

  const listMessages = () => {
    console.log('listmsgs', messages)
    const filteredMsgs = messages.filter(msg => msg.content.includes(searchInput))
    return filteredMsgs.map(m =>
      m.user_id === loggedUser.id ?
        <OutMessage key={keyGen.generateKey(m.content)} content={m.content} /> :
        <InMessage key={keyGen.generateKey(m.content)} content={m.content} user={getUser(m.user_id)} />)
  }

  useEffect(scrollToBottom, [messages])

  const removeReset = (object) => {
    const { reset, ...newObject } = object
    return newObject
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (newMessage.value !== '') {
      const newMessageObj = {
        content: newMessage.value,
        message_id: keyGen.generateId(),
        user_id: loggedUser.id
      }
      sendMessage(newMessageObj)

      newMessage.reset()
    }
  }

  return (
    <div className="chat-col col-7">
      <ProfilePage displayProfile={displayProfile} setDisplayProfile={setDisplayProfile} />
      <ChatHeader searchInput={searchInput} setSearchInput={setSearchInput} setDisplayProfile={setDisplayProfile} />
      <div className="read-container">
        <div className="relative">
          <div className="read-field">
            {listMessages()}
            <div id="beginning" ref={messagesEndRef}></div>
          </div>
        </div>

      </div>
      <MessageForm newMessage={newMessage} removeReset={removeReset} handleSubmit={handleSubmit} />
    </div>
  )
}

export default ChatColumn
