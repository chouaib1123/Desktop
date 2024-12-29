import React, { useEffect, useState } from "react";
import "./MyProducts.css";
import { Link } from "react-router-dom";
import AddProduct from "./AddProduct/AddProduct";
import { jwtDecode } from "jwt-decode";

function MyProducts() {
  const [filter, setFilter] = useState({ searchQuery: "" });
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

    
  useEffect(() => {  
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.userId;
    fetch(`http://localhost:8080/products/artisan/${userId}`)
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        setFilteredProducts(data);
        console.log(data);
      })
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    setFilteredProducts(
      products.filter(product =>
        product.name.toLowerCase().includes(filter.searchQuery.toLowerCase())
      )
    );
  }, [filter, products]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFilter({
      ...filter,
      [name]: value,
    });
  };
 
  return (
    <div className="myproducts">
       
      <div className="top">
        <Link className="addproduct" to="AddProduct">
         
            <img src="http://localhost:3000/icons8-ajouter-24.png" alt="Add product icon" />
            اضف منتج
          
        </Link>
        <div className="Search">
          <input
            type="text"
            name="searchQuery"
            value={filter.searchQuery}
            placeholder="ابحث بالاسم"
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="products-list">
        {filteredProducts.map(product => (
          <div key={product.id} className="myproduct-item">
            <img src="http://localhost:3000/icons8-effacer-24.png" alt="Delete icon" />
            <span>{product.price}د.م</span>
            <span>{product.description}</span>
            <span>{product.name}</span>
            <div className="IdentifiantImage">
              <img src={`http://localhost:8080/${product.imagePath}`} alt={product.name} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyProducts;
