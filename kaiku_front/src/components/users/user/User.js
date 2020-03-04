import React, { useContext } from 'react'
import InitialData from '../../../providers/InitialData'
import CurrentChat from '../../../providers/CurrentChat'

const User = ({ user, privateChat, setDisplayUser }) => {
  const { loggedUser } = useContext(InitialData)
  const { selectChat } = useContext(CurrentChat)
  const handleShowProfile = () => setDisplayUser(user)

  // tässä tarvitaan logiikka uuden keskustelun aloittamiseksi
  const handleShowChat = () => {
    console.log('handleShowChat clicked', privateChat)
    selectChat({ ...privateChat, image: '/profile-thumb-nobg.png', color: user.color })
  }
  return (
    <div className="dropdown pos-rel">
      <span role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <div className="profile pr-user row">
          <img src="profile-thumb-nobg.png" alt="profiili" className={`${user.color} profile-thumb`} />
          <div>
            <p>{user.name}</p>
            <span className="text-sm">@{user.username}</span>
          </div>
        </div>
      </span>

      <div className="dropdown-menu profile-menu" aria-labelledby="dropdownMenuLink">
        <span className="text-muted text-sm">Valikko: @{user.username}</span>
        {(loggedUser.id === user.id) ? null : <span className="dropdown-item" onClick={handleShowChat}><i className="fas fa-paper-plane"></i> Lähetä viesti</span>}
        <span className="dropdown-item" onClick={handleShowProfile}><i className="fas fa-user"></i> Katso profiili</span>
      </div>
    </div>
  )
}

export default User