import React, { useState } from 'react'
import User from './User'
import UsersHeader from './UsersHeader'
import filterUtil from '../util/filterUtil'

const UsersColumn = () => {
	const [searchInput, setSearchInput] = useState('')
	const users = [
		{ name: 'Marko' }, { name: 'Mirka' }, { name: 'markus' }, { name: 'Makedius' }
	]

	const handleSearchInput = (event) => {
		setSearchInput(event.target.value)
		console.log(event.target.value)
	}
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
		</div>
	</div>
)
}

export default UsersColumn