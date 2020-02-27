import { useEffect, useRef, useState, useContext } from "react"
import socketIOClient from 'socket.io-client'
import jsonService from '../services/jsonService'
import InitialData from "../providers/InitialData"

const useChat = (loggedUser_id, currentChat) => {
  const { initialData } = useContext(InitialData)
  const [messages, setMessages] = useState([])
   const socketRef = useRef()
  useEffect(() => {
    if (initialData.chats === undefined) return console.log('initialData pending...')
    setMessages(initialData.chats[0].messages)
  }, [initialData])

  useEffect(() => {
    if (currentChat === undefined) return 
    setMessages(currentChat.messages)
  }, [currentChat])

  useEffect(() => {
    socketRef.current = socketIOClient(
      "http://localhost:9991"
    )

    socketRef.current.on(
      "chatEvent",
      (message) => {
        if (message.user_id === loggedUser_id) return

        //Toiminnot vastaanottajalle
        setMessages(messages.concat(message))
      }
    )

    socketRef.current.on(
      "connect",
      (users) => {
	console.log(users)
	// 	socket = socketIO.connect(baseString, {
	//   query: "Authorization=kaiku"
	// });
      }
    )

    socketRef.current.on(
      "createChatEvent",
      (chat) => {
	console.log('createChatEvent')
        console.log(chat)
      }
    )

    return () => {
      socketRef.current.disconnect()
    }
  }, [messages])

  const createChatEvent = () => {
    socketRef.current.emit("chat", { chatName: 'testichat' , users: ['1','2','3'] })
  }

  const sendMessage = (message) => {
    //    socketRef.current.emit("chatevent", { message: message.content, user: 'Minä' })
    setMessages(messages.concat(message))
    socketRef.current.emit("chatEvent", message)
  }
  return { messages, sendMessage }
}

export default useChat
