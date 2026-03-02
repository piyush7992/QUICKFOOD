const express = require("express");
const router = express.Router();
const Order = require("../models/Orders.cjs"); // adjust name if needed

// Fetch orders for logged-in user
router.post("/my-orders", async (req, res) => {
  try {
    const { userEmail } = req.body;
    console.log("Fetching orders for:", userEmail);

    const orders = await Order.find({ userEmail }).sort({ date: -1 });

    res.json({ success: true, orders });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
