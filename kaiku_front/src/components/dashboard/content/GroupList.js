import React, { useContext } from 'react'
import ListItem from '../ListItem'
import Context from '../../../providers/Context'


const GroupList = () => {
  const { chats } = useContext(Context)
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
              <th>#id</th>
              <th>Nimi</th>
              <th>Käyttäjiä</th>
              <th>Viestit</th>
              <th>Toiminto</th>
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