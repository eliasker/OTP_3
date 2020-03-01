import React, { useState } from 'react'
import dictionary from '../../../util/dictionary'

const NewUser = () => {
  const [ name, setName ] = useState('')
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ rePassword, setRePassword ] = useState('')
  const { nouns, adjectives, capitalize } = dictionary

  const generateUser = () => {
    const nounIndex = Math.floor(Math.random() * nouns.length)
    const adjectiveIndex = Math.floor(Math.random() * adjectives.length)

    const noun = capitalize(nouns[nounIndex])
    const adjective = capitalize(adjectives[adjectiveIndex])
    
    setName(`${adjective} ${noun}`)
    setUsername(`${adjective}${noun}`)
    setPassword(`${adjective}${noun}`)
    setRePassword(`${adjective}${noun}`)
  }

  return(
  <>
    <div className="container-fluid">
      <form className="p-5 mt-5 bg-light">
        <div className="form-row">
          <div className="col-md-6 mb-2">
            <label htmlFor="user-name">Nimi</label>
            <input type="text" className="form-control" id="user-name" placeholder="Nimi" value={name} onChange={e => setName(e.target.value)} required />
          </div>
          <div className="col-md-6 mb-2">
            <label htmlFor="user-username">Käyttäjänimi</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroupPrepend2">@</span>
              </div>
              <input type="text" className="form-control" id="user-username" placeholder="Käyttäjänimi" aria-describedby="inputGroupPrepend2"
              value={username} onChange={e => setUsername(e.target.value)} required />
            </div>
          </div>
        </div>
        <div className="form-row">
          <div className="col-md-6 mb-2">
            <label htmlFor="user-password">Salasana</label>
            <input type="password" className="form-control" id="user-password" placeholder="Salasana"
            value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          <div className="col-md-6 mb-2">
            <label htmlFor="user-repassword">Toista salasana</label>
            <input type="password" className="form-control" id="user-password" placeholder="Toista salasana"
            value={rePassword} onChange={e => setRePassword(e.target.value)} required />
          </div>
        </div>
        <button type="button" className="btn btn-outline-primary mt-3 mr-2" onClick={generateUser}>Generoi käyttäjä</button>
        <button type="submit" className="btn btn-primary mt-3" >Luo käyttäjä</button>
      </form>
    </div>
  </>
  )
}

export default NewUser