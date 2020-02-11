package ryhma_3.database;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Scanner;

import com.mongodb.ConnectionString;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoDatabase;

import ryhma_3.castObject.AccountObject;

import com.mongodb.*;
import com.mongodb.client.model.Sorts;
import com.mongodb.client.result.DeleteResult;
import com.mongodb.client.result.UpdateResult;
import com.mongodb.connection.ClusterSettings;
import org.bson.Document;
import org.bson.types.ObjectId;

import static com.mongodb.client.model.Filters.*;
import static com.mongodb.client.model.Projections.excludeId;
import static com.mongodb.client.model.Projections.fields;
import static com.mongodb.client.model.Projections.include;
import static java.util.Arrays.asList;


import com.mongodb.MongoClientSettings;

/**
 * AccountsDAO
 */
public class AccountsDAO implements IAccountsDAO {

    private ConnectionString connString;
    private MongoClientSettings mongoSettings;
    private MongoClient mongoClient;
    private MongoDatabase mongoDatabase;
    private MongoCollection collection;

    public AccountsDAO() {
        this.connString = new ConnectionString(getMongoURI("mongoCredentials.txt"));
        this.mongoClient = MongoClients.create(connString);
        this.mongoDatabase = mongoClient.getDatabase("accounts_db");
        this.collection = mongoDatabase.getCollection("accounts");
    }
    
    public AccountsDAO(String URI) {
    	this.connString = new ConnectionString(URI);
        this.mongoClient = MongoClients.create(connString);
        this.mongoDatabase = mongoClient.getDatabase("accounts_db");
        this.collection = mongoDatabase.getCollection("accounts");
    }
    
	@Override
	public AccountObject updateAccount(AccountObject profileObject) {
        Document document = new Document("username", profileObject.getUsername());
        document.append("name", profileObject.getName());
        document.append("password", profileObject.getPassword());
		UpdateResult result = collection.updateOne(eq("username",
            profileObject.getUsername()), new Document("$set", document));
        System.out.println(document.getObjectId("_id"));
        if (result.getMatchedCount() == 0) return null;
        // TODO: find a cleaner solution to get udated documents id
        else return getAccount(profileObject);
        // return new AccountObject(document.getObjectId("_id").toString(),
        //     profileObject.getUsername(), profileObject.getPassword(), profileObject.getName());
	}

    // TODO: refactor to use ObjectId for filtering instead of username
	@Override
	public boolean deleteAccount(AccountObject profileObject) {
        System.out.println(profileObject.getUsername());
		DeleteResult result = collection.deleteOne(eq("username", profileObject.getUsername()));
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
    public AccountObject createAccount(AccountObject profileObject) {
        Document document = new Document("username", profileObject.getUsername());
        document.append("fullname", profileObject.getName());
        document.append("password", profileObject.getPassword());
        collection.insertOne(document);
        System.out.println("id on last added: " + document.getObjectId("_id"));
        return new AccountObject(document.getObjectId("_id").toString(),
            profileObject.getUsername(), profileObject.getPassword(), profileObject.getName());
    }

    // TODO: refactor to use ObjectId for filtering instead of username
	@Override
	public AccountObject getAccount(AccountObject profileObject) {
		Document document = (Document)collection
            .find(eq("username", profileObject.getUsername())).first();
        
		return new AccountObject(document.getObjectId("_id").toString(),
            document.getString("username"), document.getString("password"),
            document.getString("name"));
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
