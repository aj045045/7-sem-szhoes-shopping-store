package com.store.server.service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.store.server.model.AddressModel;
import com.store.server.repository.AddressRepo;
import com.store.server.repository.CustomerRepo;

/**
 * The AddressService class in Java provides methods for creating, finding, updating, and deleting
 * address information using repositories.
 */
@Service
public class AddressService {
    @Autowired
    private AddressRepo addressRepo;

    @Autowired
    CustomerRepo customerRepo;

    public String createAddress(String street, String city, String state, String country, String zip) {
        AddressModel addressModel = new AddressModel();
        addressModel.setStreet(street);
        addressModel.setCity(city);
        addressModel.setState(state);
        addressModel.setCountry(country);
        addressModel.setZip(zip);
        addressModel = addressRepo.save(addressModel);
        return addressModel.getId();
    }

    public Map<String, Object> findAddress(String id) throws Exception {
        AddressModel addressModel = addressRepo.findById(id).orElseThrow(() -> new Exception("Address not found"));
        return addressModel.toMap();
    }

    public String updateAddress(String id, String street, String city, String state, String country,
            String zip) throws Exception {
        AddressModel addressModel = addressRepo.findById(id).orElseThrow(() -> new Exception("Address not found"));
        addressModel.setStreet(street);
        addressModel.setCity(city);
        addressModel.setState(state);
        addressModel.setCountry(country);
        addressModel.setZip(zip);
        addressModel = addressRepo.save(addressModel);
        return addressModel.getId();
    }

    public void deleteAddress(String id) {
        addressRepo.deleteById(id);
    }
}
