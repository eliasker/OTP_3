import React, { useContext } from 'react'
import ListItem from '../ListItem'
import Context from '../../../providers/Context'


const UserList = () => {
  const { users } = useContext(Context)
  const getUserList = () => {
    if (users === undefined) return
    return users.map(u => <ListItem key={u._Id} user={u} />)
  }

  return (
    <>
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