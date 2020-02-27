package com.ryhma_3.kaiku.model.database;

import com.ryhma_3.kaiku.model.cast_object.ChatObject;
import com.ryhma_3.kaiku.model.cast_object.MessageObject;
import com.ryhma_3.kaiku.model.cast_object.UserObject;
import com.ryhma_3.kaiku.model.database.ChatDAO;

import org.bson.types.ObjectId;

/**
 * TestMain
 */
public class TestMain {

    public static void main(String[] args) {
        ChatDAO chatDAO = new ChatDAO();
        UserDAO userDAO = new UserDAO();
        UserObject[] userObjects = userDAO.getAllUsers();
        ChatObject[] chatObjects = chatDAO.getChats("5e4bf66017f01d48ce59cd93");
        System.out.println(chatObjects.length);
        for (ChatObject c : chatObjects) {
            System.out.println(c.getChatName());
        }

        // chatDAO.updateChatObject(new ChatObject("", "uhtneo", "uhtneo", new String[] {}, new MessageObject[]{}));
 
        // chatDAO.getChatObject(new ChatObject("", "uhtneo", "uhtneo", new String[] { userDAO.getUser(new UserObject("uhteno", "Kake", "hutneo", "uhteno")).get_Id(), userDAO.getUser(new UserObject("uhteno", "Arska", "hutneo", "uhteno")).get_Id() }, new MessageObject[]{}));

        // boolean c = chatDAO.deleteChatObject(new ChatObject("", "chat/tt2te98et", "oooo",
        //     new MessageObject[]{}));
        // System.out.println(c);

        // chatDAO.createChatObject(new ChatObject("", "uhtneo", "uhtneo", new String[] { userDAO.getUser(new UserObject("uhteno", "Kake", "hutneo", "uhteno")).get_Id(), userDAO.getUser(new UserObject("uhteno", "Arska", "hutneo", "uhteno")).get_Id() }, new MessageObject[]{}));

        // chatDAO.createChatObject(new ChatObject("", "nono", "nono", new String[] { userDAO.getUser(new UserObject("uhteno", "Arska", "hutneo", "uhteno")).get_Id() }, new MessageObject[]{}));
    }
}
