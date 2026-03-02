const express = require("express");
const router = express.Router();
const Rider = require("../models/rider.cjs");
const Order = require("../models/riderorder.cjs");
const socket = require("../socket/socket");


// ONLINE OFFLINE STATUS
router.put("/rider/status", async (req, res) => {

  const { riderId, isAvailable } = req.body;

  await Rider.findByIdAndUpdate(riderId, {
    isAvailable: isAvailable
  });

  res.json({ message: "Status Updated" });
});

router.get("/rider/orders/:riderId", async (req, res) => {

  const riderId = req.params.riderId;

  const orders = await Order.find({
    riderId: riderId,
    status: { $in: ["pending", "accepted", "picked"] }
  });

  res.json(orders);
});


router.put("/order/update", async (req, res) => {

  const { orderId, status } = req.body;

  const order = await Order.findById(orderId);

  order.status = status;
  await order.save();
  const io = socket.getIO();
    io.to("online-riders").emit("new-order", order);

    console.log("🔥 Order Sent to Riders");

  // if delivered add earnings
  if (status === "delivered") {

    await Rider.findByIdAndUpdate(order.riderId, {
      $inc: { earnings: order.deliveryCharge }
    });

  }

  res.json({ message: "Order Updated" });
});

router.get("/rider/earnings/:riderId", async (req, res) => {

  const rider = await Rider.findById(req.params.riderId);

  res.json({
    total: rider.earnings
  });

});
router.put("/accept-order", async (req, res) => {

  const { orderId, riderId } = req.body;

  const order = await Order.findById(orderId);

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  if (order.riderId) {
    return res.json({ message: "Already Accepted" });
  }

  order.riderId = riderId;
  order.orderStatus = "Accepted";

  await order.save();

  res.json({ message: "Order Accepted" });

});


module.exports = router;
