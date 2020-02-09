import React, { useState } from 'react'
import User from './User'
import UsersHeader from './UsersHeader'
import filterUtil from '../util/filterUtil'
import keyGen from '../util/keyGen'
import DirectUser from './DirectUser'

const UsersColumn = ({ users, setDisplayProfile, setCurrentPage, setLoggedUser }) => {
  //chatti tyypit: direct, group, elevator
  const [chatType, setChatType] = useState('group')
  const [searchInput, setSearchInput] = useState('')

  const listUsers = () => {
    const filteredUsers = filterUtil(users.map(u => u.name), searchInput)

    return users
      .filter(u => filteredUsers.find(e => u.name === e))
      .map(u => <User key={keyGen.generateKey(u.name)} user={u} />)
  }

  const listMessages = () => {
    const filteredUsers = filterUtil(users.map(u => u.name), searchInput)

    return users
      .filter(u => filteredUsers.find(e => u.name === e))
      .map(u => <DirectUser key={keyGen.generateKey(u.name)} user={u} />)
    //return <User user={users[0]} />
  }

  return (
    <div className="chat-col col-5 px-0">
      <UsersHeader users={users} setLoggedUser={setLoggedUser} searchInput={searchInput} setSearchInput={setSearchInput} setDisplayProfile={setDisplayProfile} setCurrentPage={setCurrentPage}
        chatType={chatType} setChatType={setChatType} />
      <div className="profile-container">
        <div className="relative">
          <div className="profile-list">
            {chatType === 'group' ? listUsers(): listMessages()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UsersColumn