import React from 'react'
import Timestamp from './Timestamp'

const InMessage = ({ message, user }) => {
  if (user === undefined) user = { color: 'green', username: '' }
  return (
    <div className="in-container">
      <div className="in-message">
        <p>
          <span className={`${user.color} msg-senda bg-none`}>{user.username}</span>
          <br />{message.content}
        </p>
        <Timestamp timestamp={message.timestamp} inMessage={true} />
      </div>
    </div>
  )
}

export default InMessage