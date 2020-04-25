import React, { useState, useContext, useEffect } from 'react'
import CurrentChat from '../../providers/CurrentChat'
import InitialData from '../../providers/InitialData'

const LangSettings = () => {
  const { showLangSettings, setShowLangSettings } = useContext(CurrentChat)
  const { useLang } = useContext(InitialData)
  const { setTimeFormat } = useContext(CurrentChat)
  const [ lang, setLang ] = useState("")
  const [ format, setFormat] = useState("en-EN")

  const handleSubmit = () => {
    console.log(lang) // TODO: REST-pyyntö tähän
    
    window.localStorage.setItem('timeFormat', format)
    setTimeFormat(format)
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
            <div className="lang-select">
              <p className="mb-0 mt-1">Kieli</p>
              <select defaultValue="none" className="custom-select " onChange={e => setLang(e.target.value)}>
                <option value="none">-</option>
                <option value="fi-FI">Suomi</option>
                <option value="en-EN">English</option>
              </select>
              <p className="mb-0 mt-1">Päiväformaatti</p>
              <select defaultValue="en-EN" className="custom-select" onChange={e => setFormat(e.target.value)}>
                <option value="none">-</option>
                <option value="fi-FI">dd/mm/yy</option>
                <option value="en-US">mm/dd/yy</option>
              </select>
            </div>
            
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