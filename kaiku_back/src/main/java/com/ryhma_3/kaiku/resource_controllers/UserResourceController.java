package com.ryhma_3.kaiku.resource_controllers;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.aop.ThrowsAdvice;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ryhma_3.kaiku.KaikuApplication;
import com.ryhma_3.kaiku.model.cast_object.ChatObject;
import com.ryhma_3.kaiku.model.cast_object.InitializationObject;
import com.ryhma_3.kaiku.model.cast_object.MessageObject;
import com.ryhma_3.kaiku.model.cast_object.UserObject;
import com.ryhma_3.kaiku.model.database.IChatDAO;
import com.ryhma_3.kaiku.model.database.IMessageDAO;
import com.ryhma_3.kaiku.model.database.IUserDAO;
import com.ryhma_3.kaiku.resource_controllers.exceptions.BadUserInputException;
import com.ryhma_3.kaiku.resource_controllers.exceptions.ResourceNotFoundException;
import com.ryhma_3.kaiku.resource_controllers.exceptions.ValidationFailedException;
import com.ryhma_3.kaiku.utility.GlobalChats;
import com.ryhma_3.kaiku.utility.Logger;
import com.ryhma_3.kaiku.utility.SecurityTools;


/**
 * @author Panu Lindqvist
 * REST api for applications go request USER data from. This controller takes in and validates http GET, POST, PUT, DELETE requests and uses model.DAOs
 * to manipulate and return data from a database.
 */
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class UserResourceController {
	private IChatDAO chatDAO = KaikuApplication.getChatDAO();
	private IMessageDAO messageDAO = KaikuApplication.getMessageDAO();
	private IUserDAO userDAO = KaikuApplication.getUserDAO();
	
	public UserResourceController() {
	}
	
	
	/**
	 * Request invoked when user starts a session. This entry point compiles all necessary data needed to initialize front end application.
	 * @param user {@link UserObject} - http request body
	 * @return initializationObject {@link InitializationObject}
	 * @throws ValidationFailedException , {@link ValidationFailedException}
	 */
	@RequestMapping(value = "/api/users/**", method=RequestMethod.POST)
	public InitializationObject getInit(@RequestBody UserObject user) {
		debugger("REST: login");

		String username = user.getUsername();
		String password = user.getPassword();

		boolean valid = false;
		
		/*
		 * Get user with matching username from database. COmpare encrypted password with one submitted
		 */
	    UserObject userFromDb = userDAO.getUser(new UserObject(null, username, null ,null));
	    
	    if(userFromDb!=null) {	    
	    	valid = SecurityTools.compare(userFromDb.getPassword(), password) ? true : false;
	    }
		
		if (valid) {
			/*
			 * complete user info
			 */
			String user_id = userFromDb.getUser_id();
			String name = userFromDb.getName();

			
			/*
			 * Generate token, get token String
			 */
			String tokenString = SecurityTools.createOrUpdateToken(user_id).getTokenString();
			debugger("created token: " + tokenString);
		

			/*
			 * Gather chats, remove deleted or archived
			 * CHATS don't have to have messages at this point!!!
			 */
    		ChatObject[] chats = chatDAO.getChats(userFromDb.getUser_id());
    		
    		for(int i=0; i<chats.length; i++) {
    			String type = chats[i].getType();
    			if( !(type.equals("global") || type.equals("private") || type.equals("group"))) {
    				chats[i] = null;
    			}
    		}
    		    		

			/*
			 * Get and put all messages to chats
			 */
			for (int i = 0; i < chats.length; i++) {
				if(chats[i] != null) {
	    			MessageObject[] messages = messageDAO.getAllMessages(chats[i].getChat_id());
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
			InitializationObject init = new InitializationObject(user_id, name, username, tokenString, chats, users);

			return init;

		} 
		
		throw new ValidationFailedException();
	}
	

	/**
	 * Validate sent token and create a new user from Request body. Return nothing;
	 * @param userObject {@link UserObject} - http request body
	 * @param token {@link String} - http Authorization header
	 * @throws ValidationFailedException, {@link ValidationFailedException}
	 * @throws BadUserInputException, {@link BadUserInputException}
	 */
	@RequestMapping(value = "/api/users", method=RequestMethod.POST)
	public UserObject createUser(
			@RequestBody UserObject userObject, 
			@RequestHeader("Authorization") String token) {
		debugger("create user");
		
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
			
			if(userObject == null) {
				throw new BadUserInputException();
			}
			
			/*			 
			 * add user to global chat
			 */
			GlobalChats.addMemberToGlobals(userObject);
						
			userObject.setPassword("");
			
			return userObject;

		} 
		
		throw new ValidationFailedException();
	}
	
	
	/**
	 * Submit token as request header to receive an array (JS object after JSON back-and-forth convert) of all user objects. (Without private info!),
	 * @param token {@link String} - http Authorization header
	 * @return userObjects[] {@link UserObject}[]
	 * @throws ValidationFailedException, {@link ValidationFailedException}
	 */
	@RequestMapping(value="/api/users", method=RequestMethod.GET)
	public UserObject[] getUsers(
			@RequestHeader("Authorization") String token){
		debugger("get users");
		
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
	 * Submitting a token and replace-values, client can change user's properties.
	 * @param token {@link String} - http Authorization header
	 * @param user {@link UserObject} - http request body
	 * @return user {@link UserObject}
	 * @throws ResourceNotFoundException, {@link ResourceNotFoundException}
	 * @throws ValidationFailedException, {@link ValidationFailedException}
	 */
	@RequestMapping(value="/api/users", method=RequestMethod.PUT)
	public UserObject updateUser(
			@RequestHeader("Authorization") String token,
			@RequestBody UserObject user) {
		debugger("update user");
		
		boolean valid = SecurityTools.verifySession(token);
		
		if(valid) {
			
			user.setPassword(SecurityTools.encrypt(user.getPassword()));
			
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
	 * Submitting admin token with DELETE request, users can be removed form this service.
	 * @param token {@link String} - http Authorization header
	 * @param user_id {@link String} - http URL parameter
	 * @return success {@link Boolean}
	 * @throws ResourceNotFoundException, {@link ResourceNotFoundException}
	 * @throws ValidationFailedException, {@link ValidationFailedException}
	 */
	@RequestMapping(value="/api/users/**", method=RequestMethod.DELETE)
	public boolean deleteUser(
			@RequestHeader("Authorization") String token,
			@RequestParam String user_id){
		debugger("delete user");
		
		boolean valid = token.equals("kaiku");
		
		if(valid) {
			
			debugger("id: " + user_id);
			
			//delete user
			boolean success = userDAO.deleteUser(new UserObject(user_id, null, null ,null));
			
			//remove user from chats
			ChatObject[] chats = chatDAO.getChats(user_id);
			for(ChatObject c : chats) {
				
				//if chat has less than 3 members
				if(c.getType().equals("private")) {
					chatDAO.deleteChatObject(c);
				}
				
//				if chat has over 2 members
				List<String> old = Arrays.asList(c.getMembers());
				List<String> updated = 
						old.stream()
						.filter(id -> !id.equals(user_id))
						.collect(Collectors.toList());
				c.setMembers(updated.toArray(new String[0]));
				chatDAO.updateChatObject(c);
			}
			
			//remove token
			SecurityTools.removeToken(user_id);
			
			if(!success) {
				throw new ResourceNotFoundException();
			}
			return success;
		}
		
		throw new ValidationFailedException();
	}
	
	
	private void debugger(String data) {
		Logger.log("USER REST: " + data);
	}
	
}
