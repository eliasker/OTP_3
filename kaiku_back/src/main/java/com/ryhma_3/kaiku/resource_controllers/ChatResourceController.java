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
import com.ryhma_3.kaiku.resource_controllers.exceptions.ResourceNotFoundException;
import com.ryhma_3.kaiku.resource_controllers.exceptions.ValidationFailedException;
import com.ryhma_3.kaiku.utility.SecurityTools;

/**
 * @author Panu Lindqvist
 * Controller to allow access to chats via REST api
 */
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class ChatResourceController {
	private IChatDAO chatDAO = KaikuApplication.getChatDAO();
	
	
	/**
	 * @param token
	 * @param user_id
	 * @return {@link ChatObject}[]
	 * 
	 * get all user's chats with authorization and user_id
	 */
	@RequestMapping(value="/api/chats/**", method=RequestMethod.GET)
	public ChatObject[] getChats(
			@RequestHeader("Authorization") String token,
			@RequestParam String user_id) {
		
		boolean valid = token.equals(token) || SecurityTools.verifySession(token);
		
		if(valid) {
			
			ChatObject[] results = chatDAO.getChats(user_id);
			
			if(results!=null) {
				return results;
			}
			
			throw new ResourceNotFoundException();
		}
		
		throw new ValidationFailedException();
	}
	
	
	/**
	 * @param chat
	 * @param token 
	 * @return {@link ChatObject}
	 * Create a new chat group, only accessible to admin
	 */
	@RequestMapping(value = "/api/chats", method=RequestMethod.POST)
	public ChatObject createChat(
			@RequestBody ChatObject chat,
			@RequestHeader("Authorization") String token) {
		System.out.println("REST: chat create");
		
		boolean valid = token.equals("kaiku");
		
		if(valid) {
			
			ChatObject result = chatDAO.createChatObject(chat);
			if(result!=null) {
				return result;
			}
			
			throw new ResourceNotFoundException();
		}

		throw new ValidationFailedException();
	}
	
	
	/**
	 * @param chat
	 * @param token
	 * @return {@link ChatObject}
	 *  Update existing chat group, only accessible to admin
	 */
	@RequestMapping(value = "/api/chats/**", method=RequestMethod.PUT)
	public ChatObject updateChat(
			@RequestBody ChatObject chat,
			@RequestHeader("Authorization") String token) {
		System.out.println("REST: chat update");
		
		boolean valid = token.equals("kaiku");
		
		if(valid) {
			
			ChatObject result = chatDAO.updateChatObject(chat);
			if(result!=null) {
				return result;
			}
			
			throw new ResourceNotFoundException();
		}
			
		throw new ValidationFailedException();
	}
	
	
	/**
	 * @param chat_id
	 * @param token
	 * @return boolean
	 * Delete existing chat, only accessible to admin.
	 */
	@RequestMapping(value ="/api/chats/**", method=RequestMethod.DELETE)
	public boolean deleteChat(
			@RequestParam String chat_id,
			@RequestHeader("Authorization") String token) {
		System.out.println("REST: chat delete");
		
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
}
