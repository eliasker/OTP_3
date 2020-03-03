import React from 'react';
import userService from '../../services/userService'
import socketService from '../../services/socketService'
import init from './init'


const Karvalakki = () => {

  const { createSocketConnection, createChat, sendMessage } = socketService();

  var initKontsa = null;
  var users = [];

  const initialize = async() => {
    
    console.log(users);
    
    createSocketConnection(await initKontsa.token);

    init.chats.forEach((chat) => {
      let member1 = Math.floor(Math.random() * (users.length - 1)) + 1;
      let member2 = 0;

      console.log(member1, member2);

      const _chat = createChat(
        chat.name,
        "private",
        [
          users[member1],
          users[member2]
        ]
      )

      init.chats.concat(_chat);
    })

    console.log(initKontsa);
    
  }

  const handleCreateUsers = () => {
    init.users.forEach(async (user) => {
      users = users.concat(await userService.createUser(user.username, user.password, user.name));
    })
  }

  const handleSignIn = async() => {

    const index = Math.floor(Math.random() * users.length);

    console.log("users: ", users[index]);


    initKontsa = await userService.login(
      users[index].username,
      users[index].password
    )  
    console.log(initKontsa);
  }

  const handleGetAllUser = async() => {
    users = await userService.getAllUsers()
  }

  return(
    <div>
      <button onClick={() => handleCreateUsers()}>1. create test users</button>
      <button onClick={() => handleGetAllUser()}> 1(opt) get all users</button>
      <button onClick={() => handleSignIn()}>2. sign in random</button>
      <button onClick={() => initialize()} >3. Init socket</button>
    </div>
  )

}

export default Karvalakki;