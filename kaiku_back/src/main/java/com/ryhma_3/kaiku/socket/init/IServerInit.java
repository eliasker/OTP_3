package com.ryhma_3.kaiku.socket.init;

import com.corundumstudio.socketio.SocketIOServer;
import com.ryhma_3.kaiku.model.database.IChatDAO;
import com.ryhma_3.kaiku.model.database.IMessageDAO;
import com.ryhma_3.kaiku.model.database.IUserDAO;

/**
 * @author Panu Lindqvist
 * Interface to initialization class. We use interface, so we can modularly switch initialization class to in example testing mock class.
 *
 */
public interface IServerInit {

	/**
	 * @return configured SocketIOServer
	 * Give a configured SocketIOServer to requester.
	 */
	SocketIOServer getSocketServer();
	
	
	/**
	 * @param chatDAO
	 * Setup specific chatDAO
	 */
	void setChatDAO(IChatDAO chatDAO);
	
	/**
	 * @return ChatDAO
	 * ChatDAO is configurable in initialization class.
	 */
	IChatDAO getChatDAO();
	
	
	/**
	 * @param messageDAO
	 * Setup specific messageDAO
	 */
	void setMessageDAO(IMessageDAO messageDAO);
	
	
	/**
	 * @return MessageDAO
	 * MessageDAO is configurable in initialization class.
	 */
	IMessageDAO getMessageDAO();
	
	
	
	/**
	 * @param userDAO
	 * setup specific userDAO
	 */
	void setUserDAO(IUserDAO userDAO);
	
	
	
	/**
	 * @return userDAO
	 * UserDAO is configurable in initialization class.
	 */
	IUserDAO getUserDAO();
}
