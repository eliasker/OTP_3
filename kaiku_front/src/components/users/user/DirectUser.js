import React, { useContext } from 'react'
import CurrentChat from '../../../providers/CurrentChat'

const DirectUser = ({ user, privateChat }) => {
  const { selectChat } = useContext(CurrentChat)
  var lastMessage = undefined
  const formatMessage = (message, maxLength) => message.length < maxLength ?
    message.slice(0, maxLength) : message.slice(0, maxLength) + '...'

  const handleShowChat = () => {
    selectChat({ ...privateChat, image: '/profile-thumb-nobg.png', color: user.color })
  }

  lastMessage = privateChat.messages[privateChat.messages.length - 1]
  return (
    <div className="profile pr-user row" onClick={handleShowChat}>
      <img src="profile-thumb-nobg.png" alt="profiili" className={`${user.color} profile-thumb`} />
      <div>
        <p>{user.name}</p>
        {lastMessage !== undefined ?
          <span className="text-sm">{lastMessage.user_id === user.user_id ? user.username + ': ' : 'Sinä: '}
            {formatMessage(lastMessage.content, 30)}</span> :
          <span className="text-sm">Lähetä ensimmäinen viesti</span>
        }
      </div>
      {privateChat.unreadMessages === true ? <i className="fas fa-circle unread-messages" /> : null}
    </div>
  )
}

export default DirectUser