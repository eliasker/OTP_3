package com.ryhma_3.kaiku.socket.server;

import com.corundumstudio.socketio.SocketIOServer;
import com.ryhma_3.kaiku.model.database.UserDAO;
import com.ryhma_3.kaiku.socket.init.IServerInit;

public class Server implements IServer {
	
	final SocketIOServer server;
	final UserDAO accountDAO;
	IServerInit init;

	public Server(IServerInit init, String URI) {
		this.init = init;
		this.accountDAO = new UserDAO(URI);
		server = init.getSocketServer();
	}
	
	@Override
	public void start() {
		
	}

	@Override
	public void stopServer() {
		
	}

}
