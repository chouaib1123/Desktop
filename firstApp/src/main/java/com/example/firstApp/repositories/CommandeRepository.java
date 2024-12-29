package com.example.firstApp.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.firstApp.models.Commande;

import java.util.List;

public interface CommandeRepository extends JpaRepository<Commande, Integer> {
    List<Commande> findByUserId(long userId);
}