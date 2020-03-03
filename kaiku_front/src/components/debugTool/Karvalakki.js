import React from 'react';
import userService from '../../services/userService'
import init from '../debugTool/init';

const Karvalakki = () => {

  const init = {
    "users": [
      {
        "name": "Marko",
        "username": "MarkoM",
        "id": "1"
      },
      {
        "name": "Mirka",
        "username": "mirka-kissa",
        "id": "2"
      },
      {
        "name": "Makedius",
        "username": "suidekaM",
        "id": "3"
      },
      {
        "name": "markus",
        "username": "xXxmaRkUsxXx",
        "id": "4"
      },
      {
        "name": "Mikko",
        "username": "mixu666",
        "id": "5"
      },
      {
        "name": "Make",
        "username": "maKKKe",
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

  const userTemplate = (uName, uPSW, name) =>  ({username: uName, password: uPSW, name:name})
  const initUsers = [userTemplate('tester1', 'tester1', 'tester1'), userTemplate('tester2', 'tester2', 'tester2')];

  const initDatabase = () => {
    init.users.forEach((user) => {
      userService.createUser(user.username, user.password, user.name);
    })
  }

  const handleCreateUsers = () => {
    initUsers.forEach((user) => {
      //userService.createUser(user.username, user.password, user.name, null);
    })
  }

  const handleSignIn = () => {
    userService.login(
      //initUsers[0].username,
     // initUsers[0].password
    )
  }

  return(
    <div>
      <button onClick={() => handleSignIn()}>sign in</button>
      <button onClick={() => handleCreateUsers()}>create test users</button>
      <button onClick={() => initDatabase()} >Init database</button>
    </div>
  )

}

export default Karvalakki;