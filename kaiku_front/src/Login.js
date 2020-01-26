import React from 'react'

const Login = () => {
  return(
    <div id="login">
    <div className="container text-center login-container">
    <img src="/kaiku-export-white.png" alt="Kaiku logo"/>
      <form className="form-login">
        <h3 className="mb-3">Kirjaudu sisään</h3>

        <div className="sign-in-group">
          <label htmlFor="inputUsername" className="sr-only">Käyttäjätunnus</label>
          <input type="text" id="inputUsername" className="form-control" placeholder="Käyttäjätunnus" 
             required/>
        </div>
        
        <div className="sign-in-group">
          <label htmlFor="inputPassword" className="sr-only">Salasana</label>
          <input type="password" id="inputPassword" className="form-control" placeholder="Salasana" 
             required/>
        </div>

        <button className="btn btn-md btn-outline-light btn-block" type="submit">Sign in</button>
      </form>

      <p className="mt-5 mb-3 text-muted">&copy; 2020 Kaiku group Oy</p>
    </div>
    </div>
  )
}

export default Login