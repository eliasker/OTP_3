import { useEffect, useRef, useState } from "react"
import socketIOClient from "socket.io-client"

const useChat = () => {

  // const [messages, setMessages] = useState([]);
  const socketRef = useRef();
  
  useEffect(() => {
    socketRef.current = socketIOClient(
      "http://localhost:9991"
    )

    socketRef.current.on(
      "chatevent",
      ({ message }) => {


      }
    )
  
    return () => {
      socketRef.current.disconnect()
    }
  }, [])

 
  const sendMessage = ({ message }) => {
    
    const jsonObj = JSON.stringify(message)
    
    console.log('send')
    console.log({message})
    console.log(jsonObj)
    socketRef.current.emit("chatevent", { jsonObj })
  }
  
  return { sendMessage }
}

export default useChat
