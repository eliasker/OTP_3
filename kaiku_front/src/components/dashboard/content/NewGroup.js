import React, { useState, useContext } from 'react'
import InitialData from '../../../providers/InitialData'
import groupService from '../../../services/groupService'
import Context from '../../../providers/Context'


const NewGroup = () => {
  const [newGroup, setNewGroup] = useState({ chatName: '', members: [] })
  const [addedList, setAddedList] = useState([])
  const { initialData, useLang } = useContext(InitialData)
  const string = (ref) => useLang.getString(ref)
  const { setContent } = useContext(Context)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const memberList = addedList.map(u => u.user_id)
    if (!window.confirm(string('dash_confirm_creategroup_1') + newGroup.chatName + string('dash_confirm_creategroup_2'))) return
    await groupService.create({ ...newGroup, members: memberList, type: 'group' })
    setContent('g/all')
  }

  const handleDelete = user => {
    setAddedList(
      addedList.filter(u => u.user_id !== user.user_id)
    )
  }

  const handleOptionClick = id => {
    if (id === 'none' || addedList.find(u => u.user_id === id)) return
    const addedUser = initialData.users.find(u => u.user_id === id)
    setAddedList(
      addedList.concat(addedUser)
    )
  }

  const generateOptions = () => (!initialData) ?
    <option value="...">{string('dash_loading')}</option> :
    initialData.users.map(u => <option value={u.user_id} key={u.user_id}>{u.username}</option>)

  const generatePreview = () => {
    return addedList.map(u =>
      <span className="badge badge-primary m-1" key={u.user_id}>
        {u.username} <i className="fas fa-times" onClick={() => handleDelete(u)}></i>
      </span>
    )
  }

  return (
    <>
      <div id="new-group" className="container-fluid">
        <form className="p-5 mt-5 bg-light" onSubmit={(e) => handleSubmit(e)}>
          <div className="form-row pb-3">
            <div className="col-md-12 mb-2">
              <label htmlFor="user-name">{string('dash_label_groupname')}</label>
              <input type="text" className="form-control" id="user-name" placeholder={string('dash_ph_groupname')}
                value={newGroup.chatName} onChange={(e) => setNewGroup({ ...setNewGroup, chatName: e.target.value })} required />
            </div>
          </div>

          <div className="container-fluid row m-0 p-0">
            <div className="col-6 p-0">
              <label>{string('dash_label_addpeople')}</label>
              <select defaultValue="none" className="custom-select" onChange={e => handleOptionClick(e.target.value)}>
                <option value="none">-</option>
                {generateOptions()}
              </select>
            </div>
            <div className="col-6">
              <p>{string('dash_addedpeople')}</p>
              <div className="row px-3 font-2">
                {generatePreview()}
              </div>
            </div>
          </div>
          <button className="btn btn-primary mt-3" type="submit">{string('dash_creategroup')}</button>
        </form>
      </div>
    </>
  )
}

export default NewGroup