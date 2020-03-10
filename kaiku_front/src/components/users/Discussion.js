import React, { useState, useContext } from 'react'
import InitialData from '../../providers/InitialData'
import keyGen from '../../util/keyGen'
import User from './user/User'
import CurrentChat from '../../providers/CurrentChat'

const Discussions = ({ setDisplayUser, chat }) => {
  const { initialData, loggedUser } = useContext(InitialData)
  const { currentChat, chatState, selectChat } = useContext(CurrentChat)
  //const membersOnline = chat.members === undefined ? 0 : chat.members.length;
  const [displayUsers, setDisplayUsers] = useState(currentChat === chat)

  const findChat = (targetUser) => {
    const searchResult = chatState.find(chat => (chat.type === 'private' && chat.members.includes(targetUser._Id)))
    if (searchResult) return { ...searchResult, name: targetUser.username }
    else {
      return { name: targetUser.username, type: 'private', members: [loggedUser.user_id, targetUser._Id], messages: [] }
    }
  }

  const listUsers = () => {
    if (initialData.users === undefined) return console.log('initialData pending...')
    const filteredUsers = chat.members.map(m => initialData.users.find(u => u._Id === m))
    return filteredUsers
      .map(u => <User key={keyGen.generateKey(u.name)} setDisplayUser={setDisplayUser} user={u} privateChat={findChat(u)} />)
  }

  const handleDiscussionClick = () => {
    setDisplayUsers(!displayUsers)
    console.log('selecting chat', chat)
    selectChat(chat)
  }
  //  unread msgs pallura: <i className="fas fa-circle">
  return (
    <div className="group-chat dropdown pos-rel">
      <div className={`${displayUsers ? 'bg-primary-1' : 'bg-primary-2'} profile row`} onClick={() => handleDiscussionClick()}>
        <img src="kaikuthumb.png" alt="profiili" className={`profile-thumb alpha-1`} />
        <div>
          <p>{chat.chatName}</p>
        </div>
      </div>
      <div className={`${displayUsers ? "" : "d-none"}`}>
        {listUsers()}
      </div>
    </div>
  )
}

export default Discussions