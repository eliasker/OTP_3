import React, { useState, useContext } from 'react'
import InitialData from '../../providers/InitialData'

// Mikäli tarkasteltava profiili on kirjautuneen käyttäjän oma renderöidään muokkausmahdollisuudet
const ProfilePage = ({ profileState }) => {
  const { loggedUser, useLang } = useContext(InitialData)
  const string = (ref) => useLang.getString(ref);

  const { displayProfile, setDisplayProfile } = profileState
  const [displayUpload, setDisplayUpload] = useState('d-none')
  const [name, setName] = useState(loggedUser.name)
  const [username, setUsername] = useState(loggedUser.username)
  const [password, setPassword] = useState('')
  const [rePassword, setRePassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if( password !== rePassword ) return

    const updatedUser = (password.length > 5) ? { name, username, password }: { name, username }
    setPassword('')
    setRePassword('')
    setDisplayProfile('d-none')
  }

  return (
    <div className={`${displayProfile} profile-page-container`}>
      <div className="exit-profile-group">
        <span className="exit-profile" onClick={() => setDisplayProfile('d-none')}>
          <i className="fas fa-times"></i>
        </span>
        <p className="text-center py-2">{string('prof_exit')}</p>
      </div>
      <div className="profile-page">
        <h2 className="profile-page-heading text-center">{loggedUser.name}</h2>
        <h5 className="profile-page-heading text-center">@{loggedUser.username}</h5>
        <div className="profile-image-container">
          <div>
            <img src="kaikuthumb.png" alt={string('prof_alt_profile')} className="profile-page-thumb" />
            <span onClick={() => setDisplayUpload('')}><i className="fas fa-upload"></i></span>
          </div>
        </div>

        <form className="profile-update-form" onSubmit={(e) => handleSubmit(e)}>
          <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)} />
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroupPrepend2">@</span>
            </div>
            <input type="text" className="form-control" id="user-username" placeholder={string('prof_username')} aria-describedby="inputGroupPrepend2"
            value={username} onChange={e => setUsername(e.target.value)} required />
          </div>
          <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} placeholder={string('prof_newpwd')} />
          <input type="password" className="form-control" value={rePassword} onChange={e => setRePassword(e.target.value)} placeholder={string('prof_newpwd_repeat')} />
          <button type="submit" className="btn btn-dark btn-block">{string('prof_save')}</button>
        </form>
      </div>

      <div className={`${displayUpload} upload-container`} onClick={(e) => e.target.className.includes('container') ? setDisplayUpload('d-none') : ''}>
        <div className="upload-form">
          <form>
            <input type="file" />
            <button type="submit" onClick={e => e.preventDefault()}>{string('prof_upload')}</button>
          </form>
          <button onClick={() => setDisplayUpload('d-none')}>{string('prof_cancel')}</button>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage