import { useEffect, useRef } from "react"
import socketIOClient from 'socket.io-client'

/**
 * 
 * @param {*} loggedUser_id used to prevent sending chatevents to itself
 * @param {*} currentChat state that holds selected and currently visible chat, messages are sent to this chats id
 * @param {*} addMessage function that adds a message to any chat incoming or sent, addMessage(newMessage, chatID)
 */
const useChat = (loggedUser_id, currentChat, addMessage) => {
  const socketRef = useRef()

  useEffect(() => {
    socketRef.current = socketIOClient(
      "http://localhost:9991"
    )

    socketRef.current.on(
      "chatEvent",
      (message) => {
        if (message.user_id === loggedUser_id) return

        //Toiminnot vastaanottajalle
        //setMessages(messages.concat(message)) // pois
        //addMessage(message, message.chatID) ?? tarvitaan kohde chatin id
      }
    )

    socketRef.current.on(
      "connect",
      (users) => {
        //console.log('connect', users)
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
  }, [currentChat])

  const createChatEvent = () => {
    socketRef.current.emit("chat", { chatName: 'testichat', users: ['1', '2', '3'] })
  }

  const sendMessage = (message) => {
    addMessage(message, currentChat.id)
    socketRef.current.emit("chatEvent", message)
  }
  return { sendMessage }
}

export default useChat
