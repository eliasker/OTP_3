import React, { useState, useContext } from 'react'
import Context from '../../providers/Context'
import InitialData from '../../providers/InitialData'
import groupService from '../../services/groupService'
import userService from '../../services/userService'

const ListItem = ({ user, group }) => {
  const { chats, setChats, users, setUsers, setCurrentGroup, setContent } = useContext(Context)
  const { useLang } = useContext(InitialData);
  const string = (ref) => useLang.getString(ref);

  const [userState, setUserState] = useState(user)
  const [groupState, setGroupState] = useState(group)
  const [editMode, setEditMode] = useState(false)
  const toggleEdit = () => setEditMode(!editMode)

  const handleSave = (object) => object.username === undefined ? saveGroup(object) : saveUser(object)
  const handleDelete = (object) => object.username === undefined ? deleteGroup(object) : deleteUser(object)

  const saveUser = (object) => {
    if (!window.confirm(string('li_confirm_editperm_1') + object.username + string('li_confirm_editperm_2'))) return
    setEditMode(!editMode)
  }
  const saveGroup = (object) => {
    if (!window.confirm(string('li_confirm_editperm_1') + object.chatName + string('li_confirm_editperm_2'))) return
    setEditMode(!editMode)
  }

  const deleteUser = (object) => {
    if (!window.confirm(string('li_confirm_delete_1') + object.username + string('li_confirm_delete_2'))) return
    userService.deleteById(object.user_id)
    const updatedUsers = users.filter(u => u.user_id !== object.user_id)
    setUsers(updatedUsers)
  }

  const deleteGroup = (object) => {
    if (!window.confirm(string('li_confirm_delete_1') + object.chatName + string('li_confirm_delete_2'))) return
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
        <button className="btn btn-sm btn-success mr-1" onClick={() => handleSave(object)}>{string('li_save')}</button>
        <button className="btn btn-sm btn-primary mr-1" onClick={toggleEdit}>{string('li_cancel')}</button>
      </> :
      <>
        <button className="btn btn-sm btn-outline-primary mr-1"
          onClick={() => group ? toggleMemberManagment() : toggleEdit()} >{string('li_edit')}</button>
        <button className="btn btn-sm btn-danger" onClick={() => handleDelete(object)}>{string('li_delete')}</button>
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
              <option value={string('li_opt_user')}>{string('li_opt_user')}</option>
              <option value={string('li_opt_admin')}>{string('li_opt_admin')}</option>
            </select> :
            string('li_opt_user')}</td>
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