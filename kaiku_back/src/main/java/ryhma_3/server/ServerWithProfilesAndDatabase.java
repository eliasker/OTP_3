package ryhma_3.server;

import com.corundumstudio.socketio.AckRequest;
import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIOServer;
import com.corundumstudio.socketio.listener.ConnectListener;
import com.corundumstudio.socketio.listener.DataListener;
import com.corundumstudio.socketio.listener.DisconnectListener;

import ryhma_3.castObject.AccountObject;
import ryhma_3.castObject.AuthObject;
import ryhma_3.castObject.ChatObject;
import ryhma_3.database.AccountsDAO;
import ryhma_3.init.IServerInit;

public class ServerWithProfilesAndDatabase implements IServer{
	
	final SocketIOServer server;
	final AccountsDAO accountDAO;
	IServerInit init;

	
	public ServerWithProfilesAndDatabase(IServerInit init, String URI) {
		this.init = init;
		this.accountDAO = new AccountsDAO(URI);
		server = init.getSocketServer();
	}

	@Override
	public void start() {
		
		//Connect listener
		server.addConnectListener(new ConnectListener() {
			@Override
			public void onConnect(SocketIOClient client) {
				System.out.println("new client: " + client.getSessionId() + " connected");
			}
		});
		
		//global chat listener
		server.addEventListener("chatevent", ChatObject.class, new DataListener<ChatObject>() {
			@Override
			public void onData(SocketIOClient client, ChatObject data, AckRequest ackSender) throws Exception {
				//data = DAO.createMessage(data);
				server.getBroadcastOperations().sendEvent("chatevent", data);
				System.out.println(data.getContent());
			}
		});
		
		
		//sign in listener
		server.addEventListener("signinevent", AccountObject.class, new DataListener<AccountObject>() {
			@Override
			public void onData(SocketIOClient client, AccountObject data, AckRequest ackSender) throws Exception {
				//data = accountDAO.createAccount(data);
				accountDAO.createAccount(data);
				data.setPassword(null);
				client.sendEvent("signinevent", data);
				System.out.println("created account: " + data.getUsername());
			}
		});
		
		
		//log in listener
		server.addEventListener("loginevent", AccountObject.class, new DataListener<AccountObject>() {
			@Override
			public void onData(SocketIOClient client, AccountObject data, AckRequest ackSender) throws Exception {
				//data = accountDAO.getAccout(data);
				client.sendEvent("loginevent", new AuthObject("kaiku"));
				System.out.println("User: " + data.getUsername() + " logged in");
			}
		});
		
		
		//Disconnect listener
		server.addDisconnectListener(new DisconnectListener() {
			@Override
			public void onDisconnect(SocketIOClient client) {
				System.out.println("client: " + client.getSessionId() + " disconnected");
			}
		});
		
	}

	@Override
	public void stopServer() {
		server.stop();
	}

}
