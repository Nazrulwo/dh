package com.dh.dhbackend.dtos.responses;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

/**
 * The DTO TokenPair. It holds the user's JWT and refresh tokens.
 */
@Data
@Builder
@AllArgsConstructor
public class TokenPair {

	private final String jwt;
	private final String refreshToken;
}
