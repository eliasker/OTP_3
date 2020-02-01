import React from 'react'

const UsersHeader = ({ users, searchInput, setSearchInput }) => {
  return (
    <div className="user-header-container">
      <div className="user-header row justify-content-between">
        <img src="https://bit.ly/38HOjG3" alt="profiili kuva" className="d-none d-lg-block profile-thumb" />
        
        <div className="dropdown">
          <span role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i className="fas fa-ellipsis-v"></i>
          </span>

          <div className="dropdown-menu users-menu" aria-labelledby="dropdownMenuLink">
            <span className="dropdown-item"><i className="fas fa-user"></i> Profile</span>
            <span className="dropdown-item"><i className="fas fa-door-open"></i> Log out</span>
          </div>
        </div>
      </div>
      <div className="container chat-type row">
        <p className="col-6 active-chat"><i class="fas fa-users"></i>Ryhmäkeskustelu</p>
        <p className="col-6"><i class="fas fa-user-friends"></i>Yksityiskeskustelu</p>
      </div>
      <p className="users-online">Käyttäjiä paikalla - {users.length}</p>
      <input className="form-control find-user-input" placeholder="Etsi käyttäjä (ei huumeiden)"
        value={searchInput} onChange={e => setSearchInput(e.target.value)} />
    </div>
  )
}

export default UsersHeader