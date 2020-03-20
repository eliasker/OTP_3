import { useRef, useState } from 'react';
import socketIOClient from 'socket.io-client';

const SocketService = () => {
  var socketRef = useRef()
  const [incMessageData, setIncMsgData] = useState(null)
  var loggedUserID = useRef()
  const [newChatData, setNewChatData] = useState(null)

  const createSocketConnection = (token, id) => {
    const socketUrl = 'http://localhost:9991';
    loggedUserID = id

    socketRef.current = socketIOClient.connect(
      socketUrl,
      { query: `Authorization=${token}` }
    )

    socketRef.current.on('connect', function (data) {
      console.log('connect event');
      console.log('connected users: ', data);
    });

    socketRef.current.on('chatEvent', function (data) {
      if (loggedUserID === data.user_id) return
      setIncMsgData(data)
    });

    /**
     * @param data object { id: String, loggedIn: false }
     */
    socketRef.current.on('disconnect', function (data) {

      console.log('disconnect');
    });

    socketRef.current.on('createChatEvent', function (data) {
      console.log('createChatEvent', data);
      setNewChatData(data)
    })
    console.log('setting socket to: _socket', socketRef.current)
  }

  const sendMessage = (message, user_id, chat_id) => {

    const obj = {
      content: message.content,
      user_id,
      chat_id
    }

    socketRef.current.emit('chatEvent', obj);
    console.log('sernding message', message, 'from', user_id, 'to', chat_id)
  }

  const createChat = (chatName, type, members, messages) => {
    return new Promise((resolve, reject) => {
      console.log('creating new chat', members, 'chatname', chatName, 'type', type, 'messsages', messages)
      const obj = {
        chatName,
        type,
        members,
        messages
      }
      socketRef.current.emit('createChatEvent', obj, function (ack) {
        console.log('acknowledgement', ack);
        resolve(ack);
      })
    })
  }

  const disconnect = () => {

    socketRef.current.disconnect()
  }


  /** createchat for admin dahsboardd */
  /*
  const createChatAdmin = (chatName, type, members) => {
    console.log('creating chat socket service')
    console.log('users are..', members, 'chatname', chatName, 'type', type)
    const obj = {
      chatName,
      type,
      members
    }
 
    console.log("create: ", obj);
 
    socketRef.current.emit("createChatEvent", obj);
  }
  */


  return { createSocketConnection, createChat, incMessageData, newChatData, sendMessage, disconnect }
}

export default SocketService