package com.example.firstApp.controllers;

import com.example.firstApp.models.User;
import com.example.firstApp.models.UserDTO;
import com.example.firstApp.repositories.UserRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BeanPropertyBindingResult;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.Validator;
import org.springframework.web.bind.annotation.*;
import org.springframework.validation.annotation.Validated;
import com.example.firstApp.services.UserService;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/users")
@Validated
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private Validator validator;

    @Autowired
    private UserService userService;

    @GetMapping("/{id}")
    public UserDTO getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    @PostMapping
    public ResponseEntity<?> registerUser(@Valid @RequestBody UserDTO userDTO) {
        BindingResult bindingResult = new BeanPropertyBindingResult(userDTO, "userDTO");
        validator.validate(userDTO, bindingResult);

        if (bindingResult.hasErrors()) {
            Map<String, String> errors = new HashMap<>();
            for (FieldError error : bindingResult.getFieldErrors()) {
                errors.put(error.getField(), error.getDefaultMessage());
            }
            return ResponseEntity.badRequest().body(errors);
        }

        try {
            User user = new User();
            user.setEmail(userDTO.getEmail());
            user.setName(userDTO.getName());
            user.setPassword(passwordEncoder.encode(userDTO.getPassword())); // Hash the password
            user.setPhoneNumber(userDTO.getPhoneNumber());
            user.setUserType(userDTO.getUserType());

            if ("artist".equalsIgnoreCase(userDTO.getUserType())) {
                user.setBio(userDTO.getBio());
                user.setStudioAddress(userDTO.getStudioAddress());
            }

            userRepository.save(user);

            return ResponseEntity.ok("User registered successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to register user: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @Valid @RequestBody UserDTO userDTO) {
        BindingResult bindingResult = new BeanPropertyBindingResult(userDTO, "userDTO");
        validator.validate(userDTO, bindingResult);

        if (bindingResult.hasErrors()) {
            Map<String, String> errors = new HashMap<>();
            for (FieldError error : bindingResult.getFieldErrors()) {
                errors.put(error.getField(), error.getDefaultMessage());
            }
            return ResponseEntity.badRequest().body(errors);
        }

        try {
            User user = userRepository.findById(id).orElse(null);
            if (user == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
            }

            user.setEmail(userDTO.getEmail());
            user.setName(userDTO.getName());
            if (!userDTO.getPassword().isEmpty()) {
                user.setPassword(passwordEncoder.encode(userDTO.getPassword())); // Hash the password
            }
            user.setPhoneNumber(userDTO.getPhoneNumber());
            user.setUserType(userDTO.getUserType());

            if ("artist".equalsIgnoreCase(userDTO.getUserType())) {
                user.setBio(userDTO.getBio());
                user.setStudioAddress(userDTO.getStudioAddress());
            }

            userRepository.save(user);

            return ResponseEntity.ok("User updated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to update user: " + e.getMessage());
        }
    }
}