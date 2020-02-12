import { useEffect, useRef, useState } from "react"
import socketIOClient from 'socket.io-client'
import jsonService from '../services/jsonService'

const useChat = (loggedUser_id, initialData) => {
  const [messages, setMessages] = useState([])
  const [users, setUsers] = useState([])
  const socketRef = useRef()
  
  useEffect(() => {
    jsonService.getMessages()
      .then(response => setMessages(response))
  }, [])

  useEffect(() => {
    socketRef.current = socketIOClient(
      "http://localhost:9991"
    )

    socketRef.current.on(
      "chatevent",
      (message) => {
        if (message.user_id !== loggedUser_id) setMessages(messages.concat(message))
      }
    )

    socketRef.current.on(
      "loginevent",
      (user) => {
        // Login and user status(?)
      }
    )

    return () => {
      socketRef.current.disconnect()
    }
  }, [messages])

  const sendMessage = (message) => {
    //    socketRef.current.emit("chatevent", { message: message.content, user: 'Minä' })
    setMessages(messages.concat(message))
    socketRef.current.emit("chatevent", message)
  }
  return { messages, sendMessage }
}

export default useChat
