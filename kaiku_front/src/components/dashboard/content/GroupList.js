import React, { useContext } from 'react'
import ListItem from '../ListItem'
import Context from '../../../providers/Context'
import InitialData from '../../../providers/InitialData'


const GroupList = () => {
  const { chats } = useContext(Context)
  const { useLang } = useContext(InitialData)
  const string = (ref) => useLang.getString(ref)

  const getGroupList = () => {
    if (chats === undefined) return
    const filteredList = chats.filter(g => g.type !== 'private')
    return filteredList.map(g => <ListItem key={Math.random()} group={g} />)
  }

  return (
    <>
      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th>{string('dash_grouptable_id')}</th>
              <th>{string('dash_grouptable_name')}</th>
              <th>{string('dash_grouptable_users')}</th>
              <th>{string('dash_grouptable_messages')}</th>
              <th>{string('dash_grouptable_action')}</th>
            </tr>
          </thead>
          <tbody>
            {getGroupList()}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default GroupList