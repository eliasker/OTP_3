import React, { useState, useContext, useEffect } from 'react'
import help_static from '../../util/help'
import CurrentChat from '../../providers/CurrentChat'
import InitialData from '../../providers/InitialData'

const HelpPanel = () => {
  const { showModal, setShowModal } = useContext(CurrentChat)
  const { useLang } = useContext(InitialData)
  const string = (ref) => useLang.getString(ref)
  const [help, setHelp] = useState(help_static)

  useEffect(() => {
    setHelp(
      [
        { title: string('help_title_1'), content: string('help_content_1') },
        { title: string('help_title_2'), content: string('help_content_2') },
        { title: string('help_title_3'), content: string('help_content_3') },
        { title: string('help_title_4'), content: string('help_content_4') },
        { title: string('help_title_5'), content: string('help_content_5') },
        { title: string('help_title_6'), content: string('help_content_6') },
        { title: string('help_title_7'), content: string('help_content_7') },
        { title: string('help_title_8'), content: string('help_content_8') },
        { title: string('help_title_9'), content: string('help_content_9') },
        { title: string('help_title_10'), content: string('help_content_10') }
      ])

  }, [string('help_title_1')])

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
              <button className={(showHelpBtn && help.indexOf(tip)+1 === help.length) ? 'btn btn-outline-dark mr-1': 'd-none'} onClick={() => setShowHelpBtn(false) || setShowModal(!showModal)}>{string('help_hide')}</button>
              <button className="btn btn-outline-dark help-pre" onClick={() => nextTip(-1)}><i className="fas fa-caret-left"></i>{string('help_last')}</button>
              <button className="btn btn-outline-dark help-nxt" onClick={() => nextTip(1)}>{string('help_next')}<i className="fas fa-caret-right"></i></button>
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
