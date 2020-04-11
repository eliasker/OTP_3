import React, { useContext } from 'react'
import InitialData from '../../providers/InitialData'
import CurrentChat from '../../providers/CurrentChat'

const UsersHeader = ({ chatTypeState, setDisplayProfile }) => {
  const { initialData, loggedUser, setLoggedUser, disconnect, useLang } = useContext(InitialData)
  const string = (ref) => useLang.getString(ref)
  const { showModal, setShowModal } = useContext(CurrentChat)
  const { chatType, setChatType } = chatTypeState

  const onlineUsers = initialData.users ? initialData.users.length : 0
  const handleLogout = () => {
    window.localStorage.removeItem('loggedKaikuUser')
    console.log('logging out')
    setLoggedUser(null)
    disconnect()
  }

  const handleShowProfile = () => {
    console.log('setting displayUser to \n', loggedUser)
    setDisplayProfile('')
  }

  return (
    <div className="user-header-container">
      <div className="user-header row justify-content-between">
<<<<<<< HEAD
        <img src="profile-thumb-nobg.png" alt="profiili" className={'dark profile-thumb pointer'} onClick={() => handleShowProfile()} />
=======
        <img src="profile-thumb-nobg.png" alt={string('prof_alt_profile')} className={`dark profile-thumb pointer`} onClick={() => handleShowProfile()} />
>>>>>>> front-strings-to-variables

        <div className="dropdown">
          <span role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i className="fas fa-ellipsis-v"></i>
          </span>

          <div className="dropdown-menu users-menu" aria-labelledby="dropdownMenuLink">
            <span className="dropdown-item" onClick={() => handleShowProfile()}><i className="fas fa-user"></i> {string('u_head_profile')}</span>
            <span className="dropdown-item" onClick={() => setShowModal(!showModal)}><i className="fas fa-question-circle"></i>{string('u_head_help')}</span>
            <span className="dropdown-item" onClick={() => handleLogout()}><i className="fas fa-door-open"></i>{string('u_head_logout')}</span>
          </div>
        </div>
      </div>
      <div className="container chat-type row">
        <p className={`col-6 row justify-content-center ${chatType === 'group' ? 'active-chat' : ''}`} onClick={() => setChatType('group')}>
          <i className="fas fa-users"></i>
          <span className="d-none d-lg-block">{string('u_head_groups')}</span>
        </p>
        <p className={`col-6 row justify-content-center ${chatType === 'direct' ? 'active-chat' : ''}`} onClick={() => setChatType('direct')}>
          <i className="fas fa-user-friends"></i>
          <span className="d-none d-lg-block">{string('u_head_users')}</span>
        </p>
      </div>
      <p className="users-online">{string('u_head_uonline')} - {onlineUsers}</p>
    </div>
  )
}

export default UsersHeader