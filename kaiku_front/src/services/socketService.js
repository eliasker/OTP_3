import { useRef, useState } from 'react';
import socketIOClient from 'socket.io-client';

const SocketService = () => {
  var socketRef = useRef()
  const [latestMessage, setLatesMessage] = useState([null])
  var loggedUserID = useRef()

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
      console.log('chatEvent received', data);
      setLatesMessage(data)
    });

    /**
     * @param data object { id: String, loggedIn: false }
     */
    socketRef.current.on('disconnect', function (data) {

      console.log('disconnect');
    });

    socketRef.current.on('createChatEvent', function (data) {
      console.log('createChatEvent', data);
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
    console.log('creating chat socket service')
    console.log('users are..', members, 'chatname', chatName, 'type', type)
    const obj = {
      chatName,
      type,
      members,
      messages
    }

    console.log('create: ', obj);

    socketRef.current.emit('createChatEvent', obj);
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


  return { createSocketConnection, createChat, latestMessage, sendMessage, disconnect }
}

export default SocketService