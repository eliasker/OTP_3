package com.ryhma_3.kaiku.socket.server;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.Collection;
import java.util.Date;
import java.util.HashMap;

import org.apache.tomcat.util.net.AprEndpoint.SocketList;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;

import com.corundumstudio.socketio.Configuration;
import com.corundumstudio.socketio.SocketIOServer;
import com.ryhma_3.kaiku.KaikuApplication;
import com.ryhma_3.kaiku.model.cast_object.ChatObject;
import com.ryhma_3.kaiku.model.cast_object.MessageObject;
import com.ryhma_3.kaiku.model.database.IChatDAO;
import com.ryhma_3.kaiku.model.database.ILocalizationDAO;
import com.ryhma_3.kaiku.model.database.IMessageDAO;
import com.ryhma_3.kaiku.model.database.IUserDAO;
import com.ryhma_3.kaiku.resource_controllers.Dummies;
import com.ryhma_3.kaiku.socket.init.IServerInit;
import com.ryhma_3.kaiku.utility.SecurityTools;

/**
 * Manually mocking works better than my skill with mockito. This means however that
 * These classes are going to be tough to read. Basically i've extended SocketIO's interfaces
 * and neutered their methods and glued things together, so only the client code is tested.
 * 
 * @author Panu Lindqvist
 *
 */
@TestMethodOrder(OrderAnnotation.class)
class ServerTest {

	static IChatDAO chatDAO = new Dummies().chatDAO;
	static IMessageDAO messageDAO = new Dummies().messageDAO;	
	
	static DummyServer socketServer = new DummyServer(new Configuration());
	static IServerInit dummyInit = new IServerInit() {
		@Override
		public void setUserDAO(IUserDAO userDAO) {}
		@Override
		public void setMessageDAO(IMessageDAO messageDAO) {}
		@Override
		public void setLocalizationDAO(ILocalizationDAO localizationDAO) {}
		@Override
		public void setChatDAO(IChatDAO chatDAO) {}
		@Override
		public IUserDAO getUserDAO() {	return null; }
		@Override
		public SocketIOServer getSocketServer() {	return socketServer; }
		@Override
		public IMessageDAO getMessageDAO() {	return messageDAO; }
		@Override
		public ILocalizationDAO getLocalizationDAO() {	return null; }
		@Override
		public IChatDAO getChatDAO() {	return chatDAO; }
	};

	@BeforeAll
	private static void before() {
		chatDAO.createChatObject(new ChatObject(null, "global", "global", new String[0], null));
		chatDAO.createChatObject(new ChatObject("testChat", "chat", "private", new String[] {"tester1", "tester2"}, null));

		KaikuApplication.setServer(new Server(dummyInit));
		
		KaikuApplication.getServer().start();
	}

	@Test
	@Order(1)
	void onConnectionTest() {
		DummyClient testClient = new DummyClient("tester");
		
		SecurityTools.createOrUpdateToken("tester", "tester");
		socketServer.sendConnectEvent(testClient);
		
		boolean hasConnectEvent = hasCorrectEvent("connect", testClient.clientReceivedEvents);
		
		assertTrue(hasConnectEvent);
		assertEquals(SecurityTools.getCloneOfToken("tester").getSessionID(), testClient.getSessionId());
		
		assertTrue(SecurityTools.getCloneOfToken("tester").isOnline());
	}
	
	@Test
	@Order(2)
	void badConnectingTest() {
		DummyClient testClient = new DummyClient("tester");
		SecurityTools.removeToken("tester");
		socketServer.sendConnectEvent(testClient);
		
		boolean hasDisconnectEvent = hasCorrectEvent("disconnectedByServer", testClient.clientReceivedEvents);
		assertTrue(hasDisconnectEvent);
	}

	@Test
	@Order(3)
	void chatEventTest() {		
		DummyClient tester1 = new DummyClient("tester1");
		DummyClient tester2 = new DummyClient("tester2");
		
		SecurityTools.createOrUpdateToken("tester1", "tester1");
		SecurityTools.createOrUpdateToken("tester2", "tester2");
				
		socketServer.sendConnectEvent(tester1);
		socketServer.sendConnectEvent(tester2);
		
		socketServer.sendChatEvent(tester1, new MessageObject("message content", "1", "tester1", new Date(), "testChat"));
		
		boolean hasChatEvent = hasCorrectEvent("chatEvent", tester2.clientReceivedEvents);
		assertTrue(hasChatEvent);
		
	}
	
	
	@Test
	@Order(4)
	void createChatTest() {
		DummyClient tester3 = new DummyClient("tester3");
		DummyClient tester4 = new DummyClient("tester4");
		
		SecurityTools.createOrUpdateToken("tester3", "tester3");
		SecurityTools.createOrUpdateToken("tester4", "tester4");
		
		socketServer.sendConnectEvent(tester3);
		socketServer.sendConnectEvent(tester4);
		
		socketServer.sendCreateChatEvent(tester3, new ChatObject("testChat2", "chat", "private", new String[] {"tester3", "tester4"}
			, new MessageObject[] {new MessageObject("first message", null, "tester3", null, null)}));
		
		boolean hasCreateChatEvent = hasCorrectEvent("createChatEvent", tester4.clientReceivedEvents);
		assertTrue(hasCreateChatEvent);
	}
	
	@Test
	@Order(5)
	void disconnectTest() {
		DummyClient tester5 = new DummyClient("tester5");
		
		SecurityTools.createOrUpdateToken("tester5", "tester5");
		
		socketServer.sendConnectEvent(tester5);
		
		socketServer.sendDisconnect(tester5);
		
		assertTrue(!SecurityTools.getCloneOfToken("tester5").isOnline());
	}
	
	
	private boolean hasCorrectEvent(String name, HashMap<Object , String> clientReceivedEvents) {
		boolean hasCorrectEvent = false;
		Collection<String> events = clientReceivedEvents.values();
		
		System.out.println("Client received events..");
		for(String s : events) {
			System.out.println(s);
			if(hasCorrectEvent==false)
				hasCorrectEvent = s.equals(name);
		}
		
		return hasCorrectEvent;
	}

}
