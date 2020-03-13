import React, { useState, useRef, useEffect, useContext } from 'react'

import useField from '../../hooks/hooks'
import keyGen from '../../util/keyGen'
import messageValidation from '../../util/inputValidation'
import InitialData from '../../providers/InitialData'
import InMessage from './message/InMessage'
import OutMessage from './message/OutMessage'
import DefaultMessage from './message/DefaultMessage'
import ProfilePage from '../profile/ProfilePage'
import UserPage from '../profile/UserPage'
import MessageForm from './MessageForm'
import ChatHeader from './ChatHeader'
import CurrentChat from '../../providers/CurrentChat'

const ChatColumn = ({ profileState, userState, currentChat }) => {
  const { initialData, loggedUser } = useContext(InitialData)
  const { postMessage } = useContext(CurrentChat)
  const [searchInput, setSearchInput] = useState('')
  const messagesEndRef = useRef(null)
  const newMessage = useField('text')
  const scrollToBottom = () => {
    if (messagesEndRef.current !== null) messagesEndRef.current.scrollIntoView({ behavior: 'auto' })
  }

  //console.log('curr chat in column', currentChat)

  const getUser = (user_id) => {
    const user = initialData.users.find(user => user._Id === user_id)
    return user
  }

  const listMessages = () => {
    if (currentChat === null || currentChat === undefined) return
    if (currentChat.messages === undefined || currentChat.messages.length === 0) return <DefaultMessage />
    const filteredMsgs = currentChat.messages.filter(msg => msg.content.includes(searchInput))
    return filteredMsgs.map(m =>
      m.user_id === loggedUser.user_id ?
        <OutMessage key={keyGen.generateKey(m.content)} content={m.content} /> :
        <InMessage key={keyGen.generateKey(m.content)} content={m.content} user={getUser(m.user_id)} />)
  }
  /*
    useEffect(() => {
      console.log('testi', currentChat)
    }, [currentChat])
  */
  useEffect(scrollToBottom, [initialData, currentChat])

  const removeReset = (object) => {
    const { reset, ...newObject } = object
    return newObject
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (messageValidation(newMessage.value)) {
      const newMessageObj = {
        content: newMessage.value,
        message_id: null,
        user_id: loggedUser.user_id
      }
      postMessage(newMessageObj, currentChat.chat_id)
      newMessage.reset()
    }
  }
  return (
    <div className="chat-col col-7">
      <UserPage userState={userState} />
      <ProfilePage loggedUser={loggedUser} profileState={profileState} />

      <div>
        <ChatHeader searchInput={searchInput} setSearchInput={setSearchInput} />
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
    </div>
  )
}

export default ChatColumn
