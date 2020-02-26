package com.ryhma_3.kaiku;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.corundumstudio.socketio.SocketIOServer;
import com.ryhma_3.kaiku.socket.init.ChatServerInit;
import com.ryhma_3.kaiku.socket.init.IServerInit;
import com.ryhma_3.kaiku.socket.init.ServerInitAuth;
import com.ryhma_3.kaiku.socket.init.ServerInitNoAuth;
import com.ryhma_3.kaiku.socket.server.Server;

@SpringBootApplication
public class KaikuApplication {

	public static void main(String[] args) {
		SpringApplication.run(KaikuApplication.class, args);
		
		IServerInit init = new ServerInitNoAuth();
		Server server = new Server(init);
		
		server.start();
	}

}
