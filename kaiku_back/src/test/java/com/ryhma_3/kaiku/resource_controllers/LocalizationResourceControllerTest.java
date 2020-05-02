package com.ryhma_3.kaiku.resource_controllers;

import static org.junit.jupiter.api.Assertions.*;

import java.util.ArrayList;
import java.util.HashMap;

import org.assertj.core.util.Arrays;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.junit.jupiter.params.provider.ValueSource;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;
import org.springframework.test.web.client.ExpectedCount;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;

import com.ryhma_3.kaiku.KaikuApplication;
import com.ryhma_3.kaiku.model.cast_object.ChatObject;
import com.ryhma_3.kaiku.model.cast_object.InitializationObject;
import com.ryhma_3.kaiku.model.cast_object.LocalizationObject;
import com.ryhma_3.kaiku.model.cast_object.UserObject;
import com.ryhma_3.kaiku.model.database.IChatDAO;
import com.ryhma_3.kaiku.model.database.IUserDAO;
import com.ryhma_3.kaiku.resource_controllers.exceptions.BadUserInputException;
import com.ryhma_3.kaiku.resource_controllers.exceptions.ResourceNotFoundException;
import com.ryhma_3.kaiku.resource_controllers.exceptions.ValidationFailedException;
import com.ryhma_3.kaiku.utility.SecurityTools;

/**
 * LocalizationResourceControllerTest
 */
public class LocalizationResourceControllerTest {

    private LocalizationResourceController lrc = new LocalizationResourceController();

    @BeforeAll
    public static void name() {
        KaikuApplication.setLocalizationDAO(new Dummies().localizationDAO);
    }

    @Test
    public void testGetLocale() {
        LocalizationObject lo = lrc.getLocale("FI");
        assertTrue(lo.getIdenticator().equals("FI"));
        assertTrue(lo.getItems().get("auth_confirm").equals("Todenna"));
    }

    @Test
    public void testGetLocalizationIndicators() {
        ArrayList<String> indicatorList = lrc.getLocaleIndicators();
        assertTrue(indicatorList.get(0).equals("FI"));
        assertTrue(indicatorList.get(1).equals("EN"));
    }

    @Test
    public void testPutLocalizationObject() {
        LocalizationObject testLocale = new LocalizationObject("FI");
        final HashMap<String, String> testItems = new HashMap<String, String>() {{
                put("auth_confirm", "Todenna");
                put("help_last", "Edellinen");
        }};
        testLocale.setItems(testItems);
        LocalizationObject lo = lrc.putLocalizationObject(testLocale, "kaiku");
        assertTrue(lo.getIdenticator().equals("FI"));

        assertThrows(
            BadUserInputException.class,
            () -> lrc.putLocalizationObject(
                new LocalizationObject(""),
                "kaiku"
            )
        );
        
        assertThrows(
            ValidationFailedException.class,
            () -> lrc.putLocalizationObject(
                new LocalizationObject("FI"),
                ""
            )
        );
    }

    @Test
    public void testDeleteLocalization() {
        assertTrue(lrc.deleteLocalization("FI", "kaiku"));
        assertThrows(
            ValidationFailedException.class,
            () -> lrc.deleteLocalization(
                "FI",
                ""
            )
        );
    }

}
