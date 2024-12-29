package com.example.firstApp.controllers;

import com.example.firstApp.models.Panier;
import com.example.firstApp.models.PanierDTO;

import com.example.firstApp.models.Product;
import com.example.firstApp.models.User;
import com.example.firstApp.repositories.PanierRepository;
import com.example.firstApp.repositories.ProductRepository;
import com.example.firstApp.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/api/paniers")
@Validated
public class PanierController {

    @Autowired
    private PanierRepository panierRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;


    @GetMapping("/{id}")
    public ResponseEntity<List<Panier>> getPanierUser(@PathVariable int id) {
        // Find all products by the artisan's ID
            List<Panier> paniers = panierRepository.findByUserIdAndCommandeIsNull((long) id);

        if (!paniers.isEmpty()) {

            return ResponseEntity.ok(paniers);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/add")
    public ResponseEntity<String> addPanier(@Valid @RequestBody PanierDTO panierDTO) {
        // Retrieve User from database using the userId
        User user = userRepository.findById(panierDTO.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid user Id: " + panierDTO.getUserId()));

        // Retrieve Product from database using the productId
        Product product = productRepository.findById(panierDTO.getProductId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid product Id: " + panierDTO.getProductId()));

        // Check if the user already has the product in their cart
        Optional<Panier> existingPanier = panierRepository.findByUserAndProductAndCommandeIsNull(user, product);

        if (existingPanier.isPresent() ) {
            // If product already exists in user's cart, update quantity
            Panier panier = existingPanier.get();
            int newQuantity = panier.getQuantity() + panierDTO.getQuantity(); // Example: Increase quantity
            panier.setQuantity(newQuantity);
            panierRepository.save(panier);
            return ResponseEntity.ok("Product quantity updated in panier");
        }

        // If product is not already in cart, create a new Panier entity and save it
        Panier panier = new Panier();
        panier.setProduct(product);
        panier.setUser(user);
        panier.setQuantity(panierDTO.getQuantity());
        panierRepository.save(panier);

        return ResponseEntity.ok("Panier added successfully");
    }
    @DeleteMapping("/{panierId}")
    public ResponseEntity<String> deletePanier(@PathVariable int panierId) {
        Optional<Panier> panierOptional = panierRepository.findById(panierId);

        if (panierOptional.isPresent()) {
            panierRepository.deleteById(panierId);
            return ResponseEntity.ok("Panier item deleted successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
