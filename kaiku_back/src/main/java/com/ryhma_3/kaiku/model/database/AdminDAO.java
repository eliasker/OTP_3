package com.ryhma_3.kaiku.model.database;

import com.mongodb.ConnectionString;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.IndexOptions;
import com.mongodb.client.result.DeleteResult;

import org.bson.Document;

import static com.mongodb.client.model.Filters.*;
import static com.ryhma_3.kaiku.utility.Logger.log;

import com.mongodb.MongoClientSettings;

/**
 * AdminDAO
 */
public class AdminDAO extends DataAccessInit implements IAdminDAO {

    private ConnectionString connString;
    private MongoClientSettings mongoSettings;
    private MongoClient mongoClient;
    private MongoDatabase mongoDatabase;
    private MongoCollection collection;

    /**
     * Creates database collection for admins if it does not alreay exist.
     */
    public AdminDAO() {
        this.connString = new ConnectionString(getMongoURI("mongoCredentials.txt"));
        this.mongoClient = MongoClients.create(connString);
        this.mongoDatabase = mongoClient.getDatabase("metadata");
        this.collection = mongoDatabase.getCollection("admin");
        Document index = new Document("user_id", 1);
        // Ensure user_id field is unique by adding an index, if it does not exist
        try {
            this.collection.createIndex(index, new IndexOptions().unique(true));
        } catch (Exception e) {
            
        }
    }
    
    /**
     * Creates database collection for admins if it does not alreay exist.
     * @param URI The URI of the external database.
     */
    public AdminDAO(String URI) {
    	this.connString = new ConnectionString(URI);
        this.mongoClient = MongoClients.create(connString);
        this.mongoDatabase = mongoClient.getDatabase("metadata");
        this.collection = mongoDatabase.getCollection("admin");
        Document index = new Document("user_id", 1);
        // Ensure user_id field is unique by adding an index, if it does not exist
        try {
            this.collection.createIndex(index, new IndexOptions().unique(true));
        } catch (Exception e) {
            
        }
    }

	@Override
	public boolean addId(String id) {
        try {
            Document d = new Document("user_id", id);
            collection.insertOne(d);
            log("User added to the admin database collection successfully");
            return true;
        } catch (Exception e) {
            log("User already has admin privilidges");
            return false;
        }
	}

	@Override
	public boolean getId(String id) {
        try {
            Document d = (Document)collection
                .find(eq("user_id", id)).first();
            if (d == null) {
                log("User not found in the admin database collection");
                return false;
            }
            else {
                log("User found in the admin database collection");
                return true;
            }
        } catch (Exception e) {
            log("user_id admin query failed");
            return false;
        }
	}

	@Override
	public boolean deleteId(String id) {
        try {
            DeleteResult result = collection.deleteOne(eq("user_id", id));
            if (result.getDeletedCount() > 0) {
                log("user_id deleted successfully");
                return true;
            } else {
                log("user_id deletion failed");
                return false;
            }
        } catch (Exception e) {
            log("User not found in the admin database collection");
            return false;
        }
	}

    
}
