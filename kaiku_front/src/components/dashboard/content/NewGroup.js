import React from 'react'


const NewGroup = () => {

  return(
  <>
    <h2>Luo ryhmä</h2>
    <div className="container-fluid">
      <form className="p-5 mt-5 bg-light">
        <div className="form-row">
          <div className="col-md-6 mb-2">
            <label htmlFor="user-name">Nimi</label>
            <input type="text" className="form-control" id="user-name" placeholder="Nimi" required />
          </div>
        </div>
        <div>
          <p>Lisätyt henkilöt</p>
          {/*Metodi joka näyttää lisätyt henkilöt kapselissa */}
        </div>
        <div className="container-fluid row">
          <div className="col-6 p-0">
            <label>Lisää henkilöitä</label>
            <select defaultValue="Mikko" className="custom-select">
              {/* Generoi tähän käyttäjälista */}
              <option value="Peasant">Mikko</option>
              <option value="Ylläpitäjä">Mallikas</option>
            </select>
          </div>
        </div>
        <button className="btn btn-primary mt-3" type="submit">Luo ryhmä</button>
      </form>
    </div>
  </>
  )
}

export default NewGroup