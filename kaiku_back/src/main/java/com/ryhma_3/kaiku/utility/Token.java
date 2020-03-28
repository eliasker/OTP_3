package com.ryhma_3.kaiku.utility;

import java.util.UUID;

/**
 * Token container class
 */
public class Token {
	private UUID sessionID;
	private String user_id;
	private String tokenString;
	private boolean online = false;
	
    /**
     * Create token
     * @param sessionID
     * @param user_id
     * @param tokenString
     */
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
	
	public boolean isOnline() {
		return online;
	}
	
	public void setOnline(boolean online){
		this.online = online;
	}

	/**
	 * This constructor clones another token
     * @param toClone
     */
    public Token (Token toClone) {
    	this.sessionID = toClone.getSessionID();
    	this.user_id = toClone.getUser_id();
    	this.tokenString = toClone.getTokenString();
    }
}

