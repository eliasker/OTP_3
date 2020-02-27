import React, { useContext } from 'react'
import ListItem from '../ListItem'
import InitialData from '../../../providers/InitialData'


const GroupList = () => {
  const { initialData } = useContext(InitialData)

  const getGroupList = () =>{
    if(initialData.chats === undefined) return

    //TODO: sort toiminto olisi hyvä toteuttaa
    const filteredList = initialData.chats.filter(g => g.name)

    return filteredList.map(g => <ListItem key={Math.random()} group={g} />)
  }

  return(
  <>
    <h2>Kaikki ryhmät</h2>
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