import React from 'react'

const MessageForm = ({ removeReset, newMessage, handleSubmit }) => {
  return (
    <div className="message-field">
      <form className="message-from-group row" onSubmit={handleSubmit}>
        <input className="form-control col-lg-11 col-md-10 col-9" placeholder="Lähetä viesti (ei se kilpailu)"
          {...removeReset(newMessage)} />
        <button type="submit" className="send-btn btn btn-primary col-lg-1 col-md-2 col-3">
          <i className="fas fa-paper-plane"></i>
        </button>
      </form>
    </div>
  )
}

export default MessageForm
