package ryhma_3;

import java.util.Date;

/**
 * @author Panu Lindqvist
 * Message object. Has a single sent message and metadata.
 *
 */
public class ChatObject {
	private String content;
	private String id;
	private String user_id;
	
	public ChatObject() {
	}
	
	public ChatObject(String content, String id, String user_id) {
		this.id = id;
		this.user_id = user_id;
		this.content = content;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
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
}
