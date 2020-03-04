package com.ryhma_3.kaiku.model.database;

import java.util.ArrayList;
import java.util.Date;
import java.util.function.Consumer;

import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.MongoCommandException;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.MongoIterable;
import com.ryhma_3.kaiku.model.cast_object.MessageObject;

import org.bson.Document;

/**
 * MessageDAO
 */
public class MessageDAO extends DataAccessInit implements IMessageDAO {

    private ConnectionString connString;
    private MongoClientSettings mongoSettings;
    private MongoClient mongoClient;
    private MongoDatabase mongoDatabase;
    private MongoCollection collection;

    public MessageDAO() {
        this.connString = new ConnectionString(getMongoURI("mongoCredentials.txt"));
        // TODO: remove hardcoded URIs
        if (this.connString == null) {
            this.connString = new ConnectionString(getMongoURI(
                "mongodb://mongoAdmin:very_good_salasana@10.114.32.19:27017/?authsource=admin"));
        }
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
                d.getString("user_id"), d.getDate("timestamp"), d.getString("chat_id"));
        } catch (MongoCommandException e) {

            MongoCollection collection = mongoDatabase.getCollection(chat_id);

            Document d = new Document("content", messageObject.getContent());
            d.append("user_id", messageObject.getUser_id());
            d.append("timestamp", new Date());
            collection.insertOne(d);
            // TODO: 
            return new MessageObject(d.getString("content"), d.getObjectId("_id").toString(),
                d.getString("user_id"), d.getDate("timestamp"), d.getString("chat_id"));
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
                            d.getDate("timestamp"), d.getString("chat_id")));
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

}
