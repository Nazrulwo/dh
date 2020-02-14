package com.dh.dhbackend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dh.dhbackend.dtos.requests.LoginRequest;
import com.dh.dhbackend.dtos.requests.UserRegistrationRequest;
import com.dh.dhbackend.dtos.responses.LoginResponse;
import com.dh.dhbackend.exceptions.DuplicateUserException;
import com.dh.dhbackend.exceptions.UserNotFoundException;
import com.dh.dhbackend.models.User;
import com.dh.dhbackend.repositories.UserRepository;
import com.dh.dhbackend.utils.PasswordUtils;

/**
 * The service UserService. It holds implementation to operate on users' related
 * information.
 */
@Service
public class UserService {

	/**
	 * The user repository
	 */
	@Autowired
	private UserRepository userRepository;

	/**
	 * Maps the user registration request to the user model
	 * 
	 * @param userRegistrationRequest The user registration request
	 * @return The user instance
	 */
	private User mapRequest(UserRegistrationRequest userRegistrationRequest) {

		User user = new User();
		user.setUsername(userRegistrationRequest.getUsername());
		user.setPassword(PasswordUtils.encrypt(userRegistrationRequest.getPassword()));
		return user;
	}

	/**
	 * Registers a user
	 * 
	 * @param userRequest The user request
	 * @return The registration status
	 */
	@Transactional
	public User register(UserRegistrationRequest userRequest) {

		userRepository.findOneByUsername(userRequest.getUsername()).ifPresent(e -> {
			throw new DuplicateUserException(
					String.format("User with username %s already exists in the DB", userRequest.getUsername()));
		});
		return userRepository.save(this.mapRequest(userRequest));
	}

	/**
	 * Authenticates the login request
	 * 
	 * @param loginRequest The login request
	 * @return The authentication status
	 */
	@Transactional
	public LoginResponse authenticateUser(LoginRequest loginRequest) {

		User existingUser = userRepository.findOneByUsernameAndPassword(loginRequest.getUsername(),
				PasswordUtils.encrypt(loginRequest.getPassword())).orElseThrow(() -> {
					throw new UserNotFoundException("User not found!");
				});
		return LoginResponse.builder().userId(existingUser.getId()).username(existingUser.getUsername()).build();
	}
}
