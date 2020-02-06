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

import ryhma_3.castObject.ProfileObject;

import org.bson.Document;

import com.mongodb.MongoClientSettings;


/**
 * AccountsDAO
 */
public class AccountsDAO {

    private ConnectionString connString;
    private MongoClientSettings mongoSettings;
    private MongoClient mongoClient;
    private MongoDatabase mongoDatabase;
    private MongoCollection collection;

    public AccountsDAO() {
        this.connString = new ConnectionString(getMongoURI("mongoCredentials.txt"));

        this.mongoClient = MongoClients.create(connString);
        this.mongoDatabase = mongoClient.getDatabase("accounts");
        this.collection = mongoDatabase.getCollection("account");

        // System.out.println(getMongoURI("mongoCredentials.txt"));
    }
    
    public AccountsDAO(String URI) {
    	this.connString = new ConnectionString(URI);
        this.mongoClient = MongoClients.create(connString);
        this.mongoDatabase = mongoClient.getDatabase("accounts");
        this.collection = mongoDatabase.getCollection("accounts");
    }

    public void createAccount(String username, String fullname, String password) {
        Document document;
        document = new Document("username", username);
        document.append("fullname", fullname);
        document.append("password", password);
        collection.insertOne(document);
        System.out.println("id on last added: " + document.getObjectId("_id"));
    }

    public void createAccount(ProfileObject profile) {
        Document document;
        document = new Document("username", profile.getUsername());
        document.append("fullname", profile.getName());
        document.append("password", profile.getPassword());
        collection.insertOne(document);
        System.out.println("id on last added: " + document.getObjectId("_id"));
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
