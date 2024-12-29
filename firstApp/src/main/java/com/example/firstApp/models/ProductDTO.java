package com.example.firstApp.models;
import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.constraints.*;

public class ProductDTO {
    
    @NotEmpty(message = "The name is required")
    private String name;
    
    @NotEmpty(message = "The category is required") 
    private String category;

    private MultipartFile image;

    public  MultipartFile getImage() {
        return image;
    }

    public void setImage(MultipartFile image) {
        this.image = image;
    }

    @Min(0)
    private double price;





    @Size(min = 10, max = 2000, message = "The description should be between 10 and 2000 characters")
    private String description;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
