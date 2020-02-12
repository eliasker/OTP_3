package com.ryhma_3.kaiku.model.database;

import com.ryhma_3.kaiku.model.castObject.ChatObject;

/**
 * IMessageDAO
 */
public interface IMessageDAO {
    public ChatObject createConversation(ChatObject chatObject);
    public ChatObject updateConversation(ChatObject chatObject);
    public void deleteConversation(ChatObject chatObject);
    public ChatObject getConversation(ChatObject chatObject);
}
