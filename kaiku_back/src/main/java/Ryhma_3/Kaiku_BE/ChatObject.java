package Ryhma_3.Kaiku_BE;

import java.util.Date;

/**
 * @author Panu Lindqvist
 * Message object. Has a single sent message and metadata.
 *
 */
public class ChatObject {
	private String message;
	private String user;
	private Date date;
	
	public ChatObject() {
	}
	
	public ChatObject(String user, String message) {
		this.message = message;
		this.user = user;
		this.date = null;
	}
	
	/**
	 * getter
	 * @return message
	 */
	public String getMessage() {
		return message;
	}

	/**
	 * setter
	 * @param message
	 */
	public void setMessage(String message) {
		this.message = message;
	}

	/**
	 * getter
	 * @return user
	 */
	public String getUser() {
		return user;
	}

	/**
	 * setter
	 * @param user
	 */
	public void setUser(String user) {
		this.user = user;
	}

	/**
	 * getter
	 * @return date
	 */
	public Date getDate() {
		return date;
	}

	/**
	 * setter
	 * @param date
	 */
	public void setDate(Date date) {
		this.date = date;
	}
}
