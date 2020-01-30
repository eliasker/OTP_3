import React from 'react'

const ChatHeader = () => {
  return(
    <div className="chat-header row justify-content-between">
      <div className="row marginy-0">
        <img src="https://bit.ly/2Rwb7mm" alt="profiili kuva" className="d-none d-lg-block profile-thumb" />
        <p>Mikko Mallikas</p>
      </div>
      <form id="search-message">
        <input type="search" placeholder="Search" />
      </form>
    </div>
  )
}

export default ChatHeader