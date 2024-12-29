import React, { useState, useEffect } from "react";
import PanierProduct from "./PanierProduct";
import "./Panier.css";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";
import Popup from "react-popup";

function Panier() {
  const [isCasablanca, setIsCasablanca] = useState(false);
  const [panierItems, setPanierItems] = useState([]);
  // Calculate subtotal for each item
  const calculateItemSubtotal = (item) => {
    return item.quantity * item.product.price;
  };
  const deleteItem = (itemId) => {
    const url = `http://localhost:8080/api/paniers/${itemId}`;

    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        toast.success("تم حذف العنصر بنجاح");

        // Update frontend state after successful deletion
        const updatedItems = panierItems.filter((item) => item.id !== itemId);
        setPanierItems(updatedItems);
      } else {
        toast.error("فشل في حذف العنصر");
        // Handle error if necessary
      }
    });
  };

  // Calculate total shipping cost based on location
  const calculateShippingCost = () => {
    return isCasablanca ? 30 : 60; // Assuming 30 MAD for Casablanca, 60 MAD for other cities
  };

  // Calculate total sum of all items' subtotals
  const calculateTotalSubtotal = () => {
    return panierItems.reduce(
      (total, item) => total + calculateItemSubtotal(item),
      0
    );
  };

  // Calculate grand total including shipping
  const calculateGrandTotal = () => {
    return calculateTotalSubtotal() + calculateShippingCost();
  };
  const updateQuantity = (itemId, newQuantity) => {
    const updatedItems = panierItems.map((item) => {
      if (item.id === itemId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setPanierItems(updatedItems);
  };

  console.log(panierItems);
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
    }
    const decodedToken = jwtDecode(token);

    const userId = decodedToken.userId;
    fetch(`http://localhost:8080/api/paniers/${userId}`)
      .then((response) => response.json())
      .then((data) => setPanierItems(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleConfirmOrder = () => {
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.userId;
    // Replace with actual user ID from JWT or state
    const totalPrice = calculateGrandTotal();

    // Send POST request to /api/commande
    fetch("http://localhost:8080/api/commande", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, status: "PENDING", totalPrice }),
    })
      .then((response) => {
        if (response.ok) {
          Popup.alert(
            "تم استلام طلبك بنجاح. سنتواصل معك خلال الـ 48 ساعة القادمة لاستكمال الطلب والحصول على تفاصيل إضافية."
          );

          setTimeout(function () {
            window.location.reload();
          }, 3000);
        } else {
          toast.error("فشل في إرسال الطلب");
        }
      })
      .catch((error) => {
        console.error("Error sending order:", error);
        toast.error("حدث خطأ أثناء إرسال الطلب");
      });
  };
  const handleRadioChange = (event) => {
    setIsCasablanca(event.target.value === "casablanca");
  };
  return (
    <div className="Panier">
      <Popup />
      <h1>سلة التسوق</h1>
      <div className="PanierDetails">
        <div className="PanierTotal ">
          <h3>إجمالي قيمة الشراء</h3>
          <div className="custom">
            <div>{Math.round(calculateTotalSubtotal())}</div>
            <div>المجموع الفرعي</div>
          </div>
          <div className="custom shipping">
            <div>
              سيتم حساب تكاليف الشحن بمجرد تقديم العنوان. إذا كنت من الدار
              البيضاء ستكون تكلفة الشحن 30 درهم، وإذا كنت من خارج الدار البيضاء،
              ستكون التكلفة 60 درهم
              <div className="citychoose">
                <label>
                  <input
                    type="radio"
                    value="casablanca"
                    checked={isCasablanca}
                    onChange={handleRadioChange}
                  />
                  الدار البيضاء
                </label>
                <label>
                  <input
                    type="radio"
                    value="notCasablanca"
                    checked={!isCasablanca}
                    onChange={handleRadioChange}
                  />
                  مدينة اخرى
                </label>
              </div>
            </div>

            <div>الشحن</div>
          </div>
          <div className="custom">
            <div>د.م {Math.round(calculateGrandTotal())}</div>
            <div>المجموع</div>
          </div>

          <button onClick={handleConfirmOrder}>إتمام الطلب</button>
        </div>
        <div className="PanierProducts">
          {panierItems.length === 0 ? (
            <div className="nofound">
              ليس لديك أي عناصر في السلة
              <img src="http://localhost:3000/PanierNotFound.png" alt="" />
            </div>
          ) : (
            panierItems.map((item) => (
              <PanierProduct
                key={item.id}
                item={item}
                updateQuantity={updateQuantity}
                deleteItem={deleteItem}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Panier;
