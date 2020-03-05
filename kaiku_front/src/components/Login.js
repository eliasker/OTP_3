import React, { useContext, useEffect } from 'react'
import InitialData from '../providers/InitialData'
import loginService from '../services/loginService'
import useField from '../hooks/hooks'

const Login = () => {
  const { initialData, setInitialData, loggedUser, setLoggedUser } = useContext(InitialData)
  const username = useField('text')
  const password = useField('text')

  // mirka-kissa asgakikk
  // MarkoM asdsaff
  const handleLogin = async e => {
    e.preventDefault()
    console.log('logging in with ', username.value, password.value)

    if (username.value === 'testi') {
      setLoggedUser(initialData)
      window.localStorage.setItem('loggedKaikuUser', JSON.stringify(initialData))
    } else {
      try {
        const user = await loginService.login(username.value, password.value)
        if (user === '') throw ('no matching user')
        setLoggedUser(user)
        console.log(user)
        window.localStorage.setItem('loggedKaikuUser', JSON.stringify(user))
      } catch (e) {
        console.log('failed login')
      }
    }
  }

  useEffect(() => {
    //profile theme color generator
    if (loggedUser === null) return
    const colors = ['red', 'navy', 'orange', 'blue', 'green', 'amber', 'turqoise', 'pink', 'brown', 'dark']
    const generateColor = () => Math.floor(Math.random() * Math.floor(colors.length))
    setInitialData({ ...loggedUser, users: loggedUser.users.map(u => u = { ...u, color: colors[generateColor()] }) })
  }, [initialData])


  const removeReset = (object) => {
    const { reset, ...newObject } = object
    return newObject
  }
  return (
    <div id="login">
      <div className="container text-center login-container">
        <img src="/kaiku-export-white.png" alt="Kaiku logo" />
        <form className="form-login" onSubmit={handleLogin}>
          <h3 className="mb-3">Kirjaudu sisään</h3>

          <div className="login-form-group">
            <label htmlFor="inputUsername" className="sr-only">Käyttäjätunnus</label>
            <input type="text" id="inputUsername" className="form-control" placeholder="Käyttäjätunnus"
              required {...removeReset(username)} />
          </div>

          <div className="login-form-group">
            <label htmlFor="inputPassword" className="sr-only">Salasana</label>
            <input type="password" id="inputPassword" className="form-control" placeholder="Salasana"
              required {...removeReset(password)} />
          </div>

          <button className="btn btn-md btn-outline-light btn-block" type="submit">Kirjaudu sisään</button>
        </form>

        <p className="mt-5 mb-3 text-muted">&copy; 2020 Kaiku group Oy</p>
      </div>
    </div>
  )
}

export default Login