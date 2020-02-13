import { useEffect, useRef, useState } from "react"
import socketIOClient from 'socket.io-client'
import jsonService from '../services/jsonService'

const useChat = (loggedUser_id, initialData) => {
  const [messages, setMessages] = useState([])
  const [users, setUsers] = useState([])
  const socketRef = useRef()
  useEffect(() => {
    if (initialData.chats === undefined) return console.log('initialData pending...')
    setMessages(initialData.chats[0].messages)
  }, [initialData])

  useEffect(() => {
    socketRef.current = socketIOClient(
      "http://localhost:9991"
    )

    socketRef.current.on(
      "chatevent",
      (message) => {
        if (message.user_id === loggedUser_id) return

        //Toiminnot vastaanottajalle
        setMessages(messages.concat(message))
      }
    )

    socketRef.current.on(
      "connect",
      (user) => {
        // TODO
      }
    )

    socketRef.current.on(
      "connectionEvent",
      (user) => {
        // TODO
      }
    )

    socketRef.current.on(
      "createchatEvent",
      (chat) => {
        // TODO
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
