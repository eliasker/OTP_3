import React from 'react'

const User = ({ user }) => {
  return (
    <div className="profile row">
      <img src="profile-thumb-nobg.png" alt="profiili" className={`${user.color} profile-thumb`} />
      <p>{user.name}</p>
    </div>
  )
}

export default User