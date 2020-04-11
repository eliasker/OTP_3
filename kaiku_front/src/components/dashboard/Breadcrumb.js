import React, { useContext } from 'react'
import Context from '../../providers/Context'
import InitialState from '../../providers/InitialData'

const Breadcrumb = () => {
  const { content, setContent } = useContext(Context)
  const { useLang } = useContext(InitialState);
  const string = (ref) => useLang.getString(ref);

  const showDaWae = () => {
    switch (content) {
<<<<<<< HEAD
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
=======
      case 'u/all':
        return (
          <>
            <li className="breadcrumb-item active" >{string('bread_allusers')}</li>
          </>
        )
      case 'u/new':
        return (
          <>
            <li className="breadcrumb-item active" >{string('bread_newuser')}</li>
          </>
        )
      case 'g/all':
        return (
          <>
            <li className="breadcrumb-item active" >{string('bread_allgroups')}</li>
          </>
        )
      case 'g/new':
        return (
          <>
            <li className="breadcrumb-item active" >{string('bread_newgroup')}</li>
          </>
        )
      case 'g/members':
        return (
          <>
            <li className="breadcrumb-item link" >{string('bread_allgroups')}</li>
            <li className="breadcrumb-item active" >{string('bread_editgroup')}</li>
          </>
        )
      default:
        return (
          <>
            <li className="breadcrumb-item active" >{string('bread_allusers')}</li>
          </>
        )
>>>>>>> front-strings-to-variables
    }
  }

  return(
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item link" onClick={() => setContent('g/all')}>{string('dash_header')}</li>
          {showDaWae()}
        </ol>
      </nav>
      <hr />
    </>
  )
}

export default Breadcrumb