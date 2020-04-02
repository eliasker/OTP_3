import React from 'react'
import formatTimeStamp from '../../../util/formatTime'
const InMessage = ({ message, user }) => {
  if (user === undefined) user = { color: 'green', username: '' }
  console.log(message)
  return (
    <div className="in-container">
      <div className="in-message">
        <p>
          <span className={`${user.color} msg-senda bg-none`}>{user.username}</span>
          <span> {formatTimeStamp(message.timestamp)}</span>
          <br />
          {message.content}
        </p>
        <span className="message-date"> </span>
      </div>
    </div>
  )
}

export default InMessage