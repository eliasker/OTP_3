import React from 'react'

const InMessage = ({ content, username }) => {
  return(
    <div className="in-container">
      <div className="in-message">
        <p>
          <span className="msg-senda">{username}</span>
          <br/>
          {content}
        </p>
        <span className="message-date"> 12.42, Tänään</span>
      </div>
    </div>
  )
}

export default InMessage