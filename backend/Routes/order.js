const express = require("express");
const router = express.Router();
const Order = require("../models/Orders.cjs");



router.post("/place-order", async (req, res) => {
  try {
    userEmail = req.body.email;
    items = req.body.items;
    address = req.body.address;
    totalAmount = req.body.totalAmount;

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
    res.json({ success: true, message: "Order placed successfully" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
