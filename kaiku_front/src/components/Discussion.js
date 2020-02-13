import React, { useState } from 'react'
import keyGen from '../util/keyGen'
import User from '../components/User'

const Discussions = ({ initialData, chat }) => {
  const [displayUsers, setDisplayUsers] = useState(false)
  const listUsers = () => {
    if(initialData.users === undefined) return console.log('initialData pending...')
      return initialData.users
        .map(u => <User key={keyGen.generateKey(u.name)} user={u} />)
  }

  const handleDiscussionClick = () => {
    setDisplayUsers(!displayUsers)
  }

  return (
    <div className="dropdown pos-rel">
      <div className="profile row" onClick={() => handleDiscussionClick()}>
        <img src="profile-thumb-nobg.png" alt="profiili" className={`red profile-thumb`} />
        <div>
          <p>{chat.name}</p>
        </div>
      </div>
      <div className={`${displayUsers ? "" : "d-none"}`}>
        {listUsers()}
      </div>
    </div>
  )
}

export default Discussions