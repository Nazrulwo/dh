package com.dh.dhbackend.exceptions;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.validation.ConstraintViolation;

import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * The DTO ApiError. It contains error information.
 */
@Data
class ApiError {

	private HttpStatus status;
	private Instant time;
	private String path;
	private String method;
	private List<ApiSubError> errors;

	private ApiError() {
		time = Instant.now();
	}

	ApiError(HttpStatus status) {
		this();
		this.status = status;
	}

	private void addSubError(ApiSubError subError) {
		if (errors == null) {
			errors = new ArrayList<>();
		}
		errors.add(subError);
	}

	void addValidationError(String message, ErrorCode code) {
		addSubError(new ApiValidationError(message, code));
	}

	void addValidationErrors(Set<ConstraintViolation<?>> constraintViolations) {
		constraintViolations.forEach(this::addValidationError);
	}

	private void addValidationError(ConstraintViolation<?> cv) {
		this.addValidationError(cv.getMessage(), ErrorCode.INVALID_INPUT);
	}

	void addValidationErrors(List<FieldError> fieldErrors) {
		fieldErrors.forEach(this::addValidationError);
	}

	private void addValidationError(FieldError fieldError) {
		this.addValidationError(fieldError.getDefaultMessage(), ErrorCode.INVALID_PARAMS);
	}

	interface ApiSubError {
	}

	@Data
	@EqualsAndHashCode(callSuper = false)
	@AllArgsConstructor
	static class ApiValidationError implements ApiSubError {
		private String message;
		private ErrorCode code;
	}
}
