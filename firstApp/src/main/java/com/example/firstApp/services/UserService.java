package com.example.firstApp.services;

import com.example.firstApp.models.User;
import com.example.firstApp.models.UserDTO;
import com.example.firstApp.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public UserDTO getUserById(Long id) {
        User user = userRepository.findById(id).orElse(null);
        if (user == null) {
            return null;
        }
        return convertToDTO(user);
    }

    private UserDTO convertToDTO(User user) {
        UserDTO userDTO = new UserDTO();
        userDTO.setEmail(user.getEmail());
        userDTO.setName(user.getName());
        userDTO.setPhoneNumber(user.getPhoneNumber());
        userDTO.setPassword(user.getPassword());
        userDTO.setUserType(user.getUserType());
        userDTO.setBio(user.getBio());
        userDTO.setStudioAddress(user.getStudioAddress());
        return userDTO;
    }
}
