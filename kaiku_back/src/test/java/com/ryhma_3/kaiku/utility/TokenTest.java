package com.ryhma_3.kaiku.utility;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

class TokenTest {

	@Test
	void cloneTest() {
		Token token = new Token(null, "123" , "kaiku");
		
		Token clone = new Token(token);
		
		assertEquals(token.getUser_id(), clone.getUser_id());
		assertEquals(token.getSessionID(), clone.getSessionID());
		assertEquals(token.getTokenString(), clone.getTokenString());
	}

}
