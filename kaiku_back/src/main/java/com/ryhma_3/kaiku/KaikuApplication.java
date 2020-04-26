package com.ryhma_3.kaiku;

import java.util.Scanner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.ryhma_3.kaiku.model.cast_object.UserObject;
import com.ryhma_3.kaiku.model.database.AdminDAO;
import com.ryhma_3.kaiku.model.database.ChatDAO;
import com.ryhma_3.kaiku.model.database.IAdminDAO;
import com.ryhma_3.kaiku.model.database.IChatDAO;
import com.ryhma_3.kaiku.model.database.ILocalizationDAO;
import com.ryhma_3.kaiku.model.database.IMessageDAO;
import com.ryhma_3.kaiku.model.database.IUserDAO;
import com.ryhma_3.kaiku.model.database.LocalizationDAO;
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
	static IServer server = null;
	
	static IChatDAO chatDAO = null;
	static IMessageDAO messageDAO = null;
	static IUserDAO userDAO = null;
    static IAdminDAO adminDAO = null;
    static ILocalizationDAO localizationDAO = null;
	
	public static void main(String[] args) {
		Object[] objs = new Object[] {
            chatDAO,
            messageDAO,
            userDAO,
            localizationDAO,
            server,
            init,
            adminDAO
        };
		
		//run boot setup
		objs = BootApp.run(objs);
		
		chatDAO = (IChatDAO) objs[0];
		messageDAO = (IMessageDAO) objs[1];
		userDAO = (IUserDAO) objs[2];
		localizationDAO = (ILocalizationDAO) objs[3];
		server = (IServer) objs[4];
		init = (IServerInit) objs[5];
		adminDAO = (IAdminDAO) objs[6];
						
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
	
	/**
	 * @return AdminDAO
	 */
	public static IAdminDAO getAdminDAO() {
		return adminDAO;
	}

	public static IServer getServer() {
		return server;
	}

    public static ILocalizationDAO getLocalizationDAO() {
        return localizationDAO;
    }

}
