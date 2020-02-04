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
        /*
        console.log(message)
        const object = {
          content: message.content,
          message_id: 4,
          user_id: 6
        }*/
        setMessages(messages.concat(message))
      }
    )

    return () => {
      socketRef.current.disconnect()
    }
  }, [messages])

  const sendMessage = (message) => {
    //    socketRef.current.emit("chatevent", { message: message.content, user: 'Minä' })
    socketRef.current.emit("chatevent", message)
  }
  return { messages, sendMessage }
}

export default useChat
