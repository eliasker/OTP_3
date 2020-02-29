import React, { useContext } from 'react'
import Context from '../../providers/Context'

const Menu = () => {
  const { setContent } = useContext(Context)
  return(
  <>
    <nav id="side-nav" className="col-md-2 d-none d-md-block bg-light sidebar">
      <div className="sidebar-sticky pt-5">

        <h6 className="sidebar-heading d-flex px-3 mt-4 mb-1 text-muted">
          Käyttäjähallinta
        </h6>
        <ul className="nav flex-column mb-2">
          <li className="nav-item">
            <span className="nav-link link" onClick={() => setContent('u/all')}> Kaikki käyttäjät </span>
          </li>
          <li className="nav-item">
            <span className="nav-link link" onClick={() => setContent('u/new')}>Luo käyttäjä</span>
          </li>
        </ul>

        <h6 className="sidebar-heading d-flex px-3 mt-4 mb-1 text-muted">
          Ryhmien hallinta
        </h6>
        <ul className="nav flex-column mb-2">
          <li className="nav-item">
            <span className="nav-link link" onClick={() => setContent('g/all')}> Kaikki ryhmät </span>
          </li>
          <li className="nav-item">
            <span className="nav-link link" onClick={() => setContent('g/new')}>Luo ryhmä</span>
          </li>
        </ul>

      </div>
    </nav>
  </>
  )
}

export default Menu