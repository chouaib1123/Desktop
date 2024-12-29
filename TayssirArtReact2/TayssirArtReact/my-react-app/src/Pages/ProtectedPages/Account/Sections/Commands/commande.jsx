import React, { useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
import "./commande.css"



function Commande() {
    const [commandes, setCommandes] = useState([]);
    const [activeCommande, setActiveCommande] = useState(null);
    const handleCommandeClick = (commandeId) => {
        if (activeCommande === commandeId) {
            setActiveCommande(null); 
        } else {
            setActiveCommande(commandeId); 
        }
    };
    console.log(commandes);
    useEffect(() => {
        const token = localStorage.getItem('token');
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId;
        fetch(`http://localhost:8080/api/commandes/user/${userId}`)  
            .then(response => response.json())
            .then(data => {
                setCommandes(data);
            })
            .catch(error => {
                console.error('Error fetching commandes:', error);
            });
    }, []);
   
    return (
        <div className="commandes-list">
        {commandes.map(commande => (
                <div key={commande.id} className={`commande-item ${activeCommande === commande.id ? 'active' : ''}`} >
                <div className="commande-info" onClick={() => handleCommandeClick(commande.id)}>
                   
                    <div className="commande-price">{commande.totalPrice}د.م</div>
                    <div className="commande-Date">{commande.createdDate}</div>
                    <div className="commande-status">               
                         {commande.status === 'PENDING' ? 'قيد الانتظار' : commande.status === 'DELIVERED' ? 'تم التسليم' : commande.status}
                    </div> 
                    <div className="commande-id">{commande.id}</div>
                </div>
                
                {/* Render Paniers associated with the Commande */}
                <div className="paniers-list">
                    {commande.paniers.map(panier => (
                        <div key={panier.id} className="panier-item"> 
                            <div >{panier.totalPrice}د.م</div>
                           <div className="panier-quantity">
                            
                            <div >{panier.quantity}</div>
                            
                             <span>X</span>
                            <div className="panier-product">{panier.productName}</div>
                           </div>
                        </div>
                    ))}
                </div>
            </div>
        ))}
    </div>
    );
}

export default Commande;
