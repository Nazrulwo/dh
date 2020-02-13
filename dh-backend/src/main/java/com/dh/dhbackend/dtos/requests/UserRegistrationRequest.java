package com.dh.dhbackend.dtos.requests;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * The DTO UserRegistrationRequest. It holds the user details which are required
 * at the time of registration.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserRegistrationRequest {

	@NotBlank
	@Size(max = 40)
	@Email
	private String username;

	@NotBlank
	@Size(max = 100)
	private String password;
}
