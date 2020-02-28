package com.ryhma_3.kaiku.model.database;

import java.util.ArrayList;

import com.mongodb.ConnectionString;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.result.DeleteResult;
import com.mongodb.client.result.UpdateResult;
import com.ryhma_3.kaiku.model.cast_object.UserObject;

import org.bson.Document;

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
    }
    
    public UserDAO(String URI) {
    	this.connString = new ConnectionString(URI);
        this.mongoClient = MongoClients.create(connString);
        this.mongoDatabase = mongoClient.getDatabase("metadata");
        this.collection = mongoDatabase.getCollection("users");
    }
    
	@Override
	public UserObject updateUser(UserObject userObject) {
        Document document = new Document("username", userObject.getUsername());
        document.append("name", userObject.getName());
        document.append("password", userObject.getPassword());
		UpdateResult result = collection.updateOne(eq("username",
            userObject.getUsername()), new Document("$set", document));
        System.out.println(document.getObjectId("_id"));
        if (result.getMatchedCount() == 0) return null;
        // TODO: find a cleaner solution to get udated documents id
        else return getUser(userObject);
	}

    // TODO: refactor to use ObjectId for filtering instead of username
	@Override
	public boolean deleteUser(UserObject userObject) {
        System.out.println(userObject.getUsername());
		DeleteResult result = collection.deleteOne(eq("username", userObject.getUsername()));
        // System.out.println();
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
        collection.insertOne(document);
        System.out.println("id on last added: " + document.getObjectId("_id"));
        return new UserObject(document.getObjectId("_id").toString(),
            userObject.getUsername(), userObject.getPassword(), userObject.getName());
    }

    // TODO: refactor to use ObjectId for filtering instead of username
	@Override
	public UserObject getUser(UserObject userObject) {
		Document d = (Document)collection
            .find(eq("username", userObject.getUsername())).first();
        
	    return new UserObject(d.getObjectId("_id").toString(),
            d.getString("username"), d.getString("password"), d.getString("name"));
	}

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
