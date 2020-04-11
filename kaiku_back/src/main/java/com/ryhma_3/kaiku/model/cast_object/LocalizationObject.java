package com.ryhma_3.kaiku.model.cast_object;

import java.util.HashMap;

/**
 * @author Panu Lindqvist
 * Object containing data for a single locale localization.
 */
public class LocalizationObject {
	String identicator;
	HashMap<String, String> items = new HashMap<String, String>();
	
	public LocalizationObject() {}
	public LocalizationObject(String identicator) {
		this.identicator = identicator;
	}

	public String getIdenticator() {
		return identicator;
	}

	public void setIdenticator(String identicator) {
		this.identicator = identicator;
	}

	public HashMap<String, String> getItems() {
		return items;
	}

	public void setItems(HashMap<String, String> items) {
		this.items = items;
	}
}
