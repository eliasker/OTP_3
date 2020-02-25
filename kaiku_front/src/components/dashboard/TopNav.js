import React from 'react'
import { Link } from 'react-router-dom'


const TopNav = () => {
  const handleQuit = () => {
    if(!window.confirm('Haluatko poistua Kaikun takahuoneesta?\nTekemiäsi muutoksia ei välttämättä tallenneta.'))
      return
    
    //Poistu etusivulle
    console.log('ETUSIVU')
  }

  return(
  <>
    <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 cursor-def">
      <span className="navbar-brand col-sm-3 col-md-2 mr-0">Kaiku takahuone</span>
      <ul className="navbar-nav px-3">
        <li className="nav-item text-nowrap">
          <span className="nav-link" onClick={handleQuit}>Keskustelut</span>
        </li>
      </ul>
    </nav>
  </>
  )
}

export default TopNav