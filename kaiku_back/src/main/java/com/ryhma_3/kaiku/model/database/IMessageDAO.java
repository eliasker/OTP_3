package com.ryhma_3.kaiku.model.database;

import com.ryhma_3.kaiku.model.cast_object.MessageObject;

/**
 * IMessageDAO
 */
public interface IMessageDAO {
    public MessageObject createConversation(MessageObject chatObject);
    public MessageObject updateConversation(MessageObject chatObject);
    public void deleteConversation(MessageObject chatObject);
    public MessageObject getConversation(MessageObject chatObject);
}
