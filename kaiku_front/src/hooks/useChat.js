import { useEffect, useRef, useState } from "react"
import socketIOClient from 'socket.io-client'
import jsonService from '../services/jsonService'

const useChat = () => {
  const [messages, setMessages] = useState([])
  const socketRef = useRef();

  useEffect(() => {
    jsonService.getMessages()
      .then(messages => setMessages(messages))
  }, [])

  useEffect(() => {
    socketRef.current = socketIOClient(
      "http://localhost:9991"
    )

    socketRef.current.on(
      "chatevent",
      (message) => {
        console.log(message)
        const object = {
          content: message.message,
          id: 4,
          user_id: 3
        }
        console.log(messages)
        setMessages(messages.concat(object))
      }
    )

    return () => {
      socketRef.current.disconnect()
    }
  }, [messages])

  const sendMessage = (message) => {
    socketRef.current.emit("chatevent", { message: message.content, user: 'Minä' })
  }
  return { messages, sendMessage }
}

export default useChat
