import React, { useContext, useEffect, useState } from 'react'
import InitialData from '../providers/InitialData'
import localizationService from '../services/localizationService';

const Settings = () => {
  const { useLang } = useContext(InitialData)
  const string = (ref) => useLang.getString(ref)
  const [identicators, setIdenticators] = useState([]);

  useEffect(() => {
    setIdenticators(() => localizationService.getPackIdenticators())
  }, [])

  return(
    <>
      <p>{string('settings_changelang')}</p>
      <Buttons list={identicators} useLang={useLang}/>
    </>
  )
}

const Buttons = ({list, useLang}) => {
  const listItem = (item) => {
    return (
      <li key={item}>
        <button onClick={() => handleLangChange(item)}>
          {item}
        </button>
      </li>
    )
  }

  const handleLangChange = (ref) => {
    useLang.setLocale(ref)
  }

  return(
    <ul>
      {
        list.lenght!==0 ? list.map((item) => listItem(item)) : listItem('none')
      }
    </ul>
  )
}

export default Settings