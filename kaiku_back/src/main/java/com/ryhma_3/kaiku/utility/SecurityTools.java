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
	final static BasicPasswordEncryptor cryptor = new BasicPasswordEncryptor();
	
	
	/**
	 * Token store
	 * <Session id: UUID, user_id: String, tokenString: String>
	 */
	static volatile ArrayList<Triple<UUID, String, String>> tokenDataStore = new ArrayList<>();
	static volatile boolean operatingTokens = false;
	
	
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
	 * @param user_id
	 * @return Triple<UUID, user_id, tokenString> token
	 * Get a users token with user_id
	 */
	@SuppressWarnings("rawtypes")
	public synchronized Triple<UUID, String, String> getFullClonedToken(String user_id){
		try {
			//wait for monitor
			while(operatingTokens) {
				wait();
			}
			
			Triple<UUID, String, String> searched = null;
			
			for (Triple<UUID, String, String> token : tokenDataStore) {
				searched = new Triple(token);
				
				if(searched.getSecond() != user_id) {
					searched = null;
					continue;
				}
				break;
			}

			//release
			operatingTokens = false;
			notifyAll();
			return searched;
			
		} catch(Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	
	/**
	 * @param user_id
	 * @param tokenString
	 * Create or update a user specific token. On first connect user gets a new list-item, on consecutive connections a new token string 
	 * is created.
	 */
	public synchronized void createOrUpdateToken(String user_id, String tokenString) {
		//wait for monitor
		try {
			while(operatingTokens) {
				wait();
			}
			
			Triple<UUID, String, String> searched = null;
			
			//update
			for (Triple<UUID, String, String> token : tokenDataStore) {
				searched = token;
				
				if(searched.getSecond() != user_id) {
					searched = null;
					continue;
				}
				
				token = new Triple<>(null, user_id, tokenString);
				
				operatingTokens = false;
				notifyAll();
				return;
			}
			
			
			//create if update fails
			tokenDataStore.add(new Triple<>(null, user_id, tokenString));
			
			operatingTokens = false;
			notifyAll();
			return;
	
		} catch(Exception e) {
			e.printStackTrace();
		}
	}
	
	
	/**
	 * @param tokenString
	 * @param sessionID
	 * @return boolean - did the operation succeed
	 * Connect user session id to a token
	 */
	public synchronized boolean connectTokenToUUID(String tokenString, UUID sessionID) {
		try {
			//wait for monitor
			while(operatingTokens){
				wait();
			}
			
			Triple<UUID, String, String> searched = null;
			
			for (Triple<UUID, String, String> token : tokenDataStore) {
				searched = token;
				if(searched.getThird() != tokenString) {
					searched = null;
					continue;
				}
				
				//task succeeded
				token = new Triple<>(sessionID, token.getSecond(), token.getThird());
				return true;
			}
						
			//task failed / not found
			return false;
			
		} catch(Exception e) {
			e.printStackTrace();
			//Task failed / exception
			return false;
		}
	}
	
}
