package com.ryhma_3.kaiku.utility;

import java.util.ArrayList;
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
	
	public static void main(String[] args) {
		for(int i=0; i<1000; i++) {
			System.out.println(genRandomString());
		}
	}
	
	
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
	 * Check if encryptedPWS matches PSW
	 * @param encryptedPSW
	 * @param PSW
	 * @return boolean: match
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
	 * Get a users token with user_id OR tokenString. 
	 * @param user_id || tokenString
	 * @return Triple<UUID, user_id, tokenString> token
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
	
				releaseObjectLock("clone: success");
				return searched;
				
			} catch(Exception e) {
				e.printStackTrace();
				releaseObjectLock("clone: exception");
				return null;
			}
		}
	}
	
	
	/**
	 * Get a users token with user_id OR tokenString. 
	 * @param sessionID
	 * @return Triple<UUID, user_id, tokenString> token
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
				
				for (Token token : tokenDataStore) {
					searched = new Token(token);
					
					if(!searched.getSessionID().toString().equals(sessionID.toString())) {
						searched = null;
						continue;
					}
					break;
				}
	
				releaseObjectLock("clone: success");
				return searched;
				
			} catch(Exception e) {
				e.printStackTrace();
				releaseObjectLock("clone: exception");
				return null;
			}
		}
	}
	
	
	
	/**
	 * Create or update a user specific token. On first connect user gets a new list-item, on consecutive connections a new token string 
	 * is created.
	 * @param user_id
	 * @return Triple<UUID, user_id, tokenString> token
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
					releaseObjectLock("update token: success");
					return new Token(searched);
				}
				
				
				//create if update fails
				Token tokenToAdd = new Token(null, user_id, genRandomString());
				tokenDataStore.add(tokenToAdd);
				
				releaseObjectLock("create token: success");
				return new Token(tokenToAdd);
		
			} catch(Exception e) {
				e.printStackTrace();
				releaseObjectLock("create token: exception");
				return null;
			}
		}
	}
	
	
	
	/**
	 * override,
	 * Create or update a user specific token. On first connect user gets a new list-item, on consecutive connections a new token string 
	 * is created.
	 * @param user_id
	 * @param tokenString
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

					releaseObjectLock("update token: success");
					return new Token(searched);
				}
				
				
				//create if update fails
				Token tokenToAdd = new Token(null, user_id, tokenString);
				tokenDataStore.add(tokenToAdd);
				
				releaseObjectLock("create token: success");
				return new Token(tokenToAdd);
		
			} catch(Exception e) {
				e.printStackTrace();
				releaseObjectLock("create token: exception");
				return null;
			}
		}
	}
	
	/**
	 * Connect user session id to a token. Acts also as a verification of connecting user.
	 * @param tokenString
	 * @return boolean - did the operation succeed
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
					releaseObjectLock("token verified: success");
					return true;
				}
							
				//task failed / not found
				releaseObjectLock("token verified: fail");
				return false;
				
			} catch(Exception e) {
				e.printStackTrace();
				releaseObjectLock("token verified: exception");
				//Task failed / exception
				return false;
			}
		}
	}
	
	
	/**
	 * When client connects trough socket, attach client UUID to a token.
	 * @param tokenString
	 * @param sessionID
	 */
	public static void attachSessionToToken(String tokenString, UUID sessionID) {
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
					releaseObjectLock("connect UUID to token: success");
					return;
				}
				
				//task failed
				releaseObjectLock("connect UUID to token: fail");
				return;
				
			} catch(Exception e) {
				releaseObjectLock("connect UUID to token: exception");
				e.printStackTrace();
				return;
			}
		}
	}
		
	
	/**
	 * Release monitor that handles token operations
	 * logs operations
	 */
	private static void releaseObjectLock(String location) {
		System.out.println("SECURITYTOOLS: " + location);
		operatingTokens = false;
		lock.notifyAll();
	}
}
