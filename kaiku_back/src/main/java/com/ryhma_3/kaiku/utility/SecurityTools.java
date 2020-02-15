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
	private final static BasicPasswordEncryptor cryptor = new BasicPasswordEncryptor();
	
	private final static Object lock = new Object();
	
	/**
	 * Token store
	 * <Session id: UUID, user_id: String, tokenString: String>
	 */
	private static volatile ArrayList<Token> tokenDataStore = new ArrayList<>();
	
	private static volatile boolean operatingTokens = false;
	
	
	/**
	 * @param string
	 * @return Encrypted string
	 * Secure passwords by encryption.
	 */
	public static String encrypt(String string) {
		return cryptor.encryptPassword(string);
	}
	
	
	/**
	 * @param encryptedPSW
	 * @param PSW
	 * @return boolean: match
	 * Check if encryptedPWS matches PSW
	 */
	public static boolean compare(String encryptedPSW, String PSW) {
		boolean match = cryptor.checkPassword(PSW, encryptedPSW) ? true : false;
		return match;
	}
	
	
	
	/**
	 * @param user_id || tokenString
	 * @param tokenString
	 * @return Triple<UUID, user_id, tokenString> token
	 * Get a users token with user_id OR tokenString. 
	 * Thread-safe
	 */
	public static Token getCloneOfToken(String searchInput){
		synchronized (lock) {
			try {
				//wait for monitor
				while(operatingTokens) {
					lock.wait();
				}
				
				Token searched = null;
				
				for (Token token : tokenDataStore) {
					searched = new Token(token);
					
					if(searched.getUser_id() != searchInput && searched.getTokenString() != searchInput) {
						searched = null;
						continue;
					}
					break;
				}
	
				releaseObjectLock();;
				return searched;
				
			} catch(Exception e) {
				e.printStackTrace();
				releaseObjectLock();
				return null;
			}
		}
	}
	
	
	
	/**
	 * @param user_id
	 * @param tokenString
	 * Create or update a user specific token. On first connect user gets a new list-item, on consecutive connections a new token string 
	 * is created.
	 * Thread-safe
	 */
	public static Token createOrUpdateToken(String user_id, String tokenString) {
		synchronized (lock) {
			try {
				while(operatingTokens) {
					lock.wait();
				}
				
				Token searched = null;
				
				//update
				for (Token token : tokenDataStore) {
					searched = token;
					
					if(searched.getUser_id() != user_id) {
						searched = null;
						continue;
					}
					
					token = new Token(null, user_id, tokenString);
					
					releaseObjectLock();
					return new Token(token);
				}
				
				
				//create if update fails
				Token tokenToAdd = new Token(null, user_id, tokenString);
				tokenDataStore.add(tokenToAdd);
				
				releaseObjectLock();
				return new Token(tokenToAdd);
		
			} catch(Exception e) {
				e.printStackTrace();
				releaseObjectLock();
				return null;
			}
		}
	}
	
	
	/**
	 * @param tokenString
	 * @param sessionID
	 * @return boolean - did the operation succeed
	 * Connect user session id to a token. Acts also as a verification of connecting user.
	 * Thread-safe
	 */
	public static boolean connectTokenToUUID(String tokenString, UUID sessionID) {
		synchronized (lock) {
			try {
				//wait for monitor
				while(operatingTokens){
					lock.wait();
				}
				
				Token searched = null;
				
				for (Token token : tokenDataStore) {
					searched = token;
					if(searched.getTokenString() != tokenString) {
						searched = null;
						continue;
					}
					
					//task succeeded
					token = new Token(sessionID, token.getUser_id(), token.getTokenString());
					
					releaseObjectLock();
					return true;
				}
							
				//task failed / not found
				releaseObjectLock();
				return false;
				
			} catch(Exception e) {
				e.printStackTrace();
				//Task failed / exception
				return false;
			}
		}
	}
		
	
	private static void releaseObjectLock() {
		operatingTokens = false;
		lock.notifyAll();
	}
}
