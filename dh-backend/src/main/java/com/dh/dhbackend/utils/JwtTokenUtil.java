package com.dh.dhbackend.utils;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

/**
 * The utility class JwtTokenUtil. It holds the implementation to operate on JWT
 * tokens.
 */
@Component
public class JwtTokenUtil {

	@Value("${jwt.secret}")
	private String secret;

	@Value("${jwt.expirationMillis}")
	private Integer expirationMillis;

	public String generateToken(UserDetails userDetails) {
		Map<String, Object> claims = new HashMap<>();
		return doGenerateToken(claims, userDetails.getUsername());
	}

	public String generateRefreshToken(UserDetails userDetails) {
		return UUID.randomUUID().toString();
	}

	public Boolean validateToken(String token, UserDetails userDetails) {
		final String username = getUsername(token);
		return userDetails != null && username.equals(userDetails.getUsername()) && !isTokenExpired(token);
	}

	public String getUsername(String token) {
		return getClaimFromToken(token, Claims::getSubject);
	}

	private <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
		final Claims claims = Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
		return claimsResolver.apply(claims);
	}

	private String doGenerateToken(Map<String, Object> claims, String subject) {
		return Jwts.builder().setClaims(claims).setSubject(subject).setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date(System.currentTimeMillis() + expirationMillis))
				.signWith(SignatureAlgorithm.HS512, secret).compact();
	}

	private Boolean isTokenExpired(String token) {
		final Date expiration = getClaimFromToken(token, Claims::getExpiration);
		return expiration.before(new Date());
	}
}
