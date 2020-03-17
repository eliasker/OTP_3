import React, { useState, useContext } from 'react'
import filterUtil from '../../util/filterUtil'
import keyGen from '../../util/keyGen'
import InitialData from '../../providers/InitialData'
import CurrentChat from '../../providers/CurrentChat'
import Discussions from './Discussion'
import UsersHeader from './UsersHeader'
import DirectUser from './user/DirectUser'

const UsersColumn = ({ setDisplayProfile, userState }) => {
  const { initialData, loggedUser } = useContext(InitialData)
  const { chatState } = useContext(CurrentChat)

  const { setDisplayUser } = userState

  const [chatType, setChatType] = useState('group')
  const [searchInput, setSearchInput] = useState('')

  const listGroups = () => {
    if (chatState === null) return
    try {
      const groupChats = chatState.filter(chat => chat.type !== 'private')
      return groupChats.map(chat =>
        <Discussions key={keyGen.generateKey(chat.chatName)} chat={chat} setDisplayUser={setDisplayUser} />)
    } catch (e) { }
  }

  const findChat = (targetUser) => {
    try {
      const searchResult = chatState.find(chat => (chat.type === 'private' && chat.members.includes(targetUser.user_id)))
      if (searchResult) return { ...searchResult, name: targetUser.username }
    } catch (e) { }
    return { name: targetUser.username, type: 'private', members: [loggedUser.user_id, targetUser.user_id], messages: [] }
  }

  // Lists last direct message from other users 
  const listMessages = () => {
    if (initialData.users === undefined) return
    const filteredUsers = filterUtil(initialData.users.map(u => u.name), searchInput)
    console.log(initialData.users, loggedUser.user_id)
    return initialData.users
      .filter(u => u.user_id !== loggedUser.user_id)
      .filter(u => filteredUsers.find(e => u.name === e))
      .map(u => <DirectUser key={keyGen.generateKey(u.name)} privateChat={findChat(u)} user={u} setDisplayUser={setDisplayUser} />)
  }

  const showInput = () => chatType === 'direct' ?
    <input className="form-control find-user-input" placeholder="Etsi käyttäjä"
      value={searchInput} onChange={e => setSearchInput(e.target.value)} />:
    <></>

  return (
    <div className="chat-col col-5 px-0">
      <UsersHeader chatTypeState={{ chatType, setChatType }}
        setDisplayProfile={setDisplayProfile} />
      <div className="profile-container">
        <div className="relative">
          {showInput()}
          <div className="profile-list">
            {chatType === 'group' ? listGroups() : listMessages()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UsersColumn