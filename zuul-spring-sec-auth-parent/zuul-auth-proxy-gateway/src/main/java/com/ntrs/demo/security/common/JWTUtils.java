package com.ntrs.demo.security.common;

import java.time.Instant;
import java.util.Date;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

public class JWTUtils {

	@Autowired private JwtAuthenticationConfig config;

	public String generateToken(Authentication auth) {

		Instant now = Instant.now();
		String token = Jwts.builder()
				.setSubject(auth.getName())
				.claim("authorities", auth.getAuthorities().stream()
						.map(GrantedAuthority::getAuthority).collect(Collectors.toList()))
				.setIssuedAt(Date.from(now))
				.setExpiration(Date.from(now.plusSeconds(config.getExpiration())))
				.signWith(SignatureAlgorithm.HS256, config.getSecret().getBytes())
				.compact();


		return token;
	}

}
