package com.store.server.container.response;

public class NotificationResponseDTO {
    private long totalDocuments;
    private long orderCount;
    private long deliveryCount;
    private long reviewCount;
    private long promotionalCount;
    private long returnCount;

    public long getTotalDocuments() {
        return totalDocuments;
    }

    public void setTotalDocuments(long totalDocuments) {
        this.totalDocuments = totalDocuments;
    }

    public long getOrderCount() {
        return orderCount;
    }

    public void setOrderCount(long orderCount) {
        this.orderCount = orderCount;
    }

    public long getDeliveryCount() {
        return deliveryCount;
    }

    public void setDeliveryCount(long deliveryCount) {
        this.deliveryCount = deliveryCount;
    }

    public long getReviewCount() {
        return reviewCount;
    }

    public void setReviewCount(long reviewCount) {
        this.reviewCount = reviewCount;
    }

    public long getPromotionalCount() {
        return promotionalCount;
    }

    public void setPromotionalCount(long promotionalCount) {
        this.promotionalCount = promotionalCount;
    }

    public long getReturnCount() {
        return returnCount;
    }

    public void setReturnCount(long returnCount) {
        this.returnCount = returnCount;
    }

}
