package com.dh.dhbackend.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * The business exception UserNotFoundException. Its thrown when no user is
 * found with any specified criteria.
 */
@ResponseStatus(HttpStatus.BAD_REQUEST)
public class UserNotFoundException extends RuntimeException {

	private static final long serialVersionUID = -751375912287164122L;

	public UserNotFoundException(String message) {
		super(message);
	}
}
