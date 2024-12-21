package com.store.server.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

/**
 * This filter is invoked once per request by extending OncePerRequestFilter.
 * 
 * JwtRequestFilter is a custom filter that processes incoming HTTP requests
 * to check for JWT tokens, validate them, and set the authenticated user
 * in the security context if the token is valid.
 * 
 */
@Component
public class JwtRequestFilter extends OncePerRequestFilter {
    @Autowired
    private JwtUtility jwtUtility;

    @Autowired
    private LoginUserDetailsService detailsService;

    /**
     * This method check the incoming request for JWT tokens in headers
     * 
     * Filters incoming requests to check for JWT tokens in the Authorization
     * header. If a valid JWT is found, it authenticates the user and sets it
     * in the security context.
     * 
     * @param request  The incoming HTTP request
     * @param response The outgoing HTTP response
     * @param chain    The filter chain to continue processing other filters
     * @throws ServletException If an error occurs during filtering
     * @throws IOException      If an I/O error occurs during filtering
     */
    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response,
            @NonNull FilterChain chain)
            throws ServletException, IOException {
        final String authorizationHeader = request.getHeader("Authorization");
        String email = null;
        String jwt = null;

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            jwt = authorizationHeader.substring(7);
            email = jwtUtility.extractEmail(jwt);
        }

        if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = detailsService.loadUserByUsername(email);

            if (jwtUtility.validateToken(jwt, userDetails.getPassword())) {
                var authToken = new UsernamePasswordAuthenticationToken(userDetails, null,
                        userDetails.getAuthorities());
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }
        chain.doFilter(request, response);
    }
}
