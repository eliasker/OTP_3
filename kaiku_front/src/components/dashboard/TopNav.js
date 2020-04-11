import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import InitialData from '../../providers/InitialData'


const TopNav = () => {
  const history = useHistory()
  const { useLang } = useContext(InitialData)
  const string = (ref) => useLang.getString(ref)

  const handleQuit = () => {
    if(!window.confirm(string('topnav_confirm_exit')))
      return
    
    //Poistu etusivulle
    window.localStorage.removeItem('mastakey')
    history.push('/')
  }

  return(
  <>
    <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 cursor-def">
      <span className="navbar-brand col-sm-3 col-md-2 mr-0">{string('topnav_backroom')}</span>
      <ul className="navbar-nav px-3">
        <li className="nav-item text-nowrap">
          <span className="nav-link" onClick={handleQuit}>{string('topnav_conversations')}</span>
        </li>
      </ul>
    </nav>
  </>
  )
}

export default TopNav