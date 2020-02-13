package com.dh.dhbackend.dtos.responses;

import lombok.Builder;
import lombok.Data;

/**
 * The DTO UserResponse. It holds the information of a successfully registered
 * customer.
 */
@Data
@Builder
public final class UserResponse {

	private Long id;
	private String username;
}
