package com.ryhma_3.kaiku.model.cast_object;


/**
 * @author Panu Lindqvist
 * Main container for initialization data
 * - user_id
	 *  - name
	 *  - username
	 *  - token
	 *  - online
	 *  -chats[{
	 *   	- chat_id
	 *   	- chatName
	 *   	- type
	 *   	- messages[{
	 *   		- content
	 *   		- message_id
	 *   		- user_id
	 *   	}]
	 *   }]
	 *  -users[{
	 *  	- user_id
	 *  	- username
	 *  	- password
	 *  	- name
	 *  }]
 */
public class InitializationObject {
	public InitializationObject(String user_id, String name, String username, String token, ChatObject[] chats, UserObject[] users) {
		super();
		this.user_id = user_id;
		this.name = name;
		this.username = username;
		this.token = token;
		this.chats = chats;
		this.users = users;
	}
	
	public InitializationObject() {}

	private String user_id;
	private String name;
	private String username;
	private String token = "kaiku";
	private boolean online;
	private ChatObject[] chats;
	private UserObject[] users;
	
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

	public void setOnline(boolean online) {
		this.online = online;
	}
	
	public boolean getOnline() {
		return online;
	}

	public UserObject[] getUsers() {
		return users;
	}

	public void setUsers(UserObject[] users) {
		this.users = users;
	}
	
}

