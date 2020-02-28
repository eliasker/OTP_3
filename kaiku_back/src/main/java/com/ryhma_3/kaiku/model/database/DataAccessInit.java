package com.ryhma_3.kaiku.model.database;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Scanner;

/**
 * DataAccessInit
 */
public abstract class DataAccessInit {
    
    protected String getMongoURI(String filename) {
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

    protected String urlEncode(String string) {
        try {
            return URLEncoder.encode(string, StandardCharsets.UTF_8.toString());
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        return null;
    }
    
}
