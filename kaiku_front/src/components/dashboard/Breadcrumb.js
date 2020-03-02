import React, { useState, useContext } from 'react'
import Context from '../../providers/Context'

const Breadcrumb = () => {
  const { content, setContent } = useContext(Context)

  const showDaWae = () => {
    switch (content) {
      case 'u/all':
        return (
          <>
            <li className="breadcrumb-item active" >Kaikki käyttäjät</li>
          </>
        )
      case 'u/new':
        return (
          <>
            <li className="breadcrumb-item active" >Uusi käyttäjä</li>
          </>
        )
      case 'g/all':
        return (
          <>
            <li className="breadcrumb-item active" >Kaikki ryhmät</li>
          </>
        )
      case 'g/new':
        return (
          <>
            <li className="breadcrumb-item active" >Uusi ryhmä</li>
          </>
        )
      case 'g/members':
        return (
          <>
            <li className="breadcrumb-item link" >Kaikki ryhmät</li>
            <li className="breadcrumb-item active" >Ryhmän muokkaus</li>
          </>
        )
      default:
        return (
          <>
            <li className="breadcrumb-item active" >Kaikki käyttäjät</li>
          </>
        )
    }
  }

  return(
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item link" onClick={() => setContent('g/all')}>Kojelauta</li>
          {showDaWae()}
        </ol>
      </nav>
      <hr />
    </>
  )
}

export default Breadcrumb