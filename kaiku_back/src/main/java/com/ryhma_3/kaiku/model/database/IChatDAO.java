package com.ryhma_3.kaiku.model.database;

import com.ryhma_3.kaiku.model.cast_object.ChatObject;

/**
 * Data Access Object for chats
 */
public interface IChatDAO {

	/**
     * Returns all chats from the database where a specific user participates in
	 * @param userId
	 * @return Chats of a specific user
	 */
	public ChatObject[] getChats(String userId);

	/**
     * Get all chats from the database
	 * @return All chats across the database
	 */
	public ChatObject[] getAllChats();

    /**
     * Creates a chat entry in the database
     * @param chatObject
     * @return Created chat entry
     */
    public ChatObject createChatObject(ChatObject chatObject);

    /**
     * Updates a specific chat entry in the database
     * @param chatObject
     * @return Updated chat entry
     */
    public ChatObject updateChatObject(ChatObject chatObject);

    /**
     * Deletes a chat entry from the database
     * @param chatObject
     * @return True if successful
     */
    public boolean deleteChatObject(ChatObject chatObject);

    /**
     * Gets a specific chat entry from the database
     * @param chatObject
     * @return chat entry
     */
    public ChatObject getChatObject(ChatObject chatObject);

}
