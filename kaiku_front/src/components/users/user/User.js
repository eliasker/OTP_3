import React from 'react'

const User = ({ user, privateChat, setCurrentChat, setDisplayUser }) => {
  const handleShowProfile = () => setDisplayUser(user)

  // tässä tarvitaan logiikka uuden keskustelun aloittamiseksi
  const handleShowChat = () => {
    console.log('handleShowChat clicked', privateChat)
    setCurrentChat(privateChat)
  }
  return (
    <div className="dropdown pos-rel">
      <span role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <div className="profile row">
          <img src="profile-thumb-nobg.png" alt="profiili" className={`${user.color} profile-thumb`} />
          <div>
            <p>{user.name}</p>
            <span className="text-sm">@{user.username}</span>
          </div>
        </div>
      </span>

      <div className="dropdown-menu profile-menu" aria-labelledby="dropdownMenuLink">
        <span className="text-muted text-sm">Valikko: @{user.username}</span>
        <span className="dropdown-item" onClick={handleShowChat}><i className="fas fa-paper-plane"></i> Lähetä viesti</span>
        <span className="dropdown-item" onClick={handleShowProfile}><i className="fas fa-user"></i> Katso profiili</span>
      </div>
    </div>
  )
}

export default User