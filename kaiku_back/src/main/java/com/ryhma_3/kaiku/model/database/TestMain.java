package com.ryhma_3.kaiku.model.database;

import com.ryhma_3.kaiku.model.cast_object.ChatObject;
import com.ryhma_3.kaiku.model.cast_object.MessageObject;
import com.ryhma_3.kaiku.model.cast_object.UserObject;
import com.ryhma_3.kaiku.model.database.ChatDAO;

/**
 * TestMain
 */
public class TestMain {

    public static void main(String[] args) {
        ChatDAO chatDAO = new ChatDAO();
        UserDAO userDAO = new UserDAO();
        UserObject[] userObjects = userDAO.getAllUser();
        // for (UserObject u : userObjects) {
        //     System.out.println(u.getName());
        // }
        ChatObject[] chatObjects = chatDAO.getChats("5e4ad9e09a057c49faf46ae4");
        for (ChatObject c : chatObjects) {
            // System.out.println(c.getChatName());
        }

        chatDAO.createChatObject(new ChatObject("", "uhtneo", "uhtneo", new MessageObject[]{}));

        // boolean c = chatDAO.deleteChatObject(new ChatObject("", "chat/tt2te98et", "oooo",
        //     new MessageObject[]{}));
        // System.out.println(c);
        // chatDAO.createChatObject(new ChatObject("ue", "chat/tt2te98et", "private",
        //     new MessageObject[] { new MessageObject() }));
        // System.out.println("euhtno");
    }
}
