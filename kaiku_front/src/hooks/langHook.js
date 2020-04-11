import { useState } from 'react'
import ls from '../services/localizationService'
const _default = 'NO_STRING_FOUND'

const useLang = () => {
  const[pack, setPack] = useState({})

  const getString = (ref) => {
    if(pack[ref] === undefined) return _default
    return pack[ref]
  }

  const setLocale = async (identifier) => {
    const langPack = ls.setLangPack(identifier)
    setPack(await langPack)
  }


  return { getString, setLocale }
}

export default useLang