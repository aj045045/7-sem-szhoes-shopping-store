package com.store.server.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.lang.NonNull;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * WebConfig class provides configuration for CORS and custom interceptors.
 * 
 * It class which implements the WebMvcConfigurer interface to override
 * configuration
 * methods for Spring MVC.
 */
@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Autowired
    CustomInterceptor customInterceptor;

    /**
     * Configures CORS (Cross-Origin Resource Sharing) settings for the application.
     * 
     * This method allows you to define the origins, HTTP methods, and credentials
     * handling for CORS.
     * 
     * @param registry the CorsRegistry used to configure the CORS settings
     */
    @Override
    public void addCorsMappings(@NonNull CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowCredentials(true);
    }

    /**
     * Registers custom interceptors for handling incoming HTTP requests.
     * 
     * Interceptors can be used for tasks such as logging, authentication, etc.,
     * before reaching the controller.
     * 
     * @param registry the InterceptorRegistry used to register interceptors
     */
    @Override
    public void addInterceptors(@NonNull InterceptorRegistry registry) {
        registry.addInterceptor(customInterceptor);
    }
}
