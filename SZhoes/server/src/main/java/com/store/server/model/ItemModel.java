package com.store.server.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Map;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.store.server.container.enums.ItemColor;
import com.store.server.document.ItemDiscount;

@Document(collection = "item")
public class ItemModel {
    @Id
    private String id;
    private int size;
    private long price;
    private ArrayList<ItemDiscount> discount;
    private ArrayList<String> images;
    private ItemColor color;
    private Map<String, String> detail;
    private Boolean isActive = true;
    private String warehouseId;
    private long quantity;
    private long maxReorderLevel = 500;
    private int minReorderLevel = 100;
    private ArrayList<LocalDateTime> lastRestockAt;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public int getSize() {
        return size;
    }

    public void setSize(int size) {
        this.size = size;
    }

    public long getPrice() {
        return price;
    }

    public void setPrice(long price) {
        this.price = price;
    }

    public ArrayList<ItemDiscount> getDiscount() {
        return discount;
    }

    public void setDiscount(ArrayList<ItemDiscount> discount) {
        this.discount = discount;
    }

    public ArrayList<String> getImages() {
        return images;
    }

    public void setImages(ArrayList<String> images) {
        this.images = images;
    }

    public ItemColor getColor() {
        return color;
    }

    public void setColor(ItemColor color) {
        this.color = color;
    }

    public Map<String, String> getDetail() {
        return detail;
    }

    public void setDetail(Map<String, String> detail) {
        this.detail = detail;
    }

    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }

    public String getWarehouseId() {
        return warehouseId;
    }

    public void setWarehouseId(String warehouseId) {
        this.warehouseId = warehouseId;
    }

    public long getQuantity() {
        return quantity;
    }

    public void setQuantity(long quantity) {
        this.quantity = quantity;
    }

    public long getMaxReorderLevel() {
        return maxReorderLevel;
    }

    public void setMaxReorderLevel(long maxReorderLevel) {
        this.maxReorderLevel = maxReorderLevel;
    }

    public int getMinReorderLevel() {
        return minReorderLevel;
    }

    public void setMinReorderLevel(int minReorderLevel) {
        this.minReorderLevel = minReorderLevel;
    }

    public ArrayList<LocalDateTime> getLastRestockAt() {
        return lastRestockAt;
    }

    public void setLastRestockAt(LocalDateTime lastRestockAt) {
        if (this.lastRestockAt.size() >= 30) {
            this.lastRestockAt.remove(0);
        }
        this.lastRestockAt.add(lastRestockAt);
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
    }

}
