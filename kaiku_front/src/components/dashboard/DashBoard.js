import React, { useState, useEffect } from 'react'
import TopNav from './TopNav'
import Menu from './Menu'
import Content from './content/Content'
import Context from '../../providers/Context'
import groupService from '../../services/groupService'
import userService from '../../services/userService'
import AdminHelpPanel from '../help/AdminHelpPanel'

const DashBoard = () => {
  const [content, setContent] = useState('g/all')
  const [currentGroup, setCurrentGroup] = useState({})
  const [chats, setChats] = useState([])
  const [users, setUsers] = useState([])

  useEffect(() => {
    (async () => {
      const groups = await groupService.getAllChats()
      setChats(groups)
    })()
  }, [content])

  useEffect(() => {
    (async () => {
      const users = await userService.getAllUsers()
      setUsers(users)
    })()
  }, [content])

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
      <AdminHelpPanel />
    </div>
  )
}

export default DashBoard
