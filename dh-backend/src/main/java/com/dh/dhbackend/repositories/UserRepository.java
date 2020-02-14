package com.dh.dhbackend.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dh.dhbackend.models.User;

/**
 * The repository UserRepository. It holds blue print of methods which performs
 * CRUD operations on users' information.
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

	Optional<User> findOneByUsername(String username);

	Optional<User> findOneByUsernameAndPassword(String username, String password);
}
