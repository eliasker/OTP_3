package com.ryhma_3.kaiku.model.cast_object;

public class UserObject {
	private String user_id;
	private String username;
	private String password;
	private String name;
	
	public UserObject() {
	
	}
	
	public UserObject(String user_id, String username, String password, String name) {
		this.user_id = user_id;
		this.username = username;
		this.password = password;
		this.name = name;
	}
	
	public String getUser_id() {
		return user_id;
	}
	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
}
