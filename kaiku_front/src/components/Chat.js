import React, { useState, useContext } from 'react'
import UsersColumn from './users/UsersColumn'
import ChatColumn from './chat/ChatColumn'
import CurrentChat from '../providers/CurrentChat'
import InitialData from '../providers/InitialData'
import HelpPanel from './help/HelpPanel'
import useChatHook from '../hooks/useChatHook'

const Chat = () => {
  const { initialData } = useContext(InitialData)
  const [displayProfile, setDisplayProfile] = useState('d-none')
  const [displayUser, setDisplayUser] = useState(undefined)
  const { addMessage, currentChat, selectChat } = useChatHook(initialData)
  const [showModal, setShowModal] = useState(false)

  // Testing function for receiving messages
  const receiveMesage = () => {
    const newMessageObj = {
      content: 'uusi viesti',
      user_id: '2'
    }
    addMessage(newMessageObj, Math.floor(Math.random() * initialData.chats.length))
  }
  return (
    <>
      <CurrentChat.Provider value={{ addMessage, currentChat, selectChat, showModal, setShowModal }}>
        <div id="chat" className="container">
          <div className="chat-container container row">
            <UsersColumn setDisplayProfile={setDisplayProfile} userState={{ displayUser, setDisplayUser }} />
            <ChatColumn profileState={{ displayProfile, setDisplayProfile }} userState={{ displayUser, setDisplayUser }} />
          </div>
          <HelpPanel />
        </div>
        <button onClick={() => receiveMesage()}>receive msg</button>
      </CurrentChat.Provider>
    </>
  )
}

export default Chat
