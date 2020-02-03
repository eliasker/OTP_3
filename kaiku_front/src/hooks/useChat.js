import { useEffect, useRef, useState } from "react"
import socketIOClient from 'socket.io-client'
import jsonService from '../services/jsonService'

const useChat = () => {
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = socketIOClient(
      "http://localhost:9991"
    )

    socketRef.current.on(
      "chatevent",
      (message) => {
         
      }
    )

    return () => {
      socketRef.current.disconnect()
    }
  }, [])

  const sendMessage = (message) => {
    socketRef.current.emit("chatevent", message)
  }
  return { sendMessage }
}

export default useChat
