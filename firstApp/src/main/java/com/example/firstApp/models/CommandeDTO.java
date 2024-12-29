package com.example.firstApp.models;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;
import java.util.List;

public class CommandeDTO {
    private Long id;

    private LocalDateTime createdDate;

    public LocalDateTime getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDateTime createdDate) {
        this.createdDate = createdDate;
    }

    @NotNull(message = "User ID is required")
    private Long userId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<PanierDTO> getPaniers() {
        return paniers;
    }

    public void setPaniers(List<PanierDTO> paniers) {
        this.paniers = paniers;
    }

    @NotNull(message = "Status is required")
    private CommandeStatus status;

    @Min(value = 0, message = "Total price must be at least 0")
    private double totalPrice;

    private List<PanierDTO> paniers;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public CommandeStatus getStatus() {
        return status;
    }

    public void setStatus(CommandeStatus status) {
        this.status = status;
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }
}
