package ryhma_3;

public class ProfileObject {
	private String user_id;
	private String username;
	private String password;
	private String name;
	
	public ProfileObject() {
	
	}
	
	public ProfileObject(String user_id, String username, String password, String name) {
		this.user_id = user_id;
		this.username = username;
		this.password = password;
		this.name = name;
	}
	
	public String getId() {
		return user_id;
	}
	public void setId(String id) {
		this.user_id = id;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
}
