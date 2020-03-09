package com.ryhma_3.kaiku.model.cast_object;

/**
 * Java object representing a chat database entry
 */
public class ChatObject {
	private String chat_id;
	private String chatName;
	private String type = "private";
	private String members[];
	private MessageObject[] messages;
	
	public ChatObject(String chat_id, String chatName, String type, String[] members, MessageObject[] messages) {
		super();
		this.chat_id = chat_id;
		this.chatName = chatName;
		this.type = type;
		this.members = members;
		this.messages = messages;
	}
	
	public ChatObject() {}

	public String getChat_id() {
		return chat_id;
	}

	public void setChat_id(String chat_id) {
		this.chat_id = chat_id;
	}

	public String getChatName() {
		return chatName;
	}

	public void setChatName(String chatName) {
		this.chatName = chatName;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}
	
	public String[] getMembers() {
		return members;
	}
	
	public void setMembers(String[] users) {
		this.members = users;
	}

	public MessageObject[] getMessages() {
		return messages;
	}

	public void setMessages(MessageObject[] messages) {
		this.messages = messages;
	}
	
	
}
