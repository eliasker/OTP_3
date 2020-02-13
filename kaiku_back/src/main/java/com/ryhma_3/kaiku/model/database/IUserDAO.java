package com.ryhma_3.kaiku.model.database;

import com.ryhma_3.kaiku.model.cast_object.UserObject;

/**
 * IAccountsDAO
 */
public interface IUserDAO {

    public UserObject createUser(UserObject profileObject);
    public UserObject updateUser(UserObject profileObject);
    public boolean deleteUser(UserObject profileObject);
    public UserObject getUser(UserObject profileObject);

}
