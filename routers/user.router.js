const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.get("/", userController.loadPosts);

router.post("/login", userController.login); // 로그인 컨트롤러

module.exports = router;
