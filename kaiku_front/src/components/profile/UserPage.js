import React, {useContext} from 'react'
import InitialData from '../../providers/InitialData'

const UserPage = ({ userState }) => {
  const {displayUser, setDisplayUser} = userState
  const { useLang } = useContext(InitialData);
  const string = (ref) => useLang.getString(ref)

  if( displayUser === undefined ) return <></>

  return (
    <div className={`profile-page-container`}>
      <div className="exit-profile-group">
        <span className="exit-profile" onClick={() => setDisplayUser(undefined)}>
          <i className="fas fa-times"></i>
        </span>
        <p className="text-center py-2">{string('prof_exit')}</p>
      </div>
      <div className="profile-page">
        <div className="profile-image-container">
          <div>
            <img src="profile-thumb-nobg.png" alt={string('prof_alt_profile')} className={`${displayUser.color} profile-page-thumb`} />
          </div>
        </div>
        <h2 className="profile-page-heading text-center">{displayUser.name}</h2>
        <h5 className="profile-page-heading text-center">@{displayUser.username}</h5>

      </div>
    </div>
  )
}

export default UserPage