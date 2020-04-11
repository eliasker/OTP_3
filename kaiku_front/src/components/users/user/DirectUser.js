import React, { useContext } from 'react'
import CurrentChat from '../../../providers/CurrentChat'
import InitialData from '../../../providers/InitialData'

const DirectUser = ({ user, privateChat }) => {
  const { selectChat } = useContext(CurrentChat)
  const { useLang } = useContext(InitialData)
  const string = (ref) => useLang.getString(ref)

  var lastMessage = undefined
  const formatMessage = (message, maxLength) => message.length < maxLength ?
    message.slice(0, maxLength) : message.slice(0, maxLength) + '...'

  const handleShowChat = () => {
    selectChat({ ...privateChat, image: '/profile-thumb-nobg.png', color: user.color })
  }

  lastMessage = privateChat.messages[privateChat.messages.length - 1]
  return (
    <div className="profile pr-user row" onClick={handleShowChat}>
      <img src="profile-thumb-nobg.png" alt={string('prof_alt_profile')} className={`${user.color} profile-thumb`} />
      <div>
        <p>{user.name}</p>
        {lastMessage !== undefined ?
          <span className="text-sm">{lastMessage.user_id === user.user_id ? user.username + ': ' : string('d_user_you') + ': '}
            {formatMessage(lastMessage.content, 30)}</span> :
          <span className="text-sm">{string('d_user_sendfirst')}</span>
        }
      </div>
      {privateChat.unreadMessages === true ? <i className="fas fa-circle unread-messages" /> : null}
    </div>
  )
}

export default DirectUser