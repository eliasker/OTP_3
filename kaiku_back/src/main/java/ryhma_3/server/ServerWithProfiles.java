package ryhma_3.server;

import java.util.ArrayList;

import com.corundumstudio.socketio.AckRequest;
import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIOServer;
import com.corundumstudio.socketio.listener.DataListener;

import ryhma_3.castObject.AuthObject;
import ryhma_3.castObject.ChatObject;
import ryhma_3.castObject.AccountObject;
import ryhma_3.init.IServerInit;

public class ServerWithProfiles implements IServer{
	IServerInit init;
	final SocketIOServer server;
	private ArrayList<AccountObject> profiles = new ArrayList<>();

	/**
	 * @param IServerInit init
	 * This class requires a configuration object as constructor parameter
	 */
	public ServerWithProfiles(IServerInit init) {
		this.init = init;
		server = init.getSocketServer();
	}
	
	public void start() {
		
		server.addEventListener("loginevent", AccountObject.class, new DataListener<AccountObject>() {
			@Override
			public void onData(SocketIOClient client, AccountObject data, AckRequest ackSender) throws Exception {
				//TODO: Add confirmation that profile doesn't exist
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
		for (AccountObject profileObject : profiles) {
			users += profileObject.getUsername() + "/" + profileObject.getPassword() + "/" + profileObject.getName() ;
			users += "  ---   ";
		}
		System.out.println(users);
	}
	
}
