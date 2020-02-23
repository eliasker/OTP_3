import React, { useContext } from 'react'
import ListItem from './ListItem'
import InitialData from '../../providers/InitialData'


const Content = () => {
  const { initialData } = useContext(InitialData)

  const getList = () =>{
    if(initialData.users === undefined) return

    //TODO: sort toiminto olisi hyvä toteuttaa
    return initialData.users.map(u => <ListItem key={u.id} user={u} />)
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
            {getList()}
          </tbody>
        </table>
      </div>
    </div>
  </>
  )
}

export default Content