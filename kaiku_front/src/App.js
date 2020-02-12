import React, { useState, useEffect } from 'react'
import './App.css'
import Login from './Login'
import Chat from './Chat'
import jsonService from '../src/services/jsonService'

const App = () => {
  const [loggedUser, setLoggedUser] = useState(null)
  const [currentPage, setCurrentPage] = useState('chat')
  const [initialData, setInitialData] = useState([])
  
  /*
  useEffect(() => {
    //profile theme colors
    const colors = ['red', 'navy', 'orange', 'blue', 'green', 'amber', 'turqoise', 'pink', 'brown', 'dark']
    jsonService.getUsers()
    .then(users => setUsers(users.map(u => u = { ...u, color: colors[Math.floor(Math.random() * Math.floor(colors.length))] })))
  }, [])
  */

  useEffect(() => {
    jsonService.getInitialData()
      .then(response => {
        setInitialData(response)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedKaikuUser')

    if (!loggedUserJSON || loggedUserJSON === 'undefined') return

    const user = JSON.parse(loggedUserJSON)
    setLoggedUser(user)
    setCurrentPage('chat')
  }, [])

  if (loggedUser === null) {
    return (
      <div className="App">
        <Login initialData={initialData} setCurrentPage={setCurrentPage} setLoggedUser={setLoggedUser} />
      </div>
    )
  }

  return (
    <div className="App">
      {initialData === undefined ? <div>react on kivaa</div> : <Chat initialData={initialData} setLoggedUser={setLoggedUser} loggedUser={loggedUser} setCurrentPage={setCurrentPage} />}
    </div>
  )
}

export default App