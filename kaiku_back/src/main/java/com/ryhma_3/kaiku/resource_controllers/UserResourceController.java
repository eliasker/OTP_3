package com.ryhma_3.kaiku.resource_controllers;

import java.util.Arrays;
import java.util.Date;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.yaml.snakeyaml.util.ArrayUtils;

import com.ryhma_3.kaiku.KaikuApplication;
import com.ryhma_3.kaiku.model.cast_object.ChatObject;
import com.ryhma_3.kaiku.model.cast_object.InitializationObject;
import com.ryhma_3.kaiku.model.cast_object.MessageObject;
import com.ryhma_3.kaiku.model.cast_object.UserObject;
import com.ryhma_3.kaiku.model.database.ChatDAO;
import com.ryhma_3.kaiku.model.database.IChatDAO;
import com.ryhma_3.kaiku.model.database.IMessageDAO;
import com.ryhma_3.kaiku.model.database.IUserDAO;
import com.ryhma_3.kaiku.model.database.UserDAO;
import com.ryhma_3.kaiku.resource_controllers.exceptions.ResourceNotFoundException;
import com.ryhma_3.kaiku.resource_controllers.exceptions.ValidationFailedException;
import com.ryhma_3.kaiku.utility.SecurityTools;
import com.ryhma_3.kaiku.utility.Token;

import ch.qos.logback.core.encoder.EchoEncoder;

/**
 * AccountController
 */
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class UserResourceController {
	private IChatDAO chatDAO = KaikuApplication.getChatDAO();
	private IMessageDAO messageDAO = KaikuApplication.getMessageDAO();
	private IUserDAO userDAO = KaikuApplication.getUserDAO();
	
	
	/**
	 * @param user
	 * @return {@link InitializationObject} or fail 400
	 * Request invoked when user starts a session. This entry point compiles all necessary data needed to initialize front end application.
	 */
	@RequestMapping(value = "/api/users/**", method=RequestMethod.POST)
	public InitializationObject getInit(@RequestBody UserObject user) {
		System.out.println("REST: login");

		String username = user.getUsername();
		String password = user.getPassword();
		
		System.out.println("creds: " + username + "  " + password);

		/*
		 * Get user with matching username from database. COmpare encrypted password with one submitted
		 */

	    UserObject userFromDb = userDAO.getUser(new UserObject(null, username, null ,null));
		boolean valid = SecurityTools.compare(userFromDb.getPassword(), password) ? true : false;
		
		if (valid) {
			/*
			 * complete user info
			 */
			String user_id = userFromDb.get_Id();
			String name = userFromDb.getName();
			boolean online = true;

			
			/*
			 * Generate token, get token String
			 */
			String tokenString = SecurityTools.createOrUpdateToken(user_id).getTokenString();
			System.out.println("created token: " + tokenString);
		

			/*
			 * Gather chats, remove deleted or archived
			 * CHATS don't have to have messages at this point!!!
			 */
    		ChatObject[] chats = chatDAO.getChats(userFromDb.get_Id());
    		
    		for(int i=0; i<chats.length; i++) {
    			if( !(chats[i].getType().equals("private") || chats[i].getType().equals("group") || chats[i].equals("global"))) {
    				chats[i] = null;
    			}
    		}
    		    		

			/*
			 * Get and put all messages to chats
			 */
			for (int i = 0; i < chats.length; i++) {
				if(chats[i] != null) {
	    			MessageObject[] messages = messageDAO.getAllMessages(userFromDb.get_Id());
					chats[i].setMessages(messages);
				}
			}

			
			/*
			 * Get list of users & erase passwords
			 */
    		UserObject[] users = userDAO.getAllUsers();
    		
			for (int i = 0; i < users.length; i++) {
				users[i].setPassword("");
			}

			
			
			/*
			 * Construct a InitialObject
			 */
			InitializationObject init = new InitializationObject(user_id, name, username, tokenString, online, chats, users);

			return init;

		} 
		
		throw new ValidationFailedException();
	}
	

	/**
	 * @param userObject - user info
	 * @param token - token for authorization
	 * Validate sent token and create a new user from Request body. Return nothing;
	 */
	@RequestMapping(value = "/api/users", method=RequestMethod.POST)
	public UserObject createUser(
			@RequestBody UserObject userObject, 
			@RequestHeader("Authorization") String token) {
		System.out.println("REST: create user");
		
		/*
		 * Compare token and token storage
		 */
		boolean valid = token.equals("kaiku");
		
		if(valid) {
			
			/*
			 * enrcypt password
			 */
			userObject.setPassword(SecurityTools.encrypt(userObject.getPassword()));
			
			
			/*
			 * post user to db
			 */
			userObject = userDAO.createUser(userObject);
			
			
			/*			 
			 * add user to global chat
			 */
			ChatObject global = chatDAO.getChatObject(new ChatObject(null, "global", null, null, null));
			String[] users = Arrays.copyOf(global.getMembers(), global.getMembers().length + 1);
			users[users.length-1] = userObject.get_Id();
			global.setMembers(users);
			
			chatDAO.updateChatObject(global);
			
			userObject.setPassword("");
			
			return userObject;
			
		} 
		
		throw new ValidationFailedException();
	}
	
	
	/**
	 * @param token
	 * @return {@link UserObject}[]
	 * With admin token, get all users
	 */
	@RequestMapping(value="/api/users", method=RequestMethod.GET)
	public UserObject[] getUsers(
			@RequestHeader("Authorization") String token){
		System.out.println("REST: get users");
		
		/*
		 * compare token with token storage
		 */
		boolean valid = token.equals("kaiku") || SecurityTools.verifySession(token);
		
		if(valid) {
		
			UserObject[] users = userDAO.getAllUsers();
			
			if(users != null) {
				for(UserObject user : users) {
					user.setPassword("");
				}
				
				return users;
			}
		}
		
		throw new ValidationFailedException();
	}
	
	
	/**
	 * @param token
	 * @param user
	 * @return {@link UserObject}
	 * Logged in user can send request to change their user information
	 */
	@RequestMapping(value="/api/users", method=RequestMethod.PUT)
	public UserObject updateUser(
			@RequestHeader("Authorization") String token,
			@RequestBody UserObject user) {
		System.out.println("REST: update user");
		
		boolean valid = SecurityTools.verifySession(token);
		
		if(valid) {
			
			UserObject result = userDAO.updateUser(user);
			
			if(result != null) {
				result.setPassword("");
				return result;
			}
			
			throw new ResourceNotFoundException();
		}
		
		throw new ValidationFailedException();
	}
	
	
	/**
	 * @param token
	 * @param user_id
	 * @return boolan
	 * With admin token, delete a user
	 */
	@RequestMapping(value="/api/users/**", method=RequestMethod.DELETE)
	public boolean deleteUser(
			@RequestHeader("Authorization") String token,
			@RequestParam String user_id){
		System.out.println("REST: delete user");
		
		boolean valid = token.equals("kaiku");
		
		if(valid) {
			
			System.out.println("id: " + user_id);
			
			boolean success = userDAO.deleteUser(new UserObject(user_id, null, null ,null));
			
			if(!success) {
				throw new ResourceNotFoundException();
			}
			
			return success;
		}
		
		throw new ValidationFailedException();
	}
	
}
