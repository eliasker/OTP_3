import React, { useState, useContext } from 'react'
import help from '../../util/help'
import CurrentChat from '../../providers/CurrentChat'

const HelpPanel = () => {
  const { showModal, setShowModal } = useContext(CurrentChat)
  const [tip, setTip] = useState(help[0])

  const nextTip = integer =>
    setTip(help[
      ((help.indexOf(tip) + integer) < 0) ? help.length - 1: (help.indexOf(tip) + integer) % help.length
    ])

  return (
    <>
      <div className={`${showModal ? 'help-modal': 'd-none'}` } onClick={(e) => e.target.className.includes('relative') ? setShowModal(!showModal) : null}>
        <div className="relative">
          <div className="modal-container">
            <h3>Protips {help.indexOf(tip)+1}/{help.length}</h3>
            <hr />
            <p>{tip}</p>
          </div>
          <div className="help-button-container">
            <div className="help-button-group">
              <button className="btn btn-outline-primary help-pre" onClick={() => nextTip(-1)}><i class="fas fa-caret-left"></i> Edellinen</button>
              <button className="btn btn-outline-primary help-nxt" onClick={() => nextTip(1)}>Seuraava <i class="fas fa-caret-right"></i></button>
            </div>
            <div className="exit-button">
              <i class="fas fa-times" onClick={() => setShowModal(!showModal)}></i>
            </div>
          </div>
        </div>
      </div>
      <div className="help-button d-none d-xl-block">
        <i class="fas fa-question" onClick={() => setShowModal(!showModal)}></i>
      </div>
    </>
  )
}

export default HelpPanel
