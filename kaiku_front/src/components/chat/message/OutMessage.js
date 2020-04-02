import React from 'react'
import formatTimeStamp from '../../../util/formatTime'

const OutMessage = ({ message }) => {
  console.log(message)

  return (
    <div className="out-container">
      <div className="out-message">
        <p>
          <span>{formatTimeStamp(message.timestamp)}</span>
          <br />
          {message.content}</p>
        <span className="message-date"> </span>
      </div>
    </div>
  )
}

export default OutMessage