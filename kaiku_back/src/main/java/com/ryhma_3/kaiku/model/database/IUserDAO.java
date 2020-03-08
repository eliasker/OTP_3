package com.ryhma_3.kaiku.model.database;

import com.ryhma_3.kaiku.model.cast_object.UserObject;

/**
 * Data Access Object for Users
 */
public interface IUserDAO {

    /**
     * Creates a user entry in the database
     * @param profileObject
     * @return Created user
     */
    public UserObject createUser(UserObject profileObject);

    /**
     * Updates a specific user in the database
     * @param profileObject
     * @return Updated user
     */
    public UserObject updateUser(UserObject profileObject);

    /**
     * Deletes a specific user entry from the database
     * @param profileObject
     * @return True if successful
     */
    public boolean deleteUser(UserObject profileObject);

    /**
     * Gets a specific user from the database
     * @param profileObject
     * @return Fetched user entry
     */
    public UserObject getUser(UserObject profileObject);

	/**
     * Gets all users across the whole database
	 * @return List containing all users
	 */
	public UserObject[] getAllUsers();

}
