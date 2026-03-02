const express = require('express');
const router = express.Router();
const User = require('../models/rider.cjs');
const { body, validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecret = "b#2umK_foxW$>m<CWXiSCw>9LxM(&(tW";
// ROUTE 1: Create a User using: POST "/api/createrider". No login required
router.post('/createrider', [
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be at least 5 characters').isLength({ min: 5 })
], async (req, res) => {
 const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
   const salt=await bcryptjs.genSalt(10);
   const secPass=await bcryptjs.hash(req.body.password, salt);
  try {
   const Userdata = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass,
      location: req.body.location
    });
    res.json({ success: true ,riderId: Userdata._id});
}catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
})
module.exports = router;
// ROUTE 2: Authenticate a User using: POST "/api/loginrider". No login required
router.post('/loginrider',
  [
    body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be at least 5 characters').isLength({ min: 5 })
],async (req, res) => {
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  try {
    const userdata = await User.findOne({email: req.body.email});
    if (!userdata) {
      return res.status(400).json({ error: "Please try to login with correct credentials" });
    }
    if (!bcryptjs.compareSync(req.body.password, userdata.password)) {
      return res.status(400).json({ error: "Please try to login with correct credentials" });
    }
    const data = { user: { id: userdata.id } };
    const token = jwt.sign(data, jwtSecret);
      res.json({ 
      success: true, 
      token: token,
      email: userdata.email, 
      name: userdata.name 
    });
    console.log("Login successful for user:", userdata.email);
    // res.json({ success: true, token: token });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;