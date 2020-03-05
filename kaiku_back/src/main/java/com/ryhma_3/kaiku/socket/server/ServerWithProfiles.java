package com.ryhma_3.kaiku.socket.server;

import java.util.ArrayList;
import java.util.UUID;

import com.corundumstudio.socketio.AckRequest;
import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIOServer;
import com.corundumstudio.socketio.listener.DataListener;
import com.ryhma_3.kaiku.model.cast_object.AuthObject;
import com.ryhma_3.kaiku.model.cast_object.MessageObject;
import com.ryhma_3.kaiku.model.cast_object.UserObject;
import com.ryhma_3.kaiku.socket.init.IServerInit;
import com.ryhma_3.kaiku.utility.Token;

/**
 * @author Panu Lindqvist
 * @deprecated
 *
 */
public class ServerWithProfiles implements IServer{
	IServerInit init;
	final SocketIOServer server;
	private ArrayList<UserObject> profiles = new ArrayList<>();

	/**
	 * @deprecated
	 * @param IServerInit init
	 * This class requires a configuration object as constructor parameter
	 */
	public ServerWithProfiles(IServerInit init) {
		this.init = init;
		server = init.getSocketServer();
	}
	
	public void start() {
		
		server.addEventListener("loginevent", UserObject.class, new DataListener<UserObject>() {
			@Override
			public void onData(SocketIOClient client, UserObject data, AckRequest ackSender) throws Exception {
				//TODO: Add confirmation that profile doesn't exist
				profiles.add(data);
				logUsers();
				client.sendEvent("loginevent", new AuthObject("kaiku"));
			}
		
		});
		
		server.addEventListener("chatevent", MessageObject.class, new DataListener<MessageObject>() {
			@Override
			public void onData(SocketIOClient client, MessageObject data, AckRequest ackSender) throws Exception {
				
				server.getBroadcastOperations().sendEvent("chatevent", data);
				System.out.println(data.getContent());
				
			}
		});
		
		server.start();
	}

	@Override
	public void stopServer() {
		server.stop();
	}
	
	private void logUsers() {
		String users = "";
		for (UserObject profileObject : profiles) {
			users += profileObject.getUsername() + "/" + profileObject.getPassword() + "/" + profileObject.getName() ;
			users += "  ---   ";
		}
		System.out.println(users);
	}


}
