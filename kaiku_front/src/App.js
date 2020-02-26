import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import jsonService from '../src/services/jsonService'
import InitialData from './providers/InitialData'
import Login from './components/Login'
import Chat from './components/Chat'
import './styles/App.css'
import DashBoard from './components/dashboard/DashBoard'

const App = () => {
  const [loggedUser, setLoggedUser] = useState(null)
  const [initialData, setInitialData] = useState([])

  useEffect(() => {
    //profile theme color generator
    const colors = ['red', 'navy', 'orange', 'blue', 'green', 'amber', 'turqoise', 'pink', 'brown', 'dark']
    const generateColor = () => Math.floor(Math.random() * Math.floor(colors.length))

    jsonService.getInitialData()
      .then(response => {
        setInitialData({ ...response, users: response.users.map(u => u = { ...u, color: colors[generateColor()] }) })
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
      <Router>
        <InitialData.Provider value={{ initialData, loggedUser, setLoggedUser }}>
          <Route exact path="/" render={() => (loggedUser === null) ? <Login /> : <Chat />} />
          <Route exact path="/dashboard" render={() => <DashBoard />} />
        </InitialData.Provider>
      </Router>
    </div>
  )
}

export default App