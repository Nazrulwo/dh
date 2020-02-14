package com.dh.dhbackend.exceptions;

import static org.springframework.http.HttpStatus.BAD_REQUEST;

import javax.servlet.http.HttpServletRequest;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.ServletWebRequest;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

/**
 * The exception handler RestExceptionHandler. It handles all application level
 * exceptions.
 */
@Order(Ordered.HIGHEST_PRECEDENCE)
@ControllerAdvice
public class RestExceptionHandler extends ResponseEntityExceptionHandler {

	@ExceptionHandler(javax.validation.ConstraintViolationException.class)
	protected ResponseEntity<Object> handleConstraintViolation(javax.validation.ConstraintViolationException ex,
			WebRequest request) {
		ApiError apiError = new ApiError(BAD_REQUEST);
		apiError.addValidationErrors(ex.getConstraintViolations());
		return buildResponseEntity(apiError, request);
	}

	@ExceptionHandler(BusinessException.class)
	protected ResponseEntity<Object> handleBusinessException(BusinessException ex, WebRequest request) {
		ApiError apiError = new ApiError(ex.getHttpStatus());
		apiError.addValidationError(ex.getMessage(), ex.getErrorCode());
		return buildResponseEntity(apiError, request);
	}

	@Override
	protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
			HttpHeaders headers, HttpStatus status, WebRequest request) {
		ApiError apiError = new ApiError(BAD_REQUEST);
		apiError.addValidationErrors(ex.getBindingResult().getFieldErrors());
		return buildResponseEntity(apiError, request);
	}

	private ResponseEntity<Object> buildResponseEntity(ApiError apiError, WebRequest request) {
		HttpServletRequest httpReq = ((ServletWebRequest) request).getRequest();
		apiError.setMethod(httpReq.getMethod());
		apiError.setPath(httpReq.getRequestURI());

		return new ResponseEntity<>(apiError, apiError.getStatus());
	}
}
