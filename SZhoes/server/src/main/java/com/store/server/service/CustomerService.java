package com.store.server.service;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.aggregation.ConditionalOperators;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Service;

import com.store.server.container.response.NotificationResponseDTO;
import com.store.server.model.CustomerModel;
import com.store.server.repository.AddressRepo;
import com.store.server.repository.CustomerRepo;

import jakarta.servlet.http.HttpSession;

import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.data.mongodb.core.aggregation.Aggregation;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.*;

@Service
public class CustomerService {
    private final MongoTemplate mongoTemplate;
    private final CustomerRepo customerRepo;
    private final AddressRepo addressRepo;

    public CustomerService(MongoTemplate mongoTemplate, CustomerRepo customerRepo, AddressRepo addressRepo) {
        this.mongoTemplate = mongoTemplate;
        this.customerRepo = customerRepo;
        this.addressRepo = addressRepo;
    }

    public void createCustomer(String name, String mobile, String emailId, String password, String sendOtp,
            String otp) throws Exception {
        CustomerModel model = new CustomerModel();
        if (sendOtp.equals(otp)) {
            if (name.isBlank()) {
                throw new Exception("Name is not set, Please Try Again");
            }
            if (!mobile.isBlank()) {
                model.setPhoneNo(mobile);
            }
            if (emailId.isBlank()) {
                throw new Exception("Email-Id is not set, Please Try Again");
            }
            if (password.isBlank()) {
                throw new Exception("Password is not set, Please Try Again");
            }
            Map<String, Boolean> notificationEmail = new HashMap<>();
            notificationEmail.put("order", true);
            notificationEmail.put("delivery", true);
            notificationEmail.put("promotional", true);
            notificationEmail.put("review", true);
            notificationEmail.put("return", true);
            model.setName(name);
            model.setEmail(emailId);
            model.setPassword(hashPassword(password));
            model.setNotification(notificationEmail);
            model.setCreatedAt();
            model = customerRepo.save(model);

            if (model.getId().isBlank()) {
                throw new Exception("Error occur try again after sometime");
            }
        } else {
            throw new Exception("Enter the valid otp");
        }
    }

    public CustomerModel loginCustomer(String emailId, String password, HttpSession session) throws Exception {
        CustomerModel model;
        if (emailId.endsWith("@emp")) {
            emailId = emailId.substring(0, emailId.length() - 4);
            model = customerRepo.findByEmailAndPassword(emailId, hashPassword(password));
            if (model == null) {
                throw new Exception(
                        "Customer not found. Please check your details and try again, or register if you don't have an account.");
            }
            session.setAttribute("loggedInAs", "EMPLOYEE");
        } else {
            model = customerRepo.findByEmailAndPassword(emailId, hashPassword(password));
            if (model == null) {
                throw new Exception(
                        "Customer not found. Please check your details and try again, or register if you don't have an account.");
            }
            session.setAttribute("loggedInAs", "CUSTOMER");
        }
        session.setAttribute("user", model.toMap());
        model.setLastLoggedInAt();
        model.setLoggedInAt();
        model = customerRepo.save(model);
        return model;
    }

    public void updateCustomerPassword(String emailId, String sendOtp, String otp, String newPassword,
            String confirmPassword) throws Exception {
        if (!sendOtp.equals(otp) && sendOtp.length() != 7) {
            throw new Exception("OTP does not match. Please check your details and try again.");
        }
        if (newPassword.length() < 6) {
            throw new Exception("Passwords is less than 6 character. Please check your details and try again.");
        }
        if (!newPassword.equals(confirmPassword)) {
            throw new Exception("Passwords do not match. Please check your details and try again.");
        }
        CustomerModel model = customerRepo.findByEmail(emailId);
        if (model == null) {
            throw new Exception(
                    "User not found. Please check your details and try again, or register if you don't have an account.");
        }
        model.setPassword(hashPassword(confirmPassword));
        model.setUpdatedAt();
        customerRepo.save(model);
    }

    public void updateCustomer(String id, String name, String email, String phoneNo, String OldPassword,
            String newPassword, String confirmPassword, Map<String, Boolean> notification, String[] addressIds,
            HttpSession session)
            throws Exception {
        CustomerModel customer = customerRepo.findById(id).orElseThrow(() -> new Exception("Customer not found"));
        if (OldPassword != null && newPassword != null && confirmPassword != null) {
            if (!customer.getPassword().equals(hashPassword(OldPassword))) {
                throw new Exception("Old Password is not match");
            }
            if (!newPassword.equals(confirmPassword)) {
                throw new Exception("New password and confirm password do not match");
            }
            customer.setPassword(hashPassword(newPassword));
        }
        customer.setName(name);
        customer.setPhoneNo(phoneNo);
        if (addressIds.length > 5) {
            String[] cleanedArray = Arrays.stream(addressIds)
                    .filter(s -> s != null)
                    .toArray(String[]::new);
            customer.setAddressId(cleanedArray);
        }
        customer.setNotification(notification);
        customer.setUpdatedAt();
        customer = customerRepo.save(customer);
        session.removeAttribute("user");
        session.setAttribute("user", customer.toMap());
    }

    public void logoutCustomer(HttpSession session) {
        session.invalidate();
    }

    public void deleteCustomer(String id) throws Exception {
        CustomerModel customer = customerRepo.findById(id).orElseThrow(() -> new Exception("Customer not found"));
        for (String addressId : customer.getAddressId()) {
            if (addressId != null) {
                addressRepo.deleteById(addressId);
            }
        }
        customerRepo.deleteById(id);
    }

    private String hashPassword(String password) throws NoSuchAlgorithmException {
        MessageDigest digest = MessageDigest.getInstance("SHA-256");
        byte[] hashBytes = digest.digest(password.getBytes());
        StringBuilder hexString = new StringBuilder();
        for (byte b : hashBytes) {
            String hex = Integer.toHexString(0xff & b);
            if (hex.length() == 1) {
                hexString.append('0');
            }
            hexString.append(hex);
        }
        return hexString.toString();
    }

    public List<NotificationResponseDTO> getNotificationCounts() {
        try {
            Aggregation aggregation = Aggregation.newAggregation(
                    group()
                            .count().as("totalDocuments")
                            .sum(ConditionalOperators
                                    .when(Criteria.where("notification.order").is(true)).then(1).otherwise(0))
                            .as("orderCount")
                            .sum(ConditionalOperators
                                    .when(Criteria.where("notification.delivery").is(true)).then(1).otherwise(0))
                            .as("deliveryCount")
                            .sum(ConditionalOperators
                                    .when(Criteria.where("notification.review").is(true)).then(1).otherwise(0))
                            .as("reviewCount")
                            .sum(ConditionalOperators
                                    .when(Criteria.where("notification.promotional").is(true)).then(1).otherwise(0))
                            .as("promotionalCount")
                            .sum(ConditionalOperators
                                    .when(Criteria.where("notification.return").is(true)).then(1).otherwise(0))
                            .as("returnCount"),
                    project("totalDocuments", "orderCount", "deliveryCount", "reviewCount", "promotionalCount",
                            "returnCount")
                            .andExclude("_id"));

            // Run the aggregation
            AggregationResults<NotificationResponseDTO> results = mongoTemplate.aggregate(aggregation, "customer",
                    NotificationResponseDTO.class);
            return results.getMappedResults();
        } catch (Exception e) {
            System.out.println("ERROR " + e.getMessage());
            e.printStackTrace();
            return Collections.emptyList();
        }
    }
}
