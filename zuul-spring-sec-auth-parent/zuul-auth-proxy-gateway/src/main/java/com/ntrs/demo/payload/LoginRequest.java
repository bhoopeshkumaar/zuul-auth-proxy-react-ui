package com.ntrs.demo.payload;

import org.hibernate.validator.constraints.NotBlank;

public class LoginRequest {
	
    @NotBlank
    private String username;

    @NotBlank
    private String password;

    
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}
}
