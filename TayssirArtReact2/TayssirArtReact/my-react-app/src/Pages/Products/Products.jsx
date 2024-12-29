import React, { useState, useEffect } from "react";
import "./Products.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filter, setFilter] = useState({
    price: 2000,
    searchQuery: "",
    filterBy: "الفئة",
  });

  useEffect(() => {
    fetch("http://localhost:8080/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data); // Initialize filteredProducts with all products
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleChange = (event) => {
    const { name, value, type } = event.target;
    if (type === "range") {
      setFilter({
        ...filter,
        [name]: parseInt(value, 10),
      });
    } else {
      setFilter({
        ...filter,
        [name]: value,
      });
    }
  };

  const applyFilters = () => {
    let filtered = [...products];

    if (filter.filterBy !== "الفئة") {
      filtered = filtered.filter(
        (product) => product.category === filter.filterBy
      );
    }

    if (filter.searchQuery.trim() !== "") {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(filter.searchQuery.toLowerCase())
      );
    }

    filtered = filtered.filter((product) => product.price <= filter.price);

    setFilteredProducts(filtered);
  };

  const categoriesSet = new Set(products.map((product) => product.category));
  const uniqueCategories = Array.from(categoriesSet);

  const Items = filteredProducts.map((item) => (
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
    <div className="Products">
      <div className="productlist2">{Items}</div>
      <div className="Filter">
        <div className="title">تفقد اخر منتجاتنا</div>
        <div className="Search">
          <input
            type="text"
            name="searchQuery"
            value={filter.searchQuery}
            placeholder="ابحث بالاسم"
            onChange={handleChange}
          />
        </div>
        <div className="pricerange">
          <div className="pricetitle">الثمن</div>
          <div className="range">
            0د.م
            <input
              type="range"
              min={0}
              max={2000}
              name="price"
              value={filter.price}
              onChange={handleChange}
            />
            {filter.price}د.م
          </div>
        </div>
        <div className="category">
          <select
            className="custom-select"
            name="filterBy"
            value={filter.filterBy}
            onChange={handleChange}
          >
            <option value="الفئة" disabled>
              {" "}
              الفئة
            </option>
            {uniqueCategories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <button onClick={applyFilters}>ابحث</button>
      </div>
    </div>
  );
}

export default Products;
