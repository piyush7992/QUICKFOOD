const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userEmail: String,
  items: [
    {
      id: String,
      name: String,
      quantity: Number,
      size: String,
      price: Number,
    },
  ],
  address: String,
  totalAmount: Number,
  paymentMethod: { type: String, default: "COD" },
  paymentStatus: { type: String, default: "Pending" },
  orderStatus: { type: String, default: "Placed" },
  date: { type: Date, default: Date.now },
    cords: {
      lat: Number,
      lng: Number
    }
});

module.exports = mongoose.model("Order", orderSchema);
