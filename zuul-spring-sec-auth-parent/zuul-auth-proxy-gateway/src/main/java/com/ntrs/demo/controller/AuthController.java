package com.ntrs.demo.controller;

import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ntrs.demo.payload.JwtAuthenticationResponse;
import com.ntrs.demo.payload.LoginRequest;
import com.ntrs.demo.security.common.JWTAuthTokenProvider;

@RestController
//@RequestMapping("/api/auth")
public class AuthController {

	@Autowired
	JWTAuthTokenProvider jwtAuthTokenProvider;

	@Autowired
	AuthenticationManager authenticationManager;

	@PostMapping("/login")
	public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {

		Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
				loginRequest.getUsername(), loginRequest.getPassword(), Collections.emptyList()));

		SecurityContextHolder.getContext().setAuthentication(authentication);

		String jwt = jwtAuthTokenProvider.generateToken(authentication);
		return ResponseEntity.ok(new JwtAuthenticationResponse(jwt));
	}
}
