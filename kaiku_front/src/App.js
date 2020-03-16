import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import InitialData from './providers/InitialData'
import Login from './components/Login'
import Chat from './components/Chat'
import './styles/App.css'
import DashBoard from './components/dashboard/DashBoard'
import Authentication from './components/auth/Authentication'
import socketService from './services/socketService'

const App = () => {
  const [loggedUser, setLoggedUser] = useState(null)
  const [initialData, setInitialData] = useState([])
  const [authToken, setAuthToken] = useState()
  const { createSocketConnection, createChat, sendMessage, disconnect, incMessageData, newChatData } = socketService()

  useEffect(() => {
    if (loggedUser === null || loggedUser.users === undefined) return
    const colors = ['red', 'navy', 'orange', 'blue', 'green', 'amber', 'turqoise', 'pink', 'brown', 'dark']
    const generateColor = () => Math.floor(Math.random() * Math.floor(colors.length))

    setInitialData({ ...loggedUser, users: loggedUser.users.map(u => u = { ...u, color: colors[generateColor()] }) })
  }, [loggedUser])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedKaikuUser')
    const masterkey = window.localStorage.getItem('mastakey')

    if (!loggedUserJSON || loggedUserJSON === 'undefined') return
    const user = JSON.parse(loggedUserJSON)
    setLoggedUser(user)
    createSocketConnection(user.token, user.user_id)

    if (!masterkey || masterkey === 'undefined') return
    const auth = JSON.parse(masterkey)
    setAuthToken(auth)
  }, [])


  const showContent = () => {
    if (!loggedUser) return <Login createSocketConnection={createSocketConnection} />
    if (!authToken) return <Authentication />
    return <DashBoard />
  }

  return (
    <div className="App">
      <Router>
        <InitialData.Provider value={{ initialData, incMessageData, newChatData, sendMessage, disconnect, createChat, loggedUser, setLoggedUser, setAuthToken }}>
          <Route exact path="/" render={() => (loggedUser === null) ? <Login createSocketConnection={createSocketConnection} /> : <Chat />} />
          <Route exact path="/dashboard" render={showContent} />
        </InitialData.Provider>
      </Router>
    </div>
  )
}

export default App
