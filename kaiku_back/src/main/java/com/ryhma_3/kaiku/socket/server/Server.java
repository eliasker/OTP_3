package com.ryhma_3.kaiku.socket.server;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import com.corundumstudio.socketio.AckRequest;
import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIOServer;
import com.corundumstudio.socketio.listener.ConnectListener;
import com.corundumstudio.socketio.listener.DataListener;
import com.corundumstudio.socketio.listener.DisconnectListener;
import com.ryhma_3.kaiku.model.cast_object.ChatObject;
import com.ryhma_3.kaiku.model.cast_object.MessageObject;
import com.ryhma_3.kaiku.model.cast_object.UserObject;
import com.ryhma_3.kaiku.model.cast_object.UserStatusObject;
import com.ryhma_3.kaiku.model.database.IChatDAO;
import com.ryhma_3.kaiku.model.database.IMessageDAO;
import com.ryhma_3.kaiku.model.database.IUserDAO;
import com.ryhma_3.kaiku.socket.init.IServerInit;
import com.ryhma_3.kaiku.utility.Logger;
import com.ryhma_3.kaiku.utility.SecurityTools;
import com.ryhma_3.kaiku.utility.Token;

/**
 * @author Panu Lindqvist
 * A socket server that implements IServer. Contains listeners to listen incoming connections and messages and has 
 * multiplexing functionality to facilitate unnumbered amount of chats.
 * Collects incoming traffic and utilises database Data Access Objects.
 */
public class Server implements IServer {
	
	/**
	 * user_id, onlineStatus
	 */
	private static Map<String, Boolean> connectedUsers = new HashMap<>(); 
	
//	Discarded due to implementation difficuties
//	private static final ArrayList<SocketIONamespace> namespaces = new ArrayList<>(); 
	
	private static ArrayList<ChatObject> chats = new ArrayList<>();

	IChatDAO chatDAO = null;
	IMessageDAO messageDAO = null;
	IUserDAO userDAO = null;
	
	final SocketIOServer server;
	IServerInit init;

	public Server(IServerInit init) {
		this.init = init;
		server = init.getSocketServer();
		chatDAO = init.getChatDAO();
		messageDAO = init.getMessageDAO();
		userDAO = init.getUserDAO();
	}
	
	@Override
	public void start() {		
		
		//after boot create namespaces for existing chats
		initialize(server);
		

		//Register incoming connections. Gate keeping is handled in ServerInit!
		server.addConnectListener(new ConnectListener() {			
			@Override
			public void onConnect(SocketIOClient client) {
				debugger("connect event", true);
				
				//register client
				String tokenString = client.getHandshakeData().getSingleUrlParam("Authorization");
				
				
				if(SecurityTools.attachSessionToToken(tokenString, client.getSessionId())) {
								
				Token cloneOfToken = SecurityTools.getCloneOfToken(tokenString);
				
				debugger("client:" + cloneOfToken.getUser_id() + 
						" verified, token:" + cloneOfToken.getTokenString() + 
						" UUID:" + cloneOfToken.getSessionID()
						, true);
				
				
				//update connectedUsers
				connectedUsers.put(cloneOfToken.getUser_id(), true);
				
				//send client current user statuses
				client.sendEvent("connect", connectedUsers);
				
				//update other clients about this user
				server.getBroadcastOperations().sendEvent("connectionEvent", new UserStatusObject(cloneOfToken.getUser_id(), true));
				
				} else {
					
					debugger("disconnecting client", true);
					client.disconnect();
					
				}
			}
		});
		
		
		//register disconnections
		server.addDisconnectListener(new DisconnectListener() {
			@Override
			public void onDisconnect(SocketIOClient client) {
								
				debugger(client.getSessionId().toString(), true);
				
				
				UUID sessionID = client.getSessionId();


				try {
					//get token of disconnecting client
					Token cloneOfToken = SecurityTools.getCloneOfToken(sessionID);
					
					//set user as disconnected
					connectedUsers.put(cloneOfToken.getUser_id(), false);
					
					//broadcast info
					server.getBroadcastOperations().sendEvent("connectionEvent", new UserStatusObject(cloneOfToken.getUser_id(), false));
					
					//remove sessionID form storage
					SecurityTools.attachSessionToToken(cloneOfToken.getTokenString(), null);
					
					debugger("UUID:" + cloneOfToken.getSessionID().toString() + " disconnected cleanly", true);
				} catch (Exception e) {
					
					debugger("Disconnected uncleanly", true);
										
					//reset list
					connectedUsers.forEach((k, v) -> v = false);
					
					//iterate all online users
					Collection<SocketIOClient> users = server.getAllClients();
					for(SocketIOClient u : users) {
						Token token = SecurityTools.getCloneOfToken(u.getSessionId());	
						connectedUsers.put(token.getUser_id(), true);
					}
				}
			}
		});
		
		
		server.addEventListener("createChatEvent", ChatObject.class, new DataListener<ChatObject>() {
			@Override
			public void onData(SocketIOClient client, ChatObject data, AckRequest ackSender) throws Exception {
				
				try {
					
					//Create chat
					ChatObject result = null;
					
					try {					

						/*
						 * extract messages
						 */
						MessageObject[] messages = data.getMessages();
						data.setMessages(null);
						
						//create chat
						result = chatDAO.createChatObject(data);
						
						try {
							//will throw exception without messages
							messageDAO.createMessage(messages[0], result.getChat_id());
							
							result.setMessages(messageDAO.getAllMessages(result.getChat_id()));
							
							debugger("Chat created with initial message", true);
							
						} catch(NullPointerException ne) {
							
							debugger("no initial message",true);

						}
					} catch(Exception e) {
						
						debugger("Error creating a chat", true);
						
					}
					
					//add resulted chat into local storage
					chats.add(result);

					//trying if ackwonledgement (request for the chat object) is required
					if(ackSender.isAckRequested()) {
						ackSender.sendAckData(result);
					}
										
					debugger("created chat: " + result.getChatName() + ", with ID: " + result.getChat_id(), true);
										
					//go through all  members
					for(String member : data.getMembers()) {
						
						//check if member is online
						if(connectedUsers.get(member)) {
							
							Token user = SecurityTools.getCloneOfToken(member);
							
							//Do not send createChatEvent to the creator client
							if(user.getSessionID().toString().equals(client.getSessionId().toString())){
								continue;
							}
							
							//send event realtime
							SocketIOClient receiver = server.getClient(user.getSessionID());
							receiver.sendEvent("createChatEvent", result);
							
							debugger("sent event to: " + receiver.getSessionId().toString(), true);
							
						}
					}
				} catch(Exception e) {
					debugger("Create chat failed", true);
					e.printStackTrace();
				}
			}
		});
		
		
		server.addEventListener("chatEvent", MessageObject.class, new DataListener<MessageObject>() {
			
			@Override
			public void onData(SocketIOClient client, MessageObject data, AckRequest ackSender) throws Exception {
				
				try {				
					//find correct chat
					for(ChatObject chat : chats) {
						if(chat.getChat_id().equals(data.getChat_id())) {
						
							MessageObject message = messageDAO.createMessage(data, chat.getChat_id());
							debugger("Created message: " + message.getContent() + ",  to: " + message.getChat_id(), true);
							
							int d_activeusers = 0;
							int d_inactiveusers = 0;
							
							//run through all users
							for(String user : chat.getMembers()) {
								
								//get UUID
								try {
									UUID sessionID = SecurityTools.getCloneOfToken(user).getSessionID();
									server.getClient(sessionID).sendEvent("chatEvent", message);
									d_activeusers++;
								} catch (NullPointerException ne) {
									d_inactiveusers++;
								} catch (Exception e) {
									e.printStackTrace();
								}
							}
							debugger("Sent message to " + d_activeusers + ", skipped " + d_inactiveusers + " inactive  users", true);
							break;
						}
					}
				}catch (Exception e) {
					debugger("chatEvent: FAIL", true);
					e.printStackTrace();
				}
			}
		});
		
		server.start();
		
		debugger("server started", true);
	}
	
	
	/**
	 * Method for rest controller. Admin dashboard uses REST to create chats
	 * @param chat {@link ChatObject}
	 */
	public void sendCreateChatEvent(ChatObject chat) {
		
		try {
			
			int d_activeMembers = 0;
			
			//go through all  members
			for(String member : chat.getMembers()) {
				
				//check if member is online
				if(connectedUsers.get(member)) {
					
					//send event realtime
					SocketIOClient receiver = server.getClient(SecurityTools.getCloneOfToken(member).getSessionID());
					receiver.sendEvent("createChatEvent", chat);
				
					d_activeMembers++;
				}
			}
			
			//add chat to local storage
			chats.add(chat);
			
			debugger("sent createChat event to: " + d_activeMembers + " active users", false);
		} catch(Exception e) {
			debugger("Exception in sendCreateChatEvent", true);
		}
	}

	
	/**
	 * @param server
	 *  //Collect all chats from database and add them into servers as namespaces
	 *   Initialize all chats into chats list, initialize all users to connectedUsers list
	 */
	private void initialize(SocketIOServer server) {
		
		try {
			//initialize chats from database
			ChatObject[] chatsFromDb = chatDAO.getAllChats(); //alL
			for (ChatObject chatObject : chatsFromDb) {
				chats.add(chatObject);
			}
			
			//initialize connected users list
			UserObject[] users = userDAO.getAllUsers();
			for(UserObject user: users) {
				connectedUsers.put(user.getUser_id(), false);
			}
		}catch (Exception e) {
			debugger("SERVER INIT: FAIL", true);
			e.printStackTrace();
		}
	}
	
	
	/**
	 * @param server
	 * @param chatObject
	 * Running chat objects through this method creates new server namespaces with proper attributes attached.
	 * 
	 * @deprecated for the time being
	 */ 
	private void setupNamespace(SocketIOServer server, ChatObject chatObject) {
//		SocketIONamespace namespace = server.addNamespace("/" + chatObject.getChat_id());
//		namespaces.add(namespace);
		
//		namespace.addEventListener("chatEvent", MessageObject.class, new DataListener<MessageObject>() {
//			@Override
//			public void onData(SocketIOClient client, MessageObject data, AckRequest ackSender) throws Exception {
//				messageDAO.createMessage(data,chatObject.getChat_id());
//				namespace.getBroadcastOperations().sendEvent("chatEvent", data);
//			}
//		});
	}
	
	@Override
	public void stopServer() {
		server.stop();
	}
	
	
	/**
	 * Log debugging messages to Sysout
	 * @param info String
	 */
	private void debugger(String info, boolean show) {
		if(show) {
			Logger.log("SERVER: " + info);
		}
	}
}
