package com.ryhma_3.kaiku.utility;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

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
	 * Test comparing corect psw
	 */
	@Test
	void correctPSWCompare(){
		String psw = "kaiku";
		String crypted = SecurityTools.encrypt(psw);
		
		assertEquals(SecurityTools.compare(crypted, psw), true);
	}
	
	//test false password
	
	//create a token
	
	//update token
	
	//get token with user_id
	
	//get token with tokenString
	
	//get token with bad parameter
	
	//connect to UUID
	
	//test thread-safety
	
}
