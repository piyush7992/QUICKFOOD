import React from "react";

export default function OrderCard({ order }) {

  const updateStatus = async (status) => {

    await fetch("http://localhost:5000/api/order/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        orderId: order._id,
        status: status
      }),
    });

    alert("Status Updated");
  };

  return (

    <div className="card mt-3 p-3">

      <h5>{order.restaurantName}</h5>

      <p>📍 Pickup: {order.pickupAddress}</p>
      <p>🏠 Drop: {order.customerAddress}</p>
      <p>📞 Phone: {order.phone}</p>

      <button
        className="btn btn-primary m-2"
        onClick={() => updateStatus("accepted")}
      >
        Accept
      </button>

      <button
        className="btn btn-warning m-2"
        onClick={() => updateStatus("picked")}
      >
        Picked Up
      </button>

      <button
        className="btn btn-success m-2"
        onClick={() => updateStatus("delivered")}
      >
        Delivered
      </button>

    </div>
  );
}
