import React, { useEffect, useContext } from 'react'
import { Context } from '../context/AuthContext'

const LogoutHandler = () => {
  const { logOut } = useContext(Context)

  useEffect( () => {
    logOut()
  }, [])

  return null
}

export default LogoutHandler