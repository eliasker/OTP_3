import React, { useContext } from 'react'
import CurrentChat from '../../../providers/CurrentChat'

const DirectUser = ({ user, privateChat }) => {
  const { selectChat } = useContext(CurrentChat)
  //const message = 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English.'
  var lastMessage = undefined
  const formatMessage = (message, maxLength) => message.length < 40 ? message.slice(0, maxLength) : message.slice(0, maxLength) + '...'

  const handleShowChat = () => {
    console.log('handleShowChat clicked', privateChat)
    selectChat({...privateChat, image: '/profile-thumb-nobg.png', color: user.color})
  }
  //if (privateChat.messages.length === 0) return <></>
  lastMessage = privateChat.messages[privateChat.messages.length - 1]

  return (
    <div className="profile pr-user row" onClick={handleShowChat}>
      <img src="profile-thumb-nobg.png" alt="profiili" className={`${user.color} profile-thumb`} />
      <div>
        <p>{user.name}</p>
        {lastMessage !== undefined ?
          <span className="text-sm">{lastMessage.user_id === user.id ? user.name : 'Sinä'}: {formatMessage(lastMessage.content, 40)}</span> :
          <span className="text-sm">Lähetä ensimmäinen viesti</span>
        }
      </div>
    </div>
  )
}

export default DirectUser