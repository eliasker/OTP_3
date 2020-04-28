package com.ryhma_3.kaiku.resource_controllers;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.ryhma_3.kaiku.resource_controllers.exceptions.BadUserInputException;
import com.ryhma_3.kaiku.resource_controllers.exceptions.ResourceNotFoundException;
import com.ryhma_3.kaiku.resource_controllers.exceptions.ValidationFailedException;
import com.ryhma_3.kaiku.utility.Logger;

/**
 * @author Panu Lindqvist
 * Java Spring allow handling bad http request with custom exceptions. All thrown custom exceptions in this project ate handled and logged here.
 */
@ControllerAdvice
public class ControllerExceptionHandlers {

	@ExceptionHandler(ValidationFailedException.class)
	@ResponseStatus(value=HttpStatus.UNAUTHORIZED)
	public void handleValidationFailedException(ValidationFailedException ex) {
		debugger(HttpStatus.UNAUTHORIZED + " validation error");
	}
	
	
	@ExceptionHandler(ResourceNotFoundException.class)
	@ResponseStatus(value=HttpStatus.NO_CONTENT)
	public void handleResourceNotFoundException(ResourceNotFoundException ex) {
		debugger(HttpStatus.NO_CONTENT + " resource not found");
	}
	
	@ExceptionHandler(BadUserInputException.class)
	@ResponseStatus(value=HttpStatus.BAD_REQUEST)
	public void handleBadUserInputException(BadUserInputException ex) {
		debugger(HttpStatus.BAD_REQUEST + " bad user input");
	}
	
	
	private void debugger(String data) {
		Logger.log("REST response: " +  data);
	}
}
