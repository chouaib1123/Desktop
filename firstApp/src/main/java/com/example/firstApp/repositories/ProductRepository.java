package com.example.firstApp.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.firstApp.models.Product;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Integer>{
    List<Product> findByUserId(Long userId);

}
