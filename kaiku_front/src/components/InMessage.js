import React from 'react'

const InMessage = ({ content }) => {
  return(
    <div class="in-container">
      <div class="in-message">
        <p>{content}</p>
        <span class="message-date"> 12.42, Tänään</span>
      </div>
    </div>
  )
}

export default InMessage