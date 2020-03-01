import React, { useState, useContext } from 'react'
import filterUtil from '../../util/filterUtil'
import keyGen from '../../util/keyGen'
import InitialData from '../../providers/InitialData'
import Discussions from './Discussion'
import UsersHeader from './UsersHeader'
import DirectUser from './user/DirectUser'

const UsersColumn = ({ setDisplayProfile, userState }) => {
  const { initialData, loggedUser } = useContext(InitialData)
  const { setDisplayUser } = userState

  // chatTypes are group, global, private
  const [chatType, setChatType] = useState('group')
  const [searchInput, setSearchInput] = useState('')

  const listGroups = () => {
    if (initialData.chats === undefined) return
    const groupChats = initialData.chats.filter(chat => chat.type !== 'private')
    return groupChats.map(chat =>
      <Discussions key={keyGen.generateKey(chat.name)} chat={chat} setDisplayUser={setDisplayUser} />)
  }

  const findChat = (targetUser) => {
    const searchResult = initialData.chats.find(chat => (chat.type === 'private' && chat.members.includes(targetUser.id)))
    if (searchResult) return { ...searchResult, name: targetUser.username }
    else {
      return { name: targetUser.username, type: 'private', members: [loggedUser.id, targetUser.id], messages: [] }
    }
  }

  // Lists last direct message from other users 
  const listMessages = () => {
    if (initialData.users === undefined) return

    const filteredUsers = filterUtil(initialData.users.map(u => u.name), searchInput)

    return initialData.users
      .filter(u => u.id !== loggedUser.id)
      .filter(u => filteredUsers.find(e => u.name === e))
      .map(u => <DirectUser key={keyGen.generateKey(u.name)} privateChat={findChat(u)} user={u} setDisplayUser={setDisplayUser}/>)
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