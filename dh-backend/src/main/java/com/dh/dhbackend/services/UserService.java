package com.dh.dhbackend.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dh.dhbackend.dtos.requests.UserRegistrationRequest;
import com.dh.dhbackend.exceptions.DuplicateUserException;
import com.dh.dhbackend.models.User;
import com.dh.dhbackend.repositories.UserRepository;

/**
 * The service UserService. It holds implementation to operate on users' related
 * information.
 */
@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;

	private User mapRequest(UserRegistrationRequest userRegistrationRequest) {

		return new User();
	}

	@Transactional
	public User register(UserRegistrationRequest userRequest) {

		Optional<User> existingUser = userRepository.findOneByUsername(userRequest.getUsername());
		if (existingUser.isPresent()) {
			throw new DuplicateUserException(
					String.format("User with username %s already exists in the DB", userRequest.getUsername()));
		}
		return userRepository.save(this.mapRequest(userRequest));
	}
}
