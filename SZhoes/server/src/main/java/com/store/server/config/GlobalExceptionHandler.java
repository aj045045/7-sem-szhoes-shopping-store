package com.store.server.config;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import java.util.Map;
import java.util.HashMap;

/**
 * Class provide global exception handler
 * 
 * This class provide a global exception handler to handle errors
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

    /**
     * Error response handler
     *
     * This method will be call when error occur and return that error as response
     * 
     * @param ex - The error to be occur
     * @return response - The JSON data contain 'status' and 'message'
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, Object>> handleException(Exception ex) {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "alert");
        response.put("message", ex.getMessage());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
