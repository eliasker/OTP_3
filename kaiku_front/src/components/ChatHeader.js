import React from 'react'

const ChatHeader = ({ searchInput, handleSearchInput }) => {
  return (
    <div className="chat-header row justify-content-between">
      <div className="row marginy-0">
        <img src="https://bit.ly/2Rwb7mm" alt="profiili kuva" className="d-none d-lg-block profile-thumb" />
        <p>Mikko Mallikas</p>
      </div>
      <input className="form-control find-message-input" type="search" placeholder="Search"
        value={searchInput} onChange={handleSearchInput} />
    </div>
  )
}

export default ChatHeader