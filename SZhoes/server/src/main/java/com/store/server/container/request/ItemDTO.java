package com.store.server.container.request;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import com.store.server.container.enums.ItemColor;
import com.store.server.container.enums.ItemSize;
import com.store.server.document.ItemDiscount;

public class ItemDTO {

    private String id;
    private int size;
    private long price;
    private ArrayList<ItemDiscount> discount;
    private ArrayList<String> items;

    public ArrayList<String> getItems() {
        return items;
    }

    public void setItems(ArrayList<String> items) {
        this.items = items;
    }

    private ItemColor color;
    private Map<String, String> detail;
    private Boolean isActive = true;
    private String warehouseId;
    private long quantity;
    private long maxReorder;
    private int minReorder;
    private ArrayList<LocalDateTime> lastRestockAt;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public long getMaxReorder() {
        return maxReorder;
    }

    public void setMaxReorder(long maxReorder) {
        this.maxReorder = maxReorder;
    }

    public int getMinReorder() {
        return minReorder;
    }

    public void setMinReorder(int minReorder) {
        this.minReorder = minReorder;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public int getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = ItemSize.valueOf(size).getSize();
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

    public ItemColor getColor() {
        return color;
    }

    public void setColor(ItemColor color) {
        this.color = color;
    }

    public Map<String, String> getDetail() {
        return detail;
    }

    public void setDetail(String detail) {
        Map<String, String> descriptionMap = new HashMap<>();
        String[] pairs = detail.split(",");
        for (String pair : pairs) {
            String[] keyValue = pair.split(":");
            if (keyValue.length == 2) {
                String key = keyValue[0].trim();
                String value = keyValue[1].trim();
                descriptionMap.put(key, value);
            }
        }
        this.detail = descriptionMap;
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

    public ArrayList<LocalDateTime> getLastRestockAt() {
        return lastRestockAt;
    }

    public void setLastRestockAt(ArrayList<LocalDateTime> lastRestockAt) {
        this.lastRestockAt = lastRestockAt;
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

    @Override
    public String toString() {
        return "ItemDTO [id=" + id + ", size=" + size + ", price=" + price + ", discount=" + discount + ", items="
                + items + ", color=" + color + ", detail=" + detail + ", isActive=" + isActive + ", warehouseId="
                + warehouseId + ", quantity=" + quantity + ", maxReorder=" + maxReorder + ", minReorder=" + minReorder
                + ", lastRestockAt=" + lastRestockAt + ", createdAt=" + createdAt + ", updatedAt=" + updatedAt + "]";
    }

}
