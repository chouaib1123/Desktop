import React, { useState } from 'react';

function PanierProduct({ item, updateQuantity, deleteItem }) {
    const [itemNumber, setItemNumber] = useState(item.quantity);

    const handleQuantityChange = (newQuantity) => {
        setItemNumber(newQuantity);
        updateQuantity(item.id, newQuantity); // Update parent state
    };

    const handleDelete = () => {
        deleteItem(item.id); // Trigger delete action in parent component
    };

    return (
        <div className="PanierProduct">
                <img className='deletebutton' onClick={handleDelete} src="http://localhost:3000/icons8-effacer-24.png" alt="Remove" />
           
            <div className="Details"> 
                <div className="Counter">
                    <button onClick={() => { if (itemNumber > 1) handleQuantityChange(itemNumber - 1) }}>-</button>
                    {itemNumber}
                    <button onClick={() => handleQuantityChange(itemNumber + 1)}>+</button>
                </div>
                <div className="itemDetail">
                    <span>{item.product.name}</span>
                    <span>{item.product.category}</span>
                    <span>{item.product.price} د.م</span>
                </div>
               
            </div>
            <img className="productImage" src={`http://localhost:8080/${item.product.imagePath}`} alt={item.product.name} />

        </div>
    );
}

export default PanierProduct;
