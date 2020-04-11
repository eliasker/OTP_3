import React, { useContext, useState } from 'react'
import InitialData from '../../../providers/InitialData'
import Context from '../../../providers/Context'
import groupService from '../../../services/groupService'

const MemberManagment = () => {
  const { initialData, useLang } = useContext(InitialData)
  const string = (ref) => useLang.getString(ref)

  const { currentGroup, setContent } = useContext(Context)
  const [tempGroup, setTempGroup] = useState(currentGroup)

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('submit')
    if (!window.confirm(string('dash_confirm_updategroup'))) return
    console.log(tempGroup)
    groupService.update(tempGroup.chat_id, tempGroup)
    setContent('g/all')
  }

  const handleDelete = userId => {
    setTempGroup(
      { ...tempGroup, members: tempGroup.members.filter(m => m !== userId) }
    )
  }

  const handleOptionClick = id => {
    if (id === 'none' || tempGroup.members.find(m => m === id)) return

    setTempGroup(
      { ...tempGroup, members: tempGroup.members.concat(id) }
    )
  }

  const getUserList = () => {
    if (!tempGroup.members) return
    const memberList = tempGroup.members.map(m => initialData.users.find(u => u.user_id === m)).filter(u => u !== undefined)
    return memberList.map(m =>
      <span className="badge badge-primary m-1 font-2" key={m.user_id}>
        {m.username} <i className="fas fa-times h-red" onClick={() => handleDelete(m.user_id)}></i>
      </span>
    )
  }

  const generateOptions = () => (!initialData) ?
    <option value="...">{string('dash_loading')}</option> :
    initialData.users.map(u => <option value={u.user_id} key={u.user_id}>{u.username}</option>)


  if (!currentGroup.chatName) return <></>

  return (
    <>
      <form className="form-row" onSubmit={(e) => handleSubmit(e)}>
        <div className="col-12 col-md-6 mb-2">
          <div className="form-group">
            <label htmlFor="user-name">{string('dash_label_groupname')}</label>
            <input type="text" className="form-control" id="user-name" placeholder={string('dash_ph_groupname')}
              value={tempGroup.chatName} onChange={e => setTempGroup({ ...tempGroup, chatName: e.target.value })} required />
          </div>
          <div className="form-group">
            <p className="mb-1">{string('dash_adduser')}</p>
            <select defaultValue="none" className="custom-select" onChange={e => handleOptionClick(e.target.value)}>
              <option value="none">-</option>
              {generateOptions()}
            </select>
          </div>
        </div>
        <div className="col-12 col-md-6">
          <p>{string('dash_groupmembers')}</p>
          {getUserList()}
        </div>
        <button type='submit' className="btn btn-primary mr-1">{string('dash_groupsave')}</button>
        <button onClick={() => setContent('g/all')} className="btn btn-outline-primary">{string('dash_groupcancel')}</button>
      </form>
    </>
  )
}

export default MemberManagment