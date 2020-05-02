package com.ryhma_3.kaiku.resource_controllers;

import java.util.ArrayList;
import java.util.HashMap;

import com.ryhma_3.kaiku.model.cast_object.ChatObject;
import com.ryhma_3.kaiku.model.cast_object.MessageObject;
import com.ryhma_3.kaiku.model.cast_object.UserObject;
import com.ryhma_3.kaiku.model.database.IChatDAO;
import com.ryhma_3.kaiku.model.database.IMessageDAO;
import com.ryhma_3.kaiku.model.database.IUserDAO;
import com.ryhma_3.kaiku.socket.server.IServer;

public class Dummies {
	
	public DummyChatDAO chatDAO = new DummyChatDAO();
	public DummyUserDAO userDAO = new DummyUserDAO();
	public DummyMessageDAO messageDAO = new DummyMessageDAO();
	public DummyServer server = new DummyServer();
	
	
	class DummyChatDAO implements IChatDAO {

		ArrayList<ChatObject> chats = new ArrayList<>();
		
		@Override
		public ChatObject[] getChats(String userId) {
			if(userId.equals("abc1")) {
				ChatObject[] arr = new ChatObject[chats.size()];
				return chats.toArray(arr);
			}
			
			ArrayList<ChatObject> filtered = new ArrayList<>();
			for(ChatObject c : chats) {
				try {
					if(c.getMembers()[0].equals(userId) || c.getMembers()[1].equals(userId)) {
						filtered.add(c);
					}
				} catch (Exception e) {
				}
			}
			
			if(filtered.isEmpty()) {
				return null;
			}
			
			return filtered.toArray(new ChatObject[filtered.size()]);
		}

		@Override
		public ChatObject[] getAllChats() {
			return chats.toArray(new ChatObject[chats.size()]);
		}

		@Override
		public ChatObject createChatObject(ChatObject chatObject) {
			if(chatObject.getChat_id()!=null) {
				chats.add(chatObject);
			}
			
			ChatObject newObj = new ChatObject("abcd", chatObject.getChatName(), chatObject.getType(), chatObject.getMembers(), new MessageObject[0]);
			chats.add(newObj);
			return newObj;
		}

		@Override
		public ChatObject updateChatObject(ChatObject chatObject) {
			ChatObject hit = null;
			for(ChatObject c : chats) {
				if(chatObject.getChat_id().equals(c.getChat_id())) {
					hit = c;
				}
			}
			if(hit!=null) {
				chats.remove(hit);
				hit = new ChatObject(chatObject.getChat_id(), chatObject.getChatName(), chatObject.getType(), chatObject.getMembers(), null);
				chats.add(hit);
				return hit;
			}
			
			return null;
		}

		@Override
		public boolean deleteChatObject(ChatObject chatObject) {
			ChatObject hit = null;
			for(ChatObject c : chats) {
				if(c.getChat_id().equals(chatObject.getChat_id())) {
					hit = c;
				}
			}
			
			if(hit!=null) {
				chats.remove(hit);
				return true;
			}
			return false;
		}

		@Override
		public ChatObject getChatObject(ChatObject chatObject) {
			// TODO Auto-generated method stub
			return null;
		}
		
	}
	
	
	class DummyUserDAO implements IUserDAO {
		ArrayList<UserObject> allUsers = new ArrayList<UserObject>();

		
		@Override
		public UserObject createUser(UserObject profileObject) {
			profileObject.setUser_id("abc1");
			allUsers.add(profileObject);
			return new UserObject(profileObject.getUser_id(), profileObject.getUsername(), profileObject.getPassword(), profileObject.getName());
		}

		@Override
		public UserObject updateUser(UserObject profileObject) {
			UserObject target = allUsers.get(0);
			target.setName(profileObject.getName());
			target.setPassword(profileObject.getPassword());
			target.setUsername(profileObject.getUsername());
			return target;
		}

		@Override
		public boolean deleteUser(UserObject profileObject) {
			allUsers.remove(0);
			return true;		}

		@Override
		public UserObject getUser(UserObject profileObject) {
			for(UserObject u : allUsers) {
				if(u.getUsername()==profileObject.getUsername()) {
					return u;
				}
			}
			return null;
		}

		@Override
		public UserObject[] getAllUsers() {
			UserObject users[] = new UserObject[allUsers.size()];
			users = allUsers.toArray(users);
			return users;
		}
	}
	
	
	class DummyMessageDAO implements IMessageDAO {
		
		HashMap<String, ArrayList<MessageObject>> messageDB = new HashMap<>();
		

		@Override
		public MessageObject createMessage(MessageObject messageObject, String chat_id) {
			ArrayList<MessageObject> msgs =  messageDB.get(chat_id);
			if(msgs == null) {
				msgs = new ArrayList<MessageObject>();
			}
			msgs.add(messageObject);
			messageDB.put(chat_id, msgs);
			return messageObject;
		}

		@Override
		public MessageObject updateMessage(MessageObject messageObject, String chat_id) {
			// TODO Auto-generated method stub
			return null;
		}

		@Override
		public void deleteMessage(MessageObject messageObject, String chat_id) {
			// TODO Auto-generated method stub
			
		}

		@Override
		public MessageObject getMessage(MessageObject messageObject, String chat_id) {
			for(MessageObject msg : messageDB.get(chat_id)) {
				if(msg.getMessage_id().equals(messageObject.getMessage_id())) {
					return msg;
				}
			}
			return null;
		}

		@Override
		public MessageObject[] getAllMessages(String chat_id) {
			return new MessageObject[0];
		}
		
	}
	
	class DummyServer implements IServer {

		@Override
		public void start() {
			// TODO Auto-generated method stub
			
		}

		@Override
		public void stopServer() {
			// TODO Auto-generated method stub
			
		}

		boolean eventFired = false;
		@Override
		public void sendCreateChatEvent(ChatObject chat) {
			eventFired = true;
		}
		
		public boolean wasSendCreateChatEventFired() {
			return eventFired;
		}
	}
}
