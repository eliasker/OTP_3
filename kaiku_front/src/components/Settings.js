import React, { useContext } from 'react'
import InitialData from '../providers/InitialData'

const Settings = () => {
  const { useLang } = useContext(InitialData)
  const string = (ref) => useLang.getString(ref)

  const handleLangChange = (ref) => {
    useLang.setLocale(ref)
  }

  return(
    <>
      <p>{string('settings_changelang')}</p>
      <button onClick={() => handleLangChange('fi-FI')}>Suomi</button>
      <button onClick={() => handleLangChange('')}>None</button>
    </>
  )

}

export default Settings