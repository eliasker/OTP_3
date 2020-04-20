package com.ryhma_3.kaiku.model.database;

/**
 * IAdminDAO
 */
public interface IAdminDAO {

    /**
     * Adds a user_id in the admins collection.
     * @param id user_id of the user to be added.
     * @return true if succesful.
     */
    public boolean addId(String id);

    /**
     * @param id user_id of the user to be queried.
     * @return true if succesful.
     */
    public boolean getId(String id);

    /**
     * @param id user_id of the user to be deleted.
     * @return true if succesful.
     */
    public boolean deleteId(String id);

}
