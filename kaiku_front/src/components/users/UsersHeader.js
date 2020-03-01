import React, { useContext } from 'react'
import InitialData from '../../providers/InitialData'
import CurrentChat from '../../providers/CurrentChat'

const UsersHeader = ({ searchState, chatTypeState, setDisplayProfile }) => {
  const { initialData, loggedUser, setLoggedUser } = useContext(InitialData)
  const { showModal, setShowModal } = useContext(CurrentChat)
  const { searchInput, setSearchInput } = searchState
  const { chatType, setChatType } = chatTypeState

  const onlineUsers = initialData.users ? initialData.users.length: 0
  const handleLogout = () => {
    window.localStorage.removeItem('loggedKaikuUser')
    setLoggedUser(null)
  }

  const handleShowProfile = () => {
    console.log('setting displayUser to \n', loggedUser)
    setDisplayProfile('')
  }

  return (
    <div className="user-header-container">
      <div className="user-header row justify-content-between">
        <img src="profile-thumb-nobg.png" alt="profiili" className={`dark profile-thumb pointer`} onClick={() => handleShowProfile()}/>

        <div className="dropdown">
          <span role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i className="fas fa-ellipsis-v"></i>
          </span>

          <div className="dropdown-menu users-menu" aria-labelledby="dropdownMenuLink">
            <span className="dropdown-item" onClick={() => handleShowProfile()}><i className="fas fa-user"></i> Profiili</span>
            <span className="dropdown-item" onClick={() => setShowModal(!showModal)}><i className="fas fa-question-circle"></i> Apua</span>
            <span className="dropdown-item" onClick={() => handleLogout()}><i className="fas fa-door-open"></i> Lähe dallaa</span>
          </div>
        </div>
      </div>
      <div className="container chat-type row">
        <p className={`col-6 row justify-content-center ${chatType === 'group' ? 'active-chat': ''}`} onClick={() => setChatType('group')}>
          <i className="fas fa-users"></i>
          <span className="d-none d-lg-block">Ryhmät</span>
        </p>
        <p className={`col-6 row justify-content-center ${chatType === 'direct' ? 'active-chat': ''}`} onClick={() => setChatType('direct')}>
          <i className="fas fa-user-friends"></i>
          <span className="d-none d-lg-block">Käyttäjät</span>
        </p>
      </div>
      <p className="users-online">Käyttäjiä paikalla - {onlineUsers}</p>
      <input className="form-control find-user-input" placeholder="Etsi käyttäjä (ei huumeiden)"
        value={searchInput} onChange={e => setSearchInput(e.target.value)} />
    </div>
  )
}

export default UsersHeader