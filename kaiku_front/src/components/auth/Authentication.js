import React, { useContext } from 'react'
import InitialData from '../../providers/InitialData'

const Authentication = () => {
  const { setAuthToken, useLang } = useContext(InitialData)
  const string = (ref) => useLang.getString(ref)

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
          <h3 className="mb-3">{string('auth_header')}</h3>

          <div className="login-form-group">
            <label htmlFor="inputPassword" className="sr-only">{string('auth_mastakey')}</label>
            <input type="password" id="inputPassword" className="form-control" placeholder="Salasana"
              required />
          </div>

          <button className="btn btn-md btn-outline-light btn-block" type="submit">{string('auth_confirm')}</button>
        </form>

        <p className="mt-5 mb-3 text-muted">&copy; {string('org_label')}</p>
      </div>
    </div>
  )
}

export default Authentication