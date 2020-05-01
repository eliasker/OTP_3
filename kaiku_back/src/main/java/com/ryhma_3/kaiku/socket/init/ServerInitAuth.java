package com.ryhma_3.kaiku.socket.init;

import com.corundumstudio.socketio.AuthorizationListener;
import com.corundumstudio.socketio.Configuration;
import com.corundumstudio.socketio.HandshakeData;
import com.corundumstudio.socketio.SocketIOServer;
import com.ryhma_3.kaiku.model.database.ChatDAO;
import com.ryhma_3.kaiku.model.database.IChatDAO;
import com.ryhma_3.kaiku.model.database.ILocalizationDAO;
import com.ryhma_3.kaiku.model.database.IMessageDAO;
import com.ryhma_3.kaiku.model.database.IUserDAO;
import com.ryhma_3.kaiku.model.database.MessageDAO;
import com.ryhma_3.kaiku.model.database.UserDAO;
import com.ryhma_3.kaiku.utility.SecurityTools;

/**
 * @author Panu Lindqvist
 * This is a server setup with Authorization listener implemented.
 */
public class ServerInitAuth implements IServerInit {
	
	/*
	 * Default port: 9991
	 */
	private int port = 8083;
	
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
	public ServerInitAuth() {}
	
	/**
	 * Override default port number & host name
	 * @param port
	 * @param hostname
	 */
	public ServerInitAuth(int port, String hostname) {
		this.port = port;
		this.hostname = hostname;
	}

	
	/* (non-Javadoc)
	 * @see com.ryhma_3.kaiku.socket.init.IServerInit#getSocketServer()
	 */
	public SocketIOServer getSocketServer() {
		
		if(server!=null) {
			return server;
		}
		
		Configuration config = new Configuration();
		config.setHostname(hostname);
		config.setPort(port);
		config.setOrigin(hostname + ":" + port);
		
		//confirm not null
		chatDAO = chatDAO == null ? new ChatDAO() : chatDAO;
		messageDAO = messageDAO == null ? new MessageDAO() : messageDAO;
		userDAO = userDAO == null ? new UserDAO() : userDAO;
		
		
		//setup auth listener
		config.setAuthorizationListener(new AuthorizationListener() {
			@Override
			public boolean isAuthorized(HandshakeData data) {
				
				String auth = data.getSingleUrlParam("Authorization");
				
				if(auth.equals("kaiku") || SecurityTools.verifySession(auth)) {
					return true;
				}
				return false;
			}
		});
		
		server = new SocketIOServer(config);
		return server;
	}

	@Override
	public IChatDAO getChatDAO() {
		return chatDAO;
	}

	@Override
	public IMessageDAO getMessageDAO() {
		return messageDAO;
	}

	@Override
	public void setChatDAO(IChatDAO chatDAO) {
		this.chatDAO = chatDAO;
		
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
