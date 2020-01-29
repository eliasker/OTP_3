package Ryhma_3.Kaiku_BE;

import Ryhma_3.Kaiku_BE.server.ChatServerInit;
import Ryhma_3.Kaiku_BE.server.GlobalChatServer;
import junit.framework.Test;
import junit.framework.TestCase;
import junit.framework.TestSuite;

public class ChatServerTest extends TestCase{
	
	public ChatServerTest(String testName) {
		super(testName);
	}
	
	public static Test suite() {
		return new TestSuite(ChatServerTest.class);
	}
	
	public void test() {
		assertTrue(true);
	}
	
	//Run & stop server
	public void testRunServer() {
		ChatServerInit init = new ChatServerInit();
		GlobalChatServer server = new GlobalChatServer(init);

	}
	
	//
}
