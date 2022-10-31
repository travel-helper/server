const express = require("express");
const crypto = require("crypto");
const authController = require("../controllers/authController");
const router = express.Router();

router.post("/auth/signup", authController.loadPosts);
router.post("/auth/login");
module.exports = router;
