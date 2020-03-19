import React, { useState, useContext, useEffect } from 'react'
import UsersColumn from './users/UsersColumn'
import ChatColumn from './chat/ChatColumn'
import CurrentChat from '../providers/CurrentChat'
import InitialData from '../providers/InitialData'
import HelpPanel from './help/HelpPanel'
import useChatHook from '../hooks/useChatHook'

import Karvalakki from './debugTool/Karvalakki'

const Chat = () => {
  const { createChat, sendMessage, incMessageData, newChatData } = useContext(InitialData)
  const [displayProfile, setDisplayProfile] = useState('d-none')
  const [displayUser, setDisplayUser] = useState(undefined)
  const { chatState, postMessage, receiveMessage, currentChat, selectChat } = useChatHook(createChat, sendMessage, incMessageData, newChatData)
  const [showModal, setShowModal] = useState(false)

  /*
  console.log('currentchat cjat js', currentChat)

  useEffect(() => {
    console.log('helloworld')
  }, [currentChat])
*/
  return (
    <>
      <CurrentChat.Provider value={{ chatState, postMessage, receiveMessage, currentChat, selectChat, showModal, setShowModal }}>
        <div id="chat" className="container">
          <div className="chat-container container row">
            <UsersColumn setDisplayProfile={setDisplayProfile} userState={{ displayUser, setDisplayUser }} />
            <ChatColumn profileState={{ displayProfile, setDisplayProfile }} currentChat={currentChat} userState={{ displayUser, setDisplayUser }} />
          </div>
          <HelpPanel />
        </div>
        <Karvalakki />
      </CurrentChat.Provider>
    </>
  )
}

export default Chat
