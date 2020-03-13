import React from 'react'

const UserPage = ({ userState }) => {
  const { displayUser, setDisplayUser } = userState

  if( displayUser === undefined ) return <></>

  return (
    <div className={'profile-page-container'}>
      <div className="exit-profile-group">
        <span className="exit-profile" onClick={() => setDisplayUser(undefined)}>
          <i className="fas fa-times"></i>
        </span>
        <p className="text-center py-2">Poistu</p>
      </div>
      <div className="profile-page">
        <div className="profile-image-container">
          <div>
            <img src="profile-thumb-nobg.png" alt="profiili" className={`${displayUser.color} profile-page-thumb`} />
          </div>
        </div>
        <h2 className="profile-page-heading text-center">{displayUser.name}</h2>
        <h5 className="profile-page-heading text-center">@{displayUser.username}</h5>

      </div>
    </div>
  )
}

export default UserPage