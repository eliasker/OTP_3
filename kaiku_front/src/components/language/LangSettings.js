import React, { useState, useContext, useEffect } from 'react'
import CurrentChat from '../../providers/CurrentChat'
import InitialData from '../../providers/InitialData'

const LangSettings = () => {
  const { showLangSettings, setShowLangSettings } = useContext(CurrentChat)
  const { useLang } = useContext(InitialData)
  const [ lang, setLang ] = useState("")

  const handleSubmit = () => {
    console.log(lang) // TODO: REST-pyyntö tähän
    setShowLangSettings(!showLangSettings)
  }

  return (
    <>
      <div className={`${showLangSettings ? 'help-modal': 'd-none'}` } onClick={(e) => e.target.className.includes('relative') ? setShowLangSettings(!showLangSettings) : null}>
        <div className="relative">
          <div className="modal-container">
            <h3>Kielivalinta</h3>
            <hr />
          </div>
          <div className="lang-container">
            <select defaultValue="none" className="custom-select lang-select" onChange={e => setLang(e.target.value)}>
              <option value="none">-</option>
              <option value="fi-FI">Suomi</option>
              <option value="en-EN">English</option>
            </select>
          </div>
          <div className="help-button-container">
            <div className="help-button-group">
              <button className={"btn btn-outline-dark mr-1"} onClick={() => handleSubmit()}>Tallenna</button>
            </div>
            <div className="exit-button">
              <i className="fas fa-times" onClick={() => setShowLangSettings(!showLangSettings)}></i>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LangSettings