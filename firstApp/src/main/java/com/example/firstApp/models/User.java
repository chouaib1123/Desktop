package com.example.firstApp.models;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "user") // Changed to lowercase for convention
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String phoneNumber;

    @Column(nullable = false)
    private String userType; // New userType field

    @Column(length = 2000)
    private String bio; // Bio for artist

    @Column(length = 2000)
    private String studioAddress; // Studio address for artist

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Product> products;

    // Constructors
    public User() {
        // Default constructor
    }

    public User(String email, String name, String password, String phoneNumber, String userType, String bio, String studioAddress) {
        this.email = email;
        this.name = name;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.userType = userType;
        this.bio = bio;
        this.studioAddress = studioAddress;
    }

    // Getters and setters
    public long getUserId() {
        return id;
    }

    public void setUserId(Long userId) {
        this.id = userId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getUserType() {
        return userType;
    }

    public void setUserType(String userType) {
        this.userType = userType;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public String getStudioAddress() {
        return studioAddress;
    }

    public void setStudioAddress(String studioAddress) {
        this.studioAddress = studioAddress;
    }

    public List<Product> getProducts() {
        return products;
    }

    public void setProducts(List<Product> products) {
        this.products = products;
    }
}
