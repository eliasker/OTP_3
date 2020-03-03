import React, { useContext } from 'react'
import CurrentChat from '../../providers/CurrentChat'

const ChatHeader = ({ searchInput, setSearchInput }) => {
  const { currentChat } = useContext(CurrentChat)
  return (
    <div className="chat-header row justify-content-between">
      <div className="row marginy-0">
        <img src="/kaikuthumb.png" alt="profiili kuva" className="profile-thumb alpha-1" />
        <p className="d-none d-lg-block">{currentChat === null ? '' : currentChat.name}</p>
      </div>
      <form id="search-message" onSubmit={e => e.preventDefault()}>
        <input type="search" placeholder="search" value={searchInput} onChange={e => setSearchInput(e.target.value)} />
      </form>

    </div>
  )
}

export default ChatHeader