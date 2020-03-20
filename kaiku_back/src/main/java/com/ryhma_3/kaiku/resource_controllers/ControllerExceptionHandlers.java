package com.ryhma_3.kaiku.resource_controllers;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.ryhma_3.kaiku.resource_controllers.exceptions.ResourceNotFoundException;
import com.ryhma_3.kaiku.resource_controllers.exceptions.ValidationFailedException;
import com.ryhma_3.kaiku.utility.Logger;

@ControllerAdvice
public class ControllerExceptionHandlers {

	@ExceptionHandler(ValidationFailedException.class)
	@ResponseStatus(value=HttpStatus.UNAUTHORIZED)
	public void handleValidationFailedException(ValidationFailedException ex) {
		Logger.log("Validation error");
	}
	
	
	@ExceptionHandler(ResourceNotFoundException.class)
	@ResponseStatus(value=HttpStatus.NO_CONTENT)
	public void handleResourceNotFoundException(ResourceNotFoundException ex) {
		Logger.log("Resource not found");
	}
}
