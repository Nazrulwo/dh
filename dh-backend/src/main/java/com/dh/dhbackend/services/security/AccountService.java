package com.dh.dhbackend.services.security;

import java.time.Instant;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dh.dhbackend.dtos.responses.LoginResponse;
import com.dh.dhbackend.dtos.responses.TokenPair;
import com.dh.dhbackend.exceptions.UserNotFoundException;
import com.dh.dhbackend.models.User;
import com.dh.dhbackend.models.UserRefreshToken;
import com.dh.dhbackend.repositories.UserRefreshTokenRepository;
import com.dh.dhbackend.repositories.UserRepository;
import com.dh.dhbackend.utils.JwtTokenUtil;

/**
 * The service AccountService. It holds implementation to operate on user
 * accounts' related information.
 */
@Service
public class AccountService {

	@Value("${jwt.refreshTokenExpirationPeriodMillis}")
	private int refreshTokenExpirationPeriod;

	@Autowired
	private JwtTokenUtil jwtTokenUtil;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private UserRefreshTokenRepository userRefreshTokenRepository;

	@Qualifier("jwtUserDetailsService")
	@Autowired
	private UserDetailsService userDetailsService;

	public LoginResponse login(String username) {

		final UserPrincipal userDetails = (UserPrincipal) userDetailsService.loadUserByUsername(username);
		final String token = jwtTokenUtil.generateToken(userDetails);
		final String refreshToken = generateAndSaveRefreshToken(userDetails);

		return LoginResponse.builder().userId(userDetails.getUser().getId()).username(userDetails.getUsername())
				.tokens(new TokenPair(token, refreshToken)).build();
	}

	@Transactional
	public void logout(User user) {
		userRefreshTokenRepository.deleteAllByUser(user);
	}

	private String generateAndSaveRefreshToken(final UserDetails userDetails) {

		final String refreshToken = jwtTokenUtil.generateRefreshToken(userDetails);
		User user = userRepository.findOneByUsername(userDetails.getUsername())
				.orElseThrow(() -> new UserNotFoundException("Invalid username supplied"));
		userRefreshTokenRepository.save(UserRefreshToken.builder().token(refreshToken).user(user)
				.expirationTime(Instant.now().plusMillis(refreshTokenExpirationPeriod)).build());

		return refreshToken;
	}
}
