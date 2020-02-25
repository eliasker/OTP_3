import React, { useContext } from 'react'
import ListItem from '../ListItem'
import InitialData from '../../../providers/InitialData'
import UserList from './UserList'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import GroupList from './GroupList'
import Context from '../../../providers/Context'



const Content = () => {
  const { content } = useContext(Context)
  const { initialData } = useContext(InitialData)

  const showContent = () => {
    switch (content) {
      case 'u/all':
        return <UserList />
      case 'g/all':
        return <GroupList />
      default:
        return <UserList />
    }
  }

  return(
  <>
    <div role="div" className="col-md-9 ml-sm-auto col-lg-10 px-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-5 pb-2 mb-3 border-bottom">
        <h1 className="h2">Kojelauta</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <div className="btn-group mr-2">
            <button type="button" className="btn btn-sm btn-outline-secondary">Luo käyttäjä</button>
            <button type="button" className="btn btn-sm btn-outline-secondary">Valitse</button>
          </div>
          <button type="button" className="btn btn-sm btn-outline-secondary dropdown-toggle">
            <span data-feather="calendar"></span>
            Järjestä
          </button>
        </div>
      </div>

      {showContent()}
    </div>
  </>
  )
}

export default Content