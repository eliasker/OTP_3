package com.ryhma_3.kaiku.resource_controllers;

import static org.junit.jupiter.api.Assertions.*;

import java.util.ArrayList;

import org.assertj.core.util.Arrays;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.junit.jupiter.params.provider.ValueSource;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;
import org.springframework.test.web.client.ExpectedCount;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;

import com.ryhma_3.kaiku.KaikuApplication;
import com.ryhma_3.kaiku.model.cast_object.ChatObject;
import com.ryhma_3.kaiku.model.cast_object.InitializationObject;
import com.ryhma_3.kaiku.model.cast_object.UserObject;
import com.ryhma_3.kaiku.model.database.IChatDAO;
import com.ryhma_3.kaiku.model.database.IUserDAO;
import com.ryhma_3.kaiku.resource_controllers.exceptions.ValidationFailedException;

@TestMethodOrder(OrderAnnotation.class)
class UserResourceControllerTest {

	static ArrayList<UserObject> allUsers = new ArrayList<UserObject>();
	UserResourceController urc = new UserResourceController();
	
	
	@BeforeAll
	private static void before() {
		KaikuApplication.setUserDAO(new DummyUserDAO());
		KaikuApplication.setChatDAO(new DummyChatDAO());
	}
	
	/**
	 * Test that creating users work
	 */
	@Test
	@Order(1)
	void create1NewUserTest() {
		UserObject res = urc.createUser(new UserObject(null, "ykkönen", "yksi", "y"), "kaiku");
		assertNotNull(res);
		assertEquals("ykkönen", res.getUsername());
		assertNotEquals("yksi", res.getPassword());
	}
	
	/**
	 * Test logging in succesfully
	 */
	@Test
	@Order(2)
	void signInUserTest() {		
		InitializationObject res = urc.getInit(new UserObject(null, "ykkönen", "yksi", null));
		assertNotNull(res);
		assertEquals("ykkönen", res.getUsername());
		assertEquals("ykkönen", res.getUsers()[0].getUsername());
	}
	
	
	@Test
	@Order(3)
	@ParameterizedTest
	@CsvSource({ "kakkonen, yksi", "ykkönen, kaksi" })
	void signInBadCreds(String one, String two) {
		RuntimeException re = assertThrows(ValidationFailedException.class, () -> {
			urc.getInit(new UserObject(null, one, two, null));
		});
		
		assertTrue(re.getClass().equals(ValidationFailedException.class));
	}
	
	
	
	static class DummyChatDAO implements IChatDAO {

		@Override
		public ChatObject[] getChats(String userId) {
			if(userId.equals("abc1")) {
				return new ChatObject[0];
			}
			
			return null;
		}

		@Override
		public ChatObject[] getAllChats() {
			// TODO Auto-generated method stub
			return null;
		}

		@Override
		public ChatObject createChatObject(ChatObject chatObject) {
			// TODO Auto-generated method stub
			return null;
		}

		@Override
		public ChatObject updateChatObject(ChatObject chatObject) {
			// TODO Auto-generated method stub
			return null;
		}

		@Override
		public boolean deleteChatObject(ChatObject chatObject) {
			// TODO Auto-generated method stub
			return false;
		}

		@Override
		public ChatObject getChatObject(ChatObject chatObject) {
			// TODO Auto-generated method stub
			return null;
		}
		
	}
	
	
	static class DummyUserDAO implements IUserDAO {
		
		@Override
		public UserObject createUser(UserObject profileObject) {
			profileObject.setUser_id("abc1");
			allUsers.add(profileObject);
			return new UserObject(profileObject.getUser_id(), profileObject.getUsername(), profileObject.getPassword(), profileObject.getName());
		}

		@Override
		public UserObject updateUser(UserObject profileObject) {
			return null;
		}

		@Override
		public boolean deleteUser(UserObject profileObject) {
			return false;
		}

		@Override
		public UserObject getUser(UserObject profileObject) {
			if(profileObject.getUsername()=="ykkönen") {
				return allUsers.get(0);
			} else {
				return null;
			}
		}

		@Override
		public UserObject[] getAllUsers() {
			UserObject users[] = new UserObject[allUsers.size()];
			users = allUsers.toArray(users);
			return users;
		}
	}
}
