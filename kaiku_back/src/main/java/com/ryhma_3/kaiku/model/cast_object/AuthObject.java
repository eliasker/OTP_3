package com.ryhma_3.kaiku.model.cast_object;

public class AuthObject {
	private String auth;
	
	public AuthObject() {
		
	}
	
	/**
	 * Create auth object
	 * @param auth
	 */
	public AuthObject(String auth) {
		this.auth = auth;
	}

	/**
	 * @return {@link AuthObject}
	 */
	public String getAuth() {
		return auth;
	}

	/**
	 * @param auth
	 */
	public void setAuth(String auth) {
		this.auth = auth;
	}
}
