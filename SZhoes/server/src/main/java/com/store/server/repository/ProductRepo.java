package com.store.server.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.store.server.model.ProductModel;

public interface ProductRepo extends MongoRepository<ProductModel, String> {
}
