package com.ryhma_3.kaiku.utility;

import java.util.ArrayList;
import java.util.Arrays;

import com.ryhma_3.kaiku.KaikuApplication;
import com.ryhma_3.kaiku.model.cast_object.ChatObject;
import com.ryhma_3.kaiku.model.cast_object.UserObject;
import com.ryhma_3.kaiku.model.database.IChatDAO;
import com.ryhma_3.kaiku.model.database.IUserDAO;

/**
 * Extracted global chats functionality to its own class
 * @author Panu Lindqvist
 */
public class GlobalChats {
	
	private static IChatDAO chatDAO;
	private static IUserDAO userDAO;
	private static ArrayList<ChatObject> globals = new ArrayList<>();
	
	
	public GlobalChats() {
		chatDAO  = KaikuApplication.getChatDAO();
		userDAO = KaikuApplication.getUserDAO();
	}
	
	/**
	 * Initialization, make sure there is atleast 1 global chats. Add all users to all global chats.
	 * @return boolean success
	 */
	public static boolean globalChatsInit() {
		//get all chats
		try {
			ChatObject[] allChats = chatDAO.getAllChats();
			for(ChatObject chat : allChats) {
				
				//if chat is global
				if(chat.getType().equals("global")) {
					
					//add to globals
					globals.add(chat);
				}
			}
			
			if(globals.isEmpty()) {
				throw new NullPointerException();
			}
			
		} catch(NullPointerException ne) {
			System.out.println("No global chats exist, creating.");
			
			String[] empty = new String[0];
			ChatObject global  = chatDAO.createChatObject(new ChatObject(null, "global", "global", empty, null));
			globals.add(global);
		}
		
		//make sure all users are in globals
		try {
			UserObject[] allUsers = userDAO.getAllUsers();
	
				for(ChatObject chat : globals) {
					
					//get all user_ids to array
					chat.setMembers(usersToIDArray(allUsers));
					
					chatDAO.updateChatObject(chat);
					
				}
		} catch(NullPointerException ne) {
			System.out.println("no users to put into global chats");
		} catch(Exception e) {
			System.out.println("Global chats init failed");
			e.printStackTrace();
			return false;
		}
		
		System.out.println("Init global chats completed succesfully");
		return true;
	}

	
	/**
	 * Add new user to all global chats
	 * @param member
	 * @return boolean success
	 */
	public static boolean addMemberToGlobals(UserObject member) {
		try {
			for(ChatObject chat : globals) {
				
				String[] members = chat.getMembers();
				members = Arrays.copyOf(members, members.length+1);
				members[members.length-1] = member.getUser_id();
				
				ChatObject updated = chatDAO.updateChatObject(chat);
				System.out.println("new user added to; " + updated.getChatName());
			}
			
			return true;
			
		} catch (Exception e) {
			System.out.println("Error adding new user to global chats");
			e.printStackTrace();
		}
		
		return false;
	}
	
	
	/**
	 * TODO add new global chats
	 * @param chat
	 * @return boolean success
	 */
	public static boolean putGlobalChat(ChatObject chat) {
		
		return false;
	}
	
	
	/**
	 * TODO add delete global chats
	 * @param chat
	 * @return boolean success
	 */
	public static boolean deleteGlobalChat(ChatObject chat) {
		
		return false;
	}
	
	private static String[] usersToIDArray(UserObject[] allUsers) {
		String[] newUsers = new String[allUsers.length];
		
		for(int i=0; i<allUsers.length; i++) {
			newUsers[i] = allUsers[i].getUser_id();		
		}
		
		return newUsers;
	}
}
