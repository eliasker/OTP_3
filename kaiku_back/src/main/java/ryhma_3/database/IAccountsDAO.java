package ryhma_3.database;

import ryhma_3.castObject.ProfileObject;

/**
 * IAccountsDAO
 */
public interface IAccountsDAO {

    public ProfileObject createAccount(ProfileObject profileObject);
    public ProfileObject updateAccount(ProfileObject profileObject);
    public boolean deleteAccount(ProfileObject profileObject);
    public ProfileObject getAccount(ProfileObject profileObject);

}
