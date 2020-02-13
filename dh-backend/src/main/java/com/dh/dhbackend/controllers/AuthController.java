package com.dh.dhbackend.controllers;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.dh.dhbackend.dtos.requests.LoginRequest;
import com.dh.dhbackend.dtos.requests.UserRegistrationRequest;
import com.dh.dhbackend.dtos.responses.LoginResponse;
import com.dh.dhbackend.models.User;
import com.dh.dhbackend.services.UserService;
import com.dh.dhbackend.services.security.AccountService;
import com.dh.dhbackend.services.security.UserPrincipal;

import lombok.extern.slf4j.Slf4j;

/**
 * The controller AuthController. It holds APIs to control the authentication
 * flow of the user.
 */
@RestController
@RequestMapping("/auth")
@Slf4j
@Validated
public class AuthController {

	/**
	 * The authentication manager
	 */
	@Autowired
	private AuthenticationManager authenticationManager;

	/**
	 * The account service
	 */
	@Autowired
	private AccountService accountService;

	/**
	 * The user service
	 */
	@Autowired
	private UserService userService;

	/**
	 * Authenticates the credentials
	 * 
	 * @param username The user name
	 * @param password The password
	 */
	private void authenticate(String username, String password) {

		try {
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
		} catch (DisabledException e) {
			throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User is disabled", e);
		} catch (BadCredentialsException e) {
			throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid Credentials", e);
		}
	}

	/**
	 * API to login
	 * 
	 * @param loginRequest The login request
	 * @return The login status
	 */
	@PostMapping(path = "/login", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<LoginResponse> login(@RequestBody @Valid LoginRequest loginRequest) {

		this.authenticate(loginRequest.getUsername(), loginRequest.getPassword());
		return ResponseEntity.ok().body(this.accountService.login(loginRequest.getUsername()));
	}

	/**
	 * API to logout
	 * 
	 * @param authentication The authentication instance
	 * @return The logout status
	 */
	@PostMapping(path = "/logout")
	public ResponseEntity<Void> logout(Authentication authentication) {

		log.info("Logging out user {}", authentication.getName());
		this.accountService.logout(((UserPrincipal) authentication.getPrincipal()).getUser());
		return ResponseEntity.ok().build();
	}

	/**
	 * API to register
	 * 
	 * @param registrationRequest The registration request
	 * @return The registration status
	 */
	@PostMapping(value = "/register", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<User> register(@RequestBody final @Valid UserRegistrationRequest registrationRequest) {

		return ResponseEntity.ok().body(this.userService.register(registrationRequest));
	}
}
