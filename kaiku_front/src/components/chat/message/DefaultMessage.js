import React, { useContext } from 'react'
import InitialData from '../../../providers/InitialData'
 
const DefaultMessage = () => {
  const { useLang } = useContext(InitialData);
  const string = (ref) => useLang.getString(ref);

  return (
    <div className="default-message-container">
      <div className="default-message">
  <p>{string('msg_startnew')}</p>
      </div>
    </div>
  )
}

export default DefaultMessage