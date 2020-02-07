package ryhma_3.testUtility;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;

import ryhma_3.castObject.AccountObject;
import ryhma_3.database.AccountsDAO;

public class test_connectAtlasMongoDB {

	static String SECRETFILE = "..\\kaiku_back\\secrets\\creds.txt\\";
	
	public static void main(String[] args) throws FileNotFoundException {
		Scanner scanner = new Scanner(new File(SECRETFILE));
		AccountsDAO dao = new AccountsDAO(scanner.nextLine());
		
	}
}
