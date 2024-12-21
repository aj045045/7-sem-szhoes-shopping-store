package com.store.server.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.store.server.model.FeedbackModel;

import java.util.List;

public interface FeedbackRepo extends MongoRepository<FeedbackModel, String> {
    @Query("{ 'description': { $regex: ?0, $options: 'i' } }")
    List<FeedbackModel> findByDescriptionContaining(String key);
}
