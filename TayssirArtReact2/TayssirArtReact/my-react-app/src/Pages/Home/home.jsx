import React from "react";
import { useState, useEffect } from "react";
import "./home.css";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function Home() {
  const [latestProducts, setLatestProducts] = useState([]);
 
  useEffect(() => {
    fetch("http://localhost:8080/api/latestProducts")
      .then((response) => response.json())
      .then((data) => setLatestProducts(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  const Items = latestProducts.map((item) => (
    <div className="product-item" key={item.id}>
      <a href={`/product/${item.id}`}>
        <div className="imagesection">
          <img
            src={`http://localhost:8080${item.imagePath}`}
            alt="Product Image"
          />
          <div className="ClickForDetails">تفحص المنتج</div>
        </div>
        <div className="product-title">{item.name}</div>
        <div className="product-price">د.م{item.price}</div>
      </a>
    </div>
  ));
  return (
    <div className="container">
      <div className="FronImage">
      <p>مرحبا بكم في <span class="store-name">متجرنا</span>! نقدم مجموعة متنوعة من <span class="product-type">الحرف اليدوية</span> المغربية من مختلف الفنانين المحليين اكتشفوا جمال <span class="product-feature">الأصالة</span> و<span class="product-feature">الإبداع</span> في كل قطعة</p>
      <div className="FlottantImages">
          <img src="1.jpeg" alt="" />
          <img src="2.jpeg" alt="" />
          <img src="3.jpeg" alt="" />
        </div>
        <button><a class="fancy" href="#">
            <span class="top-key"></span>
            <span class="text">احصل على تجربة فنية رائعة</span>
            <span class="bottom-key-1"></span>
            <span class="bottom-key-2"></span>
          </a>
          </button>
      </div>
      <div className="lastestProducts">
        <div className="head">
          <Link to={"/products"}>
            <button>عرض الكل</button>
          </Link>
          اخر المنتجات المضافة
        </div>
        <div className="product-list">{Items}</div>
      </div>
    </div>
  );
}

export default Home;
