import React, { useContext, useState } from 'react'
import InitialData from '../providers/InitialData'
import loginService from '../services/loginService'
import useField from '../hooks/hooks'

const Login = ({ createSocketConnection }) => {
  const [showPassword, setShowPassword] = useState(false)
  const { initialData, setLoggedUser, useLang } = useContext(InitialData)
  const string = (ref) => useLang.getString(ref)
  const username = useField('text')
  const password = useField(showPassword ? 'text' : 'password')

  // mirka-kissa asgakikk
  // MarkoM asdsaff
  const handleLogin = async e => {
    e.preventDefault()
    if (username.value === 'testi') {
      setLoggedUser(initialData)
      window.localStorage.setItem('loggedKaikuUser', JSON.stringify(initialData))
    } else {
      try {
        var user = await loginService.login(username.value, password.value)
        if (user === '') throw ('no matching user')
        const newLoggedUser = {
          user_id: user.user_id,
          name: user.name,
          username: user.username,
          token: user.token
        }
        setLoggedUser(newLoggedUser)
        createSocketConnection(await user.token)
        window.localStorage.setItem('loggedKaikuUser', JSON.stringify(newLoggedUser))
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
          <h3 className="mb-3">{string('login')}</h3>

          <div className="login-form-group">
            <label htmlFor="inputUsername" className="sr-only">{string('login_username')}</label>
            <input id="inputUsername" className="form-control" placeholder={string('login_username')} required {...removeReset(username)} />
          </div>

          <div className="login-form-group">
            <label htmlFor="inputPassword" className="sr-only">{string('login_pwd')}</label>
            <input id="inputPassword" className="form-control" placeholder={string('login_pwd')} required {...removeReset(password)} />
            <div className="form-check pt-2 pb-0">
              <input className="form-check-input" type="checkbox" value={showPassword} onChange={() => setShowPassword(!showPassword)} id="defaultCheck1" />
              <label className="form-check-label" htmlFor="defaultCheck1">{string('login_showpwd')}</label>
            </div>
          </div>

          <button className="btn btn-md btn-outline-light btn-block" type="submit">{string('login_username')}</button>
        </form>

        <p className="mt-5 mb-3 text-muted">&copy; {string('org_label')}</p>
      </div>
    </div>
  )
}

export default Login