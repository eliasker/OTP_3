import React from 'react'
import User from './User'
import UsersHeader from './UsersHeader'

const UsersColumn = () => {
  return(
    <div className="chat-col col-5 px-0">
      <UsersHeader />
      <div className="profile-list">
        <User />
        <User />
        <User />
      </div>
    </div>
  )
}

export default UsersColumn