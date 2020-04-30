package com.ryhma_3.kaiku.resource_controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ryhma_3.kaiku.KaikuApplication;
import com.ryhma_3.kaiku.model.cast_object.ChatObject;
import com.ryhma_3.kaiku.model.database.IChatDAO;
import com.ryhma_3.kaiku.model.database.IMessageDAO;
import com.ryhma_3.kaiku.resource_controllers.exceptions.ResourceNotFoundException;
import com.ryhma_3.kaiku.resource_controllers.exceptions.ValidationFailedException;
import com.ryhma_3.kaiku.utility.GlobalChats;
import com.ryhma_3.kaiku.utility.Logger;
import com.ryhma_3.kaiku.utility.SecurityTools;

/**
 * @author Panu Lindqvist
 * REST api for applications go request CHAT data from. This controller takes in and validates http GET, POST, PUT, DELETE requests and uses model.DAOs
 * to manipulate and return data from a database.
 */
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class ChatResourceController {
	private IChatDAO chatDAO = KaikuApplication.getChatDAO();
	private IMessageDAO messageDAO = KaikuApplication.getMessageDAO();
	
	
	/**
	 * get all user's chats with authorization and user_id
	 * @param token {@link String} - http Authorization header
	 * @param user_id {@link String} - http URL parameter
	 * @return {@link ChatObject}[]
	 * @throws ResourceNotFoundException, {@link ResourceNotFoundException}
	 * @throws ValidationFailedException, {@link ValidationFailedException}
	 */
	@RequestMapping(value="/api/chats/**", method=RequestMethod.GET)
	public ChatObject[] getChats(
			@RequestHeader("Authorization") String token,
			@RequestParam String user_id) {
		
		debugger("chats get");
		boolean valid = token.equals("kaiku") || SecurityTools.verifySession(token);
		
		if(valid) {
			
			ChatObject[] results;
			
			if(token.equals("kaiku")) {
				//admin gets all chats
				results = chatDAO.getAllChats();
				
			} else {

				results = chatDAO.getChats(user_id);

			}
			
			for(ChatObject chat : results) {
				
				chat.setMessages(messageDAO.getAllMessages(chat.getChat_id()));
			
			}
						
			if(results!=null) {
				return results;
			}
			
			throw new ResourceNotFoundException();
		}
		
		throw new ValidationFailedException();
	}
	
	
	/**
	 * Create a new chat group, only accessible to admin
	 * @param chat {@link ChatObject} - http request body
	 * @param token {@link String} - http Authorization header
	 * @return {@link ChatObject}
	 * @throws ValidationFailedException, {@link ValidationFailedException}
	 */
	@RequestMapping(value = "/api/chats", method=RequestMethod.POST)
	public ChatObject createChat(
			@RequestBody ChatObject chat,
			@RequestHeader("Authorization") String token) {
		debugger("chat create");
		
		boolean valid = token.equals("kaiku");
		
		if(valid) {
		
			chat.setMessages(null);
			
			ChatObject result = chatDAO.createChatObject(chat);
			if(result!=null) {
				
				KaikuApplication.getServer().sendCreateChatEvent(result);
				return result;
			}
		}

		throw new ValidationFailedException();
	}
	
	
	/**
	 * Update existing chat group, only accessible to admin
	 * @param chat {@link ChatObject} - http request body
	 * @param token {@link String} - http Authorization header
	 * @return {@link ChatObject} 
	 * @throws ResourceNotFoundException, {@link ResourceNotFoundException}
	 * @throws ValidationFailedException, {@link ValidationFailedException}
	 */
	@RequestMapping(value = "/api/chats/**", method=RequestMethod.PUT)
	public ChatObject updateChat(
			@RequestBody ChatObject chat,
			@RequestHeader("Authorization") String token) {
		debugger("chat update");
		
		boolean valid = token.equals("kaiku");
		
		if(valid) {
			
			ChatObject result = chatDAO.updateChatObject(chat);
			if(result!=null) {
				
				//initializing global chat is handled in GlobalChats
				if(result.getType().equals("global"))
					result = GlobalChats.putGlobalChat(result);
		
				return result;
			}
			
			throw new ResourceNotFoundException();
		}
			
		throw new ValidationFailedException();
	}
	
	
	/**
	 * Delete existing chat, only accessible to admin.
	 * @param chat_id {@link String} - http URL parameter
	 * @param token {@link String} - http Authorization header
	 * @return success {@link Boolean}
	 * @throws ResourceNotFoundException, {@link ResourceNotFoundException}
	 * @throws ValidationFailedException, {@link ValidationFailedException}
	 */
	@RequestMapping(value ="/api/chats/**", method=RequestMethod.DELETE)
	public boolean deleteChat(
			@RequestParam String chat_id,
			@RequestHeader("Authorization") String token) {
		debugger("chat delete");
		
		boolean valid = token.equals("kaiku");
		
		if(valid) {
			
			boolean success = chatDAO.deleteChatObject(new ChatObject(chat_id, null, null, null, null));
			if(success) {
				return success;
			}
			
			throw new ResourceNotFoundException();
		}
		
		throw new ValidationFailedException();
	}
	
	private void debugger(String data) {
		Logger.log("CHAT REST: " + data);
	}
}
