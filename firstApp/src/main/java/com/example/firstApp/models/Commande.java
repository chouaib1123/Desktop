package com.example.firstApp.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Table(name="Commande")
public class Commande {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId")
    @JsonIgnore
    private User user;

    @OneToMany(mappedBy = "commande", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Panier> paniers;

    @Enumerated(EnumType.STRING)
    private CommandeStatus status;

    private double totalPrice;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdDate;

    // Default constructor
    public Commande() {
        this.createdDate = LocalDateTime.now();
    }

    // Getters and setters

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<Panier> getPaniers() {
        return paniers;
    }

    public void setPaniers(List<Panier> paniers) {
        this.paniers = paniers;
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

    public LocalDateTime getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDateTime createdDate) {
        this.createdDate = createdDate;
    }
}

enum CommandeStatus {
    PENDING,
    DELIVERED
}
