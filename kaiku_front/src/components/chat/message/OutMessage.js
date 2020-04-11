import React, { useContext } from 'react'
import formatTime from '../../../util/formatTime'
import InitialData from '../../../providers/InitialData'

const OutMessage = ({ message }) => {
  const { useLang } = useContext(InitialData)
  const string = (ref) => useLang.getStrign
  return (
    <div className="out-container">
      <div className="out-message">
        <p>{message.content}</p>
        <span className="out-message-date">{string('time_today') + formatTime.formatTimeStamp(message.timestamp)}</span>
      </div>
    </div>
  )
}

export default OutMessage