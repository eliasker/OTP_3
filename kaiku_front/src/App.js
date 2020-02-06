import React, { useState, useEffect } from 'react'
import './App.css'
import Login from './Login'
import Chat from './Chat'
import jsonService from '../src/services/jsonService'

const App = () => {
  //colors
  const colors = ['red', 'navy', 'orange', 'blue', 'green', 'amber', 'turqoise', 'dark', 'pink', 'brown']
  // placeholder logged in user for testing 
  const [loggedUser, setLoggedUser] = useState({
    name: 'Testi',
    id: "0"
  })
  //const [currentPage, setCurrentPage] = useState('tähän login niin aloittaa login pagestä')
  const [currentPage, setCurrentPage] = useState('login')
  const [users, setUsers] = useState([])

  useEffect(() => {
    jsonService.getUsers()
    .then(users => setUsers(users.map(u => u = { ...u, color: colors[Math.floor(Math.random() * Math.floor(colors.length))] })))
  }, [])  

  return (
    <div className="App">
      {currentPage === 'login' ? <Login setCurrentPage={setCurrentPage} users={users} setLoggedUser={setLoggedUser} /> : <Chat users={users} loggedUser={loggedUser} setCurrentPage={setCurrentPage} />}
    </div>
  )
}

export default App