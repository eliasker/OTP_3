import React, { useEffect, useContext } from 'react'
import { Context } from '../context/AuthContext'

const LogoutHandler = () => {
  const { logOut } = useContext(Context)

  LogoutHandler.navigationOptions = ({ navigation }) => {
    return {
      drawerLabel: 'Take me Home',
    }
  }
  useEffect( () => {
    logOut()
  }, [])

  return null
}

export default LogoutHandler