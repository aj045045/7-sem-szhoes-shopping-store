package com.store.server.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.store.server.model.CustomerModel;


public interface CustomerRepo extends MongoRepository<CustomerModel, String> {
    CustomerModel  findByEmailAndPassword(String email,String password);
    CustomerModel  findByEmail(String email);
}
