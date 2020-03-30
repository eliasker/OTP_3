package com.ryhma_3.kaiku.model.database;

import static org.junit.jupiter.api.Assertions.*;

import java.util.HashMap;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;

import com.ryhma_3.kaiku.model.cast_object.LocalizationObject;

class LocalizationDAOTest {
	ILocalizationDAO loc;
	LocalizationObject localeFi;
	LocalizationObject localeEn;
	LocalizationObject localeSe;

	@BeforeAll
	void beforeAll() {
		loc = new LocalizationDAO();
		
		localeFi = new LocalizationObject("fi-FI");
		localeEn = new LocalizationObject("en-GB");
		localeSe = new LocalizationObject("fi-SE");
		
		localeFi.setItems(getLanguageset("fi-FI"));
		localeEn.setItems(getLanguageset("en-GB"));
		localeSe.setItems(getLanguageset("fi-SE"));
	}

	@Disabled
	@Test
	void putNewLocalizationTest() {
		LocalizationObject retLoc = loc.putLocalization(localeFi);
		assertEquals(retLoc.getIdenticator(), localeFi.getIdenticator());
	}
	
	@org.junit.jupiter.api.AfterAll
	void afterAll() {
		loc.deleteLocalization(localeFi.getIdenticator());
		loc.deleteLocalization(localeEn.getIdenticator());
		loc.deleteLocalization(localeSe.getIdenticator());
	}
	
	
	
	private HashMap<String, String> getLanguageset(String lang){
		HashMap<String, String> map = new HashMap<>();
		switch(lang) {
		case "fi-FI":
			map.put("title_1", "Käyttäjät");
			map.put("title_2", "Ryhmät");
			map.put("description_1", "Lähetä keskustelun ensimmäinen viesti");
			return map;
		case "en-GB":
			map.put("title_1", "Users");
			map.put("title_2", "Groups");
			map.put("description_1", "Be the first person to send a message");
			return map;
		case "fi-SE":
			map.put("title_1", "Användare");
			map.put("title_2", "Grupper");
			map.put("description_1", "Bli den första som skickar ett meddelande");
			return map;
		}
		return null;
	}
}
