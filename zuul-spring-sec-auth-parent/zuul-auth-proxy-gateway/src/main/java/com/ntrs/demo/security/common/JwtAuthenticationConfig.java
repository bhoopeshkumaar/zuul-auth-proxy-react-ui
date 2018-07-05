package com.ntrs.demo.security.common;

import lombok.Getter;
import lombok.ToString;
import org.springframework.beans.factory.annotation.Value;

/**
 * Config JWT.
 * Only one property 'ntrs.security.jwt.secret' is mandatory.
 *
 */
@Getter
@ToString
public class JwtAuthenticationConfig {

    @Value("${ntrs.security.jwt.url:/login}")
    private String url;

    @Value("${ntrs.security.jwt.header:Authorization}")
    private String header;

    @Value("${ntrs.security.jwt.prefix:Bearer}")
    private String prefix;

    @Value("${ntrs.security.jwt.expiration:#{24*60*60}}")
    private int expiration; // default 24 hours

    @Value("${ntrs.security.jwt.secret}")
    private String secret;
    
    
}
