import React from 'react'

const InMessage = ({ content, user }) => {
  return (
    <div className="in-container">
      <div className="in-message">
        <p>
          <span className={`${user.color} msg-senda bg-none`}>{user.name}</span>
          <br />
          {content}
        </p>
        <span className="message-date"> 12.42, Tänään</span>
      </div>
    </div>
  )
}

export default InMessage