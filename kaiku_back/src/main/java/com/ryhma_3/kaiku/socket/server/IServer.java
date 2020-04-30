package com.ryhma_3.kaiku.socket.server;

import com.ryhma_3.kaiku.model.cast_object.ChatObject;

/**
 * @author Panu Lindqvist
 *	This is a SockeIOServer interface. Classes implementing this contain socket message listeners, and other methods.
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
	  * Send createChatEvent from other than socket source. (ie. creating a groupchat form admin dashboard happens trhough REST api, not socketIO)
	 * @param chat {@link ChatObject}
	 */
	void sendCreateChatEvent(ChatObject chat);

}
