package com.ryhma_3.kaiku.model.cast_object;

import java.util.Date;

/**
 * @author Panu Lindqvist
 * Message object. Has a single sent message and metadata.
 *
 */
public class MessageObject {
	private String content;
	private String message_id;
	private String user_id;
	private Date timestamp;
	
	public MessageObject() {
	}
	
	public MessageObject(String content, String message_id, String user_id, Date timestamp) {
		this.message_id = message_id;
		this.user_id = user_id;
		this.content = content;
		this.timestamp = timestamp;
	}

	public String getMessage_id() {
		return message_id;
	}

	public void setMessage_id(String message_id) {
		this.message_id = message_id;
	}

	public String getUser_id() {
		return user_id;
	}

	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Date getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(Date timestamp) {
		this.timestamp = timestamp;
	}
}
