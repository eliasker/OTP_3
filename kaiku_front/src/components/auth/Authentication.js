import React, { useContext } from 'react'
import InitialData from '../../providers/InitialData'

const Authentication = () => {
  const { setAuthToken } = useContext(InitialData)

  const handleSubmit = e => {
    e.preventDefault()
    const auth = {
      token: 'ROADHOUSE'
    }
    setAuthToken(auth)
    window.localStorage.setItem('mastakey', JSON.stringify(auth))
  }

  return (
    <div id="login">
      <div className="container text-center login-container">
        <img src="/kaiku-export-white.png" alt="Kaiku logo" />
        <form className="form-login" onSubmit={handleSubmit}>
          <h3 className="mb-3">Todennus</h3>

          <div className="login-form-group">
            <label htmlFor="inputPassword" className="sr-only">Masta key</label>
            <input type="password" id="inputPassword" className="form-control" placeholder="Salasana"
              required />
          </div>

          <button className="btn btn-md btn-outline-light btn-block" type="submit">Todenna</button>
        </form>

        <p className="mt-5 mb-3 text-muted">&copy; 2020 Kaiku group Oy</p>
      </div>
    </div>
  )
}

export default Authentication