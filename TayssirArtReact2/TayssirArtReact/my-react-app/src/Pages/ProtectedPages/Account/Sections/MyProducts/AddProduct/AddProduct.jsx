import React, { useState } from "react";
import "./AddProduct.css";
import { jwtDecode } from "jwt-decode";
import { Toaster, toast } from "sonner";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const navigate = useNavigate();

  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
  });
  const [imageFile, setImageFile] = useState(null);

  const handleNewProductChange = (event) => {
    const { name, value } = event.target;
    setNewProduct({
      ...newProduct,
      [name]: value,
    });
  };

  const handleImageChange = (event) => {
    setImageFile(event.target.files[0]);
  };

  const handleAddProduct = async (event) => {
    event.preventDefault();

    // Basic client-side validation
    if (
      !newProduct.name ||
      !newProduct.description ||
      !newProduct.category ||
      !newProduct.price
    ) {
      toast.error("All fields are required.");
      return;
    }

    if (!imageFile) {
      toast.error("Image file is required.");
      return;
    }

    // Create a FormData object to send the product details and the image file
    const formData = new FormData();
    formData.append("name", newProduct.name);
    formData.append("description", newProduct.description);
    formData.append("category", newProduct.category);
    formData.append("price", newProduct.price);
    formData.append("image", imageFile);

    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.userId;
    try {
      const response = await fetch(
        `http://localhost:8080/products/artisan/${userId}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        toast.success("Product added successfully.");
        navigate("/Account/MyProducts");
      } else {
        const errorData = await response.json();
        toast.error(`${errorData.description || "Unknown error"}`);
      }
    } catch (error) {
      toast.error("An error occurred while processing the product.");
    }
  };

  return (
    <div className="addproduct-form">
      <h2>املئ المعلومات لاضافة منتجك</h2>
      <form onSubmit={handleAddProduct}>
        <div>
          <input
            placeholder="اضف الاسم"
            type="text"
            name="name"
            value={newProduct.name}
            onChange={handleNewProductChange}
          />
        </div>
        <div>
          <input
            placeholder="حدد المواصفات الكاملة"
            type="text"
            name="description"
            value={newProduct.description}
            onChange={handleNewProductChange}
          />
        </div>
        <div>
          <input
            placeholder="حدد نوعية منتوجك"
            type="text"
            name="category"
            value={newProduct.category}
            onChange={handleNewProductChange}
          />
        </div>
        <div>
          <input
            placeholder="حدد الثمن"
            type="text"
            name="price"
            value={newProduct.price}
            onChange={handleNewProductChange}
          />
        </div>
        <div>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;
