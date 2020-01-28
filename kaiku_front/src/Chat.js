import React from 'react'

const Chat = () => {
  return(
  <div id="chat" className="container">
    <div className="chat-container container row">
      <div className="chat-col col-5 px-0">
        <div className="chat-header row justify-content-between">
          <img src="https://bit.ly/38HOjG3" alt="profiili kuva" className="d-none d-lg-block profile-thumb" />
          <i className="fas fa-ellipsis-v"></i>
        </div>
        <input className="form-control find-user-input" placeholder="Etsi käyttäjä (ei huumeiden)"/>
        <div className="profile-list">
          <div className="profile row">
            <img src="https://bit.ly/2Rwb7mm" alt="profiili" className="profile-thumb" />
            <p>Testi henkilö</p>
          </div>
          <div className="profile row">
            <img src="https://bit.ly/2Rwb7mm" alt="profiili" className="profile-thumb" />
            <p>Testi henkilö 1</p>
          </div>
          <div className="profile row">
            <img src="https://bit.ly/2Rwb7mm" alt="profiili" className="profile-thumb" />
            <p>Testi henkilö</p>
          </div>
          <div className="profile row">
            <img src="https://bit.ly/2Rwb7mm" alt="profiili" className="profile-thumb" />
            <p>Testi henkilö 1</p>
          </div>
          <div className="profile row">
            <img src="https://bit.ly/2Rwb7mm" alt="profiili" className="profile-thumb" />
            <p>Testi henkilö</p>
          </div>
          <div className="profile row">
            <img src="https://bit.ly/2Rwb7mm" alt="profiili" className="profile-thumb" />
            <p>Testi henkilö 1</p>
          </div>
          <div className="profile row">
            <img src="https://bit.ly/2Rwb7mm" alt="profiili" className="profile-thumb" />
            <p>Testi henkilö</p>
          </div>
          <div className="profile row">
            <img src="https://bit.ly/2Rwb7mm" alt="profiili" className="profile-thumb" />
            <p>Testi henkilö 1</p>
          </div>
          <div className="profile row">
            <img src="https://bit.ly/2Rwb7mm" alt="profiili" className="profile-thumb" />
            <p>Testi henkilö</p>
          </div>
          <div className="profile row">
            <img src="https://bit.ly/2Rwb7mm" alt="profiili" className="profile-thumb" />
            <p>Testi henkilö 1</p>
          </div>
        </div>
      </div>
      <div className="chat-col col-7">
        <div className="chat-header row justify-content-between">
          <div className="row marginy-0">
            <img src="https://bit.ly/2Rwb7mm" alt="profiili kuva" className="d-none d-lg-block profile-thumb" />
            <p>Mikko Mallikas</p>
          </div>
          <i class="fas fa-search"></i>
        </div>
        <div className="read-field">
          <div class="in-container">
            <div class="in-message">
              <p>Moi testikäyttäjä!</p>
              <span class="message-date"> 12.42, Tänään</span>
            </div>
          </div>
          <div class="out-container">
            <div class="out-message">
              <p>Tämä on testi-tekstiviesti ':D'</p>
              <span class="message-date"> 12.41, Tänään</span>
            </div>
          </div>
        </div>
        <div className="message-field">
          <div className="message-form-group row">
              <input className="form-control col-lg-11 col-md-10 col-9" placeholder="Aloita keskustelu..."/>
              <button type="submit" class="send-btn btn btn-primary col-lg-1 col-md-2 col-3">
                <i class="fas fa-paper-plane"></i>
              </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Chat