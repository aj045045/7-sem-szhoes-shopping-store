package com.store.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.store.server.auth.CustomAuthenticationProvider;
import com.store.server.auth.JwtUtility;
import com.store.server.model.CustomerModel;
import com.store.server.service.CustomerService;
import com.store.server.util.ResponseUtil;

import jakarta.servlet.http.HttpSession;

import java.util.Map;

@RequestMapping
@RestController
public class AuthController {
    @Autowired
    private CustomerService customerService;

    @Autowired
    private CustomAuthenticationProvider customAuthenticationProvider;

    @Autowired
    private JwtUtility jwtUtility;

    @PostMapping("/auth/customer")
    public ResponseEntity<?> postCreateCustomer(@RequestBody Map<String, String> entity)
            throws Exception {
        customerService.createCustomer(entity.get("name"), entity.get("phone"), entity.get("emailId"),
                entity.get("password"), entity.get("sendOtp"), entity.get("otp"));
        return ResponseUtil.createResponse("Thanks for registration");
    }

    @GetMapping("/auth/customer")
    public ResponseEntity<?> getCustomerLogin(@RequestParam String emailId,
            @RequestParam String password, HttpSession session)
            throws Exception {
        CustomerModel customer = customerService.loginCustomer(emailId, password, session);
        String token = "";
        if (customer != null) {
            Authentication authentication = customAuthenticationProvider.authenticate(
                    new UsernamePasswordAuthenticationToken(customer.getName(), customer.getEmail()));
            if (!authentication.isAuthenticated()) {
                throw new UsernameNotFoundException("Invalid user request!");
            }
            token = jwtUtility.generateToken(customer.getEmail());
            if (token != null) {
                session.setAttribute("token", token);
            }
        }
        return ResponseUtil.createResponse("Thanks for Login", token);
    }

    @PostMapping("/auth/customer/p")
    public ResponseEntity<?> putCustomerPassword(
            @RequestBody Map<String, String> entity) throws Exception {
        customerService.updateCustomerPassword(entity.get("emailID"), entity.get("sendOtp"), entity.get("otp"),
                entity.get("newPassword"), entity.get("confirmPassword"));
        return ResponseUtil.createResponse("Your password has been successfully changed");
    }
}
