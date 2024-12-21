package com.store.server.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.store.server.model.AddressModel;

public interface AddressRepo extends MongoRepository<AddressModel, String> {

}
