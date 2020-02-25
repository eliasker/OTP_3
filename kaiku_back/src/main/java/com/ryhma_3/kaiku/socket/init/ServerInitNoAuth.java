package com.ryhma_3.kaiku.socket.init;

import com.corundumstudio.socketio.Configuration;
import com.corundumstudio.socketio.SocketIOServer;

/**
 * @author Panu Lindqvist
 * This is a server setup with only basics configured
 */
public class ServerInitNoAuth implements IServerInit {
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
	public ServerInitNoAuth() {
		
	}
	
	/**
	 * @param port
	 * @param hostname
	 * Override default port number & host name
	 */
	public ServerInitNoAuth(int port, String hostname) {
		this.port = port;
		this.hostname = hostname;
	}

	
	/*
	 * @see Ryhma_3.Kaiku_BE.server.IChatServerInit#getSocketServer()
	 */
	public SocketIOServer getSocketServer() {
		Configuration config = new Configuration();
		config.setHostname(hostname);
		config.setPort(port);
		return new SocketIOServer(config);
	}
	
}
