import React, { useContext } from 'react'
import ListItem from '../ListItem'
import InitialData from '../../../providers/InitialData'


const UserList = () => {
  const { initialData } = useContext(InitialData)

  const getUserList = () =>{
    if(initialData.users === undefined) return

    //TODO: sort toiminto olisi hyvä toteuttaa
    return initialData.users.map(u => <ListItem key={u.id} user={u} />)
  }

  return(
  <>
    <h2>Kaikki käyttäjät</h2>
    <div className="table-responsive">
      <table className="table table-striped table-sm">
        <thead>
          <tr>
            <th>#id</th>
            <th>Nimi</th>
            <th>Käyttäjänimi</th>
            <th>Rooli</th>
            <th>Toiminto</th>
          </tr>
        </thead>
        <tbody>
          {getUserList()}
        </tbody>
      </table>
    </div>
  </>
  )
}

export default UserList