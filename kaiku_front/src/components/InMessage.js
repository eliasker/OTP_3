import React from 'react'

const InMessage = ({ content }) => {
  return(
    <div className="in-container">
      <div className="in-message">
        <p>{content}</p>
        <span className="message-date"> 12.42, Tänään</span>
      </div>
    </div>
  )
}

export default InMessage