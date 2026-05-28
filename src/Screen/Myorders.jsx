import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import LiveMap from "../Components/LiveMap";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await fetch("https://quickfood-pcqa.onrender.com/api/my-orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userEmail }),
      });

      const data = await res.json();
      setOrders(data.orders);
    };

    if (userEmail) fetchOrders();
  }, [userEmail]);

  return (
  <div className="container my-5">
    <Navbar />

    <h2 className="fw-bold mb-4">📦 My Orders</h2>

    {orders.length === 0 ? (
      <h5>No orders found</h5>
    ) : (
      orders.map((order, index) => (
        <div key={index} className="card mb-4 shadow-sm">
          <div className="card-body">

            <div className="d-flex justify-content-between">
              <h5>Order #{index + 1}</h5>
              <span className="badge bg-success">
                {order.orderStatus}
              </span>
            </div>

            <p className="text-muted mb-1">
              📅 {new Date(order.date).toLocaleString()}
            </p>

            <p><strong>📍 Address:</strong> {order.address}</p>

            {/* ✅ LIVE MAP MOVED HERE */}
            <LiveMap orderId={order._id} />

            <ul className="list-group mb-3">
              {order.items.map((item, i) => (
                <li key={i} className="list-group-item d-flex justify-content-between">
                  <span>{item.name} (x{item.quantity})</span>
                  <span>₹{item.price}</span>
                </li>
              ))}
            </ul>

            <div className="d-flex justify-content-between fw-bold">
              <span>Total</span>
              <span>₹{order.totalAmount}</span>
            </div>

            <div className="mt-2">
              <span className={`badge ${order.paymentStatus === "Paid" ? "bg-success" : "bg-warning text-dark"}`}>
                Payment: {order.paymentStatus}
              </span>
            </div>

          </div>
        </div>
      ))
    )}
  </div>
);
}