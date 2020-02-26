package com.ryhma_3.kaiku.socket.init;

import com.corundumstudio.socketio.AuthorizationListener;
import com.corundumstudio.socketio.Configuration;
import com.corundumstudio.socketio.HandshakeData;
import com.corundumstudio.socketio.SocketIOServer;
import com.corundumstudio.socketio.listener.ClientListeners;
import com.ryhma_3.kaiku.model.database.IChatDAO;
import com.ryhma_3.kaiku.model.database.IMessageDAO;

/**
 * @deprecated
 * @author Panu Lindqvist
 * This is a setup class for the server.
 */
public class ChatServerInit implements IServerInit {
	
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
	public ChatServerInit() {
		
	}
	
	/**
	 * @param port
	 * @param hostname
	 * Override default port number & host name
	 */
	public ChatServerInit(int port, String hostname) {
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

	@Override
	public IChatDAO getChatDAO() {
		return null;
	}

	@Override
	public IMessageDAO getMessageDAO() {
		return null;
	}

	@Override
	public void setChatDAO(IChatDAO chatDAO) {		
	}

	@Override
	public void setMessageDAO(IMessageDAO messageDAO) {		
	}
	
}
