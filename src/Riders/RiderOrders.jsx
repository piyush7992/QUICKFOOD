import React from "react";

export default function RiderOrders({ orders, startTracking })  {

  const acceptOrder = async (orderId) => {

  const res = await fetch("http://localhost:5000/api/accept-order", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      orderId: orderId,
      riderId: "rider123"
    })
  });

  const data = await res.json();

  if(data.success){
    alert("Order Accepted ✅");

    // ⭐⭐⭐ START LIVE TRACKING
    startTracking(orderId);
  }

};
  return (
    <div>
      <h4>Assigned Orders</h4>

      {orders.map((order, index) => (
        <div key={index} className="card p-3 m-2">

          <p><b>item:</b> {order.userEmail}</p>
          <p><b>Address:</b> {order.address}</p>
          <p><b>Total:</b> ₹{order.totalAmount}</p>

          {order.orderStatus === "Placed" && (
            <button
              className="btn btn-success"
              onClick={() => acceptOrder(order._id)}
            >
              Accept Order
            </button>
          )}

        </div>
      ))}

    </div>
  );
}
