import React, { useState, useContext, useEffect } from 'react'
import UsersColumn from './users/UsersColumn'
import ChatColumn from './chat/ChatColumn'
import CurrentChat from '../providers/CurrentChat'
import InitialData from '../providers/InitialData'

const Chat = () => {
  const { initialData } = useContext(InitialData)
  const [displayProfile, setDisplayProfile] = useState('d-none')
  const [displayUser, setDisplayUser] = useState(undefined)
  const [currentChat, setCurrentChat] = useState()

  useEffect(() => {
    if (initialData.chats)
      setCurrentChat(initialData.chats[0])
  }, [initialData])

  return (
    <div id="chat" className="container">
      <div className="chat-container container row">
        <CurrentChat.Provider value={{ currentChat, setCurrentChat }}>
          <UsersColumn setDisplayProfile={setDisplayProfile} userState={{ displayUser, setDisplayUser }} />
          <ChatColumn profileState={{ displayProfile, setDisplayProfile }} userState={{ displayUser, setDisplayUser }} />
        </CurrentChat.Provider>
      </div>
    </div>
  )
}

export default Chat
