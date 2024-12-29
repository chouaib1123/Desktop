package com.example.firstApp.controllers;

import com.example.firstApp.models.LoginForm;
import com.example.firstApp.models.User;
import com.example.firstApp.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.validation.annotation.Validated;

import java.security.SecureRandom;
import java.util.Base64;
import java.util.Date;

@RestController
@RequestMapping("/login")
public class AuthController {
    @Autowired
    private UserRepository userRepository;


    private static final String SECRET_KEY = "c_DV&Z{,YrWZ7W<7FW@-BR%7TCC`7hUX";

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Endpoint for user login
    @PostMapping
    public ResponseEntity<?> loginUser(@RequestBody LoginForm loginForm) {
        String email = loginForm.getEmail();
        String password = loginForm.getPassword();

        // Find user by email (assuming email is unique)
        User user = userRepository.findByEmail(email);

        if (user == null || !passwordEncoder.matches(password, user.getPassword())) {
            // User not found or password does not match, return error response
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password.");
        }

        try {
            // Generate JWT token with userId and userType
            String token = generateToken(user.getUserId(), user.getUserType(),user.getName());

            // Return the token as JSON response
            return ResponseEntity.ok().body(token);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to generate token: " + e.getMessage());
        }
    }

    private String generateToken(Long userId, String userType,String userName) {
        // Define token expiration (e.g., 1 hour)
        Date now = new Date();
        Date expiration = new Date(now.getTime() + 3600 * 1000); // 1 hour

        // Generate JWT token with userId and userType as claims
        String token = Jwts.builder()
                .claim("userId", userId)
                .claim("userType", userType)
                .claim("userName", userName)
                .setIssuedAt(now)
                .setExpiration(expiration)
                .signWith(SignatureAlgorithm.HS512, SECRET_KEY)
                .compact();

        return token;
    }


}
