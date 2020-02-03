import { useEffect, useRef, useState } from "react"
import socketIOClient from "socket.io-client"

const useChat = () => {

  const socketRef = useRef();
  
  useEffect(() => {
    socketRef.current = socketIOClient(
      "http://localhost:9991"
    )

    socketRef.current.on(
      "chatevent",
      ({ message }) => {
        // stuff
      }
    )
    
    return () => {
      socketRef.current.disconnect()
    }
  }, [])

  const sendMessage = ({ message }) => {    
    const jsonObj = JSON.stringify(message)
    socketRef.current.emit("chatevent", { jsonObj })
  }
  
  return { sendMessage }
}

export default useChat
