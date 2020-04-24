import React, { useState, useEffect, useContext } from 'react'
import TopNav from './TopNav'
import Menu from './Menu'
import Content from './content/Content'
import Context from '../../providers/Context'
import groupService from '../../services/groupService'
import InitialData from '../../providers/InitialData'
import userService from '../../services/userService'

const DashBoard = () => {
  const [content, setContent] = useState('g/all')
  const [currentGroup, setCurrentGroup] = useState({})
  const [chats, setChats] = useState([])
  const [users, setUsers] = useState([])
  const { loggedUser } = useContext(InitialData)

  useEffect(() => {
    (async () => {
      const groups = await groupService.getAllChats(loggedUser.token)
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
    </div>
  )
}

export default DashBoard
