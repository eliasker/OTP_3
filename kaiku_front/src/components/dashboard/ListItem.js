import React, { useState, useContext } from 'react'
import Context from '../../providers/Context'

const DashBoard = ({ user, group }) => {
  const { setCurrentGroup, setContent } = useContext(Context)
  const [ userState, setUserState ] = useState(user)
  const [ groupState, setGroupState ] = useState(group)
  const [editMode, setEditMode] = useState(false)
  const toggleEdit = () => setEditMode(!editMode)

  const handleSave = (object) => {
    if (!window.confirm('Haluatko muuttaa pysyvästi '+object.name+'n tiedot')) return
    console.log("MUUTETTU")
    setEditMode(!editMode)
  }

  const handleDelete = (object) => {
    if (!window.confirm('Haluatko poistaa '+object.name+'n tiedot')) return
    console.log("POISTETTU")
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
    </>:
    <>
      <button className="btn btn-sm btn-outline-primary mr-1" onClick={toggleEdit}>Muokkaa</button>
      <button className="btn btn-sm btn-danger" onClick={() => handleDelete(object)}>Poista</button>
    </>
  }

  if( user )
    return (
      <>
        <tr>
          <td>{user.id}</td>
          <td>{editMode ? <input value={userState.name} onChange={e => setUserState({...userState, name: e.target.value})}/>: user.name}</td>
          <td>{editMode ? <input value={userState.username} onChange={e => setUserState({...userState, username: e.target.value})}/>: user.username}</td>
          <td>{editMode ?
          <select defaultValue="Peasant" className="user-role">
            <option value="Peasant">Peasant</option>
            <option value="Ylläpitäjä">Ylläpitäjä</option>
          </select>:
          "Peasant"}</td>
          <td>{ buttons(userState) }</td>
        </tr>
      </>
    )
  
  if( group )
    return (
      <>
      <tr>
        <td>{ group.id }</td>
        <td>{ editMode ? <input value={groupState.name} onChange={e => setGroupState({...groupState, name: e.target.value})}/>: group.name }</td>
        <td>{ editMode ? <span className="link" onClick={() => toggleMemberManagment()}>{group.members.length}</span>: group.members.length }</td>
        <td>{ group.messages.length }</td>
        <td>{ buttons(groupState) }</td>
      </tr>
      </>
    )
}

export default DashBoard