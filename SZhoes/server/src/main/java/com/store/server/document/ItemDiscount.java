package com.store.server.document;

import java.time.LocalDateTime;

public class ItemDiscount {
    private Byte discountPercentage;
    private LocalDateTime startedAt;
    private LocalDateTime endedAt;
    private LocalDateTime updatedAt;

    public Byte getDiscountPercentage() {
        return discountPercentage;
    }

    public void setDiscountPercentage(Byte discountPercentage) {
        this.discountPercentage = discountPercentage;
    }

    public LocalDateTime getStartedAt() {
        return startedAt;
    }

    public void setStartedAt() {
        this.startedAt = LocalDateTime.now();
    }

    public LocalDateTime getEndedAt() {
        return endedAt;
    }

    public void setEndedAt() {
        this.endedAt = LocalDateTime.now();
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt() {
        this.updatedAt = LocalDateTime.now();
    }
}
