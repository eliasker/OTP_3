import React from 'react'

const UsersHeader = ({ users, setLoggedUser, searchInput, setSearchInput, setDisplayProfile, setCurrentPage, chatType, setChatType }) => {
  
  const handleLogout = () => {
    window.localStorage.removeItem('loggedKaikuUser')
    setLoggedUser(null)
    setCurrentPage('login')
  }

  return (
    <div className="user-header-container">
      <div className="user-header row justify-content-between">
        <img src="profile-thumb-nobg.png" alt="profiili" className={`dark profile-thumb pointer`} onClick={() => setDisplayProfile('')}/>

        <div className="dropdown">
          <span role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i className="fas fa-ellipsis-v"></i>
          </span>

          <div className="dropdown-menu users-menu" aria-labelledby="dropdownMenuLink">
            <span className="dropdown-item" onClick={() => setDisplayProfile('')}><i className="fas fa-user"></i> Profile</span>
            <span className="dropdown-item" onClick={handleLogout}><i className="fas fa-door-open"></i> Log out</span>
          </div>
        </div>
      </div>
      <div className="container chat-type row">
        <p className={`col-6 row justify-content-center ${chatType === 'group' ? 'active-chat': ''}`} onClick={() => setChatType('group')}>
          <i className="fas fa-users"></i>
          <span className="d-none d-lg-block"> Ryhmäkeskustelu</span>
        </p>
        <p className={`col-6 row justify-content-center ${chatType === 'direct' ? 'active-chat': ''}`} onClick={() => setChatType('direct')}>
          <i className="fas fa-user-friends"></i>
          <span className="d-none d-lg-block"> YV</span>
        </p>
      </div>
      <p className="users-online">Käyttäjiä paikalla - {users.length}</p>
      <input className="form-control find-user-input" placeholder="Etsi käyttäjä (ei huumeiden)"
        value={searchInput} onChange={e => setSearchInput(e.target.value)} />
    </div>
  )
}

export default UsersHeader