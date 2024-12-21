package com.store.server.util;

import com.store.server.auth.JwtUtility;

import jakarta.servlet.http.HttpServletRequest;

public class BearerUtil {

    public static String getEmailId(HttpServletRequest request) {
        JwtUtility jwtUtility = new JwtUtility();
        String authorizationHeader = request.getHeader("Authorization");
        String bearerToken = null;
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            bearerToken = authorizationHeader.substring(7);
        }
        return jwtUtility.extractEmail(bearerToken);
    }
}
