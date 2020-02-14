package com.ryhma_3.kaiku.resource_controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ryhma_3.kaiku.model.cast_object.ChatObject;
import com.ryhma_3.kaiku.model.cast_object.InitializationObject;
import com.ryhma_3.kaiku.model.cast_object.MessageObject;
import com.ryhma_3.kaiku.model.cast_object.UserObject;
import com.ryhma_3.kaiku.model.database.UserDAO;

/**
 * AccountController
 */
@RestController
public class UserResourceController {

	// private UserDAO accountsDAO = new UserDAO();

	/**
	 * @param user
	 * @return InitializationObject or fail 400
	 * Request invoked when user starts a session. This entry point compiles all necessary data needed to initialize front end application.
	 */
	@GetMapping("/users")
	public InitializationObject getInit(@RequestBody UserObject user) {

		String username = user.getUsername();
		String password = user.getPassword();
		// check user credentials

		// get user
//	    	UserObject user = UserDAO.getUser(username);
		UserObject userFromDb = new UserObject("213132", username, password, "pena");

		if (user.getUsername() == userFromDb.getUsername() && user.getPassword() == userFromDb.getPassword()) {

			/*
			 * complete user info
			 */
			String user_id = userFromDb.get_Id();
			String name = userFromDb.getName();
			String token = "kaiku";
			boolean online = true;

			/*
			 * CHATS don't have to have messages at this point!!!
			 */
//	    		ChatObject[] chats = ChatDAO.getChats(userFromDb.get_Id());	    		

			ChatObject chat = new ChatObject("12312", null, null, null);
			ChatObject[] chats = { chat };

			/*
			 * Get and put all messages to chats
			 */
			for (int i = 0; i < chats.length; i++) {

//	    			MessageObject[] messages = MessageDAO.getMessages(userFromDb.get_Id());

				MessageObject message = new MessageObject("adsas", "sadd", "asd");
				MessageObject message2 = new MessageObject("baba", "asd", "kakaka");
				MessageObject[] messages = { message, message2 };
				chats[i].setMessages(messages);
			}

			/*
			 * Get list of users
			 */
//	    		UserObject[] users = UserDAO.getAllUsers();

			UserObject user1 = new UserObject("12312", "kake", "keh keh", "kartsa");
			UserObject user2 = new UserObject("24135", "toto", "africa", "tortelliini");
			UserObject[] users = { user1, user2 };

			/*
			 * Eliminate passwords
			 */
			for (int i = 0; i < users.length; i++) {
				users[i].setPassword(null);
			}

			/*
			 * Construct a InitialObject
			 */
			InitializationObject init = new InitializationObject(user_id, name, username, token, online, chats, users);

			return init;

		} else {
			/*
			 * fail with 400
			 */
			return null;
		}
	}
	

	/**
	 * @param userObject - user info
	 * @param token - token for authorization
	 * Validate sent token and create a new user from Request body. Return nothing;
	 */
	@PostMapping("/users")
	public void createUser(@RequestBody UserObject userObject, @RequestParam(value="token") String token) {
		
		/*
		 * Compare token and token storage
		 */
		boolean valid = token=="kaiku" ? true : false;
		
		if(valid) {
			
			/*
			 * post user to mongo
			 */
//			UserDAO.createUser(userObject);
			
			return;
		} else {
			
			/*
			 * fail 400 or 401
			 */
			return;
		}
	}
}
