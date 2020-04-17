package com.ryhma_3.kaiku.model.database;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import org.bson.Document;
import org.bson.types.ObjectId;

import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.IndexOptions;
import com.mongodb.client.result.DeleteResult;
import com.mongodb.client.result.UpdateResult;
import static com.mongodb.client.model.Filters.*;
import com.ryhma_3.kaiku.model.cast_object.LocalizationObject;
import com.ryhma_3.kaiku.utility.Logger;

public class LocalizationDAO extends DataAccessInit implements ILocalizationDAO {
	
    private ConnectionString connString;
    private MongoClientSettings mongoSettings;
    private MongoClient mongoClient;
    private MongoDatabase mongoDatabase;
    private MongoCollection collection;
	
	public LocalizationDAO() {
		this.connString = new ConnectionString(getMongoURI("mongoCredentials.txt"));
		this.mongoClient = MongoClients.create(connString);
		this.mongoDatabase = mongoClient.getDatabase("metadata");
		this.collection = mongoDatabase.getCollection("localizations");
		Document index = new Document("identicator", "");
		//Ensure identicator field will be unique
		try {
			this.collection.createIndex(index, new IndexOptions().unique(true));
		} catch (Exception e) {}
	}
	
	public LocalizationDAO(String URI) {
		this.connString = new ConnectionString(URI);
		this.mongoClient = MongoClients.create(connString);
		this.mongoDatabase = mongoClient.getDatabase("metadata");
		this.collection = mongoDatabase.getCollection("localizations");
	}

	
	@Override
	public synchronized LocalizationObject getLocalization(String locale) {
		try {
			//find exact match
			Document d = (Document)collection
					.find(eq("identicator", locale)).first();
			
			LocalizationObject loc = new LocalizationObject(locale);
			loc.setItems(mappify(d));
			return loc;
		} catch(Exception e) {
			debugger("No exact match found");
			
			//find a language root match
			try {
				Document d = (Document)collection
						.find(eq("identicator", locale.substring(0, 2))).first();
				
				LocalizationObject loc = new LocalizationObject(d.getString("identicator"));
				loc.setItems(mappify(d));
				return loc;
			}catch (Exception e2) {
				debugger("No language-group match found");
				return null;
			}
		}
	}
	
	
	@Override
	public ArrayList<String> getLocalizationIdenticators() {
		ArrayList<String> identicators = new ArrayList<>();
		MongoCursor<Document> iterator = collection.find().iterator();
		
		try {
			while(iterator.hasNext()) {
				Document d = iterator.next();
				identicators.add(d.getString("identicator"));
			}
		} catch(Exception e) {
			e.printStackTrace();
		} finally {
			iterator.close();
		}
		
		return identicators;
	}

	
	@Override
	public LocalizationObject putLocalization(LocalizationObject localisation) {
		/*
		 * Try to find prior document
		 */
		try {
			Document s = (Document)collection
					.find(eq("identicator", localisation.getIdenticator())).first();
			if(s != null) {
				for(String key : s.keySet()) {
					if(localisation.getItems().containsKey(key)){
						s.put(key, localisation.getItems().get(key));
					}
				}
					
				UpdateResult ur = collection.updateOne(
							eq("identicator", s.getString("identicator")), new Document("$set", s)
						);
								
				s = (Document)collection
						.find(eq("identicator", localisation.getIdenticator())).first();
				
				/*
				 * find updated and return
				 */
				LocalizationObject res = new LocalizationObject(localisation.getIdenticator());
				res.setItems(mappify(s));
				return res;
			}
		} catch(Exception e) {
			e.printStackTrace();
		}
		
		/*
		 * Document not found,
		 * create new document.
		 */
		Document d = new Document("identicator", localisation.getIdenticator());
		d = documentify(d, localisation.getItems());
		try {
			collection.insertOne(d);
		} catch(Exception e) {
			debugger("error putting new localization");
			e.printStackTrace();
			return null;
		}
	
		LocalizationObject loc = new LocalizationObject(d.getString("identicator"));
		loc.setItems(mappify(d));
		return loc;
	}

	
	@Override
	public boolean deleteLocalization(String locale) {
		DeleteResult result = collection.deleteOne(eq("identicator", locale));
		if(result.getDeletedCount()>0) {
			debugger("localizatio: " + locale + " deleted");
			return true;
		}
		debugger("failed to delete: " + locale);
		return false;
	}

	@Override
	public LocalizationObject updateLocalization(LocalizationObject localizationObject) {
		// TODO Auto-generated method stub
		return null;
	}

	
	
	/**
	 * Convert document members to HashMap
	 * @param d {@link Document}
	 * @return items HashMap<String, String>
	 */
	private HashMap<String, String> mappify(Document d){
		HashMap<String, String> toBeitems = new HashMap<>();
		Set<String> setOfKeys = d.keySet();
		setOfKeys.remove(d.get("identicator"));
		setOfKeys.remove("_id");
		for(String key : setOfKeys) {
			if(key.equals("identicator")) {
				continue;
			}
			toBeitems.put(key, d.getString(key));
		}
		return toBeitems;
	}
	
	
	/**
	 * Turn HashMap into document members
	 * @param d Document
	 * @param items HashMap<String, String>
	 * @return d Document
	 */
	private Document documentify(Document d, HashMap<String, String> map) {
		Set<String> setOfKeys = map.keySet();
		for(String key : setOfKeys) {
			d.append(key, map.get(key));
		}
		return d;
	}
	
	
	private void debugger(String data) {
		Logger.log("LocalizationDAO: " + data);
	}

}
