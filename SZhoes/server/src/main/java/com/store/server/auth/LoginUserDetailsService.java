package com.store.server.auth;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import jakarta.servlet.http.HttpSession;

/**
 * Class used for user authentication.
 * 
 * This class implements Spring Security's UserDetailsService interface
 * for custom user authentication.It fetches user details from the HTTP
 * session and converts them into a Spring Security-compatible User object.
 */
@Service
public class LoginUserDetailsService implements UserDetailsService {

    @Autowired
    private HttpSession session;

    /**
     * Method used to retrieve user detail.
     * 
     * This method loads user details by username (in this case, an email) and
     * retrieves user details from the session and creates a UserDetails object
     * required by Spring Security.
     *
     * @param emailId the email of the user being authenticated
     * @return UserDetails object for Spring Security, containing username, email,
     *         and authorities
     * @throws UsernameNotFoundException if the user is not found in the session or
     *                                   lacks necessary attributes
     */
    @Override
    public UserDetails loadUserByUsername(String emailId) throws UsernameNotFoundException {
        @SuppressWarnings("unchecked")
        Map<String, Object> user = (Map<String, Object>) session.getAttribute("user");
        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }
        String username = (String) user.get("name");
        String email = (String) user.get("email");
        if (username == null || username.isEmpty() || email == null || email.isEmpty()) {
            throw new UsernameNotFoundException("User name and email not found");
        }
        return new User(username, email, new java.util.ArrayList<>());
    }
}
