import React, { useContext } from 'react'
import InitialData from '../../../providers/InitialData'
import Context from '../../../providers/Context'


const MemberManagment = () => {
  const { initialData } = useContext(InitialData)
  const { currentGroup, setContent } = useContext(Context)

  console.log(currentGroup)
  const handleDelete = () => {

  }
  const handleOptionClick = id => {
    /*if(addedList.find(u => u.id === id)) return
    
    setAddedList(
      addedList.concat(initialData.users.find(u => u.id === id))
    )*/
  }

  const getUserList = () => {
    return <span className="badge badge-primary m-1 font-2" key={1}>
        Hra S.Aukko <i className="fas fa-times h-red" onClick={() => handleDelete()}></i>
    </span>
  }

  const generateOptions = () => (!initialData) ?
   <option value="...">Ladataan...</option>:
   initialData.users.map(u => <option value={u.id} key={u.id}>{u.username}</option>)

  if(!currentGroup.name) return <></>

  return(
  <>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item link" onClick={() => setContent('g/all')}>Kaikki käyttäjät</li>
        <li class="breadcrumb-item active" aria-current="page">{currentGroup.name} -muokkaus</li>
      </ol>
    </nav>
    <hr/>
    <form className="form-row">
      <div className="col-12 col-md-6 mb-2">
        <div className="form-group">
          <label htmlFor="user-name">Ryhmän nimi</label>
          <input type="text" className="form-control" id="user-name" placeholder="Ryhmän nimi"
            value={currentGroup.name} onChange={e => console.log(e)/**muuta value */} required />
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
        {getUserList()}
        {getUserList()}
      </div>
      <button className="btn btn-primary mr-1">Tallenna</button>
      <button className="btn btn-outline-primary">Peru</button>
    </form>
  </>
  )
}

export default MemberManagment