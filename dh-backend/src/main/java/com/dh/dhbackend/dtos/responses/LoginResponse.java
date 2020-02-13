package com.dh.dhbackend.dtos.responses;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * The DTO LoginResponse. It holds the information of a successfully logged-in
 * user.
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponse {

	private Long userId;
	private String username;
	private TokenPair tokens;
}
