const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Route لتسجيل يوزر جديد
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // بعمل يوزر جديد
    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;