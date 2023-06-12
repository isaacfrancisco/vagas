const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const data = require("../database/fakeData");
const router = express.Router();

router.get("/generate-token", (req, res) => {
  const payload = data[0];

  const secretKey = process.env.JWT_SECRET;
  console.log(process.env.JWT_SECRET);
  const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });

  res.json({ token });
});

module.exports = router;
