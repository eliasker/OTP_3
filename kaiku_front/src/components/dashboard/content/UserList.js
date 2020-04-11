import React, { useContext } from 'react'
import ListItem from '../ListItem'
import Context from '../../../providers/Context'
import InitialState from '../../../providers/InitialData'


const UserList = () => {
  const { users } = useContext(Context)
  const { useLang } = useContext(InitialState)
  const string = (ref) => useLang.getString(ref);

  const getUserList = () => {
    if (users === undefined) return
    return users.map(u => <ListItem key={u.user_id} user={u} />)
  }

  return (
    <>
      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th>{string('dash_usertable_id')}</th>
              <th>{string('dash_usertable_name')}</th>
              <th>{string('dash_usertable_username')}</th>
              <th>{string('dash_usertable_role')}</th>
              <th>{string('dash_usertable_action')}</th>
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