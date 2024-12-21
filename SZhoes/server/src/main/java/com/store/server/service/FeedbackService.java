package com.store.server.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.store.server.model.FeedbackModel;
import com.store.server.repository.FeedbackRepo;

@Service
public class FeedbackService {

    @Autowired
    private FeedbackRepo feedbackRepo;

    public void createFeedback(String path, String email, String feedback) throws Exception {
        FeedbackModel model = new FeedbackModel();
        model.setPath(path);
        model.setEmail(email);
        model.setDescription(feedback);
        model.setCreatedAt();
        model = feedbackRepo.save(model);
        if (model.getId().isBlank()) {
            throw new Exception("Try after some time");
        }
    }

    public void deleteFeedback(String id) {
        feedbackRepo.deleteById(id);
    }

    public List<FeedbackModel> findAllFeedbackContaining(String key) {
        if ("all".equalsIgnoreCase(key)) {
            key = "";
        }
        return feedbackRepo.findByDescriptionContaining(key);
    }

}
