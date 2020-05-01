package com.ryhma_3.kaiku.socket.server;

import com.ryhma_3.kaiku.model.cast_object.ChatObject;
import com.ryhma_3.kaiku.socket.init.IServerInit;

/**
 * @author Panu Lindqvist
 *	This is a SockeIOServer wrapper interface. Classes implementing will attach listeners to SocketIOServer they are given.
 */
public interface IServer {
	

	/**
	 * Start the server. This method gets server instance from {@link IServerInit} implementor and attaches 
	 * event listeners to it. At the end of attaching server.start() on SocketIOServer.
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
