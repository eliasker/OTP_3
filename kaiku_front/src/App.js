import React, { useState, useEffect } from 'react'
import './App.css'
import Login from './Login'
import Chat from './Chat'
import jsonService from '../src/services/jsonService'

const App = () => {
  // placeholder logged in user for testing 
  const [loggedUser, setLoggedUser] = useState(null)
  const [currentPage, setCurrentPage] = useState('chat')
  const [users, setUsers] = useState([])

  useEffect(() => {
    //profile theme colors
    const colors = ['red', 'navy', 'orange', 'blue', 'green', 'amber', 'turqoise', 'pink', 'brown', 'dark']
    jsonService.getUsers()
    .then(users => setUsers(users.map(u => u = { ...u, color: colors[Math.floor(Math.random() * Math.floor(colors.length))] })))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedKaikuUser')
    
    if (!loggedUserJSON || loggedUserJSON === 'undefined') return

    const user = JSON.parse(loggedUserJSON)
    setLoggedUser(user)
    setCurrentPage('chat')
  }, [])

  return (
    <div className="App">
      {loggedUser === null ? <Login setCurrentPage={setCurrentPage} users={users} setLoggedUser={setLoggedUser} /> : <Chat users={users} setLoggedUser={setLoggedUser} loggedUser={loggedUser} setCurrentPage={setCurrentPage} />}
    </div>
  )
}

export default App