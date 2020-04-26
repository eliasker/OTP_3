package com.ryhma_3.kaiku.socket.init;

import com.corundumstudio.socketio.SocketIOServer;
import com.ryhma_3.kaiku.model.database.IAdminDAO;
import com.ryhma_3.kaiku.model.database.IChatDAO;
import com.ryhma_3.kaiku.model.database.ILocalizationDAO;
import com.ryhma_3.kaiku.model.database.IMessageDAO;
import com.ryhma_3.kaiku.model.database.IUserDAO;

/**
 * @author Panu Lindqvist
 * Interface to initialization class. We use interface, so we can modularly switch initialization class to in example testing mock class.
 *
 */
public interface IServerInit {

	/**
	 * Give a configured SocketIOServer to requester.
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
	
	/**
	 * setup specific adminDAO
	 * @param adminDAO
	 */
	void setAdminDAO(IAdminDAO adminDAO);
	
	/**
	 * AdminDAO is configurable in initialization class.
	 * @return adminDAO
	 */
	IAdminDAO getAdminDAO();
	
}
