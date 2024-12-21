package com.store.server.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Map;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "product")
public class ProductModel {
    @Id
    private String id;
    private String name;
    private String title;
    private String categoryId;
    private ArrayList<String> itemIds;
    private String about;
    private Map<String, String> description;
    private ArrayList<String> referenceProductId;
    private ArrayList<String> images;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private boolean isActive = true;

    @Override
    public String toString() {
        return "ProductModel [id=" + id + ", name=" + name + ", title=" + title + ", categoryId=" + categoryId
                + ", itemIds=" + itemIds + ", about=" + about + ", description=" + description + ", referenceProductId="
                + referenceProductId + ", images=" + images + ", createdAt=" + createdAt + ", updatedAt=" + updatedAt
                + ", isActive=" + isActive + "]";
    }

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

    public void setCategoryId(String categoryIds) {
        this.categoryId = categoryIds;
    }

    public ArrayList<String> getItemIds() {
        return itemIds;
    }

    public void setItemIds(ArrayList<String> itemIds) {
        this.itemIds = itemIds;
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

    public void setCreatedAt() {
        this.createdAt = LocalDateTime.now();
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt() {
        this.updatedAt = LocalDateTime.now();
        ;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean isActive) {
        this.isActive = isActive;
    }
}
