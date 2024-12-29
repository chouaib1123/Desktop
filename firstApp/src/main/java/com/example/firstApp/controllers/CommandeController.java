package com.example.firstApp.controllers;

import com.example.firstApp.models.*;
import com.example.firstApp.repositories.CommandeRepository;
import com.example.firstApp.repositories.PanierRepository;
import com.example.firstApp.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class CommandeController {

    @Autowired
    private CommandeRepository commandeRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PanierRepository panierRepository;

    @PostMapping("/commande")
    public ResponseEntity<?> createCommande(@RequestBody CommandeDTO commandeDTO) {
        Optional<User> userOptional = userRepository.findById(commandeDTO.getUserId());
        if (!userOptional.isPresent()) {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }

        User user = userOptional.get();
        List<Panier> paniers = panierRepository.findByUserIdAndCommandeIsNull(user.getUserId());


        if (paniers.isEmpty()) {
            return new ResponseEntity<>("No paniers found for user", HttpStatus.BAD_REQUEST);
        }

        Commande commande = new Commande();
        commande.setUser(user);
        commande.setStatus(commandeDTO.getStatus());
        commande.setTotalPrice(commandeDTO.getTotalPrice());

        // Save the commande first to generate commandeId
        commande = commandeRepository.save(commande);

        // Associate paniers with the commande by setting commandeId
        for (Panier panier : paniers) {
            panier.setCommande(commande);
            panierRepository.save(panier); // Update panier with the commandeId
        }

        return new ResponseEntity<>(commande, HttpStatus.CREATED);
    }
    @GetMapping("/commandes/user/{userId}")
    public ResponseEntity<?> getCommandesByUserId(@PathVariable Long userId) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (!userOptional.isEmpty()) {
            List<Commande> commandes = commandeRepository.findByUserId(userId);
            List<CommandeDTO> commandeDTOs = new ArrayList<>();

            for (Commande commande : commandes) {
                CommandeDTO commandeDTO = new CommandeDTO();
                commandeDTO.setId((long) commande.getId());
                commandeDTO.setStatus(commande.getStatus());
                commandeDTO.setCreatedDate(commande.getCreatedDate());
                commandeDTO.setTotalPrice(commande.getTotalPrice());

                List<PanierDTO> panierDTOs = new ArrayList<>();
                for (Panier panier : commande.getPaniers()) {
                    PanierDTO panierDTO = new PanierDTO();
                    panierDTO.setQuantity(panier.getQuantity());
                    panierDTO.setTotalPrice((long) panier.getProduct().getPrice() * panier.getQuantity());
                    panierDTO.setPrice((long) panier.getProduct().getPrice() );
                    panierDTO.setProductName(panier.getProduct().getName());

                    panierDTOs.add(panierDTO);
                }

                commandeDTO.setPaniers(panierDTOs);
                commandeDTOs.add(commandeDTO);
            }

            return new ResponseEntity<>(commandeDTOs, HttpStatus.OK);
        }

        return ResponseEntity.notFound().build();
    }
}
