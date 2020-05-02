package com.ryhma_3.kaiku.resource_controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ryhma_3.kaiku.KaikuApplication;
import com.ryhma_3.kaiku.model.cast_object.LocalizationObject;
import com.ryhma_3.kaiku.model.database.ILocalizationDAO;
import com.ryhma_3.kaiku.resource_controllers.exceptions.BadUserInputException;
import com.ryhma_3.kaiku.resource_controllers.exceptions.ResourceNotFoundException;
import com.ryhma_3.kaiku.resource_controllers.exceptions.ValidationFailedException;

import static com.ryhma_3.kaiku.utility.Logger.log;

import java.util.ArrayList;

/**
 * LocalizationResourceController
 * Controller to access application localization strings via API
 */
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class LocalizationResourceController {

    private ILocalizationDAO localizationDAO = KaikuApplication.getLocalizationDAO();

    /**
     * Gets the localization strings for a language from the database.
     * @param identicator
     * @return The {@link LocalizationObject} containing strings of a certain locale.
     */
    @RequestMapping(value = "/api/locale", method = RequestMethod.GET)
    public LocalizationObject getLocale(@RequestParam String identicator) {
        log("REST: Localization object GET request");

        LocalizationObject locale = localizationDAO.getLocalization(identicator);
        if (locale != null)
            return locale;

        throw new ResourceNotFoundException();
    }

    /**
     * Gets the list of indicators strings for each language in the database.
     * @return List of indicators of all locales in the database.
     */
    @RequestMapping(value = "/api/locale/indicators", method = RequestMethod.GET)
    public ArrayList<String> getLocaleIndicators() {
        log("REST: Localization indicators GET request");

        ArrayList<String> indicators = localizationDAO.getLocalizationIdenticators();
        if (localizationDAO != null)
            return indicators;

        throw new ResourceNotFoundException();
    }
    
    /**
     * Adds a language in the localization database.
     * @param localizationObject
     * @param token Usertoken for admin privilige checks.
     * @return Added {@link LocalizationObject}.
     */
    @RequestMapping(value = "/api/locale", method = RequestMethod.POST)
    public LocalizationObject putLocalizationObject(
            @RequestBody LocalizationObject localizationObject,
            @RequestHeader("Authorization") String token) {
        log("REST: Localization object POST request");

        // TODO: Use adminDAO instead
        boolean valid = token.equals("kaiku");

        if (valid) {
            LocalizationObject locale = localizationDAO.putLocalization(localizationObject);
            if (locale != null)
                return locale;
            throw new BadUserInputException();
        }

        throw new ValidationFailedException();
    }

    /**
     * Deletes a language from the localization database.
     * @param identicator
     * @param token Usertoken for admin privilige checks.
     * @return True if successful.
     */
    @RequestMapping(value = "/api/locale", method = RequestMethod.DELETE)
    public boolean deleteLocalization(
            @RequestParam String identicator,
            @RequestHeader("Authorization") String token) {
        log("REST: Localization object request");

        // TODO: Use adminDAO instead
        boolean valid = token.equals("kaiku");

        if (valid) {
            return localizationDAO.deleteLocalization(identicator);
        }

        throw new ValidationFailedException();
    }

}
