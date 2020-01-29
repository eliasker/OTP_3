import React from 'react'

const UsersHeader = () => {
  return(
    <>
      <div className="chat-header row justify-content-between">
        <img src="https://bit.ly/38HOjG3" alt="profiili kuva" className="d-none d-lg-block profile-thumb" />
        <i className="fas fa-ellipsis-v"></i>
      </div>
      <input className="form-control find-user-input" placeholder="Etsi käyttäjä (ei huumeiden)"/>
    </>
  )
}

export default UsersHeader