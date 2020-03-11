import { useState, useEffect, useContext } from 'react'
import InitialData from '../providers/InitialData'

/**
 * Custom hook for chat state management in front end
 * @param {*} initialData 
 */
const useChatHook = (initialData, createChat, sendMessage, latestMessage) => {
  const { loggedUser } = useContext(InitialData)
  const [chatState, setChatState] = useState(null)
  const [currentChat, setCurrentChat] = useState(null)

  useEffect(() => {
    if (initialData.chats === undefined) return console.log('initialData pending...')
    console.log('setting chatState to', initialData.chats[0])
    setChatState(initialData.chats)
    setCurrentChat(initialData.chats[0])
  }, [initialData])

  useEffect(() => {
    receiveMessage(latestMessage)
  }, [latestMessage])

  const findChatByID = id => {
    if (chatState === null) return
    return chatState.find(c => c.chat_id === id)
  }

  /**
   * Method for posting messages. First updates current chats messagelist.
   * Then method checks if chatID is undefined
   * Case1: ChatID is undefined, so chat didn't exist and just received its first message. 
   *        New chat is initialized and created.
   * Case2: Chat exists and new message is added. Chat is updated.
   * Then method updates local react state to display new message.
   * @param {*} newMessage
   * @param {*} chatID of currentChat, undefined by default
   */
  const postMessage = async (newMessage, chatID) => {
    var newChatState = chatState
    if (chatID === undefined) {
      currentChat.messages.push(newMessage)
      currentChat.chat_id = chatState.length
      createChat('chat', currentChat.type, currentChat.members, currentChat.messages)
      newChatState.push(currentChat)
    } else {
      console.log('message to existing chat', newMessage, '\n', 'chatID', chatID)
      if (chatID !== undefined) {
        var newChatObject = findChatByID(chatID)
        const index = newChatState.indexOf(newChatObject)
        newChatState[index].messages.push(newMessage)
        setCurrentChat(newChatState[index])
        sendMessage(newMessage, loggedUser._Id, chatID)
      }
    }
    setChatState(newChatState)
    console.log(chatState)
  }

  /**
   * Method for adding incoming messages to react state
   * First method tries to find existing chat with same chatID as newMessage
   * Case1: No such chat found, placeholder is created to which message is added.
   * Case2: Chat exists, message is added to its list of messages
   * Then react state is updated
   * @param {*} newMessage
   * @param {*} chatID id of chat where new message belongs
   */
  const receiveMessage = (data) => {
    if (data !== undefined) {
      console.log('received message', data)
      var newChatState = chatState
      var newChatObject = findChatByID(data.chat_id)
      try {
        const index = newChatState.indexOf(newChatObject)
        const newMessage = {
          content: data.content,
          user_id: data.user_id,
          chat_id: data.chat_id
        }
        newChatState[index].messages.push(newMessage)
        if (data.chat_id === currentChat.chat_id) {
          console.log('to currentchat')
          console.log('has messages', newChatState[index].messages)
          setCurrentChat(newChatState[index])
        }
      } catch (e) { console.log('haistapaska') }
      setChatState(newChatState)
      console.log(chatState)
    }
  }

  /**
   * Function that sets active chat state. Is separate function for setting unreadMessages -value 
   * If chat has previous activity it gets no unread messages value
   * @param {*} chat Chat that user clicks from chat column 
   */
  const selectChat = (chat) => {
    console.log('setting chat to', chat)
    const newChatState = chatState
    //if (newChatState[chat.id]) newChatState[chat.id].unreadMessages = false
    setChatState(newChatState)
    setCurrentChat(chat)
  }

  return { chatState, currentChat, postMessage, receiveMessage, selectChat }
}
export default useChatHook