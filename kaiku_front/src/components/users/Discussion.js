import React, { useState, useContext } from 'react'
import InitialData from '../../providers/InitialData'
import keyGen from '../../util/keyGen'
import User from './user/User'

const Discussions = ({ setDisplayUser, chat }) => {
  const {initialData} = useContext(InitialData)
  const membersOnline = chat.members === undefined ? 0: chat.members.length;
  const [displayUsers, setDisplayUsers] = useState(false)
  const listUsers = () => {
    if(initialData.users === undefined) return console.log('initialData pending...')
      const filteredUsers = chat.members.map(m => initialData.users.find(u => u.id === m))
      //console.log("FILTER ", filteredUsers)
      return filteredUsers
        .map(u => <User key={keyGen.generateKey(u.name)} setDisplayUser={setDisplayUser} user={u} />)
  }

  const handleDiscussionClick = () => {
    setDisplayUsers(!displayUsers)
  }

  return (
    <div className="dropdown pos-rel">
      <div className="profile row" onClick={() => handleDiscussionClick()}>
        <img src="kaikuthumb.png" alt="profiili" className={`profile-thumb alpha-1`} />
        <div>
          <p>{chat.name} {membersOnline}/{membersOnline}</p>
        </div>
      </div>
      <div className={`${displayUsers ? "" : "d-none"}`}>
        {listUsers()}
      </div>
    </div>
  )
}

export default Discussions