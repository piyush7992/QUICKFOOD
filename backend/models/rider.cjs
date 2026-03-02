const mongoose = require("mongoose");

const riderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: { 
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  isAvailable: {
    type: Boolean,
    default: false
  },
  earnings: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model("Rider", riderSchema);
