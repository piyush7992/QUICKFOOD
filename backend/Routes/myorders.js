const express = require("express");
const router = express.Router();
const Order = require("../models/Orders.cjs"); // adjust name if needed

// Fetch orders for logged-in user
router.post("/my-orders", async (req, res) => {
  try {
    let mydata = await Order.find({ userEmail: req.body.userEmail });
    console.log("My Orders Data:", mydata); // Debugging log
    res.json({ success: true, orders: mydata });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
