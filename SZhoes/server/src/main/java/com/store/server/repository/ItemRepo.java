package com.store.server.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.store.server.model.ItemModel;

public interface ItemRepo extends MongoRepository<ItemModel, String> {
}
