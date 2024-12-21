package com.store.server.container.request;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class ProductDTO extends ItemDTO {

    private String id;
    private String name;
    private String title;
    private String categoryId;
    private ArrayList<String> itemIds;
    private String about;
    private Map<String, String> description;
    private ArrayList<String> referenceProductId;
    private ArrayList<String> products;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private boolean isActive = true;

    @Override
    public String toString() {
        return super.toString() + "ProductDTO [id=" + id + ", name=" + name + ", title=" + title + ", categoryId="
                + categoryId
                + ", itemIds=" + itemIds + ", about=" + about + ", description=" + description + ", referenceProductId="
                + referenceProductId + ", products=" + products + ", createdAt=" + createdAt + ", updatedAt="
                + updatedAt
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
        this.name = name.trim();
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title.trim();
    }

    public String getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(String categoryId) {
        this.categoryId = categoryId;
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

    public ArrayList<String> getReferenceProductId() {
        return referenceProductId;
    }

    public void setReferenceProductId(ArrayList<String> referenceProductId) {
        this.referenceProductId = referenceProductId;
    }

    public ArrayList<String> getProducts() {
        return products;
    }

    public void setProducts(ArrayList<String> images) {
        this.products = images;
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

    public Map<String, String> getDescription() {
        return description;
    }

    public void setDescription(String description) {
        Map<String, String> descriptionMap = new HashMap<>();
        String[] pairs = description.split(",");
        for (String pair : pairs) {
            String[] keyValue = pair.split(":");
            if (keyValue.length == 2) {
                String key = keyValue[0].trim();
                String value = keyValue[1].trim();
                descriptionMap.put(key, value);
            }
        }
        this.description = descriptionMap;
    }

}
