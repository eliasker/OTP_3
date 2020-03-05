import { useState, useEffect } from 'react'

/**
 * Custom hook for chat state management in front end
 * @param {*} initialData 
 */
const useChatHook = (initialData) => {
  const [chatState, setChatState] = useState(null)
  const [currentChat, setCurrentChat] = useState(null)

  useEffect(() => {
    if (initialData.chats === undefined) return console.log('initialData pending...')
    console.log('setting initial chats', initialData)
    setChatState(initialData.chats)
    setCurrentChat(initialData.chats[0])
  }, [initialData])

  // Once receiving messages from socket work, a message is passed as a parameter 
  // TODO: Fix sphagetti (works currently)
  const addMessage = (newMessage, chatID) => {
    console.log('new message', newMessage, '\n', 'to chatID', chatID)
    if (chatID !== currentChat.id && chatID !== undefined) chatState[chatID].unreadMessages = true
    const newChatState = chatState

    if (chatID === currentChat.id && chatID !== undefined) {
      const prevMessages = newChatState[chatID].messages
      newChatState[chatID] = {
        ...newChatState[chatID],
        messages: [...prevMessages, newMessage], unreadMessages: false
      }
      setCurrentChat(newChatState[chatID])
    } else if (chatID === undefined) {
      console.log(currentChat)
      currentChat.messages.push(newMessage)
      const prevChat = chatState.find(c => c.members === currentChat.members)
      if (prevChat === undefined) {
        currentChat.id = chatState.length
        newChatState.push(currentChat)
      }
    } else {
      const prevMessages = newChatState[chatID].messages
      newChatState[chatID] = {
        ...newChatState[chatID],
        messages: [...prevMessages, newMessage]
      }
    }
    setChatState(newChatState)  
    console.log(chatState)
  }

  /**
   * Function that sets active chat state. Is separate function for setting unreadMessages -value 
   * If chat has previous activity it gets no unread messages value
   * @param {*} chat Chat that user clicks from chat column 
   */
  const selectChat = (chat) => {
    console.log('setting chat to', chat)
    const newChatState = chatState
    if (newChatState[chat.id]) newChatState[chat.id].unreadMessages = false
    setChatState(newChatState)
    setCurrentChat(chat)
  }

  return { chatState, currentChat, setCurrentChat, addMessage, selectChat }
}

export default useChatHook