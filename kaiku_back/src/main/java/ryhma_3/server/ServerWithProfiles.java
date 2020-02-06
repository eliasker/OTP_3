package ryhma_3.server;

import java.util.ArrayList;

import com.corundumstudio.socketio.AckRequest;
import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIOServer;
import com.corundumstudio.socketio.listener.DataListener;

import ryhma_3.castObject.AuthObject;
import ryhma_3.castObject.ChatObject;
import ryhma_3.castObject.ProfileObject;
import ryhma_3.init.IServerInit;

public class ServerWithProfiles implements IServer{
	IServerInit init;
	final SocketIOServer server;
	private ArrayList<ProfileObject> profiles = new ArrayList<>();
	
	/**
	 * @param IServerInit init
	 * This class requires a configuration object as constructor parameter
	 */
	public ServerWithProfiles(IServerInit init) {
		this.init = init;
		server = init.getSocketServer();
	}
	
	public void start() {
		
		server.addEventListener("loginevent", ProfileObject.class, new DataListener<ProfileObject>() {
			@Override
			public void onData(SocketIOClient client, ProfileObject data, AckRequest ackSender) throws Exception {
				profiles.add(data);
				logUsers();
				client.sendEvent("loginevent", new AuthObject("kaiku"));
			}
		
		});
		
		server.addEventListener("chatevent", ChatObject.class, new DataListener<ChatObject>() {
			@Override
			public void onData(SocketIOClient client, ChatObject data, AckRequest ackSender) throws Exception {
				server.getBroadcastOperations().sendEvent("chatevent", data);
				System.out.println(data.getContent());
				
			}
		});
		
		server.start();
	}

	@Override
	public void stopServer() {
		server.stop();
	}
	
	private void logUsers() {
		String users = "";
		for (ProfileObject profileObject : profiles) {
			users += profileObject.getName();
			users += "  ---   ";
		}
		System.out.println(users);
	}
}
