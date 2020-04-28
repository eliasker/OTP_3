package com.ryhma_3.kaiku.socket.init;

import com.corundumstudio.socketio.Configuration;
import com.corundumstudio.socketio.SocketIOServer;
import com.ryhma_3.kaiku.model.database.ChatDAO;
import com.ryhma_3.kaiku.model.database.IChatDAO;
import com.ryhma_3.kaiku.model.database.ILocalizationDAO;
import com.ryhma_3.kaiku.model.database.IMessageDAO;
import com.ryhma_3.kaiku.model.database.IUserDAO;
import com.ryhma_3.kaiku.model.database.MessageDAO;
import com.ryhma_3.kaiku.model.database.UserDAO;

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
	
	private SocketIOServer server;
	
	private IChatDAO chatDAO = null;
	
	private IMessageDAO messageDAO = null;
	
	private IUserDAO userDAO = null;

    private ILocalizationDAO localizationDAO = null;
	
	
	/**
	 * Default configuration, see port & hostname
	 */
	public ServerInitNoAuth() {
		
	}
	
	/**
	 * Override default port number & host name
	 * @param port
	 * @param hostname
	 */
	public ServerInitNoAuth(int port, String hostname) {
		this.port = port;
		this.hostname = hostname;
	}

	
	/*
	 * @see Ryhma_3.Kaiku_BE.server.IChatServerInit#getSocketServer()
	 */
	public SocketIOServer getSocketServer() {
		if(server != null) {
			return server;
		}
		
		Configuration config = new Configuration();
		config.setHostname(hostname);
		config.setPort(port);
		config.setOrigin("http://localhost:3000");
		
		//confirm not null
		chatDAO = chatDAO == null ? new ChatDAO() : chatDAO;
		messageDAO = messageDAO == null ? new MessageDAO() : messageDAO;
		userDAO = userDAO == null ? new UserDAO() : userDAO;
		
		server = new SocketIOServer(config);
		return server;
	}

	@Override
	public IChatDAO getChatDAO() {
		return chatDAO;
	}
	
	@Override
	public void setChatDAO(IChatDAO chatDAO) {
		this.chatDAO = chatDAO;
	}

	@Override
	public IMessageDAO getMessageDAO() {
		return messageDAO;
	}

	@Override
	public void setMessageDAO(IMessageDAO messageDAO) {
		this.messageDAO = messageDAO;
	}

	@Override
	public void setUserDAO(IUserDAO userDAO) {
		this.userDAO = userDAO;
	}

	@Override
	public IUserDAO getUserDAO() {
		return userDAO;
	}

	@Override
	public void setLocalizationDAO(ILocalizationDAO localizationDAO) {
        this.localizationDAO = localizationDAO;
	}

	@Override
	public ILocalizationDAO getLocalizationDAO() {
		return this.localizationDAO;
	}
	
}
