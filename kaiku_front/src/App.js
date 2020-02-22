import React, { useState, useEffect } from 'react'
import './App.css'
import Login from './Login'
import Chat from './Chat'
import jsonService from '../src/services/jsonService'
import InitialData from './providers/InitialData'

const App = () => {
  const [loggedUser, setLoggedUser] = useState(null)
  const [initialData, setInitialData] = useState([])

  useEffect(() => {
    //profile theme color generator
    const colors = ['red', 'navy', 'orange', 'blue', 'green', 'amber', 'turqoise', 'pink', 'brown', 'dark']
    const generateColor = () => Math.floor(Math.random() * Math.floor(colors.length))

    jsonService.getInitialData()
      .then(response => {
        setInitialData({ ...response, users: response.users.map( u => u = { ...u, color: colors[generateColor()] }) })
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedKaikuUser')
    if (!loggedUserJSON || loggedUserJSON === 'undefined') return

    const user = JSON.parse(loggedUserJSON)
    setLoggedUser(user)
  }, [])

    return (
      <div className="App">
        <InitialData.Provider value={{initialData, loggedUser, setLoggedUser}}>
          {(loggedUser === null) ?
          <Login /> :
          <Chat />}
        </InitialData.Provider>
      </div>
    )
}

export default App