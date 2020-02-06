package ryhma_3.testUtility;

import java.util.Scanner;

import com.corundumstudio.socketio.SocketIOServer;

import ryhma_3.init.ChatServerInit;
import ryhma_3.server.GlobalChatServer;
import ryhma_3.server.IServer;
import ryhma_3.server.ServerWithProfiles;

/**
 * @author Panu Lindqvist
 * Runs a global chat server, can be connected to from same network.
 * 
 * JS code that sends has been used to test functionality
 * 
 * const init = () => {
   socket = socketIO.connect('http://localhost:9991');

   socket.on('connect', function(){
     console.log('connect');
   });
  
   socket.on('chatevent', function(data){
     console.log('chatevent');
     console.log(data);

  
   socket.on('disconnect', function(){
     console.log('disconnect');
     socket.disconnect();
   });
 }

 * 
 * 
 * const sendMessage = (message) => {
  	const jsonObj = {
    user: userName,
    message: message
  }

  socket.emit('chatevent', jsonObj);
}
 */
public class Test_ServerRunner {
	public static void main(String[] args) throws InterruptedException {
		
		Scanner scanner = new Scanner(System.in);
		boolean running = true;
		ChatServerInit init = new ChatServerInit();
		IServer server = null;
		System.out.println("Choose server to run");
		System.out.println("1: 'GlobalChatServer' to run message only broadcast server");
		System.out.println("2: 'ServerWithProfiles' to run message broadcast server with basic login functionality");
		String select = scanner.nextLine();
		
		switch(select) {
		case "1": 
			server = new GlobalChatServer(init);
			break;
		case "2":
			server = new ServerWithProfiles(init);
			break;
		default:
			System.out.println("Bad input, run again");
			running = false;
			break;
		}
		if(running) {
			server.start();
			System.out.println("Type 's' to stop server");
			String quit = scanner.next();
			server.stopServer();
		}
		System.out.println("Program will quit..");
	}
}
