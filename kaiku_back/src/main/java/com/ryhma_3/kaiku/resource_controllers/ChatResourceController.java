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

/**
 * @author Panu Lindqvist
 * Controller to allow access to chats via REST api
 */
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class ChatResourceController {
	private IChatDAO chatDAO = KaikuApplication.getChatDAO();
	
	
	@RequestMapping(value = "/api/chats/**", method=RequestMethod.PUT)
	public ChatObject updateChat(
			@RequestBody ChatObject chat,
			@RequestHeader("Authorization") String token) {
		System.out.println("REST: chat update");
		
		boolean valid = token.equals("kaiku");
		
		if(valid) {
			
			ChatObject result = chatDAO.updateChatObject(chat);
			return result;
			
		}
		
		return null;
	}
	
	
	@RequestMapping(value = "/api/chats", method=RequestMethod.POST)
	public ChatObject createChat(
			@RequestBody ChatObject chat,
			@RequestHeader("Authorization") String token) {
		System.out.println("REST: chat create");
		
		boolean valid = token.equals("kaiku");
		
		if(valid) {
			
			ChatObject result = chatDAO.createChatObject(chat);
			return result;
			
		}
		
		return null;
	}
	
	
	@RequestMapping(value ="/api/chats/**", method=RequestMethod.DELETE)
	public boolean deleteChat(
			@RequestParam String chat_id,
			@RequestHeader("Authorization") String token) {
		System.out.println("REST: chat delete");
		
		boolean valid = token.equals("kaiku");
		
		if(valid) {
			
			boolean success = chatDAO.deleteChatObject(new ChatObject(chat_id, null, null, null, null));
			return success;
			
		}
		
		return false;
	}
}
