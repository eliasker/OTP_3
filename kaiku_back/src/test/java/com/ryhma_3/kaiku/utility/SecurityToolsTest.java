package com.ryhma_3.kaiku.utility;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

class SecurityToolsTest {


	/**
	 * Test that password comes out from encryption
	 */
	@Test
	void passwordDigestTest() {
		String password = "kaiku";
		String crypted = SecurityTools.encrypt(password);
		boolean success = true;
		if(crypted == password) { success = false; }
		if(crypted == null) { success = false; }
		if(crypted == "") { success = false; }
		assert(success);
	}
	
	
	
	/**
	 * @param input
	 * Test comparing to correct psw
	 */
	@ParameterizedTest
	@ValueSource(strings = {"max", "Payne", "kick ass and chew bubblegum"})
	void correctPSWTest(String input){
		String psw = input;
		String crypted = SecurityTools.encrypt(psw);
		
		assertEquals(SecurityTools.compare(crypted, psw), true);
	}
	
	
	/**
	 * @param input
	 * test comparing to incorrect psw
	 */
	@ParameterizedTest
	@ValueSource(strings = {"donger", "box", "avant garde"})
	void falsePSWTest(String input) {
		String psw = input;
		String crypted = SecurityTools.encrypt("kaiku");
		
		assertEquals(false, SecurityTools.compare(crypted, psw));
	}
	
	
	/**
	 * test creating a new token
	 */
	@Test
	void createTokenTest() {
		String user_id = "12345";
		String tokenString = "ABCDEFG";
		
		Token token = SecurityTools.createOrUpdateToken(user_id, tokenString);
		
		assertEquals(user_id, token.getUser_id());
		assertEquals(tokenString, token.getTokenString());
		assertEquals(null, token.getSessionID());
	}
	
	
	/**
	 * test updating tokenString
	 */
	@Test
	void updateTokenTest() {
		String user_id = "12345";
		String tokenString = "ABCDEFG";
		
		Token token = SecurityTools.createOrUpdateToken(user_id, "kaiku");
		assertEquals("kaiku", token.getTokenString());
	}
	
	
	@ParameterizedTest
	@ValueSource(strings = {"112911", "uniqueString"})
	void getTokenTest(String input) {
		Token token = SecurityTools.createOrUpdateToken("112911", "uniqueString");
			
		Token searchedToken = SecurityTools.getCloneOfToken(input);
		assertEquals(token.getTokenString(), searchedToken.getTokenString());
	}
	
	//get token with tokenString
	
	//get token with bad parameter
	
	//connect to UUID
	
	//test thread-safety
	
}
