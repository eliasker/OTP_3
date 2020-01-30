import React, { useState } from 'react'
import User from './User'
import UsersHeader from './UsersHeader'
import filterUtil from '../util/filterUtil'

const UsersColumn = ({ users }) => {
	const [searchInput, setSearchInput] = useState('')

	const handleSearchInput = (event) => setSearchInput(event.target.value)

	// key:t vois muuttaa järkeviks 
	const listUsers = () => {
		return (
			filterUtil(users.map(u => u.name), searchInput).map(name =>
				<User key={name} name={name} />)
		)
	}

	return (
		<div className="chat-col col-5 px-0">
			<UsersHeader searchInput={searchInput} handleSearchInput={handleSearchInput} />
			<div className="profile-list">
				{listUsers()}
				<div className="brick"></div>
			</div>
		</div>
	)
}

export default UsersColumn