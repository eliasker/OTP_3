package com.ryhma_3.kaiku.model.database;


import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;

import com.ryhma_3.kaiku.model.cast_object.UserObject;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

/**
 * UserDAOTest
 */
public class UserDAOTest {

    @Test
    public void createUserTest() {
        UserDAO testUserDAO = new UserDAO();
        UserObject u = testUserDAO.createUser(
            new UserObject(null, "CreateTestUser", "password", "test user"));
        assertNotNull(u.get_Id(), "_id not retrieved properly");
        assertEquals("CreateTestUser", u.getUsername(), "Username incorrect");
        assertEquals("password", u.getPassword(), "Password incorrect");
        assertEquals("test user", u.getName(), "Username incorrect");
        testUserDAO.deleteUser(u);
    }

    @Test
    public void getUserTest() {
        UserDAO testUserDAO = new UserDAO();
        UserObject u = testUserDAO.createUser(
            new UserObject(null, "GetTestUser", "password", "test user"));
        assertEquals("GetTestUser", u.getUsername(), "Creating sample user for deletion failed");
        UserObject userFromDB = testUserDAO.getUser(u);
        assertNotNull(userFromDB.get_Id(), "_id not retrieved properly");
        assertEquals("GetTestUser", userFromDB.getUsername(), "Username incorrect");
        assertEquals("password", userFromDB.getPassword(), "Password incorrect");
        assertEquals("test user", userFromDB.getName(), "Username incorrect");
        testUserDAO.deleteUser(u);
    }

    @Test
    public void deleteUserTest() {
        UserDAO testUserDAO = new UserDAO();
        UserObject u = testUserDAO.createUser(
            new UserObject(null, "DeleteTestUser", "password", "test user"));
        assertEquals("DeleteTestUser", u.getUsername(),
            "Creating sample user for deletion failed");
        testUserDAO.deleteUser(u);
        u = testUserDAO.getUser(u);
        assertNull(u, "_id found, User deletion failed");
    }
    
    @Test
    public void updateUserTest() {
        UserDAO testUserDAO = new UserDAO();
        UserObject u = testUserDAO.createUser(
            new UserObject(null, "UpdateTestUser", "password", "test user"));
        assertEquals("UpdateTestUser", u.getUsername(),
                "Creating sample user for deletion failed");
        UserObject updatedUser = new UserObject(null, "UpdateTestUser", "changed", "changed");
        u = testUserDAO.updateUser(updatedUser);
        assertEquals("UpdateTestUser", u.getUsername(), "Username incorrect");
        assertEquals("changed", u.getPassword(), "Password change failed");
        assertEquals("changed", u.getName(), "Name change failed");
        testUserDAO.deleteUser(u);
    }
}
