import React, { useState } from 'react'
import User from './User'
import UsersHeader from './UsersHeader'
import filterUtil from '../util/filterUtil'
import keyGen from '../util/keyGen'

const UsersColumn = ({ users }) => {
	const [searchInput, setSearchInput] = useState('')

	const handleSearchInput = (event) => setSearchInput(event.target.value)

	const listUsers = () => {
		return (
			filterUtil(users.map(u => u.name), searchInput).map(name =>
				<User key={keyGen.generateKey(name)} name={name} />)
		)
	}

	return (
		<div className="chat-col col-5 px-0">
			<UsersHeader users={users} searchInput={searchInput} setSearchInput={setSearchInput} />
			<div className="profile-list">
				{listUsers()}
				<div className="brick"></div>
			</div>
		</div>
	)
}

export default UsersColumn