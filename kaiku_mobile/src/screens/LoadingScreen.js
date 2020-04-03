import React, { useEffect, useContext } from 'react'
import { Context } from '../context/AuthContext'

const LoadingScreen = () => {
  const { trySignIn } = useContext(Context)
  useEffect( () => {
    trySignIn()
  }, [])

  return null
}

export default LoadingScreen