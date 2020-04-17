import React from 'react'
import Timestamp from './Timestamp'

const OutMessage = ({ message }) => {
  return (
    <div className="out-container">
      <div className="out-message">
        <p>{message.content}</p>
        <Timestamp timestamp={message.timestamp} inMessage={false} />
      </div>
    </div>
  )
}

export default OutMessage