import { useState, useEffect } from 'react'

/**
 * Custom hook for chat management
 * @param {*} initialData 
 */
const useChatHook = (initialData) => {
  const [chatState, setChatState] = useState([])
  const [currentChat, setCurrentChat] = useState(null)

  useEffect(() => {
    setChatState(initialData.chats)
  }, [initialData])

  // Once receiving messages from socket work, a message is passed as a parameter 
  //const receiveMessage = (message, chatID) => {
  const receiveMessage = (chatID) => {
    const newMessageID = chatState[chatID].messages.length
    const newMessage = {
      id: newMessageID,
      user_id: 3,
      content: `chat${chatID + 1} msg${chatState[chatID].messages.length + 1}`
    }

    const newChatState = [...chatState]
    const prevMessages = newChatState[chatID].messages

    if (currentChat === null || currentChat.id !== newChatState.id) {
      newChatState[chatID] = {
        ...newChatState[chatID],
        messages: [...prevMessages, newMessage], unreadMessages: true
      }
    } else {
      newChatState[chatID] = {
        ...newChatState[chatID],
        messages: [...prevMessages, newMessage]
      }
    }
    setChatState(newChatState)
  }

  /**
   * Function that sets active chat state. Is separate function for setting unreadMessages -value 
   * @param {*} chat Chat that user clicks from chat column 
   */
  const selectChat = (chat) => {
    if(chatState === undefined)  return
    const newChatState = [...chatState]
    newChatState[chat.id] = { ...newChatState[chat.id], unreadMessages: false }
    setChatState(newChatState)
    setCurrentChat(chat)
  }

  return { chatState, currentChat, setCurrentChat, receiveMessage, selectChat }
}

export default useChatHook