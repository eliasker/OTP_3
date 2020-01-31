import React, { useState } from 'react'
import './App.css'
import Login from './Login'
import Chat from './Chat'
import io from "socket.io-client";

const socket = io.connect("http://localhost:6969");

const App = () => {
  
  const [currentPage, setCurrentPage] = useState('login')
  const [msg, setMsg] = useState('')

  const handleMsgChange = e => {
    setMsg(e.target.value)
  }
  
  const onSubmit = () => {
    socket.emit("message", msg)
    setMsg('')
  }

  return (

    //   <div className="App">
    //       {currentPage === 'a' ? <Login/>: <Chat />}
    //   </div>


    //test input for messages
    <div>
      <input onChange={e => handleMsgChange(e)} value={msg} />
      <button onClick={onSubmit}>Send</button>
    </div>
  )
}

export default App
