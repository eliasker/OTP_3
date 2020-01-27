import React from 'react'

const Chat = () => {
  return(
  <div id="chat" className="container">
    <div className="chat-container container row">
      <div className="chat-col col-5 px-0">
        <div className="chat-header row justify-content-between">
          <img src="/kaiku-export-white.png" alt="kaiku logo" className="my-1 mx-1 d-none d-lg-block" />
          <i className="fas fa-ellipsis-v"></i>
        </div>
        <input className="form-control" placeholder="Search for user"/>
      </div>
      <div className="chat-col col-7">
        <div className="read-field">

        </div>
        <div className="message-field">

        </div>
      </div>
    </div>
  </div>
  )
}

export default Chat

//<img src="/kaiku-export-white.png" alt="kaiku logo"/>