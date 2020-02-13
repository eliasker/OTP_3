import React, { useState, useEffect } from 'react'

const ProfilePage = ({ loggedUser, displayProfile, setDisplayProfile }) => {
  const [displayUpload, setDisplayUpload] = useState('d-none')
  const [name, setName] = useState(loggedUser.name)

  return (
    <div className={`${displayProfile} profile-page-container`}>
      <div className="exit-profile-group">
        <span className="exit-profile" onClick={() => setDisplayProfile('d-none')}>
          <i className="fas fa-times"></i>
        </span>
        <p className="text-center py-2">Poistu</p>
      </div>
      <div className="profile-page">
        <h2 className="profile-page-heading text-center">Profiilisivu</h2>
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
      <div className={`${displayUpload} upload-container`} onClick={(e) => e.target.className.includes('container')? setDisplayUpload('d-none'): '' }>
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

export default ProfilePage