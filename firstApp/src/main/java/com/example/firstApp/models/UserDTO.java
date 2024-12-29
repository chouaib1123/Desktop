package com.example.firstApp.models;

import jakarta.validation.constraints.*;

public class UserDTO {

    @NotEmpty(message = "Email is required")
    @Email(message = "Email should be valid")
    private String email;

    @NotEmpty(message = "Name is required")
    private String name;

    @NotEmpty(message = "Phone number is required")
    @Pattern(regexp = "^\\d{10}$", message = "Phone number should be 10 digits")
    private String phoneNumber;

    @NotEmpty(message = "Password is required")
    private String password;

    @NotEmpty(message = "User type is required")
    private String userType; // New userType field

    @Size(max = 2000, message = "Bio should be up to 2000 characters")
    private String bio;

    @Size(max = 2000, message = "Studio address should be up to 2000 characters")
    private String studioAddress;

    // Getters and setters
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
