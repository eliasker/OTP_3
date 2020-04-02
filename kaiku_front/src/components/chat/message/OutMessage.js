import React from 'react'
import formatTime from '../../../util/formatTime'

const OutMessage = ({ message }) => {
  return (
    <div className="out-container">
      <div className="out-message">
        <p>{message.content}</p>
        {message.message_id === null ?
          <span className="out-message-date">{message.timestamp}</span> :
          <span className="out-message-date">{formatTime.formatTimeStamp(message.timestamp)}</span>}
      </div>
    </div>
  )
}

export default OutMessage