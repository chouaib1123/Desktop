package com.example.firstApp.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Table(name = "products")
public class Product {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "product_id")
	private Long id;

	@Column(nullable = false)
	private String name;

	@Column(nullable = false)
	private String category;

	@Column(nullable = false)
	private double price;

	@Column(length = 2000)
	private String description;

	@Column(name = "created_at", nullable = false, updatable = false)
	private Date createdAt;

	@Column(name = "image_path", nullable = true)
	private String imagePath;


	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "user_id", nullable = false)
	private User user;


	// Constructors
	public Product() {
		// Default constructor
	}

	public Product(String name, String category, double price, String description, String imageSource, User user) {
		this.name = name;
		this.category = category;
		this.price = price;
		this.description = description;
		this.imagePath = imageSource;
		this.user = user;
	}

	// Getters and setters
	public Long getProductId() {
		return id;
	}

	public void setProductId(Long productId) {
		this.id = productId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCategory() {
		return category;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
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

	public String getImagePath() {
		return imagePath;
	}

	public void setImagePath(String imageSource) {
		this.imagePath = imageSource;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
}
