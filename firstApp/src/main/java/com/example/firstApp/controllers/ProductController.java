package com.example.firstApp.controllers;

import com.example.firstApp.models.User;
import com.example.firstApp.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import com.example.firstApp.models.Product;
import com.example.firstApp.models.ProductDTO;
import com.example.firstApp.repositories.ProductRepository;

import jakarta.validation.Valid;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.*;

@Controller
@RequestMapping("/products")
public class ProductController {

    @Autowired
    private ProductRepository repo;

    @Autowired
    private UserRepository repo2;

    private static final String IMAGE_DIRECTORY = "C:\\Users\\Usager\\Desktop\\Desktop\\firstApp\\src\\main\\resources\\static\\images";

    @GetMapping
    public ResponseEntity<List<Product>> getProducts() {
        List<Product> products = repo.findAll();
        if (!products.isEmpty()) {
            return ResponseEntity.ok(products);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProduct(@PathVariable int id) {
        Optional<Product> product = repo.findById(id);
        if (product.isPresent()) {
            return ResponseEntity.ok(product.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/artisan/{id}")
    public ResponseEntity<List<Product>> getProductsByArtisan(@PathVariable Long id) {
        // Find all products by the artisan's ID
        List<Product> products = repo.findByUserId(id);

        if (!products.isEmpty()) {

            return ResponseEntity.ok(products);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/artisan/{id}")
    public ResponseEntity<?> createProduct(
            @PathVariable Long id,
            @Valid @ModelAttribute ProductDTO productDto,
            BindingResult result
    ) {
        // Retrieve user by id
        Optional<User> optionalUser = repo2.findById(id);

        if (optionalUser.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        User user = optionalUser.get(); // Retrieve the User object from Optional

        // Validate input fields
        if (result.hasErrors()) {
            // Collect validation errors
            Map<String, String> errorsMap = new HashMap<>();
            result.getFieldErrors().forEach(error -> errorsMap.put(error.getField(), error.getDefaultMessage()));
            return ResponseEntity.badRequest().body(errorsMap);
        }

        // Handle image upload if provided
        String imagePath = null;
        MultipartFile imageFile = productDto.getImage();
        if (imageFile != null && !imageFile.isEmpty()) {
            try {
                String fileName = UUID.randomUUID().toString() + ".jpeg";
                File dest = new File(IMAGE_DIRECTORY, fileName);
                imageFile.transferTo(dest);
                imagePath = "/images/" + fileName;

                // Debugging: Log image path
                System.out.println("Image saved to: " + imagePath);
            } catch (IOException e) {
                // Debugging: Log error saving image
                System.err.println("Error saving image: " + e.getMessage());
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error saving image");
            }
        }

        // Create a new Product instance
        Product product = new Product();
        product.setName(productDto.getName());
        product.setCategory(productDto.getCategory());
        product.setPrice(productDto.getPrice());
        product.setDescription(productDto.getDescription());
        product.setImagePath(imagePath);  // Ensure imagePath is correctly set
        product.setCreatedAt(new Date());
        product.setUser(user); // Associate the product with the user (artisan)

        // Save the product to the database
        try {
            repo.save(product);
        } catch (Exception e) {
            // Debugging: Log database save error
            System.err.println("Error saving product to database: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error saving product to database");
        }

        // Debugging: Log successful creation
        System.out.println("Product created successfully: " + product.getId());

        return ResponseEntity.ok(product);
    }


}
