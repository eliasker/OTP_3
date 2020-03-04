import React, { useContext } from 'react'
import CurrentChat from '../../providers/CurrentChat'

const ChatHeader = ({ searchInput, setSearchInput }) => {
  const { currentChat } = useContext(CurrentChat)
  if (currentChat === null) return <></>
  return (
    <div className="chat-header row justify-content-between bg-primary-0">
      <div className="row marginy-0">
        {currentChat.type === 'private' ?
          <img src={currentChat.image} alt="profiilikuva" className="profile-thumb alpha-1" className={`${currentChat.color} profile-thumb`} /> :
          <img src="/kaikuthumb.png" alt="chatin kuva" className="profile-thumb alpha-1" />
        }
        <p className="d-none d-lg-block">{currentChat === null ? '' : currentChat.name}</p>
      </div>
      <form id="search-message" onSubmit={e => e.preventDefault()}>
        <input type="search" placeholder="search" value={searchInput} onChange={e => setSearchInput(e.target.value)} />
      </form>

    </div>
  )
}

export default ChatHeader