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
import com.ryhma_3.kaiku.utility.SecurityTools;

@TestMethodOrder(OrderAnnotation.class)
class UserResourceControllerTest {

	static ArrayList<UserObject> allUsers = new ArrayList<UserObject>();
	UserResourceController urc = new UserResourceController();
	
	
	@BeforeAll
	private static void before() {
		KaikuApplication.setUserDAO(new Dummies().userDAO);
		KaikuApplication.setChatDAO(new Dummies().chatDAO);
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
		allUsers.add(res);
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
	
	
	@Order(3)
	@ParameterizedTest
	@CsvSource({ "kakkonen, yksi", "ykkönen, kaksi" })
	void signInBadCredsTest(String one, String two) {
		RuntimeException re = assertThrows(ValidationFailedException.class, () -> {
			urc.getInit(new UserObject(null, one, two, null));
		});
		
		assertTrue(re.getClass().equals(ValidationFailedException.class));
	}
	
	
	@Test
	@Order(4)
	void getUsersWithTokenTest() {
		UserObject[] users = urc.getUsers(
				SecurityTools.getCloneOfToken(
						allUsers.get(0).getUser_id()).getTokenString());
		assertNotNull(users);
		assertEquals(users[0].getUsername(), allUsers.get(0).getUsername());
	}
	
	
	@Test
	@Order(5)
	void getUsersWithBadTokenTest() {
		RuntimeException re = assertThrows(ValidationFailedException.class, () -> {
			urc.getUsers("absKissaKävelee");
		});
		
		assertTrue(re.getClass().equals(ValidationFailedException.class));
	}
	
	
	@Test
	@Order(6)
	void updateUserTest() {
		UserObject updated = new UserObject(allUsers.get(0).getUser_id(), "kakkonen", "yksi", "y");
		UserObject res = urc.updateUser(
				SecurityTools.getCloneOfToken(updated.getUser_id()).getTokenString()
				, updated);
		
		UserObject fetched = urc.getUsers(SecurityTools.getCloneOfToken(updated.getUser_id()).getTokenString())[0];
		
		assertEquals(updated.getUsername(), res.getUsername());
		assertEquals(fetched.getUsername(), updated.getUsername());
	}
	
	
	@Test
	@Order(7)
	void deleteUserTest() {
		boolean res = urc.deleteUser("kaiku", allUsers.get(0).getUser_id());
		assertTrue(res);
		
		UserObject[] users = urc.getUsers("kaiku");
		assertEquals(users.length, 0);
	}
}
