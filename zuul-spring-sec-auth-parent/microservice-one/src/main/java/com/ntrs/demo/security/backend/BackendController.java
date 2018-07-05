package com.ntrs.demo.security.backend;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * A simple controller.
 *
 */
@RestController
public class BackendController {

    @GetMapping("/adminAccess")
    public ApiResponse admin() {
    	return new ApiResponse(true, "Logged in with Role: Admin" );
    }

    @GetMapping("/userAccess")
    public ApiResponse user() {
        return new ApiResponse(true, "Logged in with Role: User" );
    }

    @GetMapping("/guest")
    public ApiResponse guest() {
        return new ApiResponse(true, "Logged in as guest. No Authorization. Public access");
    }
    
    @GetMapping("/testOne")
	public ApiResponse testOne() {
		return new ApiResponse(true, "Hi. You're Accessing TestOne API.");
	}
	
	@GetMapping("/testTwo")
	public ApiResponse testTwo() {
		return new ApiResponse(true, "Hi. You're Accessing TestTwo API.");
	}
}

