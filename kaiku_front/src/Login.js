import React, { useContext } from 'react'
import InitialData from './providers/InitialData'

const Login = () => {
  const {initialData, setLoggedUser} = useContext(InitialData)
  const handleSubmit = e => {
    e.preventDefault()
    const loggedUser = {
      name: initialData.name,
      username: initialData.username,
      token: 'kaiku',
      id: initialData.user_id
    }
    setLoggedUser(loggedUser)
    window.localStorage.setItem('loggedKaikuUser', JSON.stringify(loggedUser))
  }
  
  return (
    <div id="login">
      <div className="container text-center login-container">
        <img src="/kaiku-export-white.png" alt="Kaiku logo" />
        <form className="form-login" onSubmit={handleSubmit}>
          <h3 className="mb-3">Kirjaudu sisään</h3>

          <div className="login-form-group">
            <label htmlFor="inputUsername" className="sr-only">Käyttäjätunnus</label>
            <input type="text" id="inputUsername" className="form-control" placeholder="Käyttäjätunnus"
              required />
          </div>

          <div className="login-form-group">
            <label htmlFor="inputPassword" className="sr-only">Salasana</label>
            <input type="password" id="inputPassword" className="form-control" placeholder="Salasana"
              required />
          </div>

          <button className="btn btn-md btn-outline-light btn-block" type="submit">Kirjaudu sisään</button>
        </form>

        <p className="mt-5 mb-3 text-muted">&copy; 2020 Kaiku group Oy</p>
      </div>
    </div>
  )
}

export default Login