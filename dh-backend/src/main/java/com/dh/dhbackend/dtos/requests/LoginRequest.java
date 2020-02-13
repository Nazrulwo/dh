package com.dh.dhbackend.dtos.requests;

import javax.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * The DTO LoginRequest. It holds the user details which are required at the
 * time of login.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoginRequest {

	@NotBlank
	private String username;

	@NotBlank
	private String password;
}
