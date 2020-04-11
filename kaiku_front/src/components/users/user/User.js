import React, { useContext } from 'react'
import InitialData from '../../../providers/InitialData'
import CurrentChat from '../../../providers/CurrentChat'

const User = ({ user, privateChat, setDisplayUser }) => {
  const { loggedUser, useLang } = useContext(InitialData)
  const string = (ref) => useLang.getString(ref)
  const { selectChat } = useContext(CurrentChat)
  const handleShowProfile = () => setDisplayUser(user)

  // tässä tarvitaan logiikka uuden keskustelun aloittamiseksi
  const handleShowChat = () => {
    selectChat({ ...privateChat, image: '/profile-thumb-nobg.png', color: user.color })
  }
  return (
    <div className="dropdown pos-rel">
      <span role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <div className="profile pr-user row">
          <img src="profile-thumb-nobg.png" alt={string('prof_alt_profile')} className={`${user.color} profile-thumb`} />
          <div>
            <p>{user.name}</p>
            <span className="text-sm">@{user.username}</span>
          </div>
        </div>
      </span>

      <div className="dropdown-menu profile-menu" aria-labelledby="dropdownMenuLink">
        <span className="text-muted text-sm">{string('user_menu')}: @{user.username}</span>
        {(loggedUser.user_id === user.user_id) ? null : <span className="dropdown-item" onClick={handleShowChat}><i className="fas fa-paper-plane"></i>{string('user_sendmsg')}</span>}
        <span className="dropdown-item" onClick={handleShowProfile}><i className="fas fa-user"></i>{string('user_openprof')}</span>
      </div>
    </div>
  )
}

export default User