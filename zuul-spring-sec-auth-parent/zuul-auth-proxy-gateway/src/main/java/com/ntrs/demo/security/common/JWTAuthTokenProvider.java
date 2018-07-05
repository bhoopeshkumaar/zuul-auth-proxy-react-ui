package com.ntrs.demo.security.common;

import java.time.Instant;
import java.util.Date;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JWTAuthTokenProvider {

	@Value("${ntrs.security.jwt.expiration:#{24*60*60}}")
    private int expiration; // default 24 hours

    @Value("${ntrs.security.jwt.secret}")
    private String secret;

	public String generateToken(Authentication auth) {

		Instant now = Instant.now();
		String token = Jwts.builder()
				.setSubject(auth.getName())
				.claim("authorities", auth.getAuthorities().stream()
						.map(GrantedAuthority::getAuthority).collect(Collectors.toList()))
				.setIssuedAt(Date.from(now))
				.setExpiration(Date.from(now.plusSeconds(expiration)))
				.signWith(SignatureAlgorithm.HS256, secret.getBytes())
				.compact();

		return token;
	}

}
