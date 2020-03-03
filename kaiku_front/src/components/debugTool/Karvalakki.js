import React from 'react';
import userService from '../../services/userService'
import socketService from '../../services/socketService'


const Karvalakki = () => {

  const { createSocketConnection, createChat, sendMessage } = socketService();

  const init = {
    "users": [
      {
        "name": "Marko",
        "username": "MarkoM",
        "password": "asdsaff",
        "id": "1"
      },
      {
        "name": "Mirka",
        "username": "mirka-kissa",
        "password": "asgakikk",
        "id": "2"
      },
      {
        "name": "Makedius",
        "username": "suidekaM",
        "password": "asijafj",
        "id": "3"
      },
      {
        "name": "markus",
        "username": "xXxmaRkUsxXx",
        "password": "lkjökkpko",
        "id": "4"
      },
      {
        "name": "Mikko",
        "username": "mixu666",
        "password": "uihiehaf",
        "id": "5"
      },
      {
        "name": "Make",
        "username": "maKKKe",
        "password": "wrtwqqqtwt",
        "id": "6"
      }
    ],
    "chats": [
      {
        "name": "Hissichat",
        "id": "0",
        "type": "global",
        "members": [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6"
        ],
        "messages": [
          {
            "content": "hei",
            "id": "1",
            "user_id": "1"
          },
          {
            "content": "vastaus1",
            "id": "2",
            "user_id": "6"
          },
          {
            "content": "heippa",
            "id": "3",
            "user_id": "2"
          },
          {
            "content": "moi taas",
            "id": "4",
            "user_id": "3"
          },
          {
            "content": "vastaus2",
            "id": "5",
            "user_id": "6"
          },
          {
            "content": "vastaus3",
            "id": "6",
            "user_id": "6"
          },
          {
            "content": "juuhjooh",
            "id": "7",
            "user_id": "4"
          },
          {
            "content": "vastaus4",
            "id": "8",
            "user_id": "6"
          }
        ]
      },
      {
        "name": "ROFL",
        "id": "1",
        "type": "group",
        "members": [
          "1"
        ],
        "messages": [
  
        ]
      },
      {
        "name": "",
        "id": "2",
        "type": "private",
        "members": [
          "1", "2"
        ],
        "messages": [
          {
            "content": "moro t.mirka",
            "id": "1",
            "user_id": "2"
          },
          {
            "content": "hei t.maro",
            "id": "2",
            "user_id": "1"
          }
        ]
      }
    ]
  }

  var initKontsa = null;
  var users = [];

  const initialize = async() => {

    init.users.forEach(async(user) => {
      users = users.concat(userService.createUser(user.username, user.password, user.name));
    })
    
    console.log(users);
    

    initKontsa = await userService.login(init.users[0].username, init.users[0].password);

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
    /*
    initUsers.forEach((user) => {
      //userService.createUser(user.username, user.password, user.name, null);
    })
    */
  }

  const handleSignIn = async() => {

    const index = Math.floor(Math.random(users.length));

    initKontsa = userService.login(
      users[index].username,
      users[index].password
    )

    console.log(initKontsa);
  }

  return(
    <div>
      <button onClick={() => handleSignIn()}>sign in random</button>
      <button onClick={() => handleCreateUsers()}>create test users</button>
      <button onClick={() => initialize()} >Init database</button>
    </div>
  )

}

export default Karvalakki;