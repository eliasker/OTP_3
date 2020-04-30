package com.ryhma_3.kaiku.socket.init;

import com.corundumstudio.socketio.SocketIOServer;
import com.ryhma_3.kaiku.model.database.IChatDAO;
import com.ryhma_3.kaiku.model.database.ILocalizationDAO;
import com.ryhma_3.kaiku.model.database.IMessageDAO;
import com.ryhma_3.kaiku.model.database.IUserDAO;

/**
 * @author Panu Lindqvist
 * Interface to SocketServer initialization class. Classes implementing this interface will have contain methods to create or return existing socket servers,
 * and methods to return Chat, Message, and User data-access-objects
 */
public interface IServerInit {

	/**
	 * Get a SocketIOServer. If server is not instatiated, creates and return the server, else returns previously created server.
	 * @return configured SocketIOServer
	 */
	SocketIOServer getSocketServer();
	
	
	/**
	 * Setup specific chatDAO
	 * @param chatDAO
	 */
	void setChatDAO(IChatDAO chatDAO);
	
	/**
	 * ChatDAO is configurable in initialization class.
	 * @return ChatDAO
	 */
	IChatDAO getChatDAO();
	
	/**
	 * Setup specific LocalizationDAO
	 * @param chatDAO
	 */
	void setLocalizationDAO(ILocalizationDAO localizationDAO);
	
	/**
	 * LocalizationDAO is configurable in initialization class.
	 * @return ChatDAO
	 */
	ILocalizationDAO getLocalizationDAO();
	
	/**
	 * Setup specific messageDAO
	 * @param messageDAO
	 */
	void setMessageDAO(IMessageDAO messageDAO);
	
	
	/**
	 * MessageDAO is configurable in initialization class.
	 * @return MessageDAO
	 */
	IMessageDAO getMessageDAO();
	
	
	
	/**
	 * setup specific userDAO
	 * @param userDAO
	 */
	void setUserDAO(IUserDAO userDAO);
	
	
	
	/**
	 * UserDAO is configurable in initialization class.
	 * @return userDAO
	 */
	IUserDAO getUserDAO();
	
	
}
