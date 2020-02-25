import React from 'react'

const TopNav = () => {
  return(
  <>
    <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 cursor-def">
      <span className="navbar-brand col-sm-3 col-md-2 mr-0">Kaiku takahuone</span>
      <ul className="navbar-nav px-3">
        <li className="nav-item text-nowrap">
          <span className="nav-link">Keskustelut</span>
        </li>
      </ul>
    </nav>
  </>
  )
}

export default TopNav