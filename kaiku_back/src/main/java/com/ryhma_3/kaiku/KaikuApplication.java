package com.ryhma_3.kaiku;

import java.util.Scanner;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.corundumstudio.socketio.SocketIOServer;
import com.ryhma_3.kaiku.model.database.ChatDAO;
import com.ryhma_3.kaiku.socket.init.ChatServerInit;
import com.ryhma_3.kaiku.socket.init.IServerInit;
import com.ryhma_3.kaiku.socket.init.ServerInitAuth;
import com.ryhma_3.kaiku.socket.init.ServerInitNoAuth;
import com.ryhma_3.kaiku.socket.server.Server;

import ch.qos.logback.core.net.SyslogOutputStream;

@SpringBootApplication
public class KaikuApplication {
	
	static IServerInit init = null;
	static Server server = null;

	public static void main(String[] args) {
		commandLineSetup();
		SpringApplication.run(KaikuApplication.class, args);
		

		server.start();
	}

	
	private static void commandLineSetup() {
		Scanner scanner = new Scanner(System.in);
		
		System.out.println("Setup");
		
		
		//select init
		System.out.println("Select init with or without autentication checks");
		System.out.println("1: no auth");
		System.out.println("2: auth");
		System.out.println("just enter to skip setup");
		String select = scanner.nextLine();
		
		if(select.equals("")) {
			init = new ServerInitNoAuth();
			server = new Server(init);
			return;
		}
		
		System.out.println("Give your mongodb URI with username and password:");
		String URI = scanner.next();
		
		if(select.equals("1")) {
			init = new ServerInitNoAuth();
		} else if(select.equals("2")) {
			init = new ServerInitAuth();
		} else {
			System.out.println("bad input");
			System.exit(-1);
		}
		
		init.setChatDAO(new ChatDAO(URI));
//		init.setMessageDAO(new MessageDAO(URI));
		
		server = new Server(init);
	
		//end info
		System.out.println("Server will run locally, with:");
		System.out.println("socket in port: " + init.getSocketServer().getConfiguration().getPort());
		System.out.println("Spring rest in port: 8080");;
	}
}
