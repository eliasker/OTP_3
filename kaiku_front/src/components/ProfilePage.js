import React, { useState } from 'react'

const ProfilePage = ({ displayProfile, setDisplayProfile }) => {
  const [name, setName] = useState('Testi kayttis')
  return (
    <div className={`${displayProfile} profile-page-container`}>
      <div className="exit-profile-group">
        <span className="exit-profile" onClick={() => setDisplayProfile('d-none')}>
          <i className="fas fa-times"></i>
        </span>
        <p className="text-center py-2">Esc</p>
      </div>
      <div className="profile-page">
        <h2 className="profile-page-heading text-center">Profiilisivu</h2>
        <h5 className="profile-page-heading text-center">@username</h5>
        <div className="profile-image-container">
          <div>
            <img src="kaikuthumb.png" alt="profiili" className="profile-page-thumb" />
            <span><i className="fas fa-upload"></i></span>
          </div>
        </div>
        <form className="profile-update-form">
          <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)} />
          <button type="submit" className="btn btn-primary btn-block">Tallenna</button>
        </form>
      </div>
    </div>
  )
}

export default ProfilePage