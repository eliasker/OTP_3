package com.ryhma_3.kaiku.socket.server;

import com.corundumstudio.socketio.AckRequest;
import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIOServer;
import com.corundumstudio.socketio.listener.ConnectListener;
import com.corundumstudio.socketio.listener.DataListener;
import com.corundumstudio.socketio.listener.DisconnectListener;
import com.ryhma_3.kaiku.model.cast_object.AuthObject;
import com.ryhma_3.kaiku.model.cast_object.MessageObject;
import com.ryhma_3.kaiku.model.cast_object.UserObject;
import com.ryhma_3.kaiku.model.database.UserDAO;
import com.ryhma_3.kaiku.socket.init.IServerInit;

public class ServerWithProfilesAndDatabase implements IServer{
	
	final SocketIOServer server;
	final UserDAO accountDAO;
	IServerInit init;

	
	public ServerWithProfilesAndDatabase(IServerInit init, String URI) {
		this.init = init;
		this.accountDAO = new UserDAO(URI);
		server = init.getSocketServer();
	}

	@Override
	public void start() {
		
		//Connect listener
		server.addConnectListener(new ConnectListener() {
			@Override
			public void onConnect(SocketIOClient client) {
				System.out.println("new client: " + client.getSessionId() + " connected");
			}
		});
		
		//global chat listener
		server.addEventListener("chatevent", MessageObject.class, new DataListener<MessageObject>() {
			@Override
			public void onData(SocketIOClient client, MessageObject data, AckRequest ackSender) throws Exception {
				//data = DAO.createMessage(data);
				server.getBroadcastOperations().sendEvent("chatevent", data);
				System.out.println(data.getContent());
			}
		});
		
		
		//sign in listener
		server.addEventListener("signinevent", UserObject.class, new DataListener<UserObject>() {
			@Override
			public void onData(SocketIOClient client, UserObject data, AckRequest ackSender) throws Exception {
				//data = accountDAO.createAccount(data);
				accountDAO.createUser(data);
				data.setPassword(null);
				client.sendEvent("signinevent", data);
				System.out.println("created account: " + data.getUsername());
			}
		});
		
		
		//log in listener
		server.addEventListener("loginevent", UserObject.class, new DataListener<UserObject>() {
			@Override
			public void onData(SocketIOClient client, UserObject data, AckRequest ackSender) throws Exception {
				//data = accountDAO.getAccout(data);
				client.sendEvent("loginevent", new AuthObject("kaiku"));
				System.out.println("User: " + data.getUsername() + " logged in");
			}
		});
		
		
		//Disconnect listener
		server.addDisconnectListener(new DisconnectListener() {
			@Override
			public void onDisconnect(SocketIOClient client) {
				System.out.println("client: " + client.getSessionId() + " disconnected");
			}
		});
		
	}

	@Override
	public void stopServer() {
		server.stop();
	}

}
