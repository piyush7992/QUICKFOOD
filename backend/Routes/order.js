const express = require("express");
const router = express.Router();
const Order = require("../models/Orders.cjs");
const socket = require("../socket/socket");


router.post("/place-order", async (req, res) => {
  try {
    const { items, address, totalAmount, userEmail } = req.body;

    const newOrder = new Order({
      items,
      address,
      totalAmount,
      userEmail,
      paymentMethod: "COD",
      paymentStatus: "Pending",
      orderStatus: "Placed",
      cords: req.body.cords || null
    });

    await newOrder.save();
     const io = socket.getIO();
    io.to("online-riders").emit("new-order", newOrder);

    console.log("🔥 Customer Order Sent To Riders");
    
    res.json({ success: true, message: "Order placed successfully" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
