package com.ryhma_3.kaiku.socket.server;

import java.net.SocketAddress;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

import com.corundumstudio.socketio.AckCallback;
import com.corundumstudio.socketio.HandshakeData;
import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIONamespace;
import com.corundumstudio.socketio.Transport;
import com.corundumstudio.socketio.protocol.Packet;

public class DummyClient implements SocketIOClient{
	
	UUID uuid = UUID.randomUUID();
	String token = "";
	HashMap<Object , String> clientReceivedEvents = new HashMap<>();
	
	public DummyClient(String token) {
		this.token = token;
	}
	
	@Override
	public void set(String key, Object val) {	}
	@Override
	public boolean has(String key) {return false;}
	@Override
	public <T> T get(String key) {	return null;}
	@Override
	public void del(String key) {}	
	@Override
	public void sendEvent(String name, Object... data) {	clientReceivedEvents.put(data, name); }
	@Override
	public void send(Packet packet) {			}
	@Override
	public void disconnect() {	clientReceivedEvents.put(new Object(), "disconnectedByServer");	}
	@Override
	public void sendEvent(String name, AckCallback<?> ackCallback, Object... data) {	clientReceivedEvents.put(data, name);}	
	@Override
	public void send(Packet packet, AckCallback<?> ackCallback) {}
	@Override
	public void leaveRoom(String room) {}
	@Override
	public void joinRoom(String room) {			}
	@Override
	public boolean isChannelOpen() {return false;}
	@Override
	public Transport getTransport() {return null;}
	@Override
	public UUID getSessionId() { return uuid; }
	@Override
	public SocketAddress getRemoteAddress() {return null;}
	@Override
	public SocketIONamespace getNamespace() {return null;}
	@Override
	public HandshakeData getHandshakeData() {
		Map<String, List<String>> params = new HashMap<>();
		params.put("Authorization", new ArrayList<String>(Arrays.asList(token)) );
		return new HandshakeData(null, params, null, "", true);
	}
	@Override
	public Set<String> getAllRooms() {return null;}
}
