package com.ryhma_3.kaiku.model.database;

import com.ryhma_3.kaiku.model.cast_object.MessageObject;

/**
 * IMessageDAO
 */
public interface IMessageDAO {
    public MessageObject createMessage(MessageObject messageObject, String chat_id);
    public MessageObject updateMessage(MessageObject messageObject, String chat_id);
    public void deleteMessage(MessageObject messageObject, String chat_id);
    public MessageObject getMessage(MessageObject messageObject, String chat_id);
    public MessageObject[] getAllMessages(String user_id);
}
