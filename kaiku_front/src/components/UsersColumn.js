import React, { useState } from 'react'
import User from './User'
import UsersHeader from './UsersHeader'
import filterUtil from '../util/filterUtil'
import keyGen from '../util/keyGen'

const UsersColumn = ({ users }) => {
	const [searchInput, setSearchInput] = useState('')
	//console.log(users)

	
	//console.log(newUsers)
	const listUsers = () => {
		const filteredUsers = filterUtil(users.map(u => u.name), searchInput)

		return users
			.map(u => filteredUsers.find(e => u.name === e) ? u: null)
			.map(u => <User key={keyGen.generateKey(u.name)} user={u} />)
	}

	return (
		<div className="chat-col col-5 px-0">
			<UsersHeader users={users} searchInput={searchInput} setSearchInput={setSearchInput} />
			<div className="profile-container">
				<div className="relative">
					<div className="profile-list">
						{listUsers()}
					</div>
				</div>
			</div>
		</div>
	)
}

export default UsersColumn