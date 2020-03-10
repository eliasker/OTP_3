import { useState, useRef } from 'react';
import socketIOClient from 'socket.io-client';

const SocketService = () => {
  //const [socket, setSocket] = useState()
  var socketRef = useRef()

  const createSocketConnection = (token) => {
    const socketUrl = 'http://localhost:9991';

    console.log('token: ', token);

    socketRef.current = socketIOClient.connect(
      socketUrl,
      { query: `Authorization=${token}` }
    )

    socketRef.current.on('connect', function (data) {
      console.log('connect event');
      console.log('connected users: ', data);
    });

    socketRef.current.on('chatEvent', function (data) {
      console.log('chatEvent received', data);
    });

    socketRef.current.on('disconnect', function () {
      console.log('disconnect');
    });

    socketRef.current.on('createChatEvent', function (data) {
      console.log('createChatEvent', data);
    })
    console.log('setting socket to: _socket', socketRef.current)
    //setSocket(_socket);
  }

  const sendMessage = (message, user_id, chat_id) => {

    const obj = {
      content: message,
      user_id,
      chat_id
    }

    socketRef.current.emit("chatEvent", obj);
  }

  const createChat = (chatName, type, users) => {
    console.log('creating chat socket service')
    const obj = {
      chatName,
      type,
      users
    }

    console.log("create: ", obj);

    socketRef.current.emit("createChatEvent", obj);
  }

  return { createSocketConnection, createChat, sendMessage }
}

export default SocketService