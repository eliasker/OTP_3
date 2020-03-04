import React, { useState, useContext } from 'react'
import InitialData from '../../providers/InitialData'
import keyGen from '../../util/keyGen'
import User from './user/User'
import CurrentChat from '../../providers/CurrentChat'

const Discussions = ({ setDisplayUser, chat }) => {
  const { initialData, loggedUser } = useContext(InitialData)
  const { currentChat, selectChat } = useContext(CurrentChat)
  const membersOnline = chat.members === undefined ? 0 : chat.members.length;
  const [displayUsers, setDisplayUsers] = useState(currentChat === chat)

  // Searches initialData.chats for 'private' conversation with target user
  // Name of private conversation is the username of target user
  const findChat = (targetUser) => {
    const searchResult = initialData.chats.find(chat => (chat.type === 'private' && chat.members.includes(targetUser.id)))
    if (searchResult) return { ...searchResult, name: targetUser.username }
    else {
      return { name: targetUser.username, type: 'private', members: [loggedUser.id, targetUser.id], messages: [] }
    }
  }

  const listUsers = () => {
    if (initialData.users === undefined) return console.log('initialData pending...')
    const filteredUsers = chat.members.map(m => initialData.users.find(u => u.id === m))
    return filteredUsers
      .map(u => <User key={keyGen.generateKey(u.name)} setDisplayUser={setDisplayUser} user={u} privateChat={findChat(u)} />)
  }

  const handleDiscussionClick = () => {
    setDisplayUsers(!displayUsers)
    selectChat({...chat, color: 'none', image: '/kaikuthumb.png'})
  }

  return (
    <div className="group-chat dropdown pos-rel">
      <div className={`${displayUsers ? 'bg-primary-2': 'bg-primary-5'} profile row`} onClick={() => handleDiscussionClick()}>
        <img src="kaikuthumb.png" alt="profiili" className={`profile-thumb alpha-1`} />
        <div>
          <p>{chat.name} {membersOnline}/{membersOnline}</p>
        </div>
      </div>
      <div className={`${displayUsers ? "" : "d-none"}`}>
        {listUsers()}
      </div>
    </div>
  )
}

export default Discussions