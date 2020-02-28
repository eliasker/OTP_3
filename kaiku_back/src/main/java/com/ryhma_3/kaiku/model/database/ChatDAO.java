package com.ryhma_3.kaiku.model.database;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Scanner;

import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.result.DeleteResult;
import com.mongodb.client.result.UpdateResult;
import com.ryhma_3.kaiku.model.cast_object.ChatObject;
import com.ryhma_3.kaiku.model.cast_object.MessageObject;

import static com.mongodb.client.model.Filters.*;

import org.bson.Document;
import org.bson.types.ObjectId;

// TODO: relegate authentication and other mongo initialization to a super class

/**
 * ChatDAO
 */
public class ChatDAO implements IChatDAO {

    private ConnectionString connString;
    private MongoClientSettings mongoSettings;
    private MongoClient mongoClient;
    private MongoDatabase mongoDatabase;
    private MongoCollection collection;

    public ChatDAO() {
        this.connString = new ConnectionString(getMongoURI("mongoCredentials.txt"));
        this.mongoClient = MongoClients.create(connString);
        this.mongoDatabase = mongoClient.getDatabase("metadata");
        this.collection = mongoDatabase.getCollection("chats");
    }

    public ChatDAO(String URI) {
        this.connString = new ConnectionString(URI);
        this.mongoClient = MongoClients.create(connString);
        this.mongoDatabase = mongoClient.getDatabase("metadata");
        this.collection = mongoDatabase.getCollection("chats");
    }

	@Override
	public ChatObject createChatObject(ChatObject chatObject) {
        // TODO: append id into the name when it's time for it?
        Document document = new Document("chatName", chatObject.getChatName());
        document.append("type", chatObject.getType());
        document.append("users", Arrays.asList(chatObject.getUsers()));
        // TODO: add actual messages when it's time for it
        document.append("messages", "test");
        collection.insertOne(document);
        return chatObject;
	}

	@Override
	public ChatObject updateChatObject(ChatObject chatObject) {
        Document document = new Document("chatName", chatObject.getChatName());
        document.append("type", chatObject.getType());
        document.append("users", Arrays.asList(chatObject.getUsers()));
        // TODO: add MessageObject[] when messages are actually stored
        document.append("messages", "");
		UpdateResult result = collection.updateOne(eq("chatName",
            chatObject.getChatName()), new Document("$set", document));
        System.out.println(document.getObjectId("_id"));
        if (result.getMatchedCount() == 0) return null;
        // TODO: find a cleaner solution to get udated documents id
        else return getChatObject(chatObject);
	}

	@Override
	public boolean deleteChatObject(ChatObject chatObject) {
		DeleteResult result = collection.deleteOne(eq("chatName", chatObject.getChatName()));
        if (result.getDeletedCount() > 0) {
            System.out.println(chatObject.getChatName());
            System.out.println("deleted");
            return true;
        } else {
            System.out.println("not deleted");
            return false;
        }
	}

	@Override
	public ChatObject getChatObject(ChatObject chatObject) {
        Document d = (Document)collection
            .find(eq("chatName", chatObject.getChatName())).first();

        String[] temp = new String[d.getList("users", String.class).size()];
        temp = d.getList("users", String.class).toArray(temp);
        
        // TODO: fix when MessageObjects are actually stored
	    return new ChatObject(d.getObjectId("_id").toString(), d.getString("chatName"),
            d.getString("type"), temp, new MessageObject[]{});
	}

    @Override
	public ChatObject[] getChats(String userId) {
        MongoCursor<Document> cursor = collection.find().iterator();
        ArrayList<ChatObject> chatList = new ArrayList<>();

        // Loop through each Chat document and check if the users field includes userId
        try {
            while (cursor.hasNext()) {
                Document d = cursor.next();
                if (d.getList("users", String.class).contains(userId)) {
                    String[] users = new String[d.getList("users", String.class).size()];
                    users = d.getList("users", String.class).toArray(users);
                    chatList.add(new ChatObject(d.getObjectId("_id").toString(),
                        d.getString("chatName"), d.getString("type"),
                        // TODO: fix messageobject when time for it
                        users, new MessageObject[]{}));
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            cursor.close();
        }

        ChatObject[] chatArr = new ChatObject[chatList.size()];
        chatArr = chatList.toArray(chatArr);

        return chatArr;
	}

	@Override
	public ChatObject[] getAllChats() {
        MongoCursor<Document> cursor = collection.find().iterator();
        ArrayList<ChatObject> chatList = new ArrayList<>();

        // Loop through each Chat document and check if the users field includes userId
        try {
            while (cursor.hasNext()) {
                Document d = cursor.next();
                String[] users = new String[d.getList("users", String.class).size()];
                users = d.getList("users", String.class).toArray(users);
                chatList.add(new ChatObject(d.getObjectId("_id").toString(),
                    d.getString("chatName"), d.getString("type"),
                    // TODO: fix messageobject when time for it
                    users, new MessageObject[]{}));
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            cursor.close();
        }

        ChatObject[] chatArr = new ChatObject[chatList.size()];
        chatArr = chatList.toArray(chatArr);

        return chatArr;
	}
    
    private String getMongoURI(String filename) {
        String filepath = "./secrets/" + filename;
		try {
            Scanner scanner = new Scanner(new File(filepath));
            String mongoURL = scanner.nextLine();
            String[] credentials = mongoURL.substring(mongoURL.indexOf("//") + 2,
                mongoURL.lastIndexOf('@')).split(":");
            String username = urlEncode(credentials[0]);
            String password = urlEncode(credentials[1]);
            scanner.close();
            return "mongodb://" + username + ":" + password + 
                mongoURL.substring(mongoURL.lastIndexOf('@'));
		} catch (FileNotFoundException e) {
            e.printStackTrace();
            System.out.println("File " + filename + "not found. Create it in the secrets " +
                "directory with the mongoDB URI in it.");
            System.exit(0);
        }
        return null;
    }

    private String urlEncode(String string) {
        try {
            return URLEncoder.encode(string, StandardCharsets.UTF_8.toString());
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        return null;
    }

}
