import dataContext from './dataContext'
import { AsyncStorage } from 'react-native'
import { navigate } from '../navigationRef'
import loginService from '../services/loginService'
import userService from '../services/userService'
import groupService from '../services/groupService'

const authReducer = (state, action) => {
  switch (action.type) {
    case 'log_in':
      return { ...state, token: action.payload.token }
    case 'log_out':
      return { ...state, isLoggedIn: false }
    case 'update_all':
      return { ...state, allUsers: action.payload.allUsers, allGroups: action.payload.allGroups }
    case 'add_error':
      return { ...state, errorText: action.payload.eMessage }
    default:
      return state
  }
}

const logIn = (dispatch) => async (credentials) => {
  try {
    let user = await loginService.login(credentials.username, credentials.password)
    const loggedUser = {
      user_id: user.user_id,
      name: user.name,
      username: user.username,
      token: user.token
    }
    dispatch({ type: 'log_in', payload: { token: user.token } }) //response.data.token    
    await AsyncStorage.setItem('loggedUser', JSON.stringify(loggedUser))
    navigate('Home')
  } catch (e) {
    dispatch({ type: 'add_error', payload: { eMessage: 'Wrong credentials' } })
  }
  navigate('Home')

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
    const loggedUser = JSON.parse(await AsyncStorage.getItem('loggedUser'))
    console.log('authcontext trysignin loggeduser ', loggedUser)
    if (!loggedUser) return navigate('Signin')

    dispatch({ type: 'log_in', payload: loggedUser.token })
    
    let allUsers = await userService.getAllUsers(loggedUser.token)
    console.log('authcontext try signin id', loggedUser.user_id)
    let allGroups = await groupService.getAllByID(loggedUser.user_id, loggedUser.token)
    console.log('groups authcontext:74', allGroups)
    dispatch({ type: 'update_all', payload: { allGroups, allUsers } })
  } catch (e) {
    console.error('error in trysignin')
    console.log(e)
  }
  navigate('Index') //enable for auto login
}

export const { Context, Provider } = dataContext(
  authReducer, //reducer
  { logIn, logOut, trySignIn }, //actions
  {
    token: null, loggedUser: null, allGroups: [], allUsers: [{
      username: 'mirka-1',
      name: 'omena'
    }]
  } //initial state
)