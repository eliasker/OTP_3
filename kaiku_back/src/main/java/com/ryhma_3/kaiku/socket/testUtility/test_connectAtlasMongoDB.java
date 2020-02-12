package com.ryhma_3.kaiku.socket.testUtility;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;

import com.ryhma_3.kaiku.model.castObject.UserObject;
import com.ryhma_3.kaiku.model.database.UserDAO;

public class test_connectAtlasMongoDB {

	static String SECRETFILE = "..\\kaiku_back\\secrets\\creds.txt\\";
	
	public static void main(String[] args) throws FileNotFoundException {
		Scanner scanner = new Scanner(new File(SECRETFILE));
		UserDAO dao = new UserDAO(scanner.nextLine());
		
	}
}
