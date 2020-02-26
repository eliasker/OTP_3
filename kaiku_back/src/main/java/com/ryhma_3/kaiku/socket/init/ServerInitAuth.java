package com.ryhma_3.kaiku.socket.init;

import com.corundumstudio.socketio.AuthorizationListener;
import com.corundumstudio.socketio.Configuration;
import com.corundumstudio.socketio.HandshakeData;
import com.corundumstudio.socketio.SocketIOServer;

/**
 * @author Panu Lindqvist
 * This is a server setup with Authorization listener implemented.
 */
public class ServerInitAuth implements IServerInit {
	/*
	 * Default port: 9991
	 */
	private int port = 9991;
	
	/*
	 * Default hostname: "localhost"
	 */
	private String hostname = "localhost";
	
	
	/**
	 * Default configuration, see port & hostname
	 */
	public ServerInitAuth() {
		
	}
	
	/**
	 * @param port
	 * @param hostname
	 * Override default port number & host name
	 */
	public ServerInitAuth(int port, String hostname) {
		this.port = port;
		this.hostname = hostname;
	}

	
	/* (non-Javadoc)
	 * @see com.ryhma_3.kaiku.socket.init.IServerInit#getSocketServer()
	 */
	public SocketIOServer getSocketServer() {
		
		Configuration config = new Configuration();
		config.setHostname(hostname);
		config.setPort(port);
		
		//setup auth listener
		config.setAuthorizationListener(new AuthorizationListener() {
			@Override
			public boolean isAuthorized(HandshakeData data) {
				
				String auth = data.getSingleUrlParam("Authorization");
				
				if(auth.equals("kaiku")) {
					return true;
				}
				return false;
			}
		});
		
		return new SocketIOServer(config);
	}
}
