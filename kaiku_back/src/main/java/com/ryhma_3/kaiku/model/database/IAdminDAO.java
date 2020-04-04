package com.ryhma_3.kaiku.model.database;

/**
 * IAdminDAO
 */
public interface IAdminDAO {

    public boolean addId(String id);
    public boolean getId(String id);
    public boolean deleteId(String id);

}
