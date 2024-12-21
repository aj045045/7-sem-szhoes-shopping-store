package com.store.server.container.request;

public class ProductUpdateDTO {
    private java.util.ArrayList<String> products;
    private String name;
    private String title;
    private String about;
    private String categoryId;
    private String description;

    @Override
    public String toString() {
        return "ProductUpdateDTO [products=" + products + ", name=" + name + ", title=" + title + ", about=" + about
                + ", categoryId=" + categoryId + ", description=" + description + "]";
    }

    public java.util.ArrayList<String> getProducts() {
        return products;
    }

    public void setProducts(java.util.ArrayList<String> products) {
        this.products = products;
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

    public String getAbout() {
        return about;
    }

    public void setAbout(String about) {
        this.about = about;
    }

    public String getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(String categoryId) {
        this.categoryId = categoryId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

}
