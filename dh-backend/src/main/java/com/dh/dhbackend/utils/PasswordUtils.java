package com.dh.dhbackend.utils;

import java.math.BigInteger;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import lombok.extern.slf4j.Slf4j;

/**
 * The utility class PasswordUtils. It holds implementation to convert password
 * to encrypted text.
 */
@Slf4j
public class PasswordUtils {

	private PasswordUtils() {
		// Its a utility class. Thus instantiation is not required.
	}

	/**
	 * Encrypts the text into hash
	 * 
	 * @param rawText the raw text
	 * @return The hash
	 */
	public static String encrypt(String rawText) {

		try {
			MessageDigest messageDigest = MessageDigest.getInstance("SHA-256");
			return new BigInteger(messageDigest.digest(rawText.getBytes(StandardCharsets.UTF_8))).toString(16);
		} catch (NoSuchAlgorithmException noSuchAlgorithmException) {
			log.error("Error creating hash of string.", noSuchAlgorithmException);
		}
		return rawText;
	}
}
