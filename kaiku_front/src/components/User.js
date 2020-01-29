import React from 'react'

const User = ({ name }) => {
  return(
    <div className="profile row">
      <img src="https://bit.ly/2Rwb7mm" alt="profiili" className="profile-thumb" />
      <p>{name}</p>
    </div>
  )
}

export default User