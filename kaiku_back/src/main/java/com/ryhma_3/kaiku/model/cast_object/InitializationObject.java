package com.ryhma_3.kaiku.model.cast_object;

import java.util.Map;

/**
 * @author Panu Lindqvist
 * Main container for initialization data
 */
public class InitializationObject {
	public InitializationObject(String user_id, String name, String username, String token, ChatObejct[] chats) {
		super();
		this.user_id = user_id;
		this.name = name;
		this.username = username;
		this.token = token;
		this.chats = chats;
	}
	
	public InitializationObject() {}

	private String user_id;
	private String name;
	private String username;
	private String token = "kaiku";
	private ChatObejct[] chats;
	public String getUser_id() {
		return user_id;
	}

	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public ChatObejct[] getChats() {
		return chats;
	}

	public void setChats(ChatObejct[] chats) {
		this.chats = chats;
	}

	
}

