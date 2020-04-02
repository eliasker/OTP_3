import React from 'react'
import formatTime from '../../../util/formatTime'

const InMessage = ({ message, user }) => {
  if (user === undefined) user = { color: 'green', username: '' }
  return (
    <div className="in-container">
      <div className="in-message">
        <p>
          <span className={`${user.color} msg-senda bg-none`}>{user.username}</span>
          <br />{message.content}
        </p>
        <span className="in-message-date">{formatTime.formatTimeStamp(message.timestamp)}</span>
      </div>
    </div>
  )
}

export default InMessage