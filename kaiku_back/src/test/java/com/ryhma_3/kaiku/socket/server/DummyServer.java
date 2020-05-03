package com.ryhma_3.kaiku.socket.server;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import com.corundumstudio.socketio.AckRequest;
import com.corundumstudio.socketio.BroadcastAckCallback;
import com.corundumstudio.socketio.BroadcastOperations;
import com.corundumstudio.socketio.Configuration;
import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIOServer;
import com.corundumstudio.socketio.listener.ConnectListener;
import com.corundumstudio.socketio.listener.DataListener;
import com.corundumstudio.socketio.listener.DisconnectListener;
import com.corundumstudio.socketio.protocol.Packet;
import com.corundumstudio.socketio.protocol.PacketType;
import com.ryhma_3.kaiku.model.cast_object.ChatObject;
import com.ryhma_3.kaiku.model.cast_object.MessageObject;

public class DummyServer extends SocketIOServer {

	ConnectListener connListener;
	DisconnectListener disConnListener;
	
	public ArrayList<SocketIOClient> clients = new ArrayList<>();
	public Map<String, DataListener<?>> listeners = new HashMap<String, DataListener<?>>();
	public ArrayList<Object> received = new ArrayList<>();
	
	public DummyServer(Configuration configuration) {
		super(configuration);
	}

	@Override
	public void addConnectListener(ConnectListener listener) {
		connListener = listener;
	}
	
	@Override
	public void addDisconnectListener(DisconnectListener listener) {
		disConnListener = listener;
	}
	
	@Override
	public BroadcastOperations getBroadcastOperations() {
		return new BroadcastOperations(clients, null) {
			
			@Override
			public <T> void sendEvent(String name, Object data, BroadcastAckCallback<T> ackCallback) {
				for(SocketIOClient c : clients) {
					sendEvent(name, data);
				}
			}
			
			@Override
			public void send(Packet packet) {

			}
		};
	}
	
	@Override
	public <T> void addEventListener(String eventName, Class<T> eventClass, DataListener<T> listener) {
		listeners.put( eventName, listener);
	}
	
	@Override
	public void start() {

	}
	
	@Override
	public void stop() {
	}
	
	@Override
	public SocketIOClient getClient(UUID uuid) {
		for(SocketIOClient c : clients) {
			if(c.getSessionId().equals(uuid)) {
				return c;
			}
		}
		return null;
	}
	
	
	
	/**
	 * @param client
	 */
	public void sendConnectEvent(SocketIOClient client) {
		clients.add(client);
		connListener.onConnect(client);
	}
	
	/**
	 * @param client
	 */
	public void sendDisconnect(SocketIOClient client) {
		clients.remove(client);
		disConnListener.onDisconnect(client);
	}
	
	public void sendChatEvent(SocketIOClient client, MessageObject msg) {
		DataListener<MessageObject> l = (DataListener<MessageObject>) listeners.get("chatEvent");
		try {
			PacketType type = PacketType.MESSAGE;
			Packet packet = new Packet(type);
			
			l.onData(client, msg , new AckRequest(packet , client));
		} catch (Exception e) { 
			e.printStackTrace();
		}
		received.add(msg);
	}
	
	public void sendCreateChatEvent(SocketIOClient client, ChatObject chat) {
		DataListener<ChatObject> l = (DataListener<ChatObject>) listeners.get("createChatEvent");
		
		try {
			PacketType type = PacketType.MESSAGE;
			Packet packet = new Packet(type);
			
			l.onData(client, chat , new AckRequest(packet , client));
		} catch (Exception e) { 
			e.printStackTrace();
		}
		
		received.add(chat);
	}
}



