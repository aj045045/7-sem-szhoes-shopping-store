package com.store.server.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.store.server.container.request.CustomerDTO;
import com.store.server.service.CustomerService;
import com.store.server.util.ResponseUtil;

import jakarta.servlet.http.HttpSession;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/customer")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @GetMapping("/login")
    public ResponseEntity<?> getIsLoggedIn(HttpSession session) {
        String responseMap = (String) session.getAttribute("loggedInAs");
        return ResponseUtil.createResponse("The LOGIN DETAIL", responseMap);
    }

    @GetMapping("/counter")
    public ResponseEntity<?> getMethodName() {
        return ResponseUtil.createResponse("Counts", customerService.getNotificationCounts());
    }

    @GetMapping("/logout")
    public ResponseEntity<?> getLogOut(HttpSession session) {
        session.invalidate();
        return ResponseUtil.createResponse("Thanks for visiting!", true);
    }

    @GetMapping
    public ResponseEntity<?> getCustomerDetail(HttpSession session) {
        @SuppressWarnings("unchecked")
        Map<String, Object> responseMap = (Map<String, Object>) session.getAttribute("user");
        return ResponseUtil.createResponse("Customer Detail Fetched", responseMap);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> putCustomerDetail(@PathVariable String id, @RequestBody CustomerDTO entityJson,
            HttpSession session)
            throws Exception {

        customerService.updateCustomer(id, entityJson.getName(),
                entityJson.getEmail(), entityJson.getPhoneNo(),
                entityJson.getOldPassword(), entityJson.getNewPassword(),
                entityJson.getConfirmPassword(), entityJson.getNotification(), entityJson.getAddressId(), session);
        return ResponseUtil.createResponse("Your Setting has been updated");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCustomerDetail(@PathVariable String id, HttpSession session) throws Exception {
        customerService.deleteCustomer(id);
        session.invalidate();
        return ResponseUtil.createResponse("Your account has been deleted");
    }
}
