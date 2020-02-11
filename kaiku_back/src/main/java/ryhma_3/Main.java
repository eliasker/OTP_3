package ryhma_3;

import ryhma_3.castObject.AccountObject;
import ryhma_3.database.AccountsDAO;

/**
 * Main
 * Simply a test main for AccountsDAO
 */
public class Main {

    public static AccountsDAO accountsDAO;

    public static void main(String[] args) {
        accountsDAO = new AccountsDAO();
    }
}
