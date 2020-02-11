package ryhma_3.database;

import ryhma_3.castObject.ChatObject;

/**
 * IMessageDAO
 */
public interface IMessageDAO {
    public ChatObject createConversation(ChatObject chatObject);
    public ChatObject updateConversation(ChatObject chatObject);
    public void deleteConversation(ChatObject chatObject);
    public ChatObject getConversation(ChatObject chatObject);
}
