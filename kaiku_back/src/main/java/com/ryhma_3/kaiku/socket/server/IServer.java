package com.ryhma_3.kaiku.socket.server;

import com.ryhma_3.kaiku.model.cast_object.ChatObject;

/**
 * @author Panu Lindqvist
 *	This is a server interface, to make the server class interchangeable.
 */
public interface IServer {
	

	/**
	 * Start the server
	 */
	void start();
	
	
	/**
	 * Stop the server
	 */
	void stopServer();
	
	
	 /**
	  * Send createChatEvent from outside
	 * @param chat {@link ChatObject}
	 */
	void sendCreateChatEvent(ChatObject chat);

}
