import dataContext from './dataContext'
import { AsyncStorage } from 'react-native'
import { navigate } from '../navigationRef'

const authReducer = (state, action) => {
  switch (action.type) {
    case 'log_in':
      return { ...state, token: action.payload.token, loggedUser: action.payload.user }
    case 'log_out':
      return { ...state, isLoggedIn: false }
    case 'add_error':
      return { ...state, errorText: action.payload.eMessage }
    default:
      return state
  }
}

const logIn = (dispatch) => async (credentials) => {  
  try {
    const user = {
      user_id: '7858962833',
      name: 'Testikäyttäjä',
      username: credentials.username,
      token: 'kaiku'
    }
    dispatch({ type: 'log_in', payload: { token: user.token, user } }) //response.data.token    
    await AsyncStorage.setItem('token', user.token)
    await AsyncStorage.setItem('user', JSON.stringify(user))
    navigate('Home')
  } catch (e) {
    dispatch({ type: 'add_error', payload: { eMessage: 'Wrong credentials' } })
  }
}

const logOut = (dispatch) => async () => {
  try {
    dispatch({ type: 'log_out' })
    await AsyncStorage.removeItem('token')
    navigate('loginFlow')
  } catch (e) {
    dispatch({ type: 'add_error', payload: { eMessage: 'Sum-Ting Wong' } })
  }
}

const trySignIn = (dispatch) => async () => {
  try {
    const token = await AsyncStorage.getItem('token')
    const user = await JSON.parse(await AsyncStorage.getItem('user'))

    if (!token) return navigate('Signin')

    dispatch({ type: 'log_in', payload: {token, user} })
    navigate('Index') //enable for auto login
  } catch (e) { }
}

export const { Context, Provider } = dataContext(
  authReducer, //reducer
  { logIn, logOut, trySignIn }, //actions
  { token: null, loggedUser:  {name: '', username: ''} } //initial state
)