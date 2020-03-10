import React, { useContext, useState } from 'react'
import InitialData from '../providers/InitialData'
import loginService from '../services/loginService'
import useField from '../hooks/hooks'

const Login = ({ createSocketConnection }) => {
  const [showPassword, setShowPassword] = useState(false)
  const { initialData, setLoggedUser } = useContext(InitialData)
  const username = useField('text')
  const password = useField(showPassword ? 'text' : 'password')

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
        var user = await loginService.login(username.value, password.value)
        if (user === '') throw ('no matching user')
        console.log('setting loggeduser to ', user)
        user._Id = user.user_id
        setLoggedUser(user)
        createSocketConnection(await user.token)
        window.localStorage.setItem('loggedKaikuUser', JSON.stringify(user))
      } catch (e) {
        console.log('failed login', e)
      }
    }
  }

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
            <input id="inputUsername" className="form-control" placeholder="Käyttäjätunnus" required {...removeReset(username)} />
          </div>

          <div className="login-form-group">
            <label htmlFor="inputPassword" className="sr-only">Salasana</label>
            <input id="inputPassword" className="form-control" placeholder="Salasana" required {...removeReset(password)} />
            <div class="form-check pt-2 pb-0">
              <input class="form-check-input" type="checkbox" value={showPassword} onChange={() => setShowPassword(!showPassword)} id="defaultCheck1" />
              <label class="form-check-label" for="defaultCheck1"> Show password </label>
            </div>
          </div>

          <button className="btn btn-md btn-outline-light btn-block" type="submit">Kirjaudu sisään</button>
        </form>

        <p className="mt-5 mb-3 text-muted">&copy; 2020 Kaiku group Oy</p>
      </div>
    </div>
  )
}

export default Login