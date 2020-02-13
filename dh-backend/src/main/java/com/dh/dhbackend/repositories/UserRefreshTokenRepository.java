package com.dh.dhbackend.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.dh.dhbackend.models.User;
import com.dh.dhbackend.models.UserRefreshToken;

/**
 * The repository UserRefreshTokenRepository. It holds blue print of methods
 * which performs CRUD operations on users' refresh tokens.
 */
@Repository
public interface UserRefreshTokenRepository extends CrudRepository<UserRefreshToken, Long> {

	Integer deleteAllByUser(User user);
}
