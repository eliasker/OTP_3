import React, { useState } from 'react'
import UsersHeader from './UsersHeader'
import filterUtil from '../util/filterUtil'
import keyGen from '../util/keyGen'
import DirectUser from './DirectUser'
import Discussion from './Discussion'

const UsersColumn = ({ initialData, setDisplayProfile, setCurrentPage, loggedUser, setLoggedUser }) => {
  //chatti tyypit: direct, group, elevator
  const [chatType, setChatType] = useState('group')
  const [searchInput, setSearchInput] = useState('')

  const listGroups = () => {
    if (initialData.chats === undefined) return
    //console.log('initialdata groups', initialData.chats)
    return initialData.chats.map(chat => <Discussion key={keyGen.generateKey(chat.name)} chat={chat} initialData={initialData} setDisplayProfile={setDisplayProfile} />)
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
      <UsersHeader initialData={initialData} loggedUser={loggedUser} setLoggedUser={setLoggedUser} searchInput={searchInput} setSearchInput={setSearchInput} setDisplayProfile={setDisplayProfile} setCurrentPage={setCurrentPage}
        chatType={chatType} setChatType={setChatType} />
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