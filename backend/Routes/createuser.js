const express = require('express');
const router = express.Router();
const User = require('../models/user.cjs');
const { body, validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecret = "b#2umK_foxW$>m<CWXiSCw>9LxM(&(tW";
// ROUTE 1: Create a User using: POST "/api/createuser". No login required
router.post('/createuser', [
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
    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass,
      location: req.body.location,
      role:req.body.role
    });
    res.json({ success: true });
}catch (error) {
  console.error("Create User Error 👉", error.message);

  res.status(500).json({    // ✅ SEND JSON NOT TEXT
    success:false,
    message:error.message
  });
}
})
module.exports = router;
// ROUTE 2: Authenticate a User using: POST "/api/loginuser". No login required
router.post('/loginuser',
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
      role: userdata.role,
      token: token,
      email: userdata.email, 
      name: userdata.name 
    });

    // res.json({ success: true, token: token });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;