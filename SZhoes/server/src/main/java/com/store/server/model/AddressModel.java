package com.store.server.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Map;
import java.util.HashMap;

/**
 * The AddressModel class represents an address entity with fields for street, city, state, country,
 * and zip code, along with methods to convert the data to a map.
 */

@Document(collection = "address")
public class AddressModel {
    @Id
    private String id;
    private String street;
    private String city;
    private String state;
    private String country;
    private String zip;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getZip() {
        return zip;
    }

    public void setZip(String zip) {
        this.zip = zip;
    }

/**
 * The `toMap` function converts object properties into a map with key-value pairs.
 * 
 * @return The `toMap` method is returning a `Map<String, Object>` containing the data fields "id",
 * "street", "city", "state", "country", and "zip" with their corresponding values.
 */
    public Map<String, Object> toMap() {
        Map<String, Object> dataMap = new HashMap<>();
        dataMap.put("id", id);
        dataMap.put("street", street);
        dataMap.put("city", city);
        dataMap.put("state", state);
        dataMap.put("country", country);
        dataMap.put("zip", zip);
        return dataMap;
    }
}
