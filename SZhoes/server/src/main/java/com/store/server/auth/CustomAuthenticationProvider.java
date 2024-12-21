package com.store.server.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

/**
 * CustomAuthenticationProvider handles authentication by verifying the username and password.
 * 
 * It implements the AuthenticationProvider interface, allowing Spring Security
 * to delegate authentication requests to this custom provider.
 */
@Component
public class CustomAuthenticationProvider implements AuthenticationProvider {

    @Autowired
    private LoginUserDetailsService userDetailsService;

    /**
     * The main authentication method.
     * 
     * This method authenticates the user by comparing the provided credentials
     * (username and password) with those stored in the system.
     * 
     * @param authentication The authentication request object, containing
     *                       credentials.
     * @return Authentication An authenticated token if successful.
     * @throws AuthenticationException if the authentication fails (invalid
     *                                 credentials).
     */
    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String username = authentication.getName();
        String password = (String) authentication.getCredentials();

        UserDetails userDetails = userDetailsService.loadUserByUsername(username);

        // Check if the passwords match
        if (userDetails != null && password.equals(userDetails.getPassword())) {
            return new UsernamePasswordAuthenticationToken(username, password, userDetails.getAuthorities());
        } else {
            throw new BadCredentialsException("Invalid username or password.");
        }
    }

    /**
     * This method checks if the provided authentication type is supported.
     * 
     * In this case, it checks if the authentication request is of type
     * UsernamePasswordAuthenticationToken.
     * 
     * @param authentication The class of the authentication object.
     * @return boolean True if the authentication type is supported, otherwise
     *         false.
     */
    @Override
    public boolean supports(Class<?> authentication) {
        return UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication);
    }
}
