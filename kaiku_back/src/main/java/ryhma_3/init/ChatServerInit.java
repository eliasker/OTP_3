package ryhma_3.init;

import com.corundumstudio.socketio.Configuration;
import com.corundumstudio.socketio.SocketIOServer;
import com.corundumstudio.socketio.listener.ClientListeners;

/**
 * @author Panu Lindqvist
 * This is a setup class for the server.
 */
public class ChatServerInit implements IServerInit {
	
	/*
	 * Default port: 9991
	 */
	private int port = 9991;
	
	/*
	 * Default hostname: "localhost"
	 */
	private String hostName = "localhost";
	
	
	/**
	 * Default configuration, see port & hostname
	 */
	public ChatServerInit() {
	}
	
	/**
	 * @param port
	 * @param hostname
	 * Override default port number & host name
	 */
	public ChatServerInit(int port, String hostname) {
		this.port = port;
		this.hostName = hostname;
	}

	
	/*
	 * @see Ryhma_3.Kaiku_BE.server.IChatServerInit#getSocketServer()
	 */
	public SocketIOServer getSocketServer() {
		Configuration config = new Configuration();
		config.setHostname(hostName);
		config.setPort(port);
		
		return new SocketIOServer(config);
	}
	
}
