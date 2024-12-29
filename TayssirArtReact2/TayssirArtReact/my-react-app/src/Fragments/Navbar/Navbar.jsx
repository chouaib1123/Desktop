import React from "react";
import "./Navbar.css"; // Assuming you have a CSS file for styling
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <a href="/Account">
            <img
              alt="Profile"
              src="http://localhost:3000/icons8-administrator-male-26.png"
            />
          </a>
        </li>
        <li>
        <a href="/Panier">
          <img
            className="modified"
            alt="Shopping Cart"
            src="http://localhost:3000/icons8-panier-30.png"
          />
          </a>
        </li>
        <Link to={"/Products"} className="Splitter">
          <li>المنتجات</li>
        </Link>
      
        <Link to={"/privacy"}>
        <li>الخصوصية</li>
      
        </Link>
        <Link to={"/about"}>
        <li>من نحن</li>       
        </Link>
        
      </ul>
      <Link to={"/"}>
        <div className="Logo">
          <span>Tayssir</span>Art
        </div>
      </Link>
    </nav>
  );
}

export default Navbar;
