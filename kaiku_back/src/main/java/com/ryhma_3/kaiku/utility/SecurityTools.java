package com.ryhma_3.kaiku.utility;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.UUID;

import org.jasypt.util.password.BasicPasswordEncryptor;

/**
 * @author Panu Lindqvist
 * Utility for following security measures: 
 * - Encryption
 * - Encrypt comparing
 * - Token container
 * - Token operations
 */
public class SecurityTools {
	
	private final static BasicPasswordEncryptor cryptor = new BasicPasswordEncryptor();
	
	private final static Object lock = new Object();
	
	/**
	 * Token store
	 * <Session id: UUID, user_id: String, tokenString: String>
	 */
	private static volatile ArrayList<Token> tokenDataStore = new ArrayList<>();
	
	private static volatile boolean operatingTokens = false;
	
	
	/**
	 * Secure passwords by encryption.
	 * @param string
	 * @return Encrypted string
	 */
	public static String encrypt(String string) {
		return cryptor.encryptPassword(string);
	}
	
	
	/**
	 * Check if encryptedPWS matches given PSW
	 * @param encryptedPSW {@link String}
	 * @param PSW {@link String}
	 * @return match {@link Boolean}
	 */
	public static boolean compare(String encryptedPSW, String PSW) {
		boolean match = cryptor.checkPassword(PSW, encryptedPSW) ? true : false;
		return match;
	}
	
	
	/**
	 * generate a token string. Doesn't itself contain any information
	 * @return random String of 128 characters
	 */
	private static String genRandomString() {
		String tokenString = "";
		
		String[] characters = { "a","b","c","e","f","g","h","k","l","m","n","o","p","q","r","s","t","u","v","x","y","z" };
		String[] nums = {"1","2","3","4","5","6","7","8","9","0" };
		
		for(int i=0; i<128; i++) {
			if(randomGen(2)==0) {
				if(randomGen(2)==0) {
					tokenString = tokenString.concat(characters[randomGen(characters.length)].toUpperCase());
				} else {
					tokenString = tokenString.concat(characters[randomGen(characters.length)]);
				}
			} else {
				tokenString = tokenString.concat(nums[randomGen(nums.length)]);
			}
		}
		return tokenString;
	}
	
	
	/**
	 * Helper for generating integers
	 * @param max integer
	 * @return random integer
	 */
	private static int randomGen(int max) {
		return (int) Math.floor(Math.random() * (max));
	}
	
	
	
	/**
	 * Get a users token {@link Token} with user_id OR tokenString. 
	 * @param user_id || tokenString {@link String}
	 * @return token {@link Token}
	 */
	public static Token getCloneOfToken(String searchInput){
		synchronized (lock) {
			try {
				//wait for monitor
				while(operatingTokens) {
					lock.wait();
				}
				operatingTokens = true;
				
				Token searched = null;
				
				for (Token token : tokenDataStore) {
					searched = new Token(token);
					
					if(!searched.getUser_id().equals(searchInput) 
							&& !searched.getTokenString().equals(searchInput)) {
						searched = null;
						continue;
					}
					break;
				}
	
				releaseObjectLock("clone: success", false);
				return searched;
				
			} catch(Exception e) {
				e.printStackTrace();
				releaseObjectLock("clone: exception", true);
				return null;
			}
		}
	}
	
	
	/**
	 * Get a users token with a sessionID
	 * @param sessionID {@link UUID}
	 * @return token {@link Token}
	 */
	public static Token getCloneOfToken(UUID sessionID) {
		synchronized (lock) {
			try {
				//wait for monitor
				while(operatingTokens) {
					lock.wait();
				}
				operatingTokens = true;
				
				Token searched = null;
				
				for(Token token : tokenDataStore) {
					
					searched = new Token(token);
					
					//discount null id's
					if(searched.getSessionID() == null) {
						continue;
					}
					
					//discount wrong id's
					if(!searched.getSessionID().equals(sessionID)) {
						searched = null;
						continue;
					} else {
						releaseObjectLock("clone: success", false);
						return searched;
					}
				}
				
				releaseObjectLock("clone: no matching token foudn", true);
				return searched;
				
			} catch(Exception e) {
				e.printStackTrace();
				releaseObjectLock("clone: exception", true);
				return null;
			}
		}
	}
	
	
	
	/**
	 * Create or update a user-specific token. On first connect user gets a new entry on tokenDataStore list, on consecutive connections a new token string 
	 * is created and previous value on tokenDataStorage is replaced.
	 * @param user_id {@link String}
	 * @return token {@link Token}
	 */
	public static Token createOrUpdateToken(String user_id) {
		synchronized (lock) {
			try {
				while(operatingTokens) {
					lock.wait();
				}
				operatingTokens = true;
				
				Token searched = null;
				
				//update
				for (int i=0; i<tokenDataStore.size(); i++) {
					searched = tokenDataStore.get(i);
					
					if(!searched.getUser_id().equals(user_id)) {
						continue;
					}
					
					//update success
					searched = new Token(null, user_id, genRandomString());
					tokenDataStore.set(i, searched);					
					releaseObjectLock("update token: success", false);
					return new Token(searched);
				}
				
				
				//create if update fails
				Token tokenToAdd = new Token(null, user_id, genRandomString());
				tokenDataStore.add(tokenToAdd);
				
				releaseObjectLock("create token: success", false);
				return new Token(tokenToAdd);
		
			} catch(Exception e) {
				e.printStackTrace();
				releaseObjectLock("create token: exception", true);
				return null;
			}
		}
	}
	
	
	
	/**
	 * override,
	 * Create or update a user-specific token. On first connect user gets a new entry on tokenDataStore list, on consecutive connections a new token string 
	 * is created and previous value on tokenDataStorage is replaced.
	 * @param user_id {@link String}
	 * @param tokenString {@link String}
	 * @return token {@link Token}
	 */
	public static Token createOrUpdateToken(String user_id, String tokenString) {
		synchronized (lock) {
			try {
				while(operatingTokens) {
					lock.wait();
				}
				operatingTokens = true;
				
				Token searched = null;
				
				//update
				for (int i=0; i<tokenDataStore.size(); i++) {
					searched = tokenDataStore.get(i);
					
					if(!searched.getUser_id().equals(user_id)) {
						continue;
					}
					
					//update success
					searched = new Token(searched.getSessionID(), user_id, tokenString);
					tokenDataStore.set(i, searched);

					releaseObjectLock("update token: success", false);
					return new Token(searched);
				}
				
				
				//create if update fails
				Token tokenToAdd = new Token(null, user_id, tokenString);
				tokenDataStore.add(tokenToAdd);
				
				releaseObjectLock("create token: success", false);
				return new Token(tokenToAdd);
		
			} catch(Exception e) {
				e.printStackTrace();
				releaseObjectLock("create token: exception", true);
				return null;
			}
		}
	}
	
	/**
	 * Verify that submitted tokenString exist
	 * @param tokenString {@link String}
	 * @return boolean - did the operation succeed {@link Boolean}
	 */
	public static boolean verifySession(String tokenString) {
		synchronized (lock) {
			try {
				//wait for monitor
				while(operatingTokens){
					lock.wait();
				}
				operatingTokens = true;
				
				Token searched = null;
				
				for (Token token : tokenDataStore) {
					searched = token;
					if(!searched.getTokenString().equals(tokenString)) {
						searched = null;
						continue;
					}
					
					//task succeeded
					releaseObjectLock("token verified: success", false);
					return true;
				}
							
				//task failed / not found
				releaseObjectLock("token verified: fail", false);
				return false;
				
			} catch(Exception e) {
				e.printStackTrace();
				releaseObjectLock("token verified: exception", true);
				//Task failed / exception
				return false;
			}
		}
	}
	
	

	/**
	 * Try to find given tokenString  form tokenDataStorage, and connect given UUID to it.
	 * @param tokenString {@link String}
	 * @param sessionID {@link UUID}
	 * @return success {@link Boolean}
	 */
	public static boolean attachSessionToToken(String tokenString, UUID sessionID) {
		synchronized (lock) {
			try {
				//wait for monitor
				while(operatingTokens){
					lock.wait();
				}
				operatingTokens = true;
				
				Token searched = null;
				
				for (int i=0; i<tokenDataStore.size(); i++) {
					searched = tokenDataStore.get(i);
					if(!searched.getTokenString().equals(tokenString)) {
						continue;
					}
					
					//task succeeded					
					searched = new Token(sessionID, searched.getUser_id(), searched.getTokenString());
					tokenDataStore.set(i, searched);										
					releaseObjectLock("connect UUID to token: success", true);
					return true;
				}
				
				//task failed
				releaseObjectLock("connect UUID to token: fail", true);
				return false;
				
			} catch(Exception e) {
				releaseObjectLock("connect UUID to token: exception", true);
				e.printStackTrace();
				return false;
			}
		}
	}	
	
	
	/**
	 * Remove token from tokenDataStorage
	 * @param user_id  {@link String}
	 * @return boolean success {@link Boolean}
	 */
	public static boolean removeToken(String user_id) {
		synchronized (lock) {
			try {
				while(operatingTokens) {
					lock.wait();
				}
				operatingTokens = true;
				
				//Find and destroy token				
				for(Iterator<Token> iterator = tokenDataStore.iterator(); iterator.hasNext();) {
					Token token = iterator.next();
					if(token.getUser_id().equals(user_id)) {
						iterator.remove();
					}
				}
				
				releaseObjectLock("removed token", true);
				return true;
				
			}catch(Exception e) {
				releaseObjectLock("remove token exception", true);
				e.printStackTrace();
				return false;
			}
		}
	}
	
	
	/**
	 * Get a map portraying user base's online status'
	 * @return map <user_id, isOnline> {@link HashMap}
	 */
	public static HashMap<String, Boolean> getUserStatusMap(){
		HashMap<String, Boolean> map = new HashMap<>();
		for(Token u : tokenDataStore) {
			map.put(u.getUser_id(), u.isOnline());
		}
		return map;
	}
	
	
	/**
	 * Set user's status online
	 * @param id {@link String}
	 * @param online {@link Boolean}
	 */
	public static void setUserStatus(String id, boolean online) {
		synchronized (lock) {
			for(Token t : tokenDataStore) {
				if(t.getUser_id().equals(id)) {
					t.setOnline(online);
					break;
				}
			}
		}
	}

	
	
	/**
	 * Iterate through all of token base and confirm user token set online is found in snapshot of server's clients
	 * @param users Collectin<UUID>
	 */
	public static void updateEveryUserStatus(Collection<UUID> users) {
		synchronized (lock) {
			for(Token t : tokenDataStore) {
				if(t.isOnline()) {
					users.contains(t.getSessionID());
				} else {
					t.setOnline(false);
				}
			}
		}
	}
	

	/**
	 * Dual function:  1. Release Java syncronization lock   2. Send event to logger.
	 * @param location String (message)
	 * @param show boolean
	 */
	private static void releaseObjectLock(String location, boolean show) {
		if(show) {
			Logger.log("SECURITYTOOLS: " + location);
		}
		operatingTokens = false;
		lock.notifyAll();
	}
}
