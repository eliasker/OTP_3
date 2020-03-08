package com.ryhma_3.kaiku.model.database;

import com.ryhma_3.kaiku.model.cast_object.MessageObject;

/**
 * Data Access Object for messages
 */
public interface IMessageDAO {

    /**
     * Creates a message entry in the database
     * @param messageObject
     * @param chat_id
     * @return Created message entry
     */
    public MessageObject createMessage(MessageObject messageObject, String chat_id);

    /**
     * Updates a message entry in the database
     * @param messageObject
     * @param chat_id
     * @return Updated message entry
     */
    public MessageObject updateMessage(MessageObject messageObject, String chat_id);

    /**
     * Deletes a message entry from the database
     * @param messageObject
     * @param chat_id
     */
    public void deleteMessage(MessageObject messageObject, String chat_id);

    /**
     * Gets a single message entry from the database
     * @param messageObject
     * @param chat_id
     * @return Message entry
     */
    public MessageObject getMessage(MessageObject messageObject, String chat_id);

    /**
     * Gets all message entries of a specific user
     * @param user_id
     * @return All message entries of a specified user
     */
    public MessageObject[] getAllMessages(String user_id);
}
