import React, { useState, useContext } from 'react'
import Context from '../../providers/Context'
import groupService from '../../services/groupService'
import userService from '../../services/userService'

const ListItem = ({ user, group }) => {
  const { chats, setChats, users, setUsers, setCurrentGroup, setContent } = useContext(Context)
  const [userState, setUserState] = useState(user)
  const [groupState, setGroupState] = useState(group)
  const [editMode, setEditMode] = useState(false)
  const toggleEdit = () => setEditMode(!editMode)

  const handleSave = (object) => object.username === undefined ? saveGroup(object) : saveUser(object)
  const handleDelete = (object) => object.username === undefined ? deleteGroup(object) : deleteUser(object)

  const saveUser = (object) => {
    if (!window.confirm('Haluatko muuttaa pysyvästi ' + object.username + 'n tiedot')) return
    setEditMode(!editMode)
  }
  const saveGroup = (object) => {
    if (!window.confirm('Haluatko muuttaa pysyvästi ' + object.chatName + 'n tiedot')) return
    setEditMode(!editMode)
  }

  const deleteUser = (object) => {
    if (!window.confirm('Haluatko poistaa ' + object.username + 'n tiedot')) return
    userService.deleteById(object.user_id)
    const updatedUsers = users.filter(u => u.user_id !== object.user_id)
    setUsers(updatedUsers)
  }

  const deleteGroup = (object) => {
    if (!window.confirm('Haluatko poistaa ' + object.chatName + 'n tiedot')) return
    groupService.deleteById(object.chat_id)
    const updatedChats = chats.filter(c => c.chat_id !== object.chat_id)
    setChats(updatedChats)
  }
  const toggleMemberManagment = () => {
    setCurrentGroup(group)
    setContent('g/members')
  }

  const buttons = (object) => {
    return editMode ?
      <>
        <button className="btn btn-sm btn-success mr-1" onClick={() => handleSave(object)}>Tallenna</button>
        <button className="btn btn-sm btn-primary mr-1" onClick={toggleEdit}>Peru</button>
      </> :
      <>
        <button className="btn btn-sm btn-outline-primary mr-1"
          onClick={() => group ? toggleMemberManagment() : toggleEdit()} >Muokkaa</button>
        <button className="btn btn-sm btn-danger" onClick={() => handleDelete(object)}>Poista</button>
      </>
  }

  if (user)
    return (
      <>
        <tr>
          <td>{user.id}</td>
          <td>{editMode ? <input value={userState.name} onChange={e => setUserState({ ...userState, name: e.target.value })} /> : user.name}</td>
          <td>{editMode ? <input value={userState.username} onChange={e => setUserState({ ...userState, username: e.target.value })} /> : user.username}</td>
          <td>{editMode ?
            <select defaultValue="-" className="user-role">
              <option value="-">-</option>
              <option value="Käyttäjä">Käyttäjä</option>
              <option value="Ylläpitäjä">Ylläpitäjä</option>
            </select> :
            "Käyttäjä"}</td>
          <td>{buttons(userState)}</td>
        </tr>
      </>
    )

  if (group)
    return (
      <>
        <tr>
          <td>{group.chat_id}</td>
          <td>{editMode ? <input value={groupState.name} onChange={e => setGroupState({ ...groupState, name: e.target.value })} /> : group.chatName}</td>
          <td>{editMode ? <span className="link" onClick={() => toggleMemberManagment()}>{group.members.length}</span> : group.members.length}</td>
          <td>{group.messages.length}</td>
          <td>{buttons(groupState)}</td>
        </tr>
      </>
    )
}

export default ListItem