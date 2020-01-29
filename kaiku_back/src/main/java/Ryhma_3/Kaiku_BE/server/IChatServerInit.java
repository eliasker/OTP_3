package Ryhma_3.Kaiku_BE.server;

import com.corundumstudio.socketio.SocketIOServer;

/**
 * @author Panu Lindqvist
 * Interface to initialisation class. We use interface, so we can modularly switch initialisation class to in example testing mock class.
 *
 */
public interface IChatServerInit {

	/**
	 * Give a configured SocketIOServer to requester.
	 * @return configured SocketIOServer
	 */
	SocketIOServer getSocketServer();
}
