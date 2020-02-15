package com.ryhma_3.kaiku.utility;

import java.util.UUID;

/**
 * @author Stack Overflow
 * @param <F>
 * @param <S>
 * @param <T>
 */
public class Token {
	private UUID sessionID;
	private String user_id;
	private String tokenString;
	private boolean online = false;
	
    public Token(UUID sessionID, String user_id, String tokenString) {
    	this.sessionID = sessionID;
    	this.user_id = user_id;
    	this.tokenString = tokenString;
    }


    
    public UUID getSessionID() {
		return sessionID;
	}



	public String getUser_id() {
		return user_id;
	}



	public String getTokenString() {
		return tokenString;
	}




	/**
     * @param toClone
     * This constructor clones another Triple
     */
    public Token (Token toClone) {
    	this.sessionID = toClone.getSessionID();
    	this.user_id = toClone.getUser_id();
    	this.tokenString = toClone.getTokenString();
    }
}

