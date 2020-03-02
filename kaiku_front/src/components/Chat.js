import React, { useState, useContext, useEffect } from 'react'
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
  //const [currentChat, setCurrentChat] = useState()
  const { currentChat, selectChat } = useChatHook(initialData)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if (initialData.chats)
      selectChat(initialData.chats[0])
  }, [initialData])

  return (
    <>
      <CurrentChat.Provider value={{ currentChat, selectChat, showModal, setShowModal }}>
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
