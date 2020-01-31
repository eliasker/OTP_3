import React from 'react'

const MessageForm = () => {
  return(
    <div className="message-field">
      <div className="message-form-group row">
          <input className="form-control col-lg-11 col-md-10 col-9" placeholder="Aloita keskustelu..."/>
          <button type="submit" class="send-btn btn btn-primary col-lg-1 col-md-2 col-3">
            <i class="fas fa-paper-plane"></i>
          </button>
      </div>
    </div>
  )
}

export default MessageForm
