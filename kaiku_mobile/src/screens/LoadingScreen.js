import React, { useEffect, useContext } from 'react'
import { Context as AuthContext } from '../context/AuthContext'
import { Context as LangContext } from '../context/LangContext'

const LoadingScreen = () => {
  const { trySignIn } = useContext(AuthContext)
  const { initLang } = useContext(LangContext)
  useEffect( () => {
    trySignIn()
    initLang()
  }, [])

  return null
}

export default LoadingScreen