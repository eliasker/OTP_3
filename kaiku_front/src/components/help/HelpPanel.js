import React, { useState, useContext } from 'react'
import help from '../../util/help'
import CurrentChat from '../../providers/CurrentChat'

const HelpPanel = () => {
  const { showModal, setShowModal } = useContext(CurrentChat)
  const [tip, setTip] = useState(help[0])
  const [showHelpBtn, setShowHelpBtn] = useState(true)

  const nextTip = integer =>
    setTip(help[
      ((help.indexOf(tip) + integer) < 0) ? help.length - 1: (help.indexOf(tip) + integer) % help.length
    ])

  return (
    <>
      <div className={`${showModal ? 'help-modal': 'd-none'}` } onClick={(e) => e.target.className.includes('relative') ? setShowModal(!showModal) : null}>
        <div className="relative">
          <div className="modal-container">
            <h3>{tip.title} {help.indexOf(tip)+1}/{help.length}</h3>
            <hr />
            <p>{tip.content}</p>
          </div>
          <div className="help-button-container">
            <div className="help-button-group">
              <button className={(showHelpBtn && help.indexOf(tip)+1 === help.length) ? 'btn btn-outline-dark mr-1': 'd-none'} onClick={() => setShowHelpBtn(false) || setShowModal(!showModal)}>Piilota</button>
              <button className="btn btn-outline-dark help-pre" onClick={() => nextTip(-1)}><i className="fas fa-caret-left"></i> Edellinen</button>
              <button className="btn btn-outline-dark help-nxt" onClick={() => nextTip(1)}>Seuraava <i className="fas fa-caret-right"></i></button>
            </div>
            <div className="exit-button">
              <i className="fas fa-times" onClick={() => setShowModal(!showModal)}></i>
            </div>
          </div>
        </div>
      </div>
      <div className={showHelpBtn ? 'help-button d-none d-sm-block': 'd-none'}>
        <i className="fas fa-info" onClick={() => setShowModal(!showModal)}></i>
      </div>
    </>
  )
}

export default HelpPanel
