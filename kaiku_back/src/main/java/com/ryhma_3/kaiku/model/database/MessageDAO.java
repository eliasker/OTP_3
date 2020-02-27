package com.ryhma_3.kaiku.model.database;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.Scanner;
import java.util.function.Consumer;

import com.mongodb.Block;
import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.MongoCommandException;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.MongoIterable;
import com.mongodb.client.result.DeleteResult;
import com.mongodb.client.result.UpdateResult;
import com.ryhma_3.kaiku.model.cast_object.ChatObject;
import com.ryhma_3.kaiku.model.cast_object.MessageObject;

import static com.mongodb.client.model.Filters.*;

import org.bson.Document;
import org.bson.types.ObjectId;

/**
 * MessageDAO
 */
public class MessageDAO implements IMessageDAO {

    private ConnectionString connString;
    private MongoClientSettings mongoSettings;
    private MongoClient mongoClient;
    private MongoDatabase mongoDatabase;
    private MongoCollection collection;

    public MessageDAO() {
        this.connString = new ConnectionString(getMongoURI("mongoCredentials.txt"));
        this.mongoClient = MongoClients.create(connString);
        this.mongoDatabase = mongoClient.getDatabase("messageDB");
    }

    public MessageDAO(String URI) {
        this.connString = new ConnectionString(URI);
        this.mongoClient = MongoClients.create(connString);
        this.mongoDatabase = mongoClient.getDatabase("messageDB");
    }

	@Override
	public MessageObject createMessage(MessageObject messageObject, String chat_id) {
        try {
            mongoDatabase.createCollection(chat_id);
            MongoCollection collection = mongoDatabase.getCollection(chat_id);

            Document d = new Document("content", messageObject.getContent());
            d.append("user_id", messageObject.getUser_id());
            d.append("timestamp", new Date());
            collection.insertOne(d);
            return new MessageObject(d.getString("content"), d.getObjectId("_id").toString(),
                d.getString("user_id"), d.getDate("timestamp"));
        } catch (MongoCommandException e) {

            MongoCollection collection = mongoDatabase.getCollection(chat_id);

            Document d = new Document("content", messageObject.getContent());
            d.append("user_id", messageObject.getUser_id());
            d.append("timestamp", new Date());
            collection.insertOne(d);
            // MessageObject ueht = new MessageObject(content, message_id, user_id, timestamp);
            // TODO: 
            return new MessageObject(d.getString("content"), d.getObjectId("_id").toString(),
                d.getString("user_id"), d.getDate("timestamp"));
        }
	}

	@Override
	public MessageObject updateMessage(MessageObject messageObject, String chat_id) {
		// TODO To be done when needed
		return null;
	}

	@Override
	public void deleteMessage(MessageObject messageObject, String chat_id) {
		// TODO To be done when needed
		
	}

	@Override
	public MessageObject[] getAllMessages(String user_id) {
		
        ArrayList<MessageObject> messageList = new ArrayList<>();
        MongoIterable<String> collectionList = mongoDatabase.listCollectionNames();

        collectionList.forEach((Consumer<String>) collectionName -> {
            MongoCollection tempCollection;
            tempCollection = mongoDatabase.getCollection(collectionName);
            MongoCursor<Document> cursor = tempCollection.find().iterator();
            try {
                while (cursor.hasNext()) {
                    Document d = cursor.next();
                    // System.out.println(d.getList("users", String.class).size());
                    if (d.getString("user_id").equals(user_id)) {
                        messageList.add(new MessageObject(d.getString("content"),
                            d.getObjectId("_id").toString(), d.getString("user_id"),
                            d.getDate("timestamp")));
                    }
                }
            } catch (Exception e) {
                e.printStackTrace();
            } finally {
                cursor.close();
            }
        });

        MessageObject[] messageArr = new MessageObject[messageList.size()];
        messageArr = messageList.toArray(messageArr);

        return messageArr;
	}

	@Override
	public MessageObject getMessage(MessageObject messageObject, String chat_id) {
        // TODO: finish later when relevant
        // try {
        //     mongoDatabase.createCollection(chat_id);
        //     MongoCollection collection = mongoDatabase.getCollection(chat_id);

        //     Document d = new Document("content", messageObject.getContent());
        //     d.append("user_id", messageObject.getUser_id());
        //     d.append("timestamp", new Date());
        //     return new MessageObject(d.getString("content"), d.getObjectId("_id").toString(),
        //         d.getString("user_id"), d.getDate("timestamp"));
        // } catch (MongoCommandException e) {
        //     System.err.println("Chat not found!");
        //     return null;
        // }
        return null;
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
