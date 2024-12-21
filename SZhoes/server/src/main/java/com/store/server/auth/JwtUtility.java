package com.store.server.auth;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * JwtUtility class serve JWT implementation.
 * 
 * This class serve as a foundation for JWT method implementation
 * and provide different method to handle JWT across application.
 */
@Component
public class JwtUtility {

    private String SECRET_KEY = "70a02f6ba76669f6c4ae88d76ba125f03426273e34ddcb675cb2c54622a83a85";

    /**
     * Token generator method.
     * 
     * This method generates a JWT token for a given username, email and
     * include the email in its claims.
     *
     * @param username the username (email) for which the token is generated
     * @return the generated JWT token as a String
     */
    public String generateToken(String username) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("email", username);
        return createToken(claims, username);
    }

    /**
     * Helper method of generate token.
     * 
     * Helper method to create a JWT token with custom claims, subject, and
     * expiration time.
     *
     * @param claims  additional claims (such as email) to include in the token
     * @param subject the subject for whom the token is being created (usually the
     *                username)
     * @return the generated JWT token as a String
     */
    private String createToken(Map<String, Object> claims, String subject) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 5)) // 10 hours
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();
    }

    /**
     * Validate token for expiration.
     * 
     * Validates a JWT token by comparing the email from the token with the provided
     * email and checking if the token has expired.
     *
     * @param token the JWT token to validate
     * @param email the email to validate against the token's claims
     * @return true if the token is valid (matches email and is not expired), false
     *         otherwise
     */
    public boolean validateToken(String token, String email) {
        final String extractEmail = extractEmail(token);
        return (extractEmail.equals(email) && !isTokenExpired(token));
    }

    /**
     * Extracts the email (username) from the JWT token's claims.
     *
     * @param token the JWT token from which to extract the email
     * @return the email stored in the token's claims
     */
    public String extractEmail(String token) {
        return Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody().get("email", String.class);
    }

    /**
     * Check token expiration using date.
     * 
     * Checks if the JWT token has expired by comparing its expiration date with the
     * current date.
     *
     * @param token the JWT token to check
     * @return true if the token is expired, false otherwise
     */
    private boolean isTokenExpired(String token) {
        return Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody().getExpiration()
                .before(new Date());
    }
}
