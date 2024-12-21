package com.store.server.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.store.server.container.enums.CategoryTag;

@Document(collection = "category")
public class CategoryModel {

    @Id
    private String id;
    private String title;
    private CategoryTag tag;
    private Boolean isActive = true;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public CategoryTag getTag() {
        return tag;
    }

    public void setTag(CategoryTag tag) {
        this.tag = tag;
    }

    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }
}
