import React, { useContext, useState } from 'react'
import InitialData from '../../../providers/InitialData'
import Context from '../../../providers/Context'


const MemberManagment = () => {
  const { initialData } = useContext(InitialData)
  const { currentGroup, setContent } = useContext(Context)
  const [ tempGroup, setTempGroup ] = useState(currentGroup)

  const handleSubmit = e => {
    e.preventDefault()
    if(!window.confirm('Haluatko päivittää tämän ryhmän?')) return

    //uusi päivitettävä ryhmä on tempGroup
    //tähän tulisi rest pyyntö
    setContent('g/all')
  }

  const handleDelete = userId => {
    setTempGroup(
      {...tempGroup, members: tempGroup.members.filter(m => m !== userId)}
    )
  }

  const handleOptionClick = id => {
    if(tempGroup.members.find(m => m === id)) return
    
    setTempGroup(
      {...tempGroup, members: tempGroup.members.concat(id)}
    )
  }

  const getUserList = () => {
    if(!tempGroup.members) return
    const memberList = tempGroup.members.map(m => initialData.users.find(u => u.id === m))
    console.log(memberList)
    return memberList.map(m => 
      <span className="badge badge-primary m-1 font-2" key={m.id}>
          {m.username} <i className="fas fa-times h-red" onClick={() => handleDelete(m.id)}></i>
      </span>
    )
  }

  const generateOptions = () => (!initialData) ?
   <option value="...">Ladataan...</option>:
   initialData.users.map(u => <option value={u.id} key={u.id}>{u.username}</option>)


  if(!currentGroup.name) return <></>

  return(
  <>
    <form className="form-row" onSubmit={e => handleSubmit(e)}>
      <div className="col-12 col-md-6 mb-2">
        <div className="form-group">
          <label htmlFor="user-name">Ryhmän nimi</label>
          <input type="text" className="form-control" id="user-name" placeholder="Ryhmän nimi"
            value={tempGroup.name} onChange={e => setTempGroup({...tempGroup, name: e.target.value})} required />
        </div>
        <div className="form-group">
          <p className="mb-1">Lisää käyttäjä</p>
          <select defaultValue="none" className="custom-select" onChange={e => handleOptionClick(e.target.value)}>
            {generateOptions()}
          </select>
        </div>
      </div>
      <div className="col-12 col-md-6">
        <p>Ryhmän jäsenet:</p>
        {getUserList()}
      </div>
      <button type='submit' className="btn btn-primary mr-1">Tallenna</button>
      <button onClick={() => setContent('g/all')} className="btn btn-outline-primary">Peru</button>
    </form>
  </>
  )
}

export default MemberManagment