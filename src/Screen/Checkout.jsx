import React, { useState } from "react";
import { useCart, useDispatchCart } from "../Components/ContextReducer";
import { useNavigate } from "react-router-dom";



  export default function Checkout() {
  const data = useCart();
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("userEmail");
  console.log("localStorage:", localStorage);
  console.log("Checkout email:", userEmail);

  const dispatch = useDispatchCart();
  const [address, setAddress] = useState("");
  const [cords, setCords] = useState({ lat: null, lng: null });

  const totalPrice = data.reduce((total, item) => total + item.price, 0);
   const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        console.log("Lat:", latitude, "Lng:", longitude);
        setCords({ lat: latitude, lng: longitude });

        // Convert lat/lng → readable address
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        );
        const data = await res.json();

        setAddress(data.display_name); // autofill address box
      },
      (error) => {
        alert("Location access denied ❌");
      }
    );
  } else {
    alert("Geolocation not supported");
  }
};


  const handlePlaceOrder = async () => {
    const res = await fetch("http://localhost:5000/api/place-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: data,
        address,
        totalAmount: totalPrice,
        userEmail: userEmail,
        cords: cords
      }),
    });

    const result = await res.json();

    if (result.success) {
      alert("Order placed! Pay cash on delivery 🚚");
      dispatch({ type: "CLEAR_CART" });
      navigate("/myorders");
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-lg border-0">
            <div className="card-body p-4">
              <h2 className="mb-4 fw-bold text-center">🧾 Checkout</h2>

              {/* Cart Items */}
              <h5 className="mb-3">Order Summary</h5>
              <ul className="list-group mb-4">
                {data.map((item, index) => (
                  <li
                    key={index}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <div className="fw-semibold">{item.name}</div>
                      <small className="text-muted">
                        Qty: {item.quantity} | Size: {item.size}
                      </small>
                    </div>
                    <span className="fw-bold">₹{item.price}</span>
                  </li>
                ))}
              </ul>

              {/* Total */}
              <div className="d-flex justify-content-between mb-4 fs-5 fw-bold">
                <span>Total Amount</span>
                <span className="text-success">₹{totalPrice}</span>
              </div>

              {/* Address */}
              <div className="mb-4">
                <label className="form-label fw-semibold">
                  Delivery Address
                </label>
                <textarea
                  className="form-control"
                  rows="3"
                  placeholder="Enter your full delivery address..."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />

                <button
                  className="btn btn-outline-primary mb-3"
                  onClick={getLocation}
                >
                  📍 Use My Current Location
                </button>
              </div>

              {/* Payment Method */}
              <div className="mb-4">
                <label className="form-label fw-semibold">Payment Method</label>
                <div className="form-control bg-light">💵 Cash on Delivery</div>
              </div>

              {/* Button */}
              <button
                className="btn btn-success w-100 py-2 fw-bold"
                onClick={handlePlaceOrder}
                disabled={data.length === 0}
              >
                🚚 Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
