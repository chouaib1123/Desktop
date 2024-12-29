import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./product.css";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";

function Product() {
  const { productId } = useParams();
  const [product, setProduct] = useState({});

  const [ItemNumber, setItemNumber] = useState(1);

  useEffect(() => {
    // Set loading state to true before fetch
    fetch(`http://localhost:8080/products/${productId}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [productId]);
  const handleAddToCart = () => {
    const token = localStorage.getItem("token");

    const decodedToken = jwtDecode(token);

    const userId = decodedToken.userId;

    const cartItem = {
      productId: product.id,
      quantity: ItemNumber,
      userId: userId,
    };

    fetch("http://localhost:8080/api/paniers/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItem),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add item to cart");
        }

        toast.success("تم اضافة المنتج الى سلتك");
      })
      .catch((error) => {
        console.error("Error adding item to cart:", error);
      });
  };

  if (Object.keys(product).length === 0) {
    return <div className="NoProductFound">No product found</div>; // Show message if product is empty
  }

  return (
    <div className="Product">
      <div className="productSection">
        <div className="Details">
          <h4>{product.name}</h4>
          <span className="price">{product.price} د.م</span>
          <div className="stars">
            <img src="http://localhost:3000/Star.svg" alt="" />
          </div>
          <p>{product.description}</p>
          <div className="addcart">
            <div className="Counter">
              <button
                onClick={() => {
                  if (ItemNumber > 1) setItemNumber(ItemNumber - 1);
                }}
              >
                -
              </button>
              {ItemNumber}
              <button onClick={() => setItemNumber(ItemNumber + 1)}>+</button>
            </div>
            <button className="AddPanier" onClick={handleAddToCart}>
              اضف الى سلتك
            </button>
          </div>
          <div className="category">
            نوعية : <span>{product.category}</span>
          </div>
        </div>
        <img src={`http://localhost:8080/${product.imagePath}`} alt="" />
      </div>
    </div>
  );
}

export default Product;
