package com.store.server.model;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.validation.constraints.Email;

@Document(collection = "customer")
public class CustomerModel {

    @Id
    private String id;
    private String name;
    @Indexed(unique = true)
    @Email(message = "Enter Valid Email Id")
    private String email;
    private String password;
    private String[] addressId = new String[5];
    private String phoneNo;
    private Map<String, Boolean> notification = new HashMap<>();
    private Map<String, LocalDateTime> cart = new HashMap<>();
    private Map<String, LocalDateTime> wishlist = new HashMap<>();
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime loggedInAt;
    private LocalDateTime lastLoggedInAt;

    public LocalDateTime getLoggedInAt() {
        return loggedInAt;
    }

    public void setLoggedInAt() {
        this.loggedInAt = LocalDateTime.now();
    }

    public LocalDateTime getLastLoggedInAt() {
        return lastLoggedInAt;
    }

    public void setLastLoggedInAt() {
        this.lastLoggedInAt = loggedInAt;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String[] getAddressId() {
        return addressId;
    }

    public void setAddressId(String[] addressId) {
        this.addressId = addressId;
    }

    public String getPhoneNo() {
        return phoneNo;
    }

    public void setPhoneNo(String phoneNo) {
        this.phoneNo = phoneNo;
    }

    public Map<String, Boolean> getNotification() {
        return notification;
    }

    public void setNotification(Map<String, Boolean> notification) {
        this.notification = notification;
    }

    public Map<String, LocalDateTime> getCart() {
        return cart;
    }

    public void setCart(Map<String, LocalDateTime> cart) {
        this.cart = cart;
    }

    public Map<String, LocalDateTime> getWishlist() {
        return wishlist;
    }

    public void setWishlist(Map<String, LocalDateTime> wishlist) {
        this.wishlist = wishlist;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt() {
        this.createdAt = LocalDateTime.now();
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt() {
        this.updatedAt = LocalDateTime.now();
    }

    public Map<String, Object> toMap() {
        Map<String, Object> dataMap = new HashMap<>();
        dataMap.put("id", id);
        dataMap.put("name", name);
        dataMap.put("email", email);
        dataMap.put("addressId", addressId);
        dataMap.put("phoneNo", phoneNo);
        dataMap.put("notification", notification);
        dataMap.put("cart", cart);
        dataMap.put("wishlist", wishlist);
        dataMap.put("createdAt", createdAt);
        dataMap.put("updatedAt", updatedAt);
        dataMap.put("loggedInAt", loggedInAt);
        dataMap.put("lastLoggedInAt", lastLoggedInAt);
        return dataMap;
    }

}
