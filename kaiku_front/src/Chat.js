import React, { useState, useContext } from 'react'
import UsersColumn from './components/UsersColumn'
import ChatColumn from './components/ChatColumn'

const Chat = () => {
  const [displayProfile, setDisplayProfile] = useState('d-none')
  const [displayUser, setDisplayUser] = useState(undefined)

  //tätä ei enään tarvita?
  //if(initialData === undefined) return <></>
  
  return (
    <div id="chat" className="container">
      <div className="chat-container container row">
        <UsersColumn setDisplayProfile={setDisplayProfile} setDisplayUser={setDisplayUser} />
        <ChatColumn profileState={{displayProfile, setDisplayProfile}} userState={{displayUser, setDisplayUser}} />
      </div>
    </div>
  )
}

export default Chat
