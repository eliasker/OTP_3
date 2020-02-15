package com.ryhma_3.kaiku.socket.server;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIOServer;
import com.corundumstudio.socketio.listener.ConnectListener;
import com.ryhma_3.kaiku.model.cast_object.AuthObject;
import com.ryhma_3.kaiku.model.database.UserDAO;
import com.ryhma_3.kaiku.socket.init.IServerInit;
import com.ryhma_3.kaiku.utility.SecurityTools;
import com.ryhma_3.kaiku.utility.Token;

public class Server implements IServer {
	
	private static final Map<String, Boolean> connectedUsers = new HashMap<>(); 
	final SocketIOServer server;
	IServerInit init;

	public Server(IServerInit init) {
		this.init = init;
		server = init.getSocketServer();
	}
	
	@Override
	public void start() {
		server.addConnectListener(new ConnectListener() {			
			@Override
			public void onConnect(SocketIOClient client) {
				
				//Check connection authentication
				String tokenString = client.getHandshakeData().getHttpHeaders().get("auth");
				boolean approved = SecurityTools.connectTokenToUUID(tokenString, client.getSessionId());
				
				//kick if not authenticated
				if(!approved) {
					
					client.disconnect();
					
				} else {
					//update connectedUsers
					Boolean isSet = connectedUsers.putIfAbsent(SecurityTools.getCloneOfToken(tokenString).getUser_id(), true);
					if(isSet==null) {
						connectedUsers.put(SecurityTools.getCloneOfToken(tokenString).getUser_id(), true);
					}
					
					//send client current user statuses
					client.sendEvent("connect", connectedUsers);
				}
			}
			
			
		});
	}

	@Override
	public void stopServer() {
		
	}

}
