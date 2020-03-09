import React, { useState } from 'react';
import socketIOClient from 'socket.io-client';

const SocketService = () => {

  const [socket, setSocket] = useState()

  const createSocketConnection = (token) => {
    const socketUrl = 'http://localhost:9991';

    console.log('token: ', token);

    const _socket = socketIOClient.connect(
      socketUrl,
      { query: `Authorization=${token}` }
    )

    _socket.on('connect', function (data) {
      console.log('connect event');
      console.log('connected users: ', data);
    });

    _socket.on('chatEvent', function (data) {
      console.log('chatEvent received', data);
    });

    _socket.on('disconnect', function () {
      console.log('disconnect');
    });

    _socket.on('createChatEvent', function (data) {
      console.log('createChatEvent', data);
    })
    console.log('_socket', _socket)
    setSocket(_socket);
  }

  const sendMessage = (message, user_id, chat_id) => {

    const obj = {
      content: message,
      user_id,
      chat_id
    }

    socket.emit("chatEvent", obj);
  }

  const createChat = (chatName, type, users) => {
    console.log('creating chat socket service')
    const obj = {
      chatName,
      type,
      users
    }

    console.log("create: ", obj);
    console.log(socket)

    socket.emit("createChatEvent", obj);
  }

  return { createSocketConnection, createChat, sendMessage }
}

export default SocketService