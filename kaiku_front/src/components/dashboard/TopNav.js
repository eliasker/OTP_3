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

      <div className="row mr-2 nav-items">
        <span className="nav-item dropdown">
          <span className="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{string('lang_select')}</span>
          <div className="dropdown-menu">
            <a className="dropdown-item" onClick={() => useLang.setLocale("fi-FI")}>Suomi</a>
            <a className="dropdown-item" onClick={() => useLang.setLocale("en-EN")}>English</a>
          </div>
        </span>
        <span className="nav-item text-nowrap">
          <span className="nav-link" onClick={handleQuit}>{string('topnav_conversations')}</span>
        </span>
      </div>
      
    </nav>
  </>
  )
}

export default TopNav