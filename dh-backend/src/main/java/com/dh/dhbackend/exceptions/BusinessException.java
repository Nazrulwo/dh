package com.dh.dhbackend.exceptions;

import org.springframework.http.HttpStatus;

/**
 * The runtime exception BusinessException. It is thrown when something breaks
 * in core business logic.
 */
public abstract class BusinessException extends RuntimeException {

	private static final long serialVersionUID = 9011294258906780255L;
	private final HttpStatus httpStatus;
	private final ErrorCode errorCode;

	public BusinessException(String errorMessage) {
		this(errorMessage, HttpStatus.BAD_REQUEST, ErrorCode.INVALID_INPUT);
	}

	public BusinessException(String errorMessage, ErrorCode errorCode) {
		this(errorMessage, HttpStatus.BAD_REQUEST, errorCode);
	}

	public BusinessException(String errorMessage, HttpStatus httpStatus, ErrorCode errorCode) {
		super(errorMessage);
		this.httpStatus = httpStatus;
		this.errorCode = errorCode;
	}

	public HttpStatus getHttpStatus() {
		return httpStatus;
	}

	public ErrorCode getErrorCode() {
		return errorCode;
	}
}
