import React, { useState, useContext, useEffect } from 'react'
import UsersColumn from './users/UsersColumn'
import ChatColumn from './chat/ChatColumn'
import CurrentChat from '../providers/CurrentChat'
import InitialData from '../providers/InitialData'
import HelpPanel from './help/HelpPanel'

const Chat = () => {
  const { initialData } = useContext(InitialData)
  const [displayProfile, setDisplayProfile] = useState('d-none')
  const [displayUser, setDisplayUser] = useState(undefined)
  const [currentChat, setCurrentChat] = useState()
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if (initialData.chats)
      setCurrentChat(initialData.chats[0])
  }, [initialData])

  return (
    <>
    <CurrentChat.Provider value={{ currentChat, setCurrentChat, showModal, setShowModal }}>
        <div id="chat" className="container">
          <div className="chat-container container row">
              <UsersColumn setDisplayProfile={setDisplayProfile} userState={{ displayUser, setDisplayUser }} />
              <ChatColumn profileState={{ displayProfile, setDisplayProfile }} userState={{ displayUser, setDisplayUser }} />
          </div>
          <HelpPanel />
        </div>
      </CurrentChat.Provider>
    </>
  )
}

export default Chat
