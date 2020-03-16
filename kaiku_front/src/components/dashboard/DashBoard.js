import React, { useState, useEffect } from 'react'
import TopNav from './TopNav'
import Menu from './Menu'
import Content from './content/Content'
import Context from '../../providers/Context'
import groupService from '../../services/groupService'
import userService from '../../services/userService'

const DashBoard = () => {
  const [content, setContent] = useState('g/all')
  const [currentGroup, setCurrentGroup] = useState({})
  const [chats, setChats] = useState([])
  const [users, setUsers] = useState([])

  useEffect(() => {
    (async () => {
      const groups = await groupService.getAllChats()
      console.log('response from groupserv', groups)
      setChats(groups)
    })()
  }, [])

  useEffect(() => {
    (async () => {
      const users = await userService.getAllUsers()
      console.log('response from userserv', users)
      setUsers(users)
    })()
  }, [])

  return (
    <div id="dashboard">
      <TopNav />
      <div className="container-fluid">
        <div className="row">
          <Context.Provider value={{ chats, setChats, users, setUsers, content, setContent, currentGroup, setCurrentGroup }}>
            <Menu />
            <Content />
          </Context.Provider>
        </div>
      </div>
    </div>
  )
}

export default DashBoard
