import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RiderOrders from "./RiderOrders";
import Earnings from "./Earnings";
import ActiveDelivery from "./ActiveDelhivery";
import socket from "../socket/RiderSocket"; // ✅ correct path
import Navbar from "../Components/Navbar";

export default function RiderDashboard() {
  const [isOnline, setIsOnline] = useState(false);
  const [orders, setOrders] = useState([]); // ✅ inside component

  useEffect(() => {
    socket.on("connect", () => {
      console.log("✅ Socket Connected");

      socket.emit("go-online", "rider123"); // JOIN ROOM AFTER CONNECT
    });

    socket.on("new-order", (order) => {
      console.log("📦 ORDER RECEIVED:", order);

      setOrders((prev) => [...prev, order]);
    });

    return () => {
      socket.off("new-order");
      socket.off("connect");
    };
  }, []);
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");

    if (role !== "rider") {
      navigate("/signin");
    }
  }, []);

  const startTracking = (orderId) => {
    // JOIN THIS ORDER ROOM
    socket.emit("join-order-room", orderId);

    navigator.geolocation.watchPosition(
      (position) => {
        socket.emit("riderLocationUpdate", {
          orderId: orderId,
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (err) => console.log(err),
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000,
      },
    );
  };

  const toggleStatus = async () => {
    setIsOnline(!isOnline);

    await fetch("http://localhost:5000/api/rider/status", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isAvailable: !isOnline }),
    });
  };

  return (
    <div className="container mt-4">
      <Navbar />
      <h2>🚚 Rider Dashboard</h2>

      <button
        onClick={toggleStatus}
        className={`btn ${isOnline ? "btn-success" : "btn-danger"} mt-3`}
      >
        {isOnline ? "Online" : "Offline"}
      </button>

      <hr />

      <Earnings />

      {/* PASS LIVE ORDERS */}
      <RiderOrders
        orders={orders}
        isOnline={isOnline}
        startTracking={startTracking}
      />

      <ActiveDelivery />
    </div>
  );
}
