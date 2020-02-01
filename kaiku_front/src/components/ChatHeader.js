import React from 'react'

const ChatHeader = ({ searchInput, setSearchInput }) => {
  return (
    <div className="chat-header row justify-content-between">
      <div className="row marginy-0">
        <img src="/kaikuthumb.png" alt="profiili kuva" className="d-none d-lg-block profile-thumb alpha-1" />
        <p>Ryhmäkeskustelu</p>
      </div>
      <form id="search-message" onSubmit={e => e.preventDefault()}>
        <input type="search" placeholder="search" value={searchInput} onChange={e => setSearchInput(e.target.value)}/>
      </form>
      
    </div>
  )
}

export default ChatHeader