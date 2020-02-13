package com.dh.dhbackend.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * The business exception DuplicateUserException. Its thrown when duplicate user
 * is encountered at the time of registration.
 */
@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class DuplicateUserException extends BusinessException {

	private static final long serialVersionUID = -186648213911147861L;

	public DuplicateUserException(String message) {
		super(message);
	}
}
