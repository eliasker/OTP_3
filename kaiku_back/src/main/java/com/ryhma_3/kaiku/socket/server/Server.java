package com.ryhma_3.kaiku.socket.server;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.UUID;

import com.corundumstudio.socketio.AckCallback;
import com.corundumstudio.socketio.AckRequest;
import com.corundumstudio.socketio.HandshakeData;
import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIONamespace;
import com.corundumstudio.socketio.SocketIOServer;
import com.corundumstudio.socketio.listener.ConnectListener;
import com.corundumstudio.socketio.listener.DataListener;
import com.corundumstudio.socketio.listener.DisconnectListener;
import com.ryhma_3.kaiku.model.cast_object.AuthObject;
import com.ryhma_3.kaiku.model.cast_object.ChatObject;
import com.ryhma_3.kaiku.model.cast_object.MessageObject;
import com.ryhma_3.kaiku.model.cast_object.UserObject;
import com.ryhma_3.kaiku.model.cast_object.UserStatusObject;
import com.ryhma_3.kaiku.model.database.ChatDAO;
import com.ryhma_3.kaiku.model.database.IChatDAO;
import com.ryhma_3.kaiku.model.database.IMessageDAO;
import com.ryhma_3.kaiku.model.database.IUserDAO;
import com.ryhma_3.kaiku.model.database.UserDAO;
import com.ryhma_3.kaiku.socket.init.IServerInit;
import com.ryhma_3.kaiku.utility.SecurityTools;
import com.ryhma_3.kaiku.utility.Token;

import io.netty.handler.codec.http.HttpHeaders;
import io.netty.handler.codec.http.HttpContentEncoder.Result;

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
				System.out.println("connect event");
				
				//register client
				String tokenString = client.getHandshakeData().getSingleUrlParam("Authorization");
				
				SecurityTools.attachSessionToToken(tokenString, client.getSessionId());
								
				Token cloneOfToken = SecurityTools.getCloneOfToken(tokenString);
				
				System.out.println("client:" + cloneOfToken.getUser_id() + 
						" verified, token:" + cloneOfToken.getTokenString() + 
						" UUID:" + cloneOfToken.getSessionID());
				
				
				//update connectedUsers
				connectedUsers.put(cloneOfToken.getUser_id(), true);
				
				//send client current user statuses
				client.sendEvent("connect", connectedUsers);
				
				//update other clients about this user
				server.getBroadcastOperations().sendEvent("connectionEvent", new UserStatusObject(cloneOfToken.getUser_id(), true));
			}
		});
		
		
		//register disconnections
		server.addDisconnectListener(new DisconnectListener() {
			@Override
			public void onDisconnect(SocketIOClient client) {

				//get token of disconnecting client
				Token cloneOfToken = SecurityTools.getCloneOfToken(client.getSessionId());
				
				//set user as disconnected
				connectedUsers.put(cloneOfToken.getUser_id(), false);
				
				//broadcast info
				server.getBroadcastOperations().sendEvent("connectionEvent", new UserStatusObject(cloneOfToken.getUser_id(), false));
				
				System.out.println("UUID:" + cloneOfToken.getSessionID().toString() + " disconnected");
			}
		});
		
		
		server.addEventListener("createChatEvent", ChatObject.class, new DataListener<ChatObject>() {
			@Override
			public void onData(SocketIOClient client, ChatObject data, AckRequest ackSender) throws Exception {
				
				try {
					
					//Create chat
					ChatObject result = null;
					try {						
						MessageObject[] messages = data.getMessages();
						
						data.setMessages(null);
						
						result = chatDAO.createChatObject(data);
						
						messageDAO.createMessage(messages[0], result.getChat_id());
						
						System.out.println("Chat created with initial message");
						
					} catch(Exception e) {
						
						System.out.println("no initial message");
						
						result = chatDAO.createChatObject(data);
					}
					
					
										
					System.out.println("created chat: " + result.getChatName() + ", with ID: " + result.getChat_id());
										
					//go through all  members
					for(String member : data.getMembers()) {
						
						//check if member is online
						if(connectedUsers.get(member)) {
							
							//send event realtime
							SocketIOClient receiver = server.getClient(SecurityTools.getCloneOfToken(member).getSessionID());
							receiver.sendEvent("createChatEvent", result);
							
							System.out.println("sent event to: " + receiver.getSessionId().toString());
							
						}
					}
				} catch(Exception e) {
					System.out.println("Create chat failed");
					e.printStackTrace();
				}
			}
		});
		
		
		server.addEventListener("chatEvent", MessageObject.class, new DataListener<MessageObject>() {
			
			@Override
			public void onData(SocketIOClient client, MessageObject data, AckRequest ackSender) throws Exception {
				
				try {
					
					System.out.println("chats in store:  " + chats.size());
				
					//find correct chat
					for(ChatObject chat : chats) {
						if(chat.getChat_id().equals(data.getChat_id())) {
						
							MessageObject message = messageDAO.createMessage(data, chat.getChat_id());
							System.out.println("Created message: " + message.getContent() + ",  to: " + message.getChat_id());
							
							//run through all users
							for(String user : chat.getMembers()) {
								
								//get UUID
								try {
									UUID sessionID = SecurityTools.getCloneOfToken(user).getSessionID();
									server.getClient(sessionID).sendEvent("chatEvent", message);
									System.out.println("sent message to UUID: " + sessionID);
								} catch (NullPointerException ne) {
									System.out.println("skipping client on return msg");
								} catch (Exception e) {
									e.printStackTrace();
								}
							}
							break;
						}
					}
				}catch (Exception e) {
					System.out.println("chatEvent: FAIL");
					e.printStackTrace();
				}
			}
		});
		
		server.start();
		
		System.out.println("server started");
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
				connectedUsers.put(user.get_Id(), false);
			}
		}catch (Exception e) {
			System.out.println("SERVER INIT: FAIL");
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
}
