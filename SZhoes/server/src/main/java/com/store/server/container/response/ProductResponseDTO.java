package com.store.server.container.response;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.store.server.model.ItemModel;
import com.store.server.model.ProductModel;

public class ProductResponseDTO {
    private String id;
    private String name;
    private String title;
    private String categoryId;
    private String about;
    private Map<String, String> description;
    private ArrayList<String> referenceProductId;
    private ArrayList<String> images;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private boolean isActive;
    private List<ItemModel> items;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(String categoryId) {
        this.categoryId = categoryId;
    }

    public String getAbout() {
        return about;
    }

    public void setAbout(String about) {
        this.about = about;
    }

    public Map<String, String> getDescription() {
        return description;
    }

    public void setDescription(Map<String, String> description) {
        this.description = description;
    }

    public ArrayList<String> getReferenceProductId() {
        return referenceProductId;
    }

    public void setReferenceProductId(ArrayList<String> referenceProductId) {
        this.referenceProductId = referenceProductId;
    }

    public ArrayList<String> getImages() {
        return images;
    }

    public void setImages(ArrayList<String> images) {
        this.images = images;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean isActive) {
        this.isActive = isActive;
    }

    public List<ItemModel> getItems() {
        return items;
    }

    public void setItems(List<ItemModel> items) {
        this.items = items;
    }

    public void setProduct(ProductModel model) {
        this.id = model.getId();
        this.name = model.getName();
        this.title = model.getTitle();
        this.categoryId = model.getCategoryId();
        this.about = model.getAbout();
        this.description = model.getDescription();
        this.referenceProductId = model.getReferenceProductId();
        this.images = model.getImages();
        this.createdAt = model.getCreatedAt();
        this.updatedAt = model.getUpdatedAt();
        this.isActive = model.isActive();
    }
}
