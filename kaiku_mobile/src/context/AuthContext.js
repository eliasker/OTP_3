import dataContext from './dataContext';
import { AsyncStorage } from 'react-native'
import { navigate } from '../navigationRef';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'log_in':
      return { ...state, token: action.payload.token }
    case 'log_out':
      return {...state, isLoggedIn: false}
    case 'add_error':
      return {...state, errorText: action.payload.eMessage}
    default:
      return state
  }
}

const logIn = (dispatch) => async (credentials) => {
  try {
    const res = 'token' //TODO: POST LOGIN
    dispatch({ type: 'log_in', payload: { token: res } }) //response.data.token    
    await AsyncStorage.setItem('token', 'token')
    navigate('Home')
  } catch(e){
    dispatch({ type: 'add_error', payload: {eMessage: 'Wrong credentials'} })
  }  
}

const logOut = (dispatch) => async () => {
  try {
    dispatch({ type: 'log_out' })
    await AsyncStorage.removeItem('token')
    navigate('loginFlow')
  }catch(e){
    dispatch({ type: 'add_error', payload: {eMessage: 'Sum-Ting Wong'} })
  }
}
 
const trySignIn = (dispatch) => async () => {
  try{
    const token = await AsyncStorage.getItem('token')
    if(!token) return navigate('Signin')

    dispatch({ type: 'log_in', payload: token })
    navigate('Index') //enable for auto login
  }catch(e){}
}

export const { Context, Provider } = dataContext(
  authReducer, //reducer
  { logIn, logOut, trySignIn }, //actions
  { token: null } //initial state
)