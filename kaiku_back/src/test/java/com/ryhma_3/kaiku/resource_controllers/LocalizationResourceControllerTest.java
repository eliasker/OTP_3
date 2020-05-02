package com.ryhma_3.kaiku.resource_controllers;

import static org.junit.jupiter.api.Assertions.*;

import java.util.ArrayList;
import java.util.HashMap;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import com.ryhma_3.kaiku.KaikuApplication;
import com.ryhma_3.kaiku.model.cast_object.LocalizationObject;
import com.ryhma_3.kaiku.resource_controllers.exceptions.BadUserInputException;
import com.ryhma_3.kaiku.resource_controllers.exceptions.ValidationFailedException;

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
