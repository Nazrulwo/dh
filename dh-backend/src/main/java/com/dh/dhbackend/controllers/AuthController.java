package com.dh.dhbackend.controllers;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dh.dhbackend.dtos.requests.LoginRequest;
import com.dh.dhbackend.dtos.requests.UserRegistrationRequest;
import com.dh.dhbackend.dtos.responses.LoginResponse;
import com.dh.dhbackend.models.User;
import com.dh.dhbackend.services.UserService;

/**
 * The controller AuthController. It holds APIs to control the authentication
 * flow of the user.
 */
@RestController
@RequestMapping("/api/v1/auth")
@Validated
@CrossOrigin
public class AuthController {

	/**
	 * The user service
	 */
	@Autowired
	private UserService userService;

	/**
	 * API to login
	 * 
	 * @param loginRequest The login request
	 * @return The login status
	 */
	@PostMapping(path = "/login", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<LoginResponse> login(@RequestBody @Valid LoginRequest loginRequest) {

		return ResponseEntity.ok().body(this.userService.authenticateUser(loginRequest));
	}

	/**
	 * API to register
	 * 
	 * @param registrationRequest The registration request
	 * @return The registration status
	 */
	@PostMapping(value = "/register", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<User> register(@RequestBody final @Valid UserRegistrationRequest registrationRequest) {
		
		this.userService.register(registrationRequest);
		return ResponseEntity.ok().build();
	}
}
