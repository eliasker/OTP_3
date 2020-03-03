import React, { useRef } from 'react';
import socketIOClient from 'socket.io-client';

const socketService = () => {

  var socketRef = null;

  const createSocketConnection = (token) => {
    const socketUrl = 'http://localhost:9991';

    socketRef = socketIOClient.connect(
      socketUrl,
      {query: `Authorization:${token}`}
    )

    socketRef.on('connect', function(data){
      console.log('connect event');
      console.log('connected users: ', data);
    });
    
    socketRef.on('chatEvent', function(data){
      console.log('chatEvent received', data);
    });
    
    socketRef.on('disconnect', function(){
      console.log('disconnect');
    });

    socketRef.on('createChatEvent', function(data){
      console.log('createChatEvent', data);
    })
  }

  const sendMessage = (message, user_id, chat_id) => {
    
    const obj = {
      content: message,
      user_id,
      chat_id
    }

    socketRef.emit("chatEvent", obj);
  }

  const createChat = (chatName, type, users) => {

    const obj = {
      chatName,
      type,
      users
    }

    console.log("create: ", obj);
    

    socketRef.emit("createChatEvent", obj);
  }

  return { createSocketConnection, createChat, sendMessage }
}

export default socketService