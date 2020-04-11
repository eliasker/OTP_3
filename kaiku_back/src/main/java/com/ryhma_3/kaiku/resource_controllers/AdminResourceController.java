package com.ryhma_3.kaiku.resource_controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.ryhma_3.kaiku.resource_controllers.exceptions.ValidationFailedException;
import com.ryhma_3.kaiku.utility.SecurityTools;
import com.ryhma_3.kaiku.utility.Token;

import static com.ryhma_3.kaiku.utility.Logger.log;

import com.ryhma_3.kaiku.model.cast_object.UserObject;
import com.ryhma_3.kaiku.model.database.AdminDAO;

/**
 * AdminResourceController
 */
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class AdminResourceController {

    private AdminDAO adminDAO = new AdminDAO();

    @RequestMapping(value = "api/admin", method = RequestMethod.GET)
    public boolean adminAthentication(
            @RequestHeader("Authorization") String tokenString) {
		log("REST: admin authentication request");

        if (adminDAO.getId(SecurityTools.getCloneOfToken(tokenString).getUser_id())) {
            return true;
        }

        throw new ValidationFailedException();

    }

}
