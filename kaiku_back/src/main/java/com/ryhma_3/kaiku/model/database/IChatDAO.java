package com.ryhma_3.kaiku.model.database;

import com.ryhma_3.kaiku.model.cast_object.ChatObject;

/**
 * IChatDAO
 */
public interface IChatDAO {

	public ChatObject[] getChats(String userId);
	public ChatObject[] getAllChats();
    public ChatObject createChatObject(ChatObject chatObject);
    public ChatObject updateChatObject(ChatObject chatObject);
    public boolean deleteChatObject(ChatObject chatObject);
    public ChatObject getChatObject(ChatObject chatObject);

}
