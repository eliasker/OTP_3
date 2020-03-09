package com.ryhma_3.kaiku.model.database;

import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.Date;

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

/**
 * MessageDAOTest
 */
public class MessageDAOTest {
    private MessageDAO testMessageDAO = new MessageDAO();
    private ChatDAO testChatDAO = new ChatDAO();
    private ChatObject testChatObject;

    @Test
    public void createMessageTest() {
        MessageObject t = testMessageDAO.createMessage(
            new MessageObject("test message", null, "12345", new Date(), null),
            "test_id");
        assertNotNull(t.getMessage_id());
        assertEquals("test message", t.getContent(), "Content retrieval failed");
        assertEquals("12345", t.getUser_id(), "User_id retrieval failed");
        assertNotNull(t.getTimestamp());
        assertEquals("test_id", t.getChat_id(), "Chat_id retrieval failed");
    }

    @Test
    public void getAllMessagesTest() {
        testMessageDAO.createMessage(
            new MessageObject("test message", null, "12345", new Date(), null),
            "test_id");
        MessageObject[] t = testMessageDAO.getAllMessages("12345");
        assertTrue(t.length > 0);
    }

}
