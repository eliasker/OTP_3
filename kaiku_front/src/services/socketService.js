import { useRef, useState } from 'react';
import socketIOClient from 'socket.io-client';
import config from '../util/config'

const SocketService = () => {
  var socketRef = useRef()
  const [incMessageData, setIncMsgData] = useState(null)
  var loggedUserID = useRef()
  const [newChatData, setNewChatData] = useState(null)
  const [initUsersOnline, setInitUsersOnline] = useState(null)

  const createSocketConnection = (token, id) => {
    const socketUrl = config.SOCKETURI;
    loggedUserID = id

    //var address = window.location.protocol + '//' + window.location.host;  
    //var details = {  
      //resource: (window.location.pathname.split('/').slice(0, -1).join('/') + '/socket.io').substring(1)  
    //};  

    socketRef.current = socketIOClient.connect(
      //address, details,
      socketUrl,
      { query: `Authorization=${token}`, secure: false, rejectUnauthorized: false }
    )

    socketRef.current.on('connect', function (data) {
     if (data !== undefined) setInitUsersOnline(data)
    })

    socketRef.current.on('chatEvent', function (data) {
      if (loggedUserID === data.user_id) return
      setIncMsgData(data)
      setIncMsgData(null)
    })

    /**
     * data has values user_id and online
     */
    socketRef.current.on('connectionEvent', function (data) {
      console.log('user: ', data.user_id, 'isOnline=', data.online);
    })

    socketRef.current.on('disconnect', function (data) {
      console.log('disconnect', data);
    })

    socketRef.current.on('createChatEvent', function (data) {
      setNewChatData(data)
    })
  }

  const sendMessage = (message, user_id, chat_id) => {
    const obj = {
      content: message.content,
      user_id,
      chat_id
    }

    socketRef.current.emit('chatEvent', obj);
  }

  const createChat = (chatName, type, members, messages) => {
    return new Promise((resolve, reject) => {
      const obj = {
        chatName,
        type,
        members,
        messages
      }
      socketRef.current.emit('createChatEvent', obj, function (ack) {
        resolve(ack);
      })
    })
  }

  const disconnect = () => socketRef.current.disconnect()

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


  return { createSocketConnection, createChat, incMessageData, initUsersOnline, newChatData, sendMessage, disconnect }
}

export default SocketService