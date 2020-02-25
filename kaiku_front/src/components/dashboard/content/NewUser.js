import React from 'react'


const NewUser = () => {

  return(
  <>
    <h2>Luo käyttäjä</h2>
    <div className="container-fluid">
      <form className="p-5 mt-5 bg-light">
        <div className="form-row">
          <div className="col-md-6 mb-2">
            <label htmlFor="user-name">Nimi</label>
            <input type="text" className="form-control" id="user-name" placeholder="Nimi" required />
          </div>
          <div className="col-md-6 mb-2">
            <label htmlFor="user-username">Käyttäjänimi</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroupPrepend2">@</span>
              </div>
              <input type="text" className="form-control" id="user-username" placeholder="Käyttäjänimi" aria-describedby="inputGroupPrepend2" required />
            </div>
          </div>
        </div>
        <div className="form-row">
          <div className="col-md-6 mb-2">
            <label htmlFor="user-password">Salasana</label>
            <input type="password" className="form-control" id="user-password" placeholder="Salasana" required />
          </div>
          <div className="col-md-6 mb-2">
            <label htmlFor="user-repassword">Varmista salasana</label>
            <input type="password" className="form-control" id="user-password" placeholder="Varmista salasana" required />
          </div>
        </div>
        <div className="container-fluid row">
          <div className="col-6 p-0">
            <label>Rooli</label>
            <select defaultValue="Peasant" className="custom-select">
              <option value="Peasant">Peasant</option>
              <option value="Ylläpitäjä">Ylläpitäjä</option>
            </select>
          </div>
        </div>
        <button className="btn btn-outline-primary mt-3 mr-2">Generoi käyttäjä</button>
        <button className="btn btn-primary mt-3" type="submit">Luo käyttäjä</button>
      </form>
    </div>
  </>
  )
}

export default NewUser