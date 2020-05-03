package com.ryhma_3.kaiku.resource_controllers;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import org.junit.jupiter.api.Order;
import org.junit.runner.RunWith;

import com.ryhma_3.kaiku.KaikuApplication;
import com.ryhma_3.kaiku.model.cast_object.ChatObject;
import com.ryhma_3.kaiku.model.cast_object.UserObject;
import com.ryhma_3.kaiku.resource_controllers.exceptions.ResourceNotFoundException;
import com.ryhma_3.kaiku.resource_controllers.exceptions.ValidationFailedException;
import com.ryhma_3.kaiku.utility.SecurityTools;

@TestMethodOrder(OrderAnnotation.class)
class ChatResourceControllerTest {

	ChatResourceController crc = new ChatResourceController();
	UserResourceController urc = new UserResourceController();
	
	UserObject testUser = null;
	
	@BeforeAll
	private static void before() {
		KaikuApplication.setChatDAO(new Dummies().chatDAO);
		KaikuApplication.setUserDAO(new Dummies().userDAO);
		KaikuApplication.setServer(new Dummies().server);
	}
	
	@BeforeEach
	private void each() {
		KaikuApplication.setUserDAO(new Dummies().userDAO);
		KaikuApplication.setChatDAO(new Dummies().chatDAO);
		
		testUser = urc.createUser(new UserObject(null, "testaaja", "testi", "t"), "kaiku");
		testUser.setPassword("testi");
		urc.getInit(testUser);	//Generate token
	}
	
	
	@Test
	@Order(1)
	void createNewTest() {
		ChatObject chat = new ChatObject(null, "chat", "private", new String[] {"u1", "u2"}, null);
		ChatObject res = crc.createChat(chat, "kaiku");
	
		assertEquals(chat.getChatName(), res.getChatName());
	}
	
	
	@Test
	@Order(2)
	void fetchChatAsUserTest() {
		ChatObject chat = crc.createChat(
				new ChatObject(null, "chat", "private", new String[] {testUser.getUser_id(), "u2"}, null)
				, "kaiku");
		
	}
	
	
	@Test
	@Order(3)
	void fetchChatBadValuesTest() {
		RuntimeException re = assertThrows(ValidationFailedException.class,	() -> {
			crc.getChats("notToken", testUser.getUser_id());
		});
		
		assertTrue(re.getClass().equals(ValidationFailedException.class));
		
		
		RuntimeException rex = assertThrows(ResourceNotFoundException.class, () -> {
			crc.getChats(
					SecurityTools.getCloneOfToken(testUser.getUser_id()).getTokenString() 
					, "notID"
			);
		});
		
		assertTrue(rex.getClass().equals(ResourceNotFoundException.class));
	}
	
	
	@Test
	@Order(4)
	void updateChatTest() {
		ChatObject target = crc.createChat(
				new ChatObject(null, "chatti", "group", new String[] {testUser.getUser_id(), "asdf", "gsdfs"}, null)
				, "kaiku"
				);
				
		ChatObject result = crc.updateChat(new ChatObject(
				target.getChat_id(), "uusiNimi", target.getType(), target.getMembers(), null)
				, "kaiku"
				);
		
		assertTrue(target.getMembers()[0].equals(result.getMembers()[0]));
		assertNotEquals(target.getChatName(), result.getChatName());
	}
	
	
	@Test
	@Order(5)
	void deleteChatTest() {
		ChatObject target = crc.createChat(
				new ChatObject("asdf", "chatti", "group", new String[] {testUser.getUser_id(), "asdf", "gsdfs"}, null)
				, "kaiku"
				);
		
		crc.deleteChat(target.getChat_id(), "kaiku");
	}

}
