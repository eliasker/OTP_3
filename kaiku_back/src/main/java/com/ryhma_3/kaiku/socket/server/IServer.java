package com.ryhma_3.kaiku.socket.server;

import java.lang.reflect.Constructor;
import java.util.UUID;

import com.ryhma_3.kaiku.model.cast_object.ChatObject;
import com.ryhma_3.kaiku.utility.Token;

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
