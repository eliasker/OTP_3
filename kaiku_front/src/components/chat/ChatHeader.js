import React, { useContext } from 'react'
import CurrentChat from '../../providers/CurrentChat'
import InitialData from '../../providers/InitialData';

const ChatHeader = ({ searchInput, setSearchInput }) => {
  const { useLang } = useContext(InitialData)
  const string = (ref) => useLang.getString(ref)
  const { currentChat } = useContext(CurrentChat)

  if (currentChat === null || currentChat === undefined) return (<></>)
  return (
    <div className="chat-header row justify-content-between bg-primary-0">
      <div className="row marginy-0">
        {(currentChat.image !== undefined) ?
          <img src={currentChat.image ? currentChat.image : '/kaikuthumb.png'}
            alt={string('chat_alt_profilepic')} className="profile-thumb alpha-1" className={`${currentChat.color} profile-thumb`} /> :
          <img src="/kaikuthumb.png" alt={string('chat_alt_chatpicture')} className="profile-thumb alpha-1" />
        }
        <p className="d-none d-lg-block">{currentChat.type === 'private' ? currentChat.name : currentChat.chatName}</p>
      </div>
      <form id="search-message" onSubmit={e => e.preventDefault()}>
        <input type="search" placeholder={string('chat_ph_search')} value={searchInput} onChange={e => setSearchInput(e.target.value)} />
      </form>

    </div>
  )
}

export default ChatHeader