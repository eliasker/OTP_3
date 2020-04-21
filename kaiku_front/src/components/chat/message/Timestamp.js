import React, { useContext } from 'react'
import formatTime from '../../../util/formatTime'
import InitialData from '../../../providers/InitialData'

const Timestamp = ({timestamp, inMessage}) => {
  const { useLang } = useContext(InitialData)
  const string = (ref) => useLang.getString(ref)

  const createTimestamp = () => {
    if (timestamp === undefined) return string('time_today') + formatTime.getCurrentTimestamp()
    return formatTime.formatTimeStamp(timestamp, string('time_today'))
  }

  if (inMessage) return (
    <span className="in-message-date">{createTimestamp()}</span>
  )
  return (
    <span className="out-message-date">{createTimestamp()}</span>
  )
}
export default Timestamp