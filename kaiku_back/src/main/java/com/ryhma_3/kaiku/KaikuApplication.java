package com.ryhma_3.kaiku;

import java.util.Scanner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.ryhma_3.kaiku.model.cast_object.UserObject;
import com.ryhma_3.kaiku.model.database.ChatDAO;
import com.ryhma_3.kaiku.model.database.IChatDAO;
import com.ryhma_3.kaiku.model.database.IMessageDAO;
import com.ryhma_3.kaiku.model.database.IUserDAO;
import com.ryhma_3.kaiku.model.database.MessageDAO;
import com.ryhma_3.kaiku.model.database.UserDAO;
import com.ryhma_3.kaiku.socket.init.IServerInit;
import com.ryhma_3.kaiku.socket.init.ServerInitAuth;
import com.ryhma_3.kaiku.socket.init.ServerInitNoAuth;
import com.ryhma_3.kaiku.socket.server.IServer;
import com.ryhma_3.kaiku.socket.server.Server;
import com.ryhma_3.kaiku.utility.GlobalChats;
import com.ryhma_3.kaiku.utility.SecurityTools;

@SpringBootApplication
public class KaikuApplication {
	
	static IServerInit init = null;
	static Server server = null;
	
	static IChatDAO chatDAO = null;
	static IMessageDAO messageDAO = null;
	static IUserDAO userDAO = null;
	
	public static void main(String[] args) {
		commandLineSetup();
				
		initializeState();

		SpringApplication.run(KaikuApplication.class, args);

		server.start();
	}
	
	
	/**
	 * Make sure global chats are initialized
	 */
	private static void initializeState() {
	
		new GlobalChats();
		GlobalChats.globalChatsInit();
		
		UserObject[] users = userDAO.getAllUsers();
		for(UserObject u : users) {
			SecurityTools.createOrUpdateToken(u.getUser_id(), "");
		}
	}


	/**
	 * Input launch parameters
	 * IMPORTANT: needs to run before launching spring app
	 */
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
			userDAO = new UserDAO();
			messageDAO = new MessageDAO();
			chatDAO = new ChatDAO();
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
		
		
		userDAO = new UserDAO(URI);
		messageDAO = new MessageDAO(URI);
		chatDAO = new ChatDAO(URI);

		init.setChatDAO(chatDAO);
		init.setMessageDAO(messageDAO);
		init.setUserDAO(userDAO);
		
		server = new Server(init);
	
		//end info
		System.out.println("Server will run locally, with:");
		System.out.println("socket in port: " + init.getSocketServer().getConfiguration().getPort());
		System.out.println("Spring rest in port: 8080");;
	}
	
	/**
	 * @return UserDAO
	 */
	public static IUserDAO getUserDAO() {
		return userDAO;
	}
	
	/**
	 * @return MessageDAO
	 */
	public static IMessageDAO getMessageDAO() {
		return messageDAO;
	}
	
	/**
	 * @return ChatDAO
	 */
	public static IChatDAO getChatDAO() {
		return chatDAO;
	}
	
	public static IServer getServer() {
		return server;
	}
	
}
