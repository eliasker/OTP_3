package ryhma_3.init;

import com.corundumstudio.socketio.SocketIOServer;

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
}
