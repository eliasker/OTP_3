package com.ryhma_3.kaiku.model.database;

import static org.junit.jupiter.api.Assertions.assertTrue;

import java.lang.reflect.InvocationTargetException;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertThrows;

import com.ryhma_3.kaiku.model.cast_object.ChatObject;
import com.ryhma_3.kaiku.model.cast_object.MessageObject;
import com.ryhma_3.kaiku.model.cast_object.UserObject;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

// TODO: clean db of all entries BeforeAll and fix getAllChatsTest accordingly
// TODO: remove all the repetition

/**
 * ChatDAOTest
 */
public class ChatDAOTest {
    ChatDAO testChatDAO = new ChatDAO();
    UserDAO testUserDAO = new UserDAO();
    MessageObject[] testMessageObjects = new MessageObject[]{};

    private UserObject testUser1;
    private UserObject testUser2;
    private UserObject testUser3;
    
    @BeforeEach
    public void createTestData() {
        testUser1 = testUserDAO.createUser(
            new UserObject(null, "TestUser1", "password1", "name1"));
        testUser2 = testUserDAO.createUser(
            new UserObject(null, "TestUser2", "password2", "name2"));
        testUser3 = testUserDAO.createUser(
            new UserObject(null, "TestUser3", "password3", "name3"));
    }

    @AfterEach
    public void removeTestData() {
        testUserDAO.deleteUser(testUser1);
        testUserDAO.deleteUser(testUser2);
        testUserDAO.deleteUser(testUser3);
    }

    @Test
    public void createChatTest() {
        ChatObject o = testChatDAO.createChatObject(
            new ChatObject(null, "testChat", "test", new String[] {
                testUserDAO.getUser(new UserObject(null, "TestUser1", null, null)).get_Id(),
                testUserDAO.getUser(new UserObject(null, "TestUser2", null, null)).get_Id(),
                testUserDAO.getUser(new UserObject(null, "TestUser3", null, null)).get_Id()
            }, testMessageObjects));
        assertEquals("test", o.getType(), "Chat type not retrieved successfully");
        assertNotNull(o.getMembers(), "Chat type not retrieved successfully");

        testChatDAO.deleteChatObject(o);
    }

    @Test
    public void getChatObjectTest() {
        ChatObject o = testChatDAO.createChatObject(
            new ChatObject(null, "testChat", "test", new String[] {
                testUserDAO.getUser(new UserObject(null, "TestUser1", null, null)).get_Id(),
                testUserDAO.getUser(new UserObject(null, "TestUser2", null, null)).get_Id(),
                testUserDAO.getUser(new UserObject(null, "TestUser3", null, null)).get_Id()
            }, testMessageObjects));
        ChatObject got = testChatDAO.getChatObject(o);
        assertEquals("testChat", got.getChatName(), "Chat name retrieval failed");
        assertEquals("test", got.getType(), "Chat type retrieval failed");
        assertEquals(3, got.getMembers().length, "Chat member list retrieval failed");

        testChatDAO.deleteChatObject(o);
    }

    @Test
    public void updateChatTest() {
        ChatObject o = testChatDAO.createChatObject(
            new ChatObject(null, "testChat", "test", new String[] {
                testUserDAO.getUser(new UserObject(null, "TestUser1", null, null)).get_Id(),
                testUserDAO.getUser(new UserObject(null, "TestUser2", null, null)).get_Id(),
                testUserDAO.getUser(new UserObject(null, "TestUser3", null, null)).get_Id()
            }, testMessageObjects));

        ChatObject updated = testChatDAO.updateChatObject(
            new ChatObject(o.getChat_id(), "testChat", "changed", new String[] {
                testUserDAO.getUser(new UserObject(null, "TestUser1", null, null)).get_Id(),
                testUserDAO.getUser(new UserObject(null, "TestUser3", null, null)).get_Id()
            }, testMessageObjects));
        assertEquals("changed", updated.getType(), "Type change failed after update");
        assertEquals(2, updated.getMembers().length, "Member list update failed");

        testChatDAO.deleteChatObject(updated);
    }

    @Test
    public void deleteChatTest() {
        ChatObject o = testChatDAO.createChatObject(
            new ChatObject(null, "testChat", "test", new String[] {
                testUserDAO.getUser(new UserObject(null, "TestUser1", null, null)).get_Id(),
                testUserDAO.getUser(new UserObject(null, "TestUser2", null, null)).get_Id(),
                testUserDAO.getUser(new UserObject(null, "TestUser3", null, null)).get_Id()
            }, testMessageObjects));
        assertDoesNotThrow(() -> {
            testChatDAO.getChatObject(o);
        });
        testChatDAO.deleteChatObject(o);
    }

    @Test
    public void getAllChatsTest() {
        ChatObject o = testChatDAO.createChatObject(
            new ChatObject(null, "testChat", "test", new String[] {
                testUserDAO.getUser(new UserObject(null, "TestUser1", null, null)).get_Id(),
                testUserDAO.getUser(new UserObject(null, "TestUser2", null, null)).get_Id(),
                testUserDAO.getUser(new UserObject(null, "TestUser3", null, null)).get_Id()
            }, testMessageObjects));
        
        assertTrue(testChatDAO.getChats(o.getMembers()[0]).length > 0);
        assertTrue(testChatDAO.getAllChats().length > 0);

        testChatDAO.deleteChatObject(o);
    }

}
