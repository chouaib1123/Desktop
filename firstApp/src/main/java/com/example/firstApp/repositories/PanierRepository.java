package com.example.firstApp.repositories;

import com.example.firstApp.models.Panier;
import com.example.firstApp.models.Product;
import com.example.firstApp.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PanierRepository extends JpaRepository<Panier, Integer> {

    Optional<Panier> findByUserAndProductAndCommandeIsNull(User user, Product product);
    List<Panier> findByUserIdAndCommandeIsNull(Long userId);
}