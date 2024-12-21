package com.store.server.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * Configuration class for Spring Security to handle JWT authentication.
 * 
 * It sets up the security filter chain, authentication providers,
 * password encoding, and includes a custom authentication provider.
 */
@Configuration
@EnableWebSecurity
public class JwtSecurityConfig {

    @Autowired
    private CustomAuthenticationProvider customAuthenticationProvider;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private JwtRequestFilter filter;

    /**
     * Configures the security filter chain for HTTP requests.
     * 
     * It disables CSRF protection (when using JWTs) and permits all
     * requests to endpoints under "/auth/**" while authenticate for
     * all other requests also add custom JWT request filter before the
     * UsernamePasswordAuthenticationFilter
     *
     * @param http the HttpSecurity object
     * @return the configured SecurityFilterChain
     * @throws Exception in case of configuration errors
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/auth/**").permitAll()
                        .anyRequest().authenticated())
                .addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    /**
     * Defines the password encoder for hashing passwords using BCrypt.
     * 
     * This method uses BCrypt which is a strong password hashing function that 
     * ensures secure password storage.
     *
     * @return the BCryptPasswordEncoder bean
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * Configures the authentication manager.
     * 
     * This method uses the custom authentication provider to handle user
     * authentication.
     *
     * @param http the HttpSecurity object
     * @return the configured AuthenticationManager
     * @throws Exception in case of configuration errors
     */
    @Bean
    public AuthenticationManager authManager(HttpSecurity http) throws Exception {
        AuthenticationManagerBuilder authenticationManagerBuilder = http
                .getSharedObject(AuthenticationManagerBuilder.class);
        authenticationManagerBuilder.authenticationProvider(customAuthenticationProvider);
        return authenticationManagerBuilder.build();
    }

    /**
     * Authentication through database.
     * 
     * DaoAuthenticationProvider bean that uses the UserDetailsService
     * to retrieve user data and handles authentication through the database.
     * This is particularly useful if user data is stored in a database.
     *
     * @return the configured DaoAuthenticationProvider
     */
    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsService);
        return provider;
    }
}