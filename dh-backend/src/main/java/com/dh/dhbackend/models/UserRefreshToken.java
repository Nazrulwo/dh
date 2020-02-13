package com.dh.dhbackend.models;

import java.time.Instant;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * The entity UserRefreshToken. It holds information of user's JWT tokens.
 */
@Entity
@Table(name = "user_refresh_tokens")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserRefreshToken {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotBlank
	private String token;

	@ManyToOne(fetch = FetchType.LAZY)
	private User user;

	@Column(name = "expiration_time", nullable = false)
	@NotNull
	private Instant expirationTime;
}
