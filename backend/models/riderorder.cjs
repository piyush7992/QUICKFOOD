const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

  restaurantName: String,
  pickupAddress: String,
  customerAddress: String,
  phone: String,

  status: {
    type: String,
    default: "pending"
  },

  riderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Rider"
  },

  deliveryCharge: {
    type: Number,
    default: 40
  }

});

module.exports = mongoose.model("RiderOrder", orderSchema);
