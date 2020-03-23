package com.ryhma_3.kaiku.model.database;

import java.util.ArrayList;

import com.mongodb.ConnectionString;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.IndexOptions;
import com.mongodb.client.model.Indexes;
import com.mongodb.client.result.DeleteResult;
import com.mongodb.client.result.UpdateResult;
import com.ryhma_3.kaiku.model.cast_object.UserObject;
import com.ryhma_3.kaiku.utility.Logger;

import org.bson.Document;
import org.bson.types.ObjectId;

import static com.mongodb.client.model.Filters.*;

import com.mongodb.MongoClientSettings;

/**
 * AccountsDAO
 */
public class UserDAO extends DataAccessInit implements IUserDAO {

    private ConnectionString connString;
    private MongoClientSettings mongoSettings;
    private MongoClient mongoClient;
    private MongoDatabase mongoDatabase;
    private MongoCollection collection;

    public UserDAO() {
        this.connString = new ConnectionString(getMongoURI("mongoCredentials.txt"));
        this.mongoClient = MongoClients.create(connString);
        this.mongoDatabase = mongoClient.getDatabase("metadata");
        this.collection = mongoDatabase.getCollection("users");
        Document index = new Document("username", 1);
        // Ensure username field is unique by adding an index, if it does not exist
        try {
            this.collection.createIndex(index, new IndexOptions().unique(true));
        } catch (Exception e) {
            
        }
    }
    
    public UserDAO(String URI) {
    	this.connString = new ConnectionString(URI);
        this.mongoClient = MongoClients.create(connString);
        this.mongoDatabase = mongoClient.getDatabase("metadata");
        this.collection = mongoDatabase.getCollection("users");
        Document index = new Document("username", 1);
        // Ensure username field is unique by adding an index, if it does not exist
        try {
            this.collection.createIndex(index, new IndexOptions().unique(true));
        } catch (Exception e) {
            
        }
    }
    
	@Override
	public UserObject updateUser(UserObject userObject) {
        Document document = new Document("username", userObject.getUsername());
        document.append("name", userObject.getName());
        document.append("password", userObject.getPassword());
		UpdateResult result = collection.updateOne(eq("_id",
            new ObjectId(userObject.getUser_id())), new Document("$set", document));
        if (result.getMatchedCount() == 0) return null;
        // TODO: find a cleaner solution to get udated documents id
        else return getUser(userObject);
	}

	@Override
	public boolean deleteUser(UserObject userObject) {
        System.out.println(userObject.getUsername());
		DeleteResult result = collection.deleteOne(eq("_id", new ObjectId(userObject.getUser_id())));
        if (result.getDeletedCount() > 0) {
            System.out.println("deleted");
            return true;
        } else {
            System.out.println("not deleted");
            return false;
        }
	}

    @Override
    public UserObject createUser(UserObject userObject) {
        Document document = new Document("username", userObject.getUsername());
        document.append("name", userObject.getName());
        document.append("password", userObject.getPassword());
        try {
            collection.insertOne(document);
        } catch (Exception e) {
            System.out.println("Username already taken");
            return null;
        }
        Logger.log("id on last added: " + document.getObjectId("_id"));
        return new UserObject(document.getObjectId("_id").toString(),
            userObject.getUsername(), userObject.getPassword(), userObject.getName());
    }

	@Override
	public UserObject getUser(UserObject userObject) {
        try {
            Document d = (Document)collection
                .find(eq("_id", new ObjectId(userObject.getUser_id()))).first();
            
            return new UserObject(d.getObjectId("_id").toString(),
                d.getString("username"), d.getString("password"), d.getString("name"));
            
        } catch (Exception e) {
            System.out.println("User not found in the database");
        }
        return null;
	}

    @Override
	public UserObject[] getAllUsers() {
        MongoCursor<Document> cursor = collection.find().iterator();
        ArrayList<UserObject> userList = new ArrayList<>();

        try {
            while (cursor.hasNext()) {
                Document d = cursor.next();
                userList.add(new UserObject(d.getObjectId("_id").toString(),
                d.getString("username"), d.getString("password"), d.getString("name")));
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            cursor.close();
        }

        UserObject[] userArr = new UserObject[userList.size()];
        userArr = userList.toArray(userArr);

        return userArr;
	}

}
