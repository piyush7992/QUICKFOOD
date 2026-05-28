// server/routes/riders.js
const express = require("express");
const router  = express.Router();
const bcrypt  = require("bcryptjs");
const jwt     = require("jsonwebtoken");
const Rider   = require("../models/Rider");
const auth    = require("./authMiddleware");

// POST /api/riders/register
router.post("/register", async (req, res) => {
  try {
    const { name, phone, email, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const rider  = await Rider.create({ name, phone, email, password: hashed });
    const token  = jwt.sign({ id: rider._id, role: "rider" }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.status(201).json({ token, rider: { id: rider._id, name: rider.name, rating: rider.rating } });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// POST /api/riders/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const rider = await Rider.findOne({ email });
    if (!rider) return res.status(404).json({ error: "Rider not found" });
    const match = await bcrypt.compare(password, rider.password);
    if (!match) return res.status(401).json({ error: "Wrong password" });
    const token = jwt.sign({ id: rider._id, role: "rider" }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, rider: { id: rider._id, name: rider.name, rating: rider.rating, activeOrderId: rider.activeOrderId } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/riders/me  — get own profile
router.get("/me", auth, async (req, res) => {
  try {
    const rider = await Rider.findById(req.user.id).select("-password");
    res.json(rider);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;