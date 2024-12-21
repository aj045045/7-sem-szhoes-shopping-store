package com.store.server.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.store.server.model.CategoryModel;

public interface CategoryRepo extends MongoRepository<CategoryModel, String> {
    java.util.List<CategoryModel> findByTag(String tag);
}
