package com.ryhma_3.kaiku;

import java.io.BufferedReader;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.util.Scanner;

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

/**
 * Boot setup application to chart in parameters before launch. Also a file saving system is implemented
 * for quick laucnh on repetetive use.
 * @author Panu Lindqvist
 */
public class BootApp {
	private static Scanner scanner = new Scanner(System.in);
	private final static String FILEPATH = "secrets/bootConfig.txt";
	
	
	/**
	 * This method will run a console app, that setups the objects with correct variables, and saves the
	 * setup to /secrets/bootConfig.txt
	 * @param objs {@link Object}[]
	 * @return objs {@link Object}[]
	 */
	public static Object[] run(Object[] objs) {
		IChatDAO chatDAO = (IChatDAO) objs[0];
		IMessageDAO messageDAO = (IMessageDAO) objs[1];
		IUserDAO userDAO = (IUserDAO) objs[2];
		ILocalizationDAO localizationDAO = (ILocalizationDAO) objs[3];
		IServer server = (IServer) objs[4];
		IServerInit serverInit = (IServerInit) objs[5];
        IAdminDAO adminDAO = (IAdminDAO) objs[6];
		
		int select = menuMain();
		switch(select) {
		case 1:
			createNewConfiguration();
			break;
		case 2:
			break;
		}
		
		String[] config = readConfig();
		
		if(config[0].equals("")) {
			chatDAO = new ChatDAO();
			messageDAO = new MessageDAO();
			userDAO = new UserDAO();
			localizationDAO = new LocalizationDAO();
		} else {
			chatDAO = new ChatDAO(config[0]);
			messageDAO = new MessageDAO(config[0]);
			userDAO = new UserDAO(config[0]);
			localizationDAO = new LocalizationDAO(config[0]);
		}
		
		if(config[1].equals("1")) {
			serverInit = new ServerInitNoAuth(Integer.parseInt(config[2]), config[3]);
		} else {
			serverInit = new ServerInitAuth(Integer.parseInt(config[2]), config[3]);
		}
		
		serverInit.setChatDAO(chatDAO);
		serverInit.setLocalizationDAO(localizationDAO);
		serverInit.setMessageDAO(messageDAO);
		serverInit.setUserDAO(userDAO);
		serverInit.setAdminDAO(adminDAO);
		
		server = new Server(serverInit);
		
		return new Object[] {
            chatDAO,
            messageDAO,
            userDAO,
            localizationDAO,
            server,
            serverInit,
            adminDAO
        };
	}
	
	
	private static void createNewConfiguration() {
		String mongoURI = menuNewConfigMongo();
		int select = menuNewConfigServerInitType();
		
		String[] conf = menuNewConfigServerInitParams();
		int port = 9991;
		String hostname = "localhost";
		if(conf!=null) {
			port = Integer.parseInt(conf[0]);
			hostname = conf[1];
		}
		
		writeConfig(new String[] {mongoURI, String.valueOf(select), String.valueOf(port), hostname});
	}
	
	
	private static void writeConfig(String[] params) {
		StringBuffer file = new StringBuffer();
		for(int i=0; i<params.length; i++) {
			file.append(params[i] + ";");
		}
		
		try (
				FileOutputStream fos = new FileOutputStream(FILEPATH)
		) {
			fos.write(file.toString().getBytes());
			fos.close();
		} catch (Exception e) {}
	}
	
	
	private static String[] readConfig() {
		try (
			FileReader fr = new FileReader(FILEPATH);
			BufferedReader br = new BufferedReader(fr);
		) {
			String line = br.readLine();
			return line.split(";");
		} catch(Exception e) {}
		return null;
	}
	
	
	private static int readInt() {
		int i = -1;
		try {
			String s = scanner.next();
			i = Integer.parseInt(s);
		} catch(Exception e) {
			System.out.println("Bad input!");
			System.exit(-1);
		}
		return i;
	}
	
	private static int menuMain() {
		System.out.println("****SETUP****");
		System.out.println("1: save new local configuration");
		System.out.println("2: load previous configuration");
		return readInt();
	}
	
	private static String menuNewConfigMongo() {
		System.out.println("****Mongo****");
		System.out.println("Write mongodb address:");
		System.out.println("..OR press enter to use local filestructure");
		scanner.nextLine();
		String mongo = scanner.nextLine();
		return mongo;
	}
	
	private static int menuNewConfigServerInitType() {
		System.out.println("****Server init****");
		System.out.println("1: no auth\n2: auth");
		return readInt();
	}
	
	private static String[] menuNewConfigServerInitParams() {
		System.out.println("1: Write port & hostname\n2: use defaults");
		int select = readInt();
		switch(select) {
		case 1:
			System.out.println("Port...");
			String port = scanner.next();
			
			System.out.println("Hostname... (ip address or URL");
			String hn = scanner.next();
			
			return new String[] {port, hn};
		case 2:
			return null;
		} 
		
		return null;
	}
}
