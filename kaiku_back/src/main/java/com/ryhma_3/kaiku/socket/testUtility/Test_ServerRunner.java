package com.ryhma_3.kaiku.socket.testUtility;

import java.io.File;
import java.util.Scanner;

import com.corundumstudio.socketio.SocketIOServer;

import com.ryhma_3.kaiku.socket.init.ChatServerInit;
import com.ryhma_3.kaiku.socket.server.GlobalChatServer;
import com.ryhma_3.kaiku.socket.server.IServer;
import com.ryhma_3.kaiku.socket.server.ServerWithProfiles;
import com.ryhma_3.kaiku.socket.server.ServerWithProfilesAndDatabase;

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
	
	static String SECRETFILE_WINDOWS = "..\\kaiku_back\\secrets\\creds.txt\\";
	static String SECRETFILE_UNIX = "./secrets/creds.txt";
	
	public static void main(String[] args) {
		
		Scanner scanner = new Scanner(System.in);
		ChatServerInit init = new ChatServerInit();
		IServer server = null;
		System.out.println("Choose server to run");
		System.out.println("1: 'GlobalChatServer' to run message only broadcast server");
		System.out.println("2: 'ServerWithProfiles' to run message broadcast server with basic login functionality");
		System.out.println("3: 'ServerWithProfilesAndDatabase' to run connected to mongodb atlas. NEED FILE 'creds' WITH URI IN secret FOLDER!");
		String select = scanner.nextLine();
		
		switch(select) {
		case "1": 
			server = new GlobalChatServer(init);
			break;
		case "2":
			server = new ServerWithProfiles(init);
			break;
		case "3":
			System.out.println("press 1: for windows, 2: for unix");
			String sys = scanner.next();
			
			try {
				if(sys=="1") {
					Scanner filescanner = new Scanner(new File(SECRETFILE_WINDOWS));
					server = new ServerWithProfilesAndDatabase(init, filescanner.nextLine());
				} else if(sys=="2") {
					Scanner filescanner = new Scanner(new File(SECRETFILE_UNIX));
					server  = new ServerWithProfilesAndDatabase(init, filescanner.nextLine());
				} else {
					System.out.println("Bad selection, quitting");
					System.exit(0);
				}
			} catch (Exception e) {
				System.out.println("File /secrets/creds.txt not found! \nExiting");
				System.exit(0);
			}
			
		default:
			System.out.println("Bad input, run again");
			System.exit(0);
			break;
		}
		
		server.start();
		System.out.println("Type 's' to stop server");
		String quit = scanner.next();
		server.stopServer();
		System.out.println("Program will quit..");
	}
}
