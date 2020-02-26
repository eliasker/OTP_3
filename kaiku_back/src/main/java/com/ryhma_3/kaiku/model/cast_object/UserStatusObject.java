package com.ryhma_3.kaiku.model.cast_object;

public class UserStatusObject {
	private String user_id;
	private boolean online;
	
	public UserStatusObject() {}
	
	public UserStatusObject(String user_id, boolean online) {
		this.user_id = user_id;
		this.online = online;
	}

	public String getUser_id() {
		return user_id;
	}

	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}

	public boolean isOnline() {
		return online;
	}

	public void setOnline(boolean online) {
		this.online = online;
	}

}
