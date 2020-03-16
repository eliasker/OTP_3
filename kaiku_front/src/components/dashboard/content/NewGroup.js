import React, { useState, useContext } from 'react'
import InitialData from '../../../providers/InitialData'
import groupService from '../../../services/groupService'
import Context from '../../../providers/Context'


const NewGroup = () => {
  const [newGroup, setNewGroup] = useState({ chatName: '', members: [] })
  const [addedList, setAddedList] = useState([])
  const { initialData } = useContext(InitialData)
  const { setContent } = useContext(Context)

  const handleSubmit = (e) => {
    e.preventDefault()
    const memberList = addedList.map(u => u._Id)
    if (!window.confirm('Haluatko luoda ' + newGroup.chatName + ' ryhmän?')) return
    groupService.create({ ...newGroup, members: memberList, type: 'group' })
    setContent('g/all')
  }

  const handleDelete = user => {
    setAddedList(
      addedList.filter(u => u._Id !== user._Id)
    )
  }

  const handleOptionClick = id => {
    if (id === "none" || addedList.find(u => u._Id === id)) return
    const addedUser = initialData.users.find(u => u._Id === id)
    setAddedList(
      addedList.concat(addedUser)
    )
  }

  const generateOptions = () => (!initialData) ?
    <option value="...">Ladataan...</option> :
    initialData.users.map(u => <option value={u._Id} key={u._Id}>{u.username}</option>)

  const generatePreview = () => {
    return addedList.map(u =>
      <span className="badge badge-primary m-1" key={u._Id}>
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
              <label htmlFor="user-name">Ryhmän nimi</label>
              <input type="text" className="form-control" id="user-name" placeholder="Ryhmän nimi"
                value={newGroup.chatName} onChange={(e) => setNewGroup({ ...setNewGroup, chatName: e.target.value })} required />
            </div>
          </div>

          <div className="container-fluid row m-0 p-0">
            <div className="col-6 p-0">
              <label>Lisää henkilöitä</label>
              <select defaultValue="none" className="custom-select" onChange={e => handleOptionClick(e.target.value)}>
                <option value="none">-</option>
                {generateOptions()}
              </select>
            </div>
            <div className="col-6">
              <p>Lisätyt henkilöt</p>
              <div className="row px-3 font-2">
                {generatePreview()}
              </div>
            </div>
          </div>
          <button className="btn btn-primary mt-3" type="submit">Luo ryhmä</button>
        </form>
      </div>
    </>
  )
}

export default NewGroup