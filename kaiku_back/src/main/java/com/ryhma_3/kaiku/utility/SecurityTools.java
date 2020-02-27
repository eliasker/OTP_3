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
	 * @return random String of 128 characters
	 * generate a token string. Doesn't itself contain any information
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
	 * @param max integer
	 * @return random integer
	 * Helper for generating integers
	 */
	private static int randomGen(int max) {
		return (int) Math.floor(Math.random() * (max));
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
				operatingTokens = true;
				
				Token searched = null;
				
				for (Token token : tokenDataStore) {
					searched = new Token(token);
					
					if(!searched.getUser_id().equals(searchInput) && !searched.getTokenString().equals(searchInput)) {
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
				operatingTokens = true;
				
				Token searched = null;
				
				//update
				for (Token token : tokenDataStore) {
					searched = token;
					
					if(!searched.getUser_id().equals( user_id)) {
						searched = null;
						continue;
					}
					
					token = new Token(null, user_id, tokenString);
					
					releaseObjectLock();
					return new Token(token);
				}
				
				
				//create if update fails
				Token tokenToAdd = new Token(null, user_id, genRandomString());
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
	public static boolean verifySession(String tokenString, UUID sessionID) {
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
		
	
	/**
	 * Release monitor that handles token operations
	 */
	private static void releaseObjectLock() {
		operatingTokens = false;
		lock.notifyAll();
	}
}