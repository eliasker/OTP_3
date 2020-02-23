import React, { useState } from 'react'

const DashBoard = ({ user }) => {
  const [editMode, setEditMode] = useState(false)
  console.log(user)
  const toggleEdit = () => setEditMode(!editMode)

  const handleSave = () => {
    if (!window.confirm('Haluatko muuttaa pysyvästi x käyttäjän tiedot')) return
    console.log("MUUTETTU")
    setEditMode(!editMode)
  }

  const handleDelete = () => {
    if (!window.confirm('Haluatko poistaa x käyttäjän')) return
    console.log("POISTETTU")
  }

  return (
    <>
      <tr>
        <td>{user.id}</td>
        <td>{editMode ? <input value={user.name}/>: user.name}</td>
        <td>{editMode ? <input value={user.username}/>: user.username}</td>
        <td>{editMode ? <input value="Peasant"/>: "Peasant"}</td>
        <td>
          {editMode ?
            <>
              <button className="btn btn-sm btn-success mr-1" onClick={handleSave}>Tallenna</button>
              <button className="btn btn-sm btn-primary mr-1" onClick={toggleEdit}>Peru</button>
            </>:
            <>
              <button className="btn btn-sm btn-outline-primary mr-1" onClick={toggleEdit}>Muokkaa</button>
              <button className="btn btn-sm btn-danger" onClick={handleDelete}>Poista</button>
            </>
          }
        </td>
      </tr>
    </>
  )
}

export default DashBoard