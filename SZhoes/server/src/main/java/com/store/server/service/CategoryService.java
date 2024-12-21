package com.store.server.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.store.server.container.enums.CategoryTag;
import com.store.server.model.CategoryModel;
import com.store.server.repository.CategoryRepo;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepo categoryRepo;

    public void addNewCategory(String title, String tag) throws Exception {
        CategoryTag categoryTag = CategoryTag.valueOf(tag.toUpperCase());
        CategoryModel model = new CategoryModel();
        model.setTag(categoryTag);
        model.setTitle(title);
        model = categoryRepo.save(model);
        if (model.getId().isBlank()) {
            throw new Exception("Try after some time");
        }
    }

    public List<CategoryModel> findAllCategoryContainingTag(String tag) {
        if ("ALL".equalsIgnoreCase(tag)) {
            return categoryRepo.findAll();
        } else {
            return categoryRepo.findByTag(tag);
        }
    }

    public String updateCategory(String id) throws Exception {
        CategoryModel model = categoryRepo.findById(id).orElseThrow(() -> new Exception("Category not found"));
        boolean currentStatus = model.getIsActive();
        model.setIsActive(!currentStatus);
        categoryRepo.save(model);
        return model.getId();
    }

    public void deleteCategory(String id) {
        categoryRepo.deleteById(id);
    }

}