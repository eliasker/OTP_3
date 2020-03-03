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
    console.log('setting initial chats')
    setChatState(initialData.chats)
    setCurrentChat(initialData.chats[0])
  }, [initialData])

  // Once receiving messages from socket work, a message is passed as a parameter 
  // TODO: Fix sphagetti (works currently)
  const addMessage = (newMessage, chatID) => {
    console.log(chatState)
    console.log('new message', newMessage, '\n', 'to chatID', chatID)
    const newChatState = chatState
    if (chatID === undefined) {
      currentChat.messages.push(newMessage)
      console.log('current', currentChat)
      newChatState.push(currentChat)
      setChatState(newChatState)
      return
    }
    const prevMessages = newChatState[chatID].messages

    if (currentChat === null || currentChat.id !== newChatState.id) {
      console.log('message to curr chat')
      newChatState[chatID] = {
        ...newChatState[chatID],
        messages: [...prevMessages, newMessage], unreadMessages: false
      }
      console.log(newChatState)
      setChatState(newChatState)
    } else {
      newChatState[chatID] = {
        ...newChatState[chatID],
        messages: [...prevMessages, newMessage]
      }
      setChatState(newChatState)
    }
    if (chatID !== undefined) {
      setCurrentChat(newChatState[chatID])
    }
  }

  /**
   * Function that sets active chat state. Is separate function for setting unreadMessages -value 
   * If chat has previous activity it gets no unread messages value
   * @param {*} chat Chat that user clicks from chat column 
   */
  const selectChat = (chat) => {
    const newChatState = chatState
    if (newChatState[chat.id]) newChatState[chat.id].unreadMessages = false
    setChatState(newChatState)
    setCurrentChat(chat)
  }

  return { chatState, currentChat, setCurrentChat, addMessage, selectChat }
}

export default useChatHook