import React, { useState, useContext } from 'react'
import InitialData from '../../../providers/InitialData'


const NewGroup = () => {
  const [ newGroup, setNewGroup ] = useState({ name: '', members: [] })
  const [ addedList, setAddedList ] = useState([])
  const { initialData } = useContext(InitialData)

  const handleSubmit = (e) => {
    e.preventDefault()
    setNewGroup({...newGroup, members: addedList})
    if(window.confirm('Haluatko luoda '+newGroup.name+' ryhmän?')) return
    
  }

  const handleDelete = user => {
    setAddedList(
      addedList.filter(u => u.id !== user.id)
    )
  }

  const handleOptionClick = id => {
    if(addedList.find(u => u.id === id)) return
    
    setAddedList(
      addedList.concat(initialData.users.find(u => u.id === id))
    )
  }

  const generateOptions = () => (!initialData) ?
   <option value="...">Ladataan...</option>:
   initialData.users.map(u => <option value={u.id} key={u.id}>{u.username}</option>)

  const generatePreview = () => {
    return addedList.map(u =>
      <span className="badge badge-primary m-1" key={u.id}>
        {u.username} <i className="fas fa-times" onClick={() => handleDelete(u)}></i>
      </span>
    )
  }

  return(
  <>
    <div id="new-group" className="container-fluid">
      <form className="p-5 mt-5 bg-light" onSubmit={(e) => handleSubmit(e)}>
        <div className="form-row pb-3">
          <div className="col-md-12 mb-2">
            <label htmlFor="user-name">Ryhmän nimi</label>
            <input type="text" className="form-control" id="user-name" placeholder="Ryhmän nimi"
             value={newGroup.name} onChange={(e) => setNewGroup({...setNewGroup, name: e.target.value})} required />
          </div>
        </div>
        
        <div className="container-fluid row m-0 p-0">
          <div className="col-6 p-0">
            <label>Lisää henkilöitä</label>
            <select defaultValue="none" className="custom-select" onChange={e => handleOptionClick(e.target.value)}>
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