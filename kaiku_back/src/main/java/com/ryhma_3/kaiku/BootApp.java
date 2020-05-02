package com.ryhma_3.kaiku;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Scanner;
import java.util.Set;

import com.ryhma_3.kaiku.model.database.ChatDAO;
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
	
/********************************VERSION*********************************/
//	Version number of this boot loader that is type of { x.y } 
//	If you are making changes that are..
//		- NOT backwards compatable, change x
//		- MIGHT be backwards compatable change y
	
	private static final double BOOT_VERSION_NUMBER = 1.0;
	
/************************************************************************/
	
	private static Scanner scanner = new Scanner(System.in);
	private final static String FILEPATH = "secrets/bootConfig.txt";
	
	static final int DEFAULT_PORT = 8083;
	static final String DEFAULT_HOSTNAME = "localhost";
	static final String DEFAULT_ORIGIN = "*";
	
	
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
		
		int select = menuMain();
		switch(select) {
		case 1:
			createNewConfiguration();
			break;
		case 2:
			break;
		}
				
		//Boot config version check
		HashMap<String, String> config = readConfig();
		checkBootVersion(config);
		
		
		if(config.get("mongoURI")=="") {
			chatDAO = new ChatDAO();
			messageDAO = new MessageDAO();
			userDAO = new UserDAO();
			localizationDAO = new LocalizationDAO();
		} else {
			chatDAO = new ChatDAO(config.get("mongoURI"));
			messageDAO = new MessageDAO(config.get("mongoURI"));
			userDAO = new UserDAO(config.get("mongoURI"));
			localizationDAO = new LocalizationDAO(config.get("mongoURI"));
		}
		
		if(config.get("selectInitType").equals("1")) {
			
			serverInit = new ServerInitNoAuth(
					Integer.parseInt(config.get("port"))
					, config.get("hostname")
					, config.get("origin")
					);
			
		} else {
			serverInit = new ServerInitAuth(
					Integer.parseInt(config.get("port"))
					, config.get("hostname")
					, config.get("origin")
					);
		}
		
		serverInit.setChatDAO(chatDAO);
		serverInit.setLocalizationDAO(localizationDAO);
		serverInit.setMessageDAO(messageDAO);
		serverInit.setUserDAO(userDAO);
		
		server = new Server(serverInit);
		
		return new Object[] {chatDAO, messageDAO, userDAO, localizationDAO, server, serverInit};
	}
	
	
	private static HashMap<String, String> createNewConfiguration() {
		HashMap<String, String> newConfig = new HashMap<>();
		
		String mongoURI = menuNewConfigMongo();
		newConfig.put("mongoURI", mongoURI);
		
		int select = menuNewConfigServerInitType();
		newConfig.put("selectInitType", String.valueOf(select));
		
		String[] conf = menuNewConfigServerInitParams();
		int port = DEFAULT_PORT;
		String hostname = DEFAULT_HOSTNAME;
		String origin = DEFAULT_ORIGIN;
		if(conf!=null) {
			port = Integer.parseInt(conf[0]);
			hostname = conf[1];
			origin = conf[2];
		}
		newConfig.put("port", String.valueOf(port));
		newConfig.put("hostname", hostname);
		newConfig.put("origin", origin);
		
		writeConfig(newConfig);
		return newConfig;
	}
	
	
	private static void writeConfig(HashMap<String, String> params) {
		File file = new File(FILEPATH);
		StringBuffer content = new StringBuffer();
		Set<String> keys = params.keySet();
		
		for(String key : keys) {
			String value = params.get(key);
			
			content.append(key + "," + value + ";");
			
		}
		
		content.append("version," + BOOT_VERSION_NUMBER + ";");
		
		try (
				FileOutputStream fos = new FileOutputStream(FILEPATH, false)
		) {
			file.createNewFile();
			fos.write(content.toString().getBytes());
			fos.close();
		} catch (Exception e) {}
	}
	
	
	private static HashMap<String, String> readConfig() {
		
		HashMap<String, String> config = new HashMap<>();
		
		try (
			FileReader fr = new FileReader(FILEPATH);
			BufferedReader br = new BufferedReader(fr);
		) {
			String line = br.readLine();
			String[] pairs = line.split(";");
						
			for(String pair : pairs) {
								
				String[] separated = pair.split(",");
				
				try { 
					separated[1].toString();
				} catch(IndexOutOfBoundsException ie) {
					separated = new String[] {separated[0], ""};
				}

				config.put(separated[0], separated[1]);
				
			}
		} catch(Exception e) {e.printStackTrace();}
		return config;
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
		System.out.println("1: Write port & hostname & origin \n2: use defaults");
		int select = readInt();
		switch(select) {
		case 1:
			System.out.println("Write the port number from which you want to run socket server..");
			String port = scanner.next();
			
			System.out.println("Write the host name, ie. localhost or 10.114.32.19");
			String hn = scanner.next();
			
			System.out.println("Write the origin of front-end as 'ip:port' ie. 'http://localhost:3000' \n"
					+ " (seems to work only on local testing)");
			String o = scanner.next();
			
			return new String[] {port, hn, o};
		case 2:
			System.out.println();
			
			return null;
		} 
		
		return null;
	}
	
	
	private static void checkBootVersion(HashMap<String, String> config) {
		
		//Null or incompatable
		if(config.get("version")==null 
				|| BOOT_VERSION_NUMBER - Double.parseDouble(config.get("version")) >= 1) { 
				System.out.println("\n!!!Config version behid application (critical)!!!\nClient must update bootConfig..\n");
				config = createNewConfiguration();
			
		//Might be incompatible
		} else if (BOOT_VERSION_NUMBER - Double.parseDouble(config.get("version")) > 0) {
				System.out.println("\n!!!Config version behind application (not critical)!!!\n"
						+ "New boot config is recommended. type (y/n)");
				String command = scanner.next().toLowerCase();
				if(command.equals("y")) {
					config = createNewConfiguration();
				}
			
		//Might be incompatible
		} else if (BOOT_VERSION_NUMBER - Double.parseDouble(config.get("version")) < 0) {
				System.out.println("!!!Config version is ahead of the application!!!\n "
						+ "Create new config: (y/n)");
				String command = scanner.next().toLowerCase();
				if(command.equals("y")) {
					config = createNewConfiguration();
				}
		}
	}
}
