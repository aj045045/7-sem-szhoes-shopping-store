package com.store.server.config;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import org.springframework.lang.NonNull;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/**
 * Class to handle request and response.
 * 
 * This class is used to handle and validate request and check the required
 * content type in the application
 */
@Component
public class CustomInterceptor implements HandlerInterceptor {

    /**
     * Method used to check method type in header
     * 
     * This method is used to check headers have GET, PUT AND DELETE method and also
     * check that header Content-Type have application/json format
     */
    @Override
    public boolean preHandle(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response,
            @NonNull Object handler)
            throws Exception {
        String method = request.getMethod();
        if ("POST".equalsIgnoreCase(method) || "PUT".equalsIgnoreCase(method) || "DELETE".equalsIgnoreCase(method)) {
            String contentType = request.getHeader("Content-Type");
            if (contentType == null || !contentType.equals("application/json")) {
                throw new Exception("Content-Type must be application/json");
            }
        }
        return true;
    }

    // @Override
    // public void afterCompletion(@NonNull HttpServletRequest request, @NonNull
    // HttpServletResponse response,
    // @NonNull Object handler, @Nullable Exception ex) throws Exception {
    // // Thread.sleep(5000);
    // }
}
