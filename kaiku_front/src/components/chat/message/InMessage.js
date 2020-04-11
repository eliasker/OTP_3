import React, { useContext } from 'react'
import formatTime from '../../../util/formatTime'
import InitialData from '../../../providers/InitialData'

const InMessage = ({ message, user }) => {
  const { useLang } = useContext(InitialData)
  const string = (ref) => useLang.getString(ref)

  if (user === undefined) user = { color: 'green', username: '' }
  return (
    <div className="in-container">
      <div className="in-message">
        <p>
          <span className={`${user.color} msg-senda bg-none`}>{user.username}</span>
          <br />{message.content}
        </p>
        <span className="in-message-date">{string('time_today') + formatTime.formatTimeStamp(message.timestamp)}</span>
      </div>
    </div>
  )
}

export default InMessage