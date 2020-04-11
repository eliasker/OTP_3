import React, { useContext } from 'react'
import Context from '../../providers/Context'
import InitialData from '../../providers/InitialData'

const Menu = () => {
  const { setContent } = useContext(Context)
  const { useLang } = useContext(InitialData)
  const string = (ref) => useLang.getString(ref)

  return(
    <>
      <nav id="side-nav" className="col-md-2 d-none d-md-block bg-light sidebar">
        <div className="sidebar-sticky pt-5">

          <h6 className="sidebar-heading d-flex px-3 mt-4 mb-1 text-muted">
            {string('menu_usercontrol')}
          </h6>
          <ul className="nav flex-column mb-2">
            <li className="nav-item">
              <span className="nav-link link" onClick={() => setContent('u/all')}>{string('menu_allusers')}</span>
            </li>
            <li className="nav-item">
              <span className="nav-link link" onClick={() => setContent('u/new')}>{string('menu_createuser')}</span>
            </li>
          </ul>

          <h6 className="sidebar-heading d-flex px-3 mt-4 mb-1 text-muted">
          Ryhmien hallinta
          </h6>
          <ul className="nav flex-column mb-2">
            <li className="nav-item">
              <span className="nav-link link" onClick={() => setContent('g/all')}>{string('menu_allgroups')}</span>
            </li>
            <li className="nav-item">
              <span className="nav-link link" onClick={() => setContent('g/new')}>{string('menu_creategroup')}</span>
            </li>
          </ul>

        </div>
      </nav>
    </>
  )
}

export default Menu