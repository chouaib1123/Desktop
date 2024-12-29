package com.example.firstApp.models;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public class PanierDTO {

    @NotNull(message = "Product ID is required")
    private int productId; // Use productId instead of Product object

    @Min(value = 1, message = "Quantity must be at least 1")
    private int quantity;


    @NotNull(message = "User ID is required")
    private Long userId;

    private Long TotalPrice;

    public Long getTotalPrice() {
        return TotalPrice;
    }

    public void setTotalPrice(Long totalPrice) {
        TotalPrice = totalPrice;
    }

    public Long getPrice() {
        return price;
    }

    public void setPrice(Long price) {
        this.price = price;
    }

    private Long price;
    private String productName;

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }
// Getters and setters

    public Integer getProductId() {
        return productId;
    }

    public void setProductId(int productId) {
        this.productId = productId;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
