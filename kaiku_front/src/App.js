import React, { useState } from 'react'
import './App.css'
import Login from './Login'
import Chat from './Chat'

const App = () => {
  const [currentPage, setCurrentPage] = useState('login')


  return (
    <div className="App">
      {currentPage === 'login' ? <Login/>: <Chat />}
    </div>
  )
}

export default App