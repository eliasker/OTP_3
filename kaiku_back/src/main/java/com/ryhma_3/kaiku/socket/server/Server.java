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
				
				System.out.println(tokenString);
				
				SecurityTools.attachSessionToToken(tokenString, client.getSessionId());
								
				Token cloneOfToken = SecurityTools.getCloneOfToken(tokenString);
					
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
				
				ChatObject result = chatDAO.createChatObject(data);
				
				if(result != null) {
					
					//gather related users
					Token[] users = new Token[data.getMembers().length];
					for(int i=0; i<data.getMembers().length; i++) {
						users[i] = SecurityTools.getCloneOfToken(data.getMembers()[i]);
					}
					
					//send information event to related users
					for (Token token : users) {
						SocketIOClient receiver = server.getClient(token.getSessionID());
						receiver.sendEvent("createChatEvent", data);
					}
					
					System.out.println("Chatgroup:" + result.getChatName() + " created");
					
				} else {
					client.sendEvent("fail");
					//TODO: look into error statuses
				}
			}
		});
		
		server.addEventListener("chatEvent", MessageObject.class, new DataListener<MessageObject>() {
			
			@Override
			public void onData(SocketIOClient client, MessageObject data, AckRequest ackSender) throws Exception {
				
				try {
				
					//find correct chat
					for(ChatObject chat : chats) {
						if(chat.getChat_id() == data.getChat_id()) {
						
							MessageObject message = messageDAO.createMessage(data, chat.getChat_id());
							
							//run through all users
							for(String user : chat.getMembers()) {
								
								//get UUID
								UUID sessionID = SecurityTools.getCloneOfToken(user).getSessionID();
								if(sessionID!=null) {
									server.getClient(sessionID).sendEvent("chatEvent", message);
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
	 * Initialize all chats into chats list, initialize all users to connectedUsers list
	 * @param server
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
			System.out.println("SERVER INIT: FAIL");
			e.printStackTrace();
		}
	}
	
	
	/**
	 * Running chat objects through this method creates new server namespaces with proper attributes attached.
	 * @param server
	 * @param chatObject
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
