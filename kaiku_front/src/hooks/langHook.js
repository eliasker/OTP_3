import {useState} from 'react';
import ls from '../services/localizationService'
const staticLang = require('../lang.json')
const _default = 'NO_STRING_FOUND';

const useLang = () => {
  const[pack, setPack] = useState({});
  
  const getString = (ref) => {        
    try {
      const notUndefined = pack.items
      if(notUndefined === undefined){
        throw Error();
      }

      return pack.items[ref];
    } catch (e) {
      return _default
    }
  }

  const setLocale = async (identicator) => {
    const langPack = ls.setLangPack(identicator);
    setPack(await langPack);
  }


  const init = async () => {
    let langPack = ls.getCurrentLangPack();    

    if(langPack===null) {
      langPack = await ls.setLangPack('fi-FI')      

      if( langPack === undefined){        
        langPack = staticLang.lang;
      }
    }

    setPack(await langPack)
    console.log(langPack);
    
  }

  return { getString, setLocale, init }
}

export default useLang;