package com.ryhma_3.kaiku.resource_controllers;

import javax.validation.Valid;

import com.ryhma_3.kaiku.model.castObject.UserObject;
import com.ryhma_3.kaiku.model.database.UserDAO;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

    /**
     * AccountController
     */
    @RestController
    public class UserResourceController {

    private UserDAO accountsDAO = new UserDAO();

    @GetMapping("/users")
    public UserObject getUsers (@RequestParam(value = "username") String username) {
        return accountsDAO.getUser(new UserObject("", username, "", ""));
    }

    // Does not work
    @PostMapping("/users")
    public void createUser (@Valid UserObject userObject) {
        System.out.println(userObject.getName());
        accountsDAO.createUser(userObject);
    }

}
