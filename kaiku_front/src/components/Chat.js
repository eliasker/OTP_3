import React, { useState, useContext } from 'react'
import UsersColumn from './users/UsersColumn'
import ChatColumn from './chat/ChatColumn'
import CurrentChat from '../providers/CurrentChat'
import InitialData from '../providers/InitialData'
import HelpPanel from './help/HelpPanel'
import useChatHook from '../hooks/useChatHook'
import groupService from '../services/groupService'

import Karvalakki from './debugTool/Karvalakki'

const Chat = () => {
  const { initialData, loggedUser } = useContext(InitialData)
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

  const getAllGroups = () => {
    const allusers = groupService.getAll(loggedUser.user_id)
    console.log(allusers)
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
        <div>
          <button onClick={() => receiveMesage()}>receive msg</button>
          <button onClick={() => getAllGroups()}>getAllGroups</button>
          </div>
        <Karvalakki />
      </CurrentChat.Provider>
    </>
  )
}

export default Chat
