package com.store.server.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.store.server.model.FeedbackModel;
import com.store.server.service.FeedbackService;
import com.store.server.util.ResponseUtil;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/auth/feedback")
public class FeedbackController {

    @Autowired
    FeedbackService feedbackService;

    @PostMapping
    public ResponseEntity<?> postMethodName(@RequestBody Map<String, String> entity)
            throws Exception {
        feedbackService.createFeedback(entity.get("pathName"), entity.get("userIdentification"),
                entity.get("feedback"));
        return ResponseUtil.createResponse("Thanks for your valuable feedback");
    }

    @GetMapping
    public ResponseEntity<?> getMethodName(@RequestParam String key) {
        List<FeedbackModel> data = feedbackService.findAllFeedbackContaining(key);
        return ResponseUtil.createResponse("Data Fetched", data);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMethod(@PathVariable String id) {
        feedbackService.deleteFeedback(id);
        return ResponseUtil.createResponse("Feedback is deleted");
    }

}
