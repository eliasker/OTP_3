package ryhma_3.database;

import ryhma_3.castObject.AccountObject;

/**
 * IAccountsDAO
 */
public interface IAccountsDAO {

    public AccountObject createAccount(AccountObject profileObject);
    public AccountObject updateAccount(AccountObject profileObject);
    public boolean deleteAccount(AccountObject profileObject);
    public AccountObject getAccount(AccountObject profileObject);

}
