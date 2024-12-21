package com.store.server.util;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.Map;

public class ResponseUtil {

    // Method to create a standard response
    public static ResponseEntity<Map<Object, Object>> createResponse(String message) {
        Map<Object, Object> responseMap = new HashMap<>();
        responseMap.put("status", "success");
        responseMap.put("message", message);
        return new ResponseEntity<>(responseMap, HttpStatus.OK);
    }

    // Method to add additional data to the response
    public static ResponseEntity<Map<Object, Object>> createResponse(String message, Object additionalData) {
        Map<Object, Object> responseMap = new HashMap<>();
        responseMap.put("status", "success");
        responseMap.put("message", message);
        if (additionalData != null) {
            responseMap.put("data", additionalData);
        }
        return new ResponseEntity<>(responseMap, HttpStatus.OK);
    }
    
}
