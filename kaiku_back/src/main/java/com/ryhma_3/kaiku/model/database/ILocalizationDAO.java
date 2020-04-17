package com.ryhma_3.kaiku.model.database;

import java.util.ArrayList;
import java.util.HashMap;

import com.ryhma_3.kaiku.model.cast_object.LocalizationObject;

public interface ILocalizationDAO {
	
	/**
	 * Fetch localizationObject from database, using lang code, ie: "en-GB"
	 * @param locale String
	 * @return {@link LocalizationObject}
	 */
	public LocalizationObject getLocalization(String locale);
	
	
	/**
	 * Collect identicators from all localization packs and return them as a ArrayList of Strings
	 * @return Identifiers {@link ArrayList}
	 */
	public ArrayList<String> getLocalizationIdenticators();
	
	
	/**
	 * Add new localization obj to database
	 * @param localisation {@link LocalizationObject}
	 * @return {@link LocalizationObject}
	 */
	public LocalizationObject putLocalization(LocalizationObject localisation);
	
	/**
	 * delete localization object with lang code reference, ie: "en-GB"
	 * @param locale String
	 * @return success boolean
	 */
	public boolean deleteLocalization(String locale);
	
	/**
	 * update existing localization obj in database
	 * @param localizationObject {@link LocalizationObject}
	 * @return {@link LocalizationObject}
	 */
	public LocalizationObject updateLocalization(LocalizationObject localizationObject);
}
