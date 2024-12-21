package com.store.server.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.store.server.container.enums.CategoryTag;
import com.store.server.model.CategoryModel;
import com.store.server.service.CategoryService;
import com.store.server.util.ResponseUtil;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/category")
public class CategoryController {
    @Autowired
    private CategoryService categoryService;

    @GetMapping("/tags")
    public ResponseEntity<?> getCategoryTags() {
        return ResponseUtil.createResponse("List of Tags", CategoryTag.toList());
    }


    @GetMapping
    public ResponseEntity<?> getCategoryUsingTag(@RequestParam String tag) {
        List<CategoryModel> data = categoryService.findAllCategoryContainingTag(tag);
        return ResponseUtil.createResponse("Category Fetched", data);
    }

    @PostMapping
    public ResponseEntity<?> postCreateCategory(@RequestBody Map<String, String> entity) throws Exception {
        categoryService.addNewCategory(entity.get("category"), entity.get("tag"));
        return ResponseUtil.createResponse("Category Created");
    }

    @GetMapping("/u")
    public ResponseEntity<?> putCategory(@RequestParam String id) throws Exception {
        String newId = categoryService.updateCategory(id);
        return ResponseUtil.createResponse("Category Updated", newId);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCategory(@PathVariable String id) {
        categoryService.deleteCategory(id);
        return ResponseUtil.createResponse("Category deleted");
    }

}
