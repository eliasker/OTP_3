import React, { useContext } from 'react'
import CurrentChat from '../../providers/CurrentChat'

const ChatHeader = ({ searchInput, setSearchInput }) => {
  const { currentChat } = useContext(CurrentChat)
  
  return (
    <div className="chat-header row justify-content-between bg-primary-0">
      <div className="row marginy-0">
        <img src={currentChat && currentChat.image ? currentChat.image :'/kaikuthumb.png'}
         alt="profiili kuva" className={`${currentChat && currentChat.color ? currentChat.color: ''} profile-thumb`} />
        <p className="d-none d-lg-block">{currentChat === null ? '' : currentChat.name}</p>
      </div>
      <form id="search-message" onSubmit={e => e.preventDefault()}>
        <input type="search" placeholder="search" value={searchInput} onChange={e => setSearchInput(e.target.value)} />
      </form>

    </div>
  )
}

export default ChatHeader