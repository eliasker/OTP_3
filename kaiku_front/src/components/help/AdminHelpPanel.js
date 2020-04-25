import React, { useState, useContext, useEffect } from 'react'
import { adminHelp } from '../../util/help'
import InitialData from '../../providers/InitialData'

const AdminHelpPanel = () => {
  const [showModal, setShowModal] = useState();
  const { useLang } = useContext(InitialData)
  const string = (ref) => useLang.getString(ref)
  const [help, setHelp] = useState(adminHelp);
  
  useEffect(() => {
    setHelp(
      [
      {title: string('admin_help_title_1'), content: string('admin_help_content_1')},
      {title: string('admin_help_title_2'), content: string('admin_help_content_2')},
      {title: string('admin_help_title_3'), content: string('admin_help_content_3')},
      {title: string('admin_help_title_4'), content: string('admin_help_content_4')},
      {title: string('admin_help_title_5'), content: string('admin_help_content_5')},
      {title: string('admin_help_title_6'), content: string('admin_help_content_6')},
      {title: string('admin_help_title_7'), content: string('admin_help_content_7')},
      {title: string('admin_help_title_8'), content: string('admin_help_content_8')},
    ])
  
  }, [string('admin_help_title_1')])

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
            <h3>{tip.title} {help.indexOf(tip)+1}/{help.length}</h3>
            <hr />
            <p>{tip.content}</p>
          </div>
          <div className="help-button-container">
            <div className="help-button-group">
              <button className="btn btn-outline-dark help-pre" onClick={() => nextTip(-1)}><i className="fas fa-caret-left"></i>{string('help_last')}</button>
              <button className="btn btn-outline-dark help-nxt" onClick={() => nextTip(1)}>{string('help_next')}<i className="fas fa-caret-right"></i></button>
            </div>
            <div className="exit-button">
              <i className="fas fa-times" onClick={() => setShowModal(!showModal)}></i>
            </div>
          </div>
        </div>
      </div>
      <div className={"help-button d-none d-sm-block"}>
        <i className="fas fa-info" onClick={() => setShowModal(!showModal)}></i>
      </div>
    </>
  )
}

export default AdminHelpPanel