package com.example.firstApp.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.firstApp.models.Product;
import com.example.firstApp.repositories.ProductRepository;

import java.util.List;


@RestController
@RequestMapping("/api")
public class HomeController {

    @Autowired
    private ProductRepository repo;

    @GetMapping("/latestProducts")
    public List<Product> getLatestProducts(){
        return repo.findAll(PageRequest.of(0, 6, Sort.by("createdAt").descending())).getContent();
    }
   
   
}

