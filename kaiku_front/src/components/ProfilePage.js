import React, { useState, useEffect } from 'react'

// Mikäli tarkasteltava profiili on kirjautuneen käyttäjän oma renderöidään muokkausmahdollisuudet
const ProfilePage = ({ loggedUser, displayProfile, setDisplayProfile }) => {
  console.log('selected user\n', displayProfile)
  console.log('who is logged in\n', loggedUser)
  const [displayUpload, setDisplayUpload] = useState('d-none')
  const [name, setName] = useState(loggedUser.name)

  if (displayProfile.id === loggedUser.id) {
    return (
      <div className={`${displayProfile} profile-page-container`}>
        <div className="exit-profile-group">
          <span className="exit-profile" onClick={() => setDisplayProfile(undefined)}>
            <i className="fas fa-times"></i>
          </span>
          <p className="text-center py-2">Poistu</p>
        </div>
        <div className="profile-page">
          <h2 className="profile-page-heading text-center">{loggedUser.name}</h2>
          <h5 className="profile-page-heading text-center">@{loggedUser.username}</h5>
          <div className="profile-image-container">
            <div>
              <img src="kaikuthumb.png" alt="profiili" className="profile-page-thumb" />
              <span onClick={() => setDisplayUpload('')}><i className="fas fa-upload"></i></span>
            </div>
          </div>
          <form className="profile-update-form">
            <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)} />
            <button type="submit" className="btn btn-primary btn-block">Tallenna</button>
          </form>
        </div>
        <div className={`${displayUpload} upload-container`} onClick={(e) => e.target.className.includes('container') ? setDisplayUpload('d-none') : ''}>
          <div className="upload-form">
            <form>
              <input type="file" />
              <button type="submit" onClick={e => e.preventDefault()}>lataa</button>
            </form>
            <button onClick={() => setDisplayUpload('d-none')}>peruuta</button>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className={`${displayProfile} profile-page-container`}>
      <div className="exit-profile-group">
        <span className="exit-profile" onClick={() => setDisplayProfile(undefined)}>
          <i className="fas fa-times"></i>
        </span>
        <p className="text-center py-2">Poistu</p>
      </div>
      <div className="profile-page">
        <h2 className="profile-page-heading text-center">{displayProfile.name}</h2>
        <h5 className="profile-page-heading text-center">@{displayProfile.username}</h5>
        <div className="profile-image-container">
          <div>
            <img src="profile-thumb-nobg.png" alt="profiili" className={`${displayProfile.color} profile-thumb`} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage