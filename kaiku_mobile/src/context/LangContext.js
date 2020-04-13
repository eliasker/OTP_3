import dataContext from './dataContext';
import { AsyncStorage } from 'react-native'
import { navigate } from '../navigationRef';
import langPack from '../util/langPack'

const authReducer = (state, action) => {
  switch (action.type) {
    case 'setLang':
      return {...state, lang: langPack[action.payload.id]}
    case 'add_error':
      return {...state, errorText: action.payload.eMessage}
    default:
      return state
  }
}

const initLang = dispatch => async () => {
  try {    
    const lang = JSON.parse(await AsyncStorage.getItem('lang'))
    dispatch({ type: 'setLang', payload: { id: lang.id } })
  }catch(e){ console.log('lang not found') }
}  

const getLangMeta = (dispatch) => () => {
  return langPack.map(l => l.meta)
}

const setLang = (dispatch) => async (id) => {
  await AsyncStorage.setItem('lang', JSON.stringify(langPack[id].meta))
  dispatch({ type: 'setLang', payload: { id } })
}

export const { Context, Provider } = dataContext(
  authReducer, //reducer 
  { setLang, getLangMeta, initLang }, //actions
  { lang: langPack[0] } //initial state
)