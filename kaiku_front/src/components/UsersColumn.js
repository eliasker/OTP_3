import React, { useState, useContext } from 'react'
import UsersHeader from './UsersHeader'
import filterUtil from '../util/filterUtil'
import keyGen from '../util/keyGen'
import DirectUser from './DirectUser'
import Discussion from './Discussion'
import InitialData from '../providers/InitialData'

const UsersColumn = ({ setDisplayProfile, setDisplayUser }) => {
  const {initialData} = useContext(InitialData)
  //chatti tyypit: direct, group
  const [chatType, setChatType] = useState('group')
  const [searchInput, setSearchInput] = useState('')

  const listGroups = () => {
    if (initialData.chats === undefined) return
    //console.log('initialdata groups', initialData.chats)
    return initialData.chats.map(chat => <Discussion key={keyGen.generateKey(chat.name)} chat={chat} setDisplayUser={setDisplayUser} />)
  }

  const listMessages = () => {
    if (initialData.users === undefined) return

    const filteredUsers = filterUtil(initialData.users.map(u => u.name), searchInput)

    return initialData.users
      .filter(u => filteredUsers.find(e => u.name === e))
      .map(u => <DirectUser key={keyGen.generateKey(u.name)} user={u} />)
  }

  return (
    <div className="chat-col col-5 px-0">
      <UsersHeader searchState={{ searchInput, setSearchInput }} chatTypeState={{ chatType, setChatType }}
        setDisplayProfile={setDisplayProfile} />
      <div className="profile-container">
        <div className="relative">
          <div className="profile-list">
            {chatType === 'group' ? listGroups() : listMessages()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UsersColumn